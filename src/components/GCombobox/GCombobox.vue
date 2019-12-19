<script>
  import GTextField from '../GInput/GTextField';
  import GMenu from '../GMenu/GMenu'
  import { computed, reactive, ref, watch } from '@vue/composition-api';
  import GChip from '../GChip/GChip';
  import GIcon from '../GIcon/GIcon';
  import GList from '../GList/GList';
  import _ from 'lodash'
  import { getLabel, getValidate } from '../GInput/GInputFactory';
  import GSelect from '../GSelect/GSelect';
  import GListItem from '../GList/GListItem';
  import { GListItemContent, GListItemText } from '../GList/GListFunctionalComponent';
  import { getList, getSelectionsForCombobox } from '../GSelect/GSelectFactory';
  import { getInputEventHandlers, setSearch } from '../GAutocomplete/GAutocompleteFactory';
  import { makeCombobox } from '../GList/groupableForList';
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'GCombobox',
    components: {GSelect, GList, GIcon, GChip, GTextField, GMenu, GListItem, GListItemContent, GListItemText, Fragment},
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
        clearIconColor: String,
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
      allowDuplicates: Boolean,
      //menu props
      menuProps: {
        type: Object,
        default: () => ({})
      },
      eager: Boolean,
      //item textfieldValue props
      chips: Boolean,
      smallChips: Boolean,
      deletableChips: Boolean,
      items: {
        type: Array,
        default: () => []
      },
      itemText: {
        type: String,
        default: 'text'
      },
      itemValue: {
        type: String,
      },
      value: null,
      returnObject: Boolean,
      searchText: String,
    },
    setup: function (props, context) {

      //list selections
      const {internalValue: selectedItem, toggleItem} = makeCombobox(props, context)
      const fieldItem = ref(null)
      watch([() => props.items, () => selectedItem.value], () => fieldItem.value = getSelectionsForCombobox(props, selectedItem))
      const selectionTexts = computed(() => {
        if (props.multiple) {
          return fieldItem.value.map(item => {
            return (item || item === 0) ? (item['text'] || item['value'] || (typeof item !== 'object' && item)) : ''
          })
        } else {
          return (fieldItem.value || fieldItem.value === 0) ? fieldItem.value['text'] || fieldItem.value['value'] || (typeof fieldItem.value !== 'object' && fieldItem.value) : ''
        }

      })
      const state = reactive({
        searchText: '',
        lazySearch: props.multiple ? selectionTexts.value.join() : selectionTexts.value,
        lastItemColor: '#1d1d1d',
        pressDeleteTimes: 0,
      })
      watch(() => {
        state.lazySearch = props.multiple ? selectionTexts.value.join() : selectionTexts.value
      })
      const options = getList(props, selectedItem, state)

      //genList
      const isFocused = ref(false);
      const showOptions = ref(false)

      function genList(showOptions) {
        const onClickItem = () => {
          setSearch(props, context, selectionTexts, state)
          showOptions.value = props.multiple
        }
        return <GList
          {...{
            props: {
              items: options.value,
              itemText: props.itemText,
              itemValue: props.itemValue,
              returnObject: props.returnObject,
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
      const selectionsString = computed(() => {
        return props.multiple ? selectionTexts.value.join('') : selectionTexts.value
      })

      //textfield logic, styles, classes computed
      const isValidInput = ref(true)

      const validateText = computed(() => state.lazySearch || selectionsString.value || state.searchText)
      const {labelClasses, labelStyles, isDirty} = getLabel(context, props, validateText, isValidInput, isFocused, 'g-tf-label__active');
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})
      const {errorMessages} = getValidate(props, isFocused, validateText, isValidInput);
      const tfValue = computed(() => {
        return (props.multiple || props.chips || props.smallChips || props.deletableChips
            || (!selectionTexts.value && selectionTexts.value !== 0)) ?
            state.searchText : state.lazySearch
      })

      //textfield event handlers
      const {
        onChipCloseClick,
        clearSelection,
        onInputKeyDown,
        onInputClick,
        onInputBlur,
        onInputDelete,
        onInputChange,
        inputAddSelection
      } = getInputEventHandlers(props, context, state, selectionTexts, selectedItem, isFocused, toggleItem)

      //textfield scoped slot
      const genMultiSelectionsSlot = () => {
        if (props.chips || props.smallChips || props.deletableChips || props.allowDuplicates) {
          return selectionTexts.value.map((item, index) => <GChip small={props.smallChips}
                                                                  close={props.deletableChips}
                                                                  vOn:close={() => onChipCloseClick(index)}>{item}
          </GChip>)
        }

        return selectionTexts.value.map(function (item, index) {
              if (index === selectionTexts.value.length - 1) {
                return <div
                    style={{'color': state.lastItemColor, 'padding-right': '5px'}}>{item}</div>
              }
              return <div style={{'padding-right': '5px'}}>{item + ', '} </div>
            }
        )
      }
      const genSingleChipSlot = () => {
        if ((props.chips || props.smallChips || props.deletableChips) && selectionTexts.value) {
          return <GChip small={props.smallChips} close={props.deletableChips}
                        vOn:close={() => onChipCloseClick()}>{selectionTexts.value}</GChip>
        }
      }

      const textFieldScopedSlots = {
        'clearable-slot': ({iconColor}) =>
            <GIcon vOn:click={clearSelection} vShow={isDirty.value && props.clearable} class={['g-icon__clear']}
                   color={props.clearIconColor || iconColor}>{props.clearIcon}</GIcon>,
        'append-inner': ({iconColor}) =>
            [<GIcon color={iconColor}>arrow_drop_down</GIcon>,
              context.slots['append-inner'] && context.slots['append-inner']()],
        'append-outer': () => context.slots['append-outer'] && context.slots['append-outer'](),
        'input-slot': ({inputErrStyles}) =>
            <Fragment>
              {props.multiple ? genMultiSelectionsSlot() : genSingleChipSlot()}
            </Fragment>,
        label: () => <label for="input" class={['g-tf-label', labelClasses.value]}
                            style={labelStyles.value}>{props.label}</label>,
        ['input-message']: () => [<div v-show={props.counter} class={{
          'g-tf-counter': true,
          'g-tf-counter__error': !isValidInput.value
        }}>{validateText.value.length}/{props.counter}</div>,
          isValidInput.value ? <div class={['g-tf-hint', hintClasses.value]}>{props.hint}</div>
              : <div class="g-tf-error">{errorMessages.value}</div>
        ]
      }
      //textfield value


      //gen textfield function
      const genTextFieldProps = function () {
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
                    click: () => {
                      showOptions.value = true
                    },
                    delete: onInputDelete,
                    enter: inputAddSelection,
                    keydown: (e) => onInputKeyDown(e),
                    input: (e) => onInputChange(e),
                  },
                  scopedSlots: textFieldScopedSlots
                }}
            />
        )
      }

      //gen menu
      function genMenu(showOptions) {
        const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')

        const defaultMenuProps = {
          closeOnClick: true,
          closeOnContentClick: false,
          maxHeight: 300,
          offsetY: true,
          offsetOverflow: true,
          top: false,
        }

        return <g-menu {...{
          props: {
            ...Object.assign(defaultMenuProps, props.menuProps),
            nudgeBottom: nudgeBottom.value,
            value: showOptions.value,
            eager: props.eager,
          },
          scopedSlots: {
            activator: () => genTextFieldProps()
          },
          on: {
            input: (e) => isFocused.value ? showOptions.value = true : showOptions.value = e,
          }
        }}
        >
          <template slot="default">
            <div vShow={options.value && !options.value.length}>
              {context.slots['no-data'] && context.slots['no-data']()}
            </div>
            {genList(showOptions)}
          </template>
        </g-menu>
      }

      //gen Combobox

      function genCombobox() {
        return <div class={{"g-combobox ": true, 'g-combobox__active': showOptions.value}}>
          {genMenu(showOptions)}
        </div>
      }

      return {
        genCombobox,
        state,
        options,
        selectedItem,
        selectionTexts,
        fieldItem,
        tfValue,
        isFocused,
        showOptions
      }
    },
    render() {
      return this.genCombobox()
    }
  }
</script>
<style lang="scss" scoped>
  .g-combobox ::v-deep {
    span {
      margin: 3px
    }

    .g-tf-append__inner .g-icon:last-child {
      transition: transform 0.4s;
    }

    .input {
      display: flex;
      flex-wrap: wrap;
    }

    .g-tf-input {
      flex-wrap: wrap;
      display: flex;
      flex: 1;
    }

    input {
      flex-shrink: 0;
      flex-basis: auto;
      cursor: text;
    }
  }

  .g-combobox__active {
    ::v-deep .g-tf-append__inner .g-icon:last-child {
      transition: transform 0.4s;
      transform: rotateZ(180deg);
    }
  }
</style>
