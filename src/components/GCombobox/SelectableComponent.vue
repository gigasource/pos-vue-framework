<script>
  import { getSelection2, getSelectionText, makeListSelectable } from '../GList/listSelectFactory';
  import { computed, reactive, ref } from '@vue/composition-api'
  import { getInputEventHandlers, setSearch } from '../GAutocomplete/GAutocompleteFactory';
  import GMenu from '../GMenu/GMenu';
  import GList from '../GList/GList';
  import { Fragment } from 'vue-fragment';

  export default {
    name: 'SelectableComponent',
    props: {
      component: String,
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
        default: () => ({
          closeOnClick: true,
          closeOnContentClick: false,
          maxHeight: 300,
          offsetY: true,
          offsetOverflow: true,
          top: false,
        })
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
        type: [String, Array, Function],
        default: 'text'
      },
      itemValue: {
        type: [String, Array, Function],
        default: 'value'
      },
      value: null,
      returnObject: Boolean,
      searchText: String,
      genContent: Function,
      genActivator: Function,

    },
    components: { GList, GMenu, Fragment },
    setup: function (props, context) {
      const { getText, getValue, listType, selectableList, toggleItem } = makeListSelectable(props, context)
      const selectedValue = ref(props.value)
      const formattedSelections = getSelection2(props, context, selectedValue, listType, getText, getValue)
      const selectionTexts = getSelectionText(props, selectedValue, listType, getText, getValue)

      const tfValue = computed(() => {
        if (props.component !== 'select') return (props.multiple || props.chips || props.smallChips || props.deletableChips
          || !selectionTexts.value) ?
          state.searchText : state.lazySearch
        return props.multiple ? selectionTexts.value.join(', ') : selectionTexts.value
      })

      const validateText = computed(() => {
        if (props.component === 'select') return ''
        let selectionString = props.multiple ? selectionTexts.value.join('') : selectionTexts.value
        return state.lazySearch || selectionString || state.searchText
      })

      const state = reactive({
        searchText: '',
        lazySearch: props.multiple ? selectionTexts.value.join() : selectionTexts.value,
        lastItemColor: '#1d1d1d',
        pressDeleteTimes: 0,
      })
      const showOptions = ref(false)
      const isFocused = ref(false);

      const {
        onChipCloseClick,
        clearSelection,
        onInputKeyDown,
        onInputClick,
        onInputBlur,
        onInputDelete,
        onInputChange,
        inputAddSelection,

      } = getInputEventHandlers(props, context, state, selectionTexts, selectedValue, isFocused, toggleItem, showOptions)

      const genList = (showOptions) => {
        const onClickItem = () => {
          setSearch(props, context, selectionTexts, state)
          showOptions.value = props.multiple
        }
        return [<GList
          {...{
            props: {
              inCombobox: props.component === 'combobox',
              items: props.items,
              itemText: props.itemText,
              itemValue: props.itemValue,
              returnObject: props.returnObject,
              mandatory: true,
              allowDuplicates: props.allowDuplicates,
              multiple: props.multiple,
              selectable: true,
              inMenu: true,
              value: props.value,
              searchText: state.searchText
            },
            on: {
              'click:item': onClickItem,
              input: e => {
                context.emit('input', e)
              },
              'update:selectedValue': e => selectedValue.value = e
            },
            scopedSlots: {
              content: () => context.slots.item ? context.slots.item() : null
            }
          }
          }
          ref="list"
        />]


      }
      const searchFocused = ref(false)
      const genSearchField = () => {
        return <GTextField placeholder="Search"
                           vOn:input={e => state.searchText = e}
                           value={state.searchText}
                           clearable
                           ref="searchText"
                           autofocus={searchFocused.value}
                           vOn:keydown={(e) => onInputKeyDown(e)}
                           style="margin-bottom: 0; background-color: transparent"
        />
      }

      function genNoDataSlot() {
        if (!selectableList.value.length) return <div>
          {context.slots['no-data'] && context.slots['no-data']()}
        </div>

      }

      const genMenuContent = (typeof props.genContent === 'function' && props.genContent) || function (showOptions) {
        return [
          props.component === 'select' && props.searchable ? genSearchField() : null,
          context.slots['prepend-item'] && context.slots['prepend-item'](),
          genNoDataSlot(),
          genList(showOptions),
          context.slots['append-item'] && context.slots['append-item']()
        ]
      }

      //genTextField
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
                style={{ 'color': state.lastItemColor, 'padding-right': '5px' }}>{item}</div>
            }
            return <div style={{ 'padding-right': '5px' }}>{item + ', '} </div>
          }
        )
      }
      const genSingleChipSlot = () => {
        if ((props.chips || props.smallChips || props.deletableChips) && selectionTexts.value) {
          return <GChip small={props.smallChips} close={props.deletableChips}
                        vOn:close={() => onChipCloseClick()}>{selectionTexts.value}</GChip>
        }
        if (props.component === 'select') return selectionTexts.value
      }
      const textFieldScopedSlots = {
        ...context.slots['append-inner'] && {
          'append-inner': ({ iconColor }) =>
            [<GIcon color={iconColor} class={['g-icon__arrow']}>arrow_drop_down</GIcon>,
              context.slots['append-inner'] && context.slots['append-inner']()]
        },
        ...context.slots['append-outer'] && { 'append-outer': () => context.slots['append-outer']() },
        'input-slot': () =>
          <template style={{ display: 'flex' }}>
            {props.multiple ? genMultiSelectionsSlot() : genSingleChipSlot()}
          </template>,
      }

      const genTextField = (typeof props.genActivator === 'function' && props.genActivator) ||
        function (toggleContent) {
          function inputClick() {
            searchFocused.value = true
          }

          return (
            <GTextField
              {...{
                props: {
                  ..._.pick(props, ['disabled', 'readOnly', 'filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped',
                    'clearable', 'hint', 'persistent', 'counter', 'placeholder', 'label', 'prefix', 'suffix',
                    'rules', 'type', 'appendIcon', 'prependIcon', 'prependInnerIcon', 'appendInnerIcon', 'disabled', 'readOnly','clearIconColor']),
                  value: tfValue.value,
                  prependValue: props.component === 'select' ? '' : validateText.value
                },
                on: {
                  'click:clearIcon': () => clearSelection(),
                  click: [toggleContent, inputClick],
                  focus: () => {onInputClick()},
                  blur: () => onInputBlur(),
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


      const defaultMenuProps = {
        closeOnClick: true,
        closeOnContentClick: false,
        maxHeight: 300,
        offsetY: true,
        offsetOverflow: true,
        top: false,
      }


      function genMenu(showOptions) {
        const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')
        return <g-menu {...{
          props: {
            ...Object.assign(defaultMenuProps, props.menuProps),
            nudgeBottom: nudgeBottom.value,
            value: showOptions.value,
            eager: props.eager,
          },
          scopedSlots: {
            activator: ({ toggleContent }) => genTextField(toggleContent),
            default: () => genMenuContent(showOptions)
          },
          on: {
            input: (e) => isFocused.value ? showOptions.value = true : showOptions.value = e,
          },

        }} ref='menu'
        />

      }

      function genComponent() {
        console.log('gen component')
        let activeClass = props.component + '__active'
        return <div class={[props.component, { [activeClass]: showOptions.value }]}>
          {genMenu(showOptions)}
        </div>
      }

      return {
        genComponent,
        selectedValue,
        formattedSelections,
        selectionTexts,
        state,
        listType,
        showOptions,
        isFocused,
				validateText

      }
    },
    render() {
      return this.genComponent()
    }
  }
</script>
<style scoped>
</style>
