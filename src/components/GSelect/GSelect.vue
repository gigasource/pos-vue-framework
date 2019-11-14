<script>
  import GTextField from "../GInput/GTextField";
  import GMenu from "../GMenu/GMenu"
  import {makeSelectable} from "../../mixins/groupable";
  import {reactive, ref, computed, toRefs} from "@vue/composition-api";
  import {getList, getSelections} from "./GSelectFactory";
  import GChip from "../GChip/GChip";
  import GIcon from "../GIcon/GIcon";
  import GList from "../GList/GList";
  import _ from "lodash"
  import {isSelected} from "../GDatePicker/logic/TableUtil";
  import GListItem from "../GList/GListItem";
  import {GListItemContent, GListItemText} from "../GList/GListFunctionalComponent";
  import {keyCodes} from "../../utils/helpers";

  export default {
    name: "GSelect",
    components: {GListItem, GList, GIcon, GChip, GTextField, GMenu, GListItemContent, GListItemText},
    props: {
      //select props
      width: [String, Number],
      //text field's props
      ...{

        //textfield style
        ...{
          filled: {
            type: Boolean,
            default: false
          },
          solo: {
            type: Boolean,
            default: false
          },
          outlined: {
            type: Boolean,
            default: false
          },
          flat: {
            type: Boolean,
            default: false
          },
          rounded: {
            type: Boolean,
            default: false
          },
          shaped: {
            type: Boolean,
            default: false
          }
        },
        //textfield parts
        clearable: {
          type: Boolean,
          default: false
        },
        hint: {
          type: String,
          default: ''
        },
        persistent: {
          type: Boolean,
          default: false
        },
        counter: {
          type: [Boolean, Number, String],
          default: false
        },
        placeholder: {
          type: String,
          default: ''
        },
        label: {
          type: String,
          default: 'Label'
        },
        prefix: {
          type: String,
          default: ''
        },
        suffix: {
          type: String,
          default: ''
        },
        rules: Array,
        type: {
          type: String,
          default: 'text'
        }

      },

      //list props
      searchable: Boolean,
      multiple: Boolean,
      mandatory: Boolean,
      allowDuplicates: Boolean,
      //menu props
      menuProps: {
        type: Object,
        default: () => ({
          closeOnClick: true,
          closeOnContentClick: false,
          maxHeight: 300,
          offsetY: true,
          offsetOverflow: true,
          top: false,
        })
      },
      //item textfieldValue props
      chips: {
        type: Boolean,
        default: false
      },
      smallChips: {
        type: Boolean,
        default: false
      }
      ,
      items: Array,
      itemText: {
        type: String,
        default: 'text'
      },
      itemValue: {
        type: String,
        default: 'value'
      },
      value: null,
      genTextField: Function,
      genList: Function,
      selectOnly: {
        type: Boolean,
        default: true
      }
    },
    setup: function (props, context) {
      const state = reactive({
        searchText: '',
        fieldItem: null
      })
      //list selections
      const {internalValue: selectedItem} = makeSelectable(props, context)
      const fieldItem = getSelections(props, selectedItem)
      const selections = computed(() => {
        if (props.multiple) {
          return fieldItem.value.map(item => {
            return item ? (item['text'] || item['value'] || item) : ''
          })
        } else {
          return fieldItem.value ? fieldItem.value['text'] || fieldItem.value['value'] || fieldItem.value : ''
        }

      })

      //gen SearchText
      function genSearchTextField() {
        if (props.searchable && props.selectOnly) {
          return <GTextField placeholder="Search"
                             vModel={state.searchText}
                             clearable
                             style="margin-bottom: 0; background-color: transparent"/>
        }
      }

      //genList
      const options = getList(props, selectedItem, state)
      const showOptions = ref(false)

      function onListKeyDown(e, onArrowDown, onArrowUp, item, onSelect) {
        switch (e.keyCode) {
          case keyCodes.down:
            onArrowDown(item)
            break
          case keyCodes.up:
            onArrowUp(item)
            break
          case keyCodes.enter:
            onSelect(item)
            break

        }
      }

      const genListScopedSlots = {
        listItem: ({item, isSelected, onSelect, onArrowDown, onArrowUp}) =>
            <GListItem tabindex="0" style={{'min-height': '48px'}} item={item} isSelected={isSelected}
                       vOn:singleItemClick={() => onSelect(item)}
                       vOn:keydown_native={(e) => onListKeyDown(e, onArrowDown, onArrowUp, item, onSelect)}
            >
              <GListItemContent>
                <GListItemText>{item[props.itemText]}</GListItemText>
              </GListItemContent>
            </GListItem>

      }

      const genList = props.genList || function (showOptions) {
        return <GList
            item-title={props.itemText}
            items={options.value}
            mandatory={props.mandatory}
            allow-duplicates={props.allowDuplicates}
            selectable
            multiple={props.multiple}
            vModel={selectedItem.value}
            scopedSlots={genListScopedSlots}
            {...{on: {'click:item': () => !props.multiple ? showOptions.value = false : null}}}
            dense>

        </GList>
      }


      //gen Text field
      function onInputKeyDown(e) {
        if(e.keyCode === keyCodes.down){
          context.root.$el.getElementsByClassName('g-list-item')[0].focus()
        }
      }
      function onChipCloseClick(index = null) {
        if (props.multiple) {
          selectedItem.value.splice(index, 1);
        } else {
          selectedItem.value = null
        }
      }
      const genMultiSelectionsSlot = () => {
        if (props.chips || props.allowDuplicates) {
          return selections.value.map((item, index) => <GChip small={props.smallChips}
                                                              close {...{on: {'close': () => onChipCloseClick(index)}}}>{item}
          </GChip>)
        }
        return selections.value.join(', ');
      }

      const genSingleSelectionSlot = () => {
        if (props.chips && selections.value) {
          return <GChip small={props.smallChips}
                        close {...{on: {'close': () => onChipCloseClick()}}}>{selections.value}</GChip>
        }
        return selections.value
      }
      const getTextFieldScopedSlots = {
        appendInner: ({iconColor}) =>
            <GIcon color={iconColor}>arrow_drop_down</GIcon>,
        inputSlot: ({inputErrStyles}) =>
            <div class="g-tf-input selections" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
              {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
            </div>
      }

      const textfieldValue = computed(() => {
        if (props.multiple) return selections.value.join(', ')
        return selections.value
      })
      const genTextField = props.genTextField || function (toggleContent) {
        function clearSelection() {
          selectedItem.value = props.multiple ? [] : ''
          state.searchText = ''
        }
        return (
            <GTextField {...{
              props: _.pick(props, ['filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                'rules', 'type', 'disabled', 'readOnly'])
            }}
                        {...{on: {'click:clearIcon': () => clearSelection()}}}
                        vOn:click={toggleContent}
                        vOn:keydown={(e) => onInputKeyDown(e)}
                        value={textfieldValue.value}
                        scopedSlots={getTextFieldScopedSlots}
            />
        )
      }

      function genMenu(showOptions) {
        const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')
        return <g-menu vModel={showOptions.value}
                       {...{props: props.menuProps}}
                       nudgeBottom={nudgeBottom.value}
                       scopedSlots={{
                         activator: ({toggleContent}) => genTextField(toggleContent, showOptions)
                       }}
        >
          <template slot="default">
            {genSearchTextField()}
            {context.slots['prepend-item'] && context.slots['prepend-item']()}
            {genList(showOptions)}
            {context.slots['append-item'] && context.slots['append-item']()}
          </template>
        </g-menu>
      }

      function genSelect() {
        return <div class={{"g-select ": true, 'g-select__active': showOptions.value}}>
          {genMenu(showOptions)}
        </div>
      }

      return {
        genSelect,
        options,
        state,
        selectedItem,
        selections,
      }
    },
    render() {
      return this.genSelect()
    }
  }
</script>
<style scoped lang="scss">
  .g-select::v-deep {
    .g-menu--activator {
      & {
        .g-tf-append__inner {
          transition: transform 0.4s
        }

        .input {
          display: flex;
        }

        input {
          flex-shrink: 1;
          flex-grow: 1;
          flex-basis: 0%;
        }


      }
    }
  }

  .g-select__active::v-deep {
    .g-icon {
      transform: rotateZ(180deg);
    }
  }

</style>
