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

  export default {
    name: "GCombobox",
    components: {GSelect, GList, GIcon, GChip, GTextField, GMenu},
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
    // setup: function (props, context) {
    //   const state = reactive({
    //     searchText: '',
    //     fieldItem: null
    //   })
    //   //list selections
    //   const {internalValue: selectedItem, toggleItem} = makeSelectable(props, context)
    //   const fieldItem = getSelections(props, selectedItem)
    //   const selections = computed(() => {
    //     if (props.multiple) {
    //       return fieldItem.value.map(item => {
    //         return item ? (item['text'] || item['value'] || item) : ''
    //       })
    //     } else {
    //       return fieldItem.value ? fieldItem.value['text'] || fieldItem.value['value'] || fieldItem.value : ''
    //     }
    //
    //   })
    //
    //   //gen SearchText
    //   function genSearchTextField() {
    //     if (props.searchable) {
    //       return <GTextField placeholder="Search"
    //                          vModel={state.searchText}
    //                          clearable
    //                          style="margin-bottom: 0; background-color: transparent"/>
    //     }
    //   }
    //
    //   //genList
    //   const options = getList(props, selectedItem, state)
    //   const setSearch = () => {
    //     context.root.$nextTick(() => {
    //       if (props.multiple || props.chips) {
    //         state.searchText = ''
    //       } else {
    //         state.searchText = selections.value
    //       }
    //     })
    //   }
    //   const onClickItem = () => {
    //     setSearch()
    //     !props.multiple ? showOptions.value = false : null
    //   }
    //
    //   const genList = () => {
    //     return <GList
    //         item-title={props.itemText}
    //         items={options.value}
    //         mandatory={props.mandatory}
    //         allow-duplicates={props.allowDuplicates}
    //         selectable
    //         multiple={props.multiple}
    //         vModel={selectedItem.value}
    //         {...{on: {'click:item': onClickItem}}}
    //         dense>
    //     </GList>
    //   }
    //
    //
    //   //gen textfield
    //   const showOptions = ref(false)
    //
    //   const iconStyle = computed(() => (showOptions.value) ? {'transform': 'rotateZ(180deg)'} : {})
    //
    //   function onChipCloseClick(index = null) {
    //     if (props.multiple) {
    //       selectedItem.value.splice(index, 1);
    //     } else {
    //       selectedItem.value = null
    //     }
    //   }
    //
    //   const genMultiSelectionsSlot = () => {
    //     if (props.chips || props.allowDuplicates) {
    //       return selections.value.map((item, index) => <GChip
    //           close vOn:close={() => onChipCloseClick(index)}>{item}
    //       </GChip>)
    //     }
    //     return selections.value.map(function (item, index) {
    //           if (index === selections.value.length - 1) return <div style={{'color': deleteItemColor.value, 'padding-right': '5px'}}>{item}</div>
    //           return <div style={{'padding-right': '5px'}}>{item + ', '} </div>
    //         }
    //     )
    //   }
    //   const genSingleSelectionSlot = () => {
    //     if (props.chips && selections.value) {
    //       return <GChip small close vOn:close={() => onChipCloseClick()}>{selections.value}</GChip>
    //     }
    //     return null
    //   }
    //
    //   function clearSelection() {
    //     selectedItem.value = props.multiple ? [] : ''
    //     state.searchText = ''
    //   }
    //
    //   const textfieldValue = computed(() => {
    //     return props.multiple ? selections.value.join('') : selections.value
    //   })
    //   const isValidInput = ref(true)
    //   const isFocused = ref(false);
    //   const validateText = computed(() => state.searchText || textfieldValue.value)
    //   const {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef} = getLabel(context, props, validateText, isValidInput, isFocused, 'g-tf-label__active');
    //   const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})
    //   const {errorMessages, validate} = getValidate(props, isFocused, validateText, isValidInput);
    //
    //   const addSelection = () => {
    //     toggleItem(state.searchText)
    //     props.chips || props.multiple ? state.searchText = '' : null
    //
    //   }
    //
    //   let pressTime = 0
    //   const deleteItemColor = ref('#1d1d1d')
    //   function onDelete() {
    //     if (!props.multiple || props.chips) return
    //     if (state.searchText) return pressTime = 0
    //     else {
    //       if (pressTime === 0) {
    //         pressTime++
    //         deleteItemColor.value = '#1867c0 '
    //       }
    //       if (pressTime === 1) {
    //         return pressTime++
    //       }
    //       if (pressTime === 2) {
    //         selectedItem.value.pop()
    //         return pressTime
    //       }
    //     }
    //   }
    //   //gen Text field
    //   const genTextField = props.genTextField || function (toggleContent) {
    //     function onInputClick() {
    //       isFocused.value = true
    //     }
    //
    //     function onInputBlur() {
    //       isFocused.value = false
    //       pressTime = 0
    //       deleteItemColor.value = '#1d1d1d'
    //     }
    //
    //     const getTextFieldScopedSlots = {
    //       appendInner: ({isFocused}) =>
    //           <div class="dropDown" style={iconStyle.value}>
    //             <GIcon color={showOptions.value || isFocused ? 'blue' : null}>arrow_drop_down</GIcon>
    //           </div>,
    //       inputSlot: ({inputErrStyles}) =>
    //           <div class="g-tf-input" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
    //             {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
    //           </div>,
    //       label: () => <label htmlFor="input" class={["g-tf-label", labelClasses.value]}
    //                           style={labelStyles}>{props.label}</label>,
    //       inputMessage: () => [<div v-show={props.counter} class={{
    //         'g-tf-counter': true,
    //         'g-tf-counter__error': !isValidInput.value
    //       }}>{validateText.value.length}/{props.counter}</div>,
    //         isValidInput.value ? <div class={["g-tf-hint", hintClasses.value]}>{props.hint}</div>
    //             : <div class="g-tf-error">{errorMessages.value}</div>
    //       ]
    //     }
    //
    //     return (
    //         <GTextField {...{
    //           props: _.pick(props, ['filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
    //             'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
    //             'rules', 'type'])
    //         }}
    //                     {...{on: {'click:clearIcon': () => clearSelection()}}}
    //                     vOn:focus={onInputClick}
    //                     vOn:blur={onInputBlur}
    //                     vOn:click={toggleContent}
    //                     vOn:change={addSelection}
    //                     vOn:delete={onDelete}
    //                     vModel={state.searchText}
    //                     scopedSlots={getTextFieldScopedSlots}>
    //         </GTextField>
    //     )
    //   }
    //
    //   function genMenu() {
    //     const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')
    //     return <g-menu vModel={showOptions.value}
    //                    {...{props: props.menuProps}}
    //                    nudgeBottom={nudgeBottom.value}
    //                    scopedSlots={{
    //                      activator: ({toggleContent}) => genTextField(toggleContent)
    //                    }}
    //     >
    //       <template slot="default">
    //         <slot name="prependItem"></slot>
    //         {genList()}
    //       </template>
    //     </g-menu>
    //   }
    //
    //   function genCombobox() {
    //     return <div class="g-combobox">
    //       {genMenu()}
    //     </div>
    //   }
    //
    //   return {
    //     genCombobox,
    //     genSearchTextField,
    //     options,
    //     state,
    //     selectedItem,
    //     selections,
    //     showOptions,
    //   }
    // },
    setup: function (props, context) {
      const state = reactive({
        searchText: '',
        fieldItem: null
      })
      //list selections
      const {internalValue: selectedItem, toggleItem} = makeSelectable(props, context)
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
      const validateText = computed(() => state.searchText || textfieldValue.value)
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

      //gen Text field
      const genTextFieldProps =function (toggleContent) {
        function onInputClick() {
          isFocused.value = true
        }

        function onInputBlur() {
          isFocused.value = false
          pressTime = 0
          deleteItemColor.value = '#1d1d1d'
        }

        const getTextFieldScopedSlots = {
          appendInner: ({isFocused}) =>
              <div class="dropDown" style={iconStyle.value}>
                <GIcon color={showOptions.value || isFocused ? 'blue' : null}>arrow_drop_down</GIcon>
              </div>,
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
              props: _.pick(props, ['filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                'rules', 'type'])
            }}
                        {...{on: {'click:clearIcon': () => clearSelection()}}}
                        vOn:focus={onInputClick}
                        vOn:blur={onInputBlur}
                        vOn:click={toggleContent}
                        vOn:change={addSelection}
                        vOn:delete={onDelete}
                        vModel={state.searchText}
                        scopedSlots={getTextFieldScopedSlots}>
            </GTextField>
        )
      }
      const setSearch = () => {
        context.root.$nextTick(() => {
          if (props.multiple || props.chips) {
            state.searchText = ''
          } else {
            state.searchText = selections.value
          }
        })
      }
      const onClickItem = () => {
        setSearch()
        !props.multiple ? showOptions.value = false : null
      }
      const genListProps = () => {
        return <GList
            item-title={props.itemText}
            items={options.value}
            mandatory={props.mandatory}
            allow-duplicates={props.allowDuplicates}
            selectable
            multiple={props.multiple}
            vModel={selectedItem.value}
            {...{on: {'click:item': onClickItem}}}
            dense>
        </GList>
      }
      function genCombobox() {
        return <div class="g-combobox">
          <g-select
              {...{
                props: _.pick(props, ['width', 'filled', 'solo', 'outlined', 'flat', 'rounded',
                  'shaped', 'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label',
                  'prefix', 'suffix', 'rules', 'type', 'searchable', 'multiple', 'mandatory',
                  'allowDuplicates', 'menuProps', 'chips','items', 'itemText', 'itemValue', 'value',]
                )
              }}
              selectOnly={false}
              genTextField={genTextFieldProps}
              genList={genListProps}
          >

          </g-select>
        </div>
      }

      return {genCombobox}
    },
    render() {
      return this.genCombobox()
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
    flex-shrink: 0;
    flex-basis: auto;
    cursor: text;
  }
</style>
