<script>
  import GTextField from "../GInput/GTextField";
  import GMenu from "../GMenu/GMenu"
  import {makeSelectable} from "../../mixins/groupable";
  import {reactive, ref, computed, watch} from "@vue/composition-api";
  import {getList, getSelections} from "../GSelect/GSelectFactory";
  import GChip from "../GChip/GChip";
  import GIcon from "../GIcon/GIcon";
  import GList from "../GList/GList";
  import _ from "lodash"
  import {getLabel, getValidate} from "../GInput/GInputFactory";
  import GSelect from "../GSelect/GSelect";
  import GListItem from "../GList/GListItem";
  import {GListItemContent, GListItemText} from "../GList/GListFunctionalComponent";
  import {keyCodes} from "../../utils/helpers";

  export default {
    name: "GAutocomplete",
    components: {GSelect},
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
      filter: Function,
      noFilter: Boolean,
    },
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
            return item ? (item[props.itemText] || item[props.itemValue] || item) : ''
          })
        }
        return fieldItem.value ? fieldItem.value[props.itemText] || fieldItem.value[props.itemValue] || fieldItem.value : ''

      })
      const options = getList(props, selectedItem, state, props.filter)

      const lazySearch = ref('')

      //gen textfield
      function onChipCloseClick(index = null) {
        if (props.multiple) {
          selectedItem.value.splice(index, 1);
        } else {
          selectedItem.value = null
        }
      }

      const genMultiSelectionsSlot = () => {
        if (props.chips || props.smallChips || props.deletableChips || props.allowDuplicates) {
          return selections.value.map((item, index) => <GChip small={props.smallChips}
                                                              close={props.deletableChips}
                                                              vOn:close={() => onChipCloseClick(index)}>{item}
          </GChip>)
        }

        return selections.value.map(function (item, index) {
              if (index === selections.value.length - 1) return <div
                  style={{'color': lastItemColor.value, 'padding-right': '5px'}}>{item}</div>
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

      const selectionsText = computed(() => {
        return props.multiple ? selections.value.join('') : selections.value
      })
      //textfield logic, styles, classes computed
      const isValidInput = ref(true)
      const isFocused = ref(false);
      const validateText = computed(() => lazySearch.value || selectionsText.value || state.searchText)
      const {labelClasses, labelStyles, isDirty} = getLabel(context, props, validateText, isValidInput, isFocused, 'g-tf-label__active');
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})
      const {errorMessages} = getValidate(props, isFocused, validateText, isValidInput);

      //textfield events
      function clearSelection() {
        selectedItem.value = props.multiple ? [] : ''
        setSearch()
      }

      function onInputKeyDown(e) {
        resetSelectionsDisplay()
        if (e.keyCode === keyCodes.down) {
          const listRef = context.refs.select.$refs.list
          listRef.$el.getElementsByClassName('g-list-item')[0].focus()
        }
      }

      function onInputClick() {
        isFocused.value = true
        lazySearch.value ? state.searchText = '' : null
      }

      function onInputBlur() {
        isFocused.value = false
        resetSelectionsDisplay()
      }

        let pressDeleteTimes = 0
        const lastItemColor = ref('#1d1d1d')
        const resetSelectionsDisplay = () => {
          pressDeleteTimes = 0
          lastItemColor.value = '#1d1d1d'
        }

        function onInputDelete() {
          if (!props.multiple || props.chips) return
          if (state.searchText) return pressDeleteTimes = 0
          else {
            if (pressDeleteTimes === 0) {
              pressDeleteTimes++
              lastItemColor.value = '#1867c0 '
            }
            if (pressDeleteTimes === 1) {
              return pressDeleteTimes++
            }
            if (pressDeleteTimes === 2) {
              selectedItem.value.pop()
              return pressDeleteTimes
            }
          }
        }

      const tfValue = computed(() =>
          props.multiple || props.chips || props.smallChips || props.deletableChips ? state.searchText :
              lazySearch.value)

      //gen textfield function
      const genTextFieldProps = function (toggleContent) {
        //textfield slots
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
                    keydown: (e) => onInputKeyDown(e),
                    input: (e) => {
                      state.searchText = e
                    },
                  },
                  scopedSlots: textFieldScopedSlots
                }}
            />
        )
      }

      //gen list
      const showOptions = ref(false)
      const setSearch = () => {
        context.root.$nextTick(() => {
          if (!props.multiple && !props.chips) lazySearch.value = selections.value
          state.searchText = ''
        })
      }

      const genListProps = (showOptions, genListScopedSlots) => {
        const onClickItem = () => {
          setSearch()
          !props.multiple ? showOptions.value = false : null
        }
        return <GList
            {...{
              props: {
                items: options.value,
                'item-title': props.itemText,
                mandatory: props.mandatory,
                allowDuplicates: props.allowDuplicates,
                multiple: props.multiple,
                selectable: true,
                inMenu: true
              },
              on: {
                'click:item': onClickItem
              },
            }
            }
            vModel={selectedItem.value}
            ref="list"
        />
      }


      function genAutocomplete() {

        return <div class="g-autocomplete">
          <g-select
              {...{
                props: {
                  ..._.pick(props, ['width', 'filled', 'solo', 'outlined', 'flat', 'rounded',
                    'shaped', 'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label',
                    'prefix', 'suffix', 'rules', 'type', 'searchable', 'multiple', 'mandatory',
                    'allowDuplicates', 'menuProps', 'chips', 'items', 'itemText', 'itemValue', 'value',]
                  ),
                  showSearchField: false,
                  genTextFieldFn: genTextFieldProps,
                  genListFn: genListProps,
                },
              }}
              ref="select"
          >
          </g-select>
        </div>
      }

      return {
        genAutocomplete,
        state,
        options,
        showOptions,
        selectedItem,
        selections,
        lazySearch,
      }
    },
    render() {
      return this.genAutocomplete()
    }
  }
</script>
<style lang="scss" scoped>
  .g-menu--content {
   background-color: #00b0ff;
  }
  .g-autocomplete {


    .g-select ::v-deep {

      .g-menu--activator {

        span {
          margin: 3px
        }

        .g-tf-wrapper {
        }

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
</style>
