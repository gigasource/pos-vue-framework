<script>
  import GTextField from "../GInput/GTextField";
  import GMenu from "../GMenu/GMenu"
  import {makeSelectable} from "../../mixins/groupable";
  import {reactive, ref, computed, watch} from "@vue/composition-api";
  import {getList, getSelections} from "./GSelectFactory";
  import GChip from "../GChip/GChip";
  import GIcon from "../GIcon/GIcon";
  import GList from "../GList/GList";
  import _ from "lodash"
  import {getLabel, getValidate} from "../GInput/GInputFactory";
  import GSelect from "./GSelect";
  import GListItem from "../GList/GListItem";
  import {GListItemContent, GListItemText} from "../GList/GListFunctionalComponent";

  export default {
    name: "GCombobox",
    components: {GSelect, GList, GIcon, GChip, GTextField, GMenu, GListItem, GListItemContent, GListItemText},
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
      genTextField: Function
    },
    setup: function (props, context) {
      const state = reactive({
        searchText: '',
        fieldItem: null
      })
      const lazySearch = ref('')
      //list selections
      const {internalValue: selectedItem, toggleItem} = makeSelectable(props, context)
      const fieldItem = getSelections(props, selectedItem)
      const selections = computed(() => {
        if (props.multiple) {
          return fieldItem.value.map(item => {
            return item ? (item[props.itemText] || item[props.itemValue] || item) : ''
          })
        } else {
          return fieldItem.value ? fieldItem.value[props.itemText] || fieldItem.value[props.itemValue] || fieldItem.value : ''
        }

      })
      const options = getList(props, selectedItem, state)

      const showOptions = ref(false)

      const iconStyle = computed(() => (showOptions.value) ? {'transform': 'rotateZ(180deg)'} : {})

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
              close vOn:close={() => onChipCloseClick(index)}>{item}
          </GChip>)
        }
        return selections.value.map(function (item, index) {
              if (index === selections.value.length - 1) return <div
                  style={{'color': deleteItemColor.value, 'padding-right': '5px'}}>{item}</div>
              return <div style={{'padding-right': '5px'}}>{item + ', '} </div>
            }
        )
      }
      const genSingleSelectionSlot = () => {
        if (props.chips && selections.value) {
          return <GChip small close vOn:close={() => onChipCloseClick()}>{selections.value}</GChip>
        }
      }

      function clearSelection() {
        selectedItem.value = props.multiple ? [] : ''
        state.searchText = ''
      }

      const textfieldValue = computed(() => {
        return props.multiple ? selections.value.join('') : selections.value
      })
      const isValidInput = ref(true)
      const isFocused = ref(false);
      const validateText = computed(() => lazySearch.value || textfieldValue.value)
      const {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef} = getLabel(context, props, validateText, isValidInput, isFocused, 'g-tf-label__active');
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})
      const {errorMessages, validate} = getValidate(props, isFocused, validateText, isValidInput);

      const addSelection = () => {
        toggleItem(state.searchText)
        props.chips || props.multiple ? state.searchText = '' : null

      }

      let pressTime = 0
      const deleteItemColor = ref('#1d1d1d')

      function onDelete() {
        if (!props.multiple || props.chips) return
        if (state.searchText) return pressTime = 0
        else {
          if (pressTime === 0) {
            pressTime++
            deleteItemColor.value = '#1867c0 '
          }
          if (pressTime === 1) {
            return pressTime++
          }
          if (pressTime === 2) {
            selectedItem.value.pop()
            return pressTime
          }
        }
      }

      function onArrowDown() {
        console.log(context.root.$el.getElementsByClassName('g-list'))
      }

      //gen Text field
      const genTextFieldProps = function (toggleContent) {
        function onInputClick() {
          isFocused.value = true
          showOptions.value = true
          state.searchText = ''
        }

        function onInputBlur() {
          isFocused.value = false
          pressTime = 0
          deleteItemColor.value = '#1d1d1d'
        }

        const getTextFieldScopedSlots = {
          appendInner: ({iconColor}) =>
              <GIcon color={iconColor}>arrow_drop_down</GIcon>,
          inputSlot: ({inputErrStyles}) =>
              <div class="g-tf-input" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
                {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
              </div>,
          label: () => <label htmlFor="input" class={["g-tf-label", labelClasses.value]}
                              style={labelStyles}>{props.label}</label>,
          inputMessage: () => [<div v-show={props.counter} class={{
            'g-tf-counter': true,
            'g-tf-counter__error': !isValidInput.value
          }}>{validateText.value.length}/{props.counter}</div>,
            isValidInput.value ? <div class={["g-tf-hint", hintClasses.value]}>{props.hint}</div>
                : <div class="g-tf-error">{errorMessages.value}</div>
          ]
        }

        return (
            <GTextField {...{
              props: _.pick(props, ['disabled', 'readOnly', 'filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                'rules', 'type'])
            }}
                        {...{on: {'click:clearIcon': () => clearSelection()}}}
                        vOn:focus={onInputClick}
                        vOn:blur={onInputBlur}
                        vOn:click={toggleContent}
                        vOn:enter={addSelection}
                        vOn:delete={onDelete}
                        vOn:arrowdown={onArrowDown}
                        vOn:input={(e) => {
                          state.searchText = e
                        }}
                        value={lazySearch.value}
                        scopedSlots={getTextFieldScopedSlots}>
            </GTextField>
        )
      }

      const genListScopedSlots = {
        listItem: ({item, isSelected, onSelect, onArrowDown, onArrowUp}) =>
            <GListItem tabindex="0" style={{'min-height': '48px'}} item={item} isSelected={isSelected}
                       vOn:singleItemClick={() => onSelect(item)}
            >
              <GListItemContent>
                <GListItemText>{item[props.itemText]}</GListItemText>
              </GListItemContent>
            </GListItem>

      }
      const setSearch = () => {

        context.root.$nextTick(() => {
          if (!props.multiple && !props.chips) {
            lazySearch.value = selections.value
          } else {
            lazySearch.value = ''
          }

        })
      }


      const genListProps = (showOptions) => {
        const onClickItem = () => {
          setSearch()
          !props.multiple ? showOptions.value = false : null
        }
        return <GList
            item-title={props.itemText}
            items={options.value}
            mandatory
            allow-duplicates={props.allowDuplicates}
            selectable
            multiple={props.multiple}
            vModel={selectedItem.value}
            scopedSlots={genListScopedSlots}
            {...{on: {'click:item': onClickItem}}}
            dense>
        </GList>
      }

      const genSelectSlots = computed(() => {
        return {
          'prepend-item': () =>
              <div vShow={options.value.length === 0}>
                {context.slots['no-data'] && context.slots['no-data']()}
              </div>
        }
      })

      function genCombobox() {
        return <div class="g-combobox">
          <g-select
              {...{
                props: _.pick(props, ['width', 'filled', 'solo', 'outlined', 'flat', 'rounded',
                  'shaped', 'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label',
                  'prefix', 'suffix', 'rules', 'type', 'searchable', 'multiple', 'mandatory',
                  'allowDuplicates', 'menuProps', 'chips', 'items', 'itemText', 'itemValue', 'value',]
                )
              }}
              selectOnly={false}
              scopedSlots={genSelectSlots.value}
              genTextField={genTextFieldProps}
              genList={genListProps}
          >
          </g-select>
        </div>
      }

      return {
        genCombobox,
        state,
        options,
        showOptions,
        selectedItem,
        selections,
        lazySearch,
        genSelectSlots,
      }
    },
    render() {
      return this.genCombobox()
    }
  }
</script>
<style lang="scss" scoped>
  .g-combobox {
    .g-select ::v-deep {
      .g-menu--activator {
        & {
          .g-tf-append__inner {
            transition: transform 0.4s;
          }

          .input {
            display: flex;
          }

          .g-tf-input {
            flex-wrap: wrap;
            width: auto;
            display: flex;
          }

          input {
            flex-shrink: 0;
            flex-basis: auto;
            cursor: text;
          }
        }
      }

    }

    .g-select__active ::v-deep {
      .g-tf-append__inner {
        transition: transform 0.4s;

        & {
          .g-icon {
            transform: rotateZ(180deg);
          }
        }
      }
    }
  }
</style>
