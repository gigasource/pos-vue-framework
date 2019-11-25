<script>
  import GTextField from "../GInput/GTextField";
  import GMenu from "../GMenu/GMenu"
  import {makeSelectable} from "../../mixins/groupable";
  import {reactive, ref, computed, watch} from "@vue/composition-api";

  import GChip from "../GChip/GChip";
  import GIcon from "../GIcon/GIcon";
  import GList from "../GList/GList";
  import _ from "lodash"
  import {getLabel, getValidate} from "../GInput/GInputFactory";
  import GSelect from "../GSelect/GSelect";
  import GListItem from "../GList/GListItem";
  import {GListItemContent, GListItemText} from "../GList/GListFunctionalComponent";
  import {keyCodes} from "../../utils/helpers";
  import {getList, getSelections} from "../GSelect/GSelectFactory";
  import { getInputEventHandlers, setSearch} from "../GAutocomplete/GAutocompleteFactory";

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
          filled: Boolean,
          solo: Boolean,
          outlined: Boolean,
          flat: Boolean,
          rounded: Boolean,
          shaped: Boolean,
          dense: Boolean
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
        appendIcon: String,
        prependIcon: String,
        prependInnerIcon: String,
        appendInnerIcon: String,
        clearIcon: {
          type: String,
          default: 'clear'
        },
        rules: Array,
        type: {
          type: String,
          default: 'text'
        }

      },

      //list props
      searchable: {
        type: Boolean,
        default: true
      },
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
      },
      value: null,
    },
    setup: function (props, context) {
      const state = reactive({
        searchText: '',
        fieldItem: null,
        lazySearch: '',
        lastItemColor: '#1d1d1d',
        pressDeleteTimes: 0,
      })


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

			//genList
      function genList(showOptions) {
        const onClickItem = () => {
          setSearch(props, context, selections, state)
          showOptions.value = props.multiple
        }
        return <GList
          {...{
            props: {
              items: options.value,
              'item-title': props.itemText,
              mandatory: true,
              allowDuplicates: props.allowDuplicates,
              multiple: props.multiple,
              selectable: true,
              inMenu: true,
              value: selectedItem.value,
            },
            on: {
              'click:item': onClickItem,
              input: e => selectedItem.value = e,
            },
          }
          }
          ref="list"
        />

      }

      //selections text
      const selectionsText = computed(() => {
        return props.multiple ? selections.value.join('') : selections.value
      })

      //textfield logic, styles, classes computed
      const isValidInput = ref(true)
      const isFocused = ref(false);
      const validateText = computed(() => state.lazySearch || selectionsText.value || state.searchText)
      const {labelClasses, labelStyles, isDirty} = getLabel(context, props, validateText, isValidInput, isFocused, 'g-tf-label__active');
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})
      const {errorMessages, validate} = getValidate(props, isFocused, validateText, isValidInput);

      //textfield event handlers
      const {
        onChipCloseClick,
        clearSelection,
        onInputKeyDown,
        onInputClick,
        onInputBlur,
        onInputDelete,
        inputAddSelection
      } = getInputEventHandlers(props, context, state, selections, selectedItem, isFocused, toggleItem)

      //textfield scoped slot
      const genMultiSelectionsSlot = () => {
        if (props.chips || props.smallChips || props.deletableChips || props.allowDuplicates) {
          return selections.value.map((item, index) => <GChip small={props.smallChips}
                                                              close={props.deletableChips}
                                                              vOn:close={() => onChipCloseClick(index)}>{item}
          </GChip>)
        }

        return selections.value.map(function (item, index) {
            if (index === selections.value.length - 1) return <div
              style={{'color': state.lastItemColor, 'padding-right': '5px'}}>{item}</div>
            return <div style={{'padding-right': '5px'}}>{item + ', '} </div>
          }
        )
      }
      const genSingleSelectionSlot = () => {
        if ((props.chips || props.smallChips || props.deletableChips) && selections.value) {
          return <GChip small={props.smallChips} close={props.deletableChips}
                        vOn:close={() => onChipCloseClick()}>{selections.value}</GChip>
        }
      }

      const textFieldScopedSlots = {
        clearableSlot: ({iconColor}) =>
          <GIcon vOn:click={clearSelection} vShow={isDirty.value && props.clearable}
                 color={iconColor}>{props.clearIcon}</GIcon>,
        appendInner: ({iconColor}) =>
          <GIcon color={iconColor}>arrow_drop_down</GIcon>,
        inputSlot: ({inputErrStyles}) =>
          <div class="g-tf-input" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
            {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
          </div>,
        label: () => <label for="input" class={["g-tf-label", labelClasses.value]}
                            style={labelStyles.value}>{props.label}</label>,
        inputMessage: () => [<div v-show={props.counter} class={{
          'g-tf-counter': true,
          'g-tf-counter__error': !isValidInput.value
        }}>{validateText.value.length}/{props.counter}</div>,
          isValidInput.value ? <div class={["g-tf-hint", hintClasses.value]}>{props.hint}</div>
            : <div class="g-tf-error">{errorMessages.value}</div>
        ]
      }
      //textfield value
      const tfValue = computed(() =>
          (props.multiple || props.chips || props.smallChips || props.deletableChips) ? state.searchText :
              state.lazySearch)

      //gen textfield function
      const genTextFieldProps = function (toggleContent) {
        return (
            <GTextField
                {...{
                  props: {
                    ..._.pick(props, ['disabled', 'readOnly', 'filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                      'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                      'rules', 'type', 'appendIcon', 'prependIcon', 'prependInnerIcon', 'appendInnerIcon', 'disabled', 'readOnly',]),
                    value: tfValue.value
                  },
                  on: {
                    'click:clearIcon': () => clearSelection(),
                    focus: () => onInputClick(),
                    blur: () => onInputBlur(),
                    click: toggleContent,
                    delete: onInputDelete,
                    enter: inputAddSelection,
                    keydown: (e) => onInputKeyDown(e),
                    input: (e) => state.searchText = e,
                  },
                  scopedSlots: textFieldScopedSlots
                }}
            />
        )
      }

      //gen Combobox

      function genCombobox() {
        const comboboxSlots = {
          'prepend-item': () =>
              <div vShow={options.value.length === 0}>
                {context.slots['no-data'] && context.slots['no-data']()}
              </div>
        }

        return <div class="g-combobox">
          <g-select ref="select"
                    {...{
                      props: {
                        ..._.pick(props, ['width', 'filled', 'solo', 'outlined', 'flat', 'rounded',
                          'shaped', 'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label',
                          'prefix', 'suffix', 'rules', 'type', 'searchable', 'multiple', 'mandatory',
                          'allowDuplicates', 'chips', 'items', 'itemText', 'itemValue', 'value',]
                        ),
                        showSearchField: false,
                        genTextFieldFn: genTextFieldProps,
                        genListFn: (showOptions) => genList(showOptions),
                      },
                      scopedSlots: {...comboboxSlots}
                    }}
          >
          </g-select>
        </div>
      }

      return {
        genCombobox,
        labelClasses,
        state,
        options,
        selectedItem,
        selections,
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
        span {
          margin: 3px
        }

        .g-tf-append__inner .g-icon:last-child {
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

    .g-select__active ::v-deep {
      .g-tf-append__inner .g-icon:last-child {
        transition: transform 0.4s;
        transform: rotateZ(180deg);
      }
    }
  }

</style>
