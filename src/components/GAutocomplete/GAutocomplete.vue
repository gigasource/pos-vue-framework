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
  import {
    genList,
    genTextFieldScopedSlot,
    getInputEventHandlers
  } from "./GAutocompleteFactory";

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
      const selectionsText = computed(() => {
        return props.multiple ? selections.value.join('') : selections.value
      })

      //textfield logic, styles, classes computed
      const isValidInput = ref(true)
      const isFocused = ref(false);
      const validateText = computed(() => lazySearch.value || selectionsText.value || state.searchText)
      const {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef} = getLabel(context, props, validateText, isValidInput, isFocused, 'g-tf-label__active');
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})
      const {errorMessages, validate} = getValidate(props, isFocused, validateText, isValidInput);


      let pressDeleteTimes = 0
      const lastItemColor = ref('#1d1d1d')

      //textfield events
      const {
        onChipCloseClick,
        clearSelection,
        onInputKeyDown,
        onInputClick,
        onInputBlur,
        onInputDelete
      } = getInputEventHandlers(props, context, state, selections, selectedItem, lazySearch, isFocused, pressDeleteTimes,lastItemColor)
      //textfield scoped slot
      const textFieldScopedSlots = genTextFieldScopedSlot(props, context, selections, onChipCloseClick, lastItemColor, isDirty, labelClasses, labelStyles, validateText, isValidInput, hintClasses, errorMessages, clearSelection)

      const tfValue = computed(() =>
          props.multiple || props.chips || props.smallChips || props.deletableChips ? state.searchText :
              lazySearch.value)

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
                  genListFn: () => genList(props, options, selectedItem, showOptions, context, lazySearch, selections, state),
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
