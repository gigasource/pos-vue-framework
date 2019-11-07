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

  export default {
    name: "GSelect",
    components: {GList, GIcon, GChip, GTextField, GMenu},
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

      const genList = props.genList || function () {
        return <GList
            item-title={props.itemText}
            items={options.value}
            mandatory={props.mandatory}
            allow-duplicates={props.allowDuplicates}
            selectable
            multiple={props.multiple}
            vModel={selectedItem.value}
            {...{on: {'click:item': () => !props.multiple ? showOptions.value = false : null}}}
            dense>
        </GList>
      }

      const showOptions = ref(false)

      //gen Text field
      const genTextField = props.genTextField || function (toggleContent) {

        const iconStyle = computed(() => (showOptions.value) ? {'transform': 'rotateZ(180deg)'} : {})
        const textfieldValue = computed(() => {
          if (props.multiple) return selections.value.join(', ')
          return selections.value
        })

        function onChipCloseClick(index = null) {
          if (props.multiple) {
            selectedItem.value.splice(index, 1);
          } else {
            selectedItem.value = null
          }
        }

        const genMultiSelectionsSlot = () => {
          if (props.chips || props.allowDuplicates) {
            return selections.value.map((item, index) => <GChip
                close {...{on: {'click:close': () => onChipCloseClick(index)}}}>{item}
            </GChip>)
          }
          return selections.value.join(', ');
        }
        const genSingleSelectionSlot = () => {
          if (props.chips && selections.value) {
            return <GChip close {...{on: {'click:close': () => onChipCloseClick()}}}>{selections.value}</GChip>
          }
          return selections.value
        }


        const getTextFieldScopedSlots = {
          appendInner: ({isFocused}) =>
              <div class="dropDown" style={iconStyle.value}>
                <GIcon color={showOptions.value || isFocused ? 'blue' : null}>arrow_drop_down</GIcon>
              </div>,
          inputSlot: ({inputErrStyles}) =>
              <div class="tf-input" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
                {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
              </div>
        }

        function clearSelection() {
          selectedItem.value = props.multiple ? [] : ''
          state.searchText = ''
        }

        return (
            <GTextField {...{
              props: _.pick(props, ['filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                'rules', 'type'])
            }}
                        {...{on: {'click:clearIcon': () => clearSelection()}}}
                        vOn:click={toggleContent}
                        value={textfieldValue.value}
                        scopedSlots={getTextFieldScopedSlots}>
            </GTextField>
        )
      }

      function genMenu() {
        const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')
        return <g-menu vModel={showOptions.value}
                       {...{props: props.menuProps}}
                       nudgeBottom={nudgeBottom.value}
                       scopedSlots={{
                         activator: ({toggleContent}) => genTextField(toggleContent)
                       }}
        >
          <template slot="default">
            <slot name="prependItem"></slot>
            {genSearchTextField()}
            {genList()}
          </template>
        </g-menu>
      }

      function genSelect() {
        return <div class="g-select">
          {genMenu()}
        </div>
      }

      return {
        genSelect,
        genSearchTextField,
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
<style>
  .dropDown {
    transition: transform 0.4s;
  }

  .input {
    display: flex;
  }

  .g-tf-input {
    color: #1d1d1d;
    flex-wrap: wrap;
    width: auto;
    display: flex;
  }

  input {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
    cursor: pointer;
  }
</style>
