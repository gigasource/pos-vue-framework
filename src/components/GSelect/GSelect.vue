<script>
  import GTextField from "../GInput/GTextField";
  import GMenu from "../GMenu/GMenu"
  import {makeSelectable} from "../../mixins/groupable";
  import {reactive, ref, computed, toRefs} from "@vue/composition-api";
  import {genMenu, getList, getSelections} from "./GSelectFactory";
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
          filled: Boolean,
          solo: Boolean,
          outlined: Boolean,
          flat: Boolean,
          rounded: Boolean,
          shaped: Boolean
        },
        //textfield parts
        clearable: Boolean,
        hint: String,
        persistent: Boolean,
        counter: {
          type: [Boolean, Number, String],
          default: false
        },
        placeholder: String,
        label: String,
        prefix: String,
        suffix: String,
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
      chips: Boolean,
      smallChips: Boolean,
      deletableChips: Boolean,
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
      genTextFieldFn: Function,
      genListFn: Function,
      showSearchField: {
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
        }
        return fieldItem.value ? fieldItem.value['text'] || fieldItem.value['value'] || fieldItem.value : ''
      })

      //gen SearchText
      const searchFocused = ref(false)
      //todo: use ref to avoid query wrong element
      const onInputClick = () => {
        searchFocused.value = true
      }

      function genSearchTextField() {
        if (props.searchable && props.showSearchField) {
          return <GTextField placeholder="Search"
                             vModel={state.searchText}
                             clearable
                             ref="searchText"
                             autofocus={searchFocused.value}
                             vOn:keydown={(e) => onInputKeyDown(e)}
                             style="margin-bottom: 0; background-color: transparent"/>
        }
      }

      //genList
      const options = getList(props, selectedItem, state)
      const showOptions = ref(false)
      const onItem = () => {
        console.log('item clicked')
        showOptions.value = props.multiple
      }

      const genList = (typeof props.genListFn === 'function' && props.genListFn)
          || function (showOptions) {
            return <GList
                {...{
                  props: {
                    items: options.value,
                    'item-title': props.itemText,
                    mandatory: props.mandatory,
                    'allow-duplicates': props.allowDuplicates,
                    multiple: props.multiple,
                    inMenu: true,
                    selectable: true,
                  },
                  on: {
                    'click:item': () => onItem()
                  },
                }}
                vModel={selectedItem.value}
                ref="list"
            />
          }


      //gen Text field
      function onInputKeyDown(e) {
        if (e.keyCode === keyCodes.down) {
          context.refs.list.$el.getElementsByClassName('g-list-item')[0].focus()
        }
      }

      function onChipCloseClick(index = null) {
        if (props.multiple) {
          selectedItem.value.splice(index, 1);
        } else {
          selectedItem.value = null
        }
      }

      const deleteItemColor = ref('#1d1d1d')
      const genMultiSelectionsSlot = () => {
        if (props.chips || props.allowDuplicates) {
          return selections.value.map((item, index) => <GChip small={props.smallChips}
                                                              close={props.deletableChips}
                                                              vOn:close={() => onChipCloseClick(index)}>{item}
          </GChip>)
        }
        return selections.value.map(function (item, index) {
          if (index === selections.value.length - 1) return <div
              style={{'color': deleteItemColor.value, 'padding-right': '5px'}}>{item}</div>
          return <div style={{'padding-right': '5px'}}>{item + ', '} </div>
        })
      }

      const genSingleSelectionSlot = () => {
        if (props.chips && selections.value) {
          return <GChip small={props.smallChips}
                        close={props.deletableChips}
                        vOn:close={() => onChipCloseClick()}>{selections.value}</GChip>
        }
        return selections.value
      }
      const getTextFieldScopedSlots = {
        appendInner: ({iconColor}) =>
            <GIcon color={iconColor}>arrow_drop_down</GIcon>,
        inputSlot: ({inputErrStyles}) =>
            <div class="g-tf-input selections" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
              {selections.value.length === 0 ?
                  <div style="color : rgba(0, 0, 0, 0.32)">{props.placeholder}</div> : null}
              {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
            </div>
      }

      function clearSelection() {
        selectedItem.value = props.multiple ? [] : ''
        state.searchText = ''
      }

      const textfieldValue = computed(() => {
        if (props.multiple) return selections.value.join(', ')
        return selections.value
      })

      const genTextField = (typeof props.genTextFieldFn === 'function' && props.genTextFieldFn) || function (toggleContent) {
        return (
            <GTextField
                {...{
                  props: {
                    ..._.pick(props, ['filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                      'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                      'rules', 'type', 'disabled', 'readOnly']),
                    value: textfieldValue.value
                  },
                  on: {
                    'click:clearIcon': () => clearSelection(),
                    click: [toggleContent, onInputClick],
                    keydown: (e) => {
                      onInputKeyDown(e)
                    },
                  },
                  scopedSlots: {...getTextFieldScopedSlots}
                }}
            />
        )
      }

      //gen menu
      function genMenu(showOptions) {
        const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')
        return <g-menu vModel={showOptions.value}
                       {...{
                         props: {
                           ...props.menuProps,
                           nudgeBottom: nudgeBottom.value
                         },
                         scopedSlots: {
                           activator: ({toggleContent}) => genTextField(toggleContent, showOptions)
                         }
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
        showOptions
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
      span {
        margin: 3px
      }


      .g-tf-append__inner .g-icon:last-child {
        transition: transform 0.4s
      }

      .g-tf-input {
        display: flex;
      }

      .input {
        display: flex;
      }

      input {
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: 0;
      }

    }
  }

  .g-select__active::v-deep {
    .g-tf-append__inner .g-icon:last-child {
      transition: transform 0.4s;
      transform: rotateZ(180deg);
    }
  }

</style>
