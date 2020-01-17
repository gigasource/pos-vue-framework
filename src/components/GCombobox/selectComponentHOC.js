import GMenu from '../GMenu/GMenu';
import { getSelectionText, makeListSelectable2 } from '../GList/listSelectFactory';
import { computed, reactive, ref } from '@vue/composition-api';
import { getInputEventHandlers, getListEventHandlers } from './eventHandlersFactory';
import GTextField from '../GInput/GTextField';
import GChip from '../GChip/GChip';
import GIcon from '../GIcon/GIcon';
import GListDisplay from '../GList/GListDisplay';

const componentsFactory = (component, componentName) => {
  return {
    name: `${componentName}`,
    props: {
      component: {
        type: String,
        default: component
      },
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
        default: false
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
      normalize: Function,
    },
    components: { GListDisplay, GMenu },
    setup: function (props, context) {
      const {
        getText,
        getValue,
        listType,
        selectableValues,
        normalizedValue: selectedValue,
        toggleItem,
        addValueFromInput,
        searchFn,
        isActiveItem
      } = makeListSelectable2(props, context)

      const lazySearch = ref('')
      const selectionTexts = getSelectionText(props, selectedValue, listType, getText, getValue)

      const tfValue = computed(() => {
        if (props.component === 'select') return selectionTexts.value.join(', ')
        return (props.component !== 'select' && !(props.multiple || props.chips || props.smallChips || props.deletableChips)) ? selectionTexts.value.join('') : lazySearch.value

      })

      //for textField validation and state calculation in case textField doesn't have value itself
      const prependText = computed(() => {
        return selectionTexts.value.join('')
      })

      const state = reactive({
        searchText: '',
        lastItemColor: '#1d1d1d',
        pressDeleteTimes: 0,
        isFocused: false,
        showOptions: false
      })


      //gen List
      const listSearchText = computed(() => {
        if (lazySearch.value === selectionTexts.value.join('')) return ''
        return lazySearch.value
      })
      const renderList = computed(() => {
        return searchFn(listSearchText.value, selectableValues.value)
      })

      const addActiveClass = () => {
        renderList.value.map((item, index) => {
          let listRef = context.refs['menu'].$refs['list']
          let domItem = listRef && listRef.$el.getElementsByClassName('g-list-item')[index]
          isActiveItem(item)
            ? context.root.$nextTick(() => domItem && domItem.classList.add('g-list-item__active'))
            : context.root.$nextTick(() => domItem && domItem.classList.remove('g-list-item__active'))
        })
      }


      const genList = (state) => {
        const onClickItem = (e) => {
          state.showOptions = props.multiple
          toggleItem(e)
        }
        addActiveClass()

        const { onListArrowDown, onListArrowUp } = getListEventHandlers(renderList.value, context)
        return <GListDisplay
          {...{
            props: {
              items: renderList.value,
              itemText: props.itemText,
              inMenu: true,
            },
            on: {
              'click:item': e => onClickItem(e),
              'keydown:down': e => onListArrowDown(e),
              'keydown:up': e => onListArrowUp(e),
              'keydown:enter': e => onClickItem(e)
            },
            scopedSlots: {
              content: () => context.slots.item ? context.slots.item() : null,
              prepend: ({ isSelected, item }) => context.slots.itemPrepend && context.slots.itemPrepend({ isSelected, item }),
            }
          }
          }
          ref="list"
        />
      }

      //gen TextField
      const {
        onChipCloseClick,
        clearSelection,
        onInputKeyDown,
        onInputClick,
        onInputBlur,
        onInputDelete,
        onInputChange,
        inputAddSelection,

      } = getInputEventHandlers(props, context, state, selectedValue, lazySearch, listSearchText, addValueFromInput)

      const searchFocused = ref(false)
      const genSearchField = () => {
        return <GTextField placeholder="Search"
                           vOn:input={e => lazySearch.value = e}
                           value={listSearchText.value}
                           clearable
                           ref="searchText"
                           autofocus={searchFocused.value}
                           vOn:keydown={onInputKeyDown}
                           style="margin-bottom: 0; background-color: transparent"
        />
      }

      function genNoDataSlot() {
        if (!renderList.value.length) return <div>
          {context.slots['no-data'] && context.slots['no-data']()}
        </div>

      }

      const genMenuContent = (typeof props.genContent === 'function' && props.genContent) || function (state) {
        return [
          props.component === 'select' && props.searchable ? genSearchField() : null,
          context.slots['prepend-item'] && context.slots['prepend-item'](),
          genNoDataSlot(),
          genList(state),
          context.slots['append-item'] && context.slots['append-item']()
        ]
      }

      //genTextField
      const genSelectionSlot = () => {
        return selectionTexts.value.map((item, index) => {
            //chips
            if (props.chips || props.smallChips || props.deletableChips || props.allowDuplicates) return <GChip small={props.smallChips}
                                                                                                                close={props.deletableChips}
                                                                                                                vOn:close={() => onChipCloseClick(index)}>{item}
            </GChip>
            //multiple in 3 component no chips
            else if (props.multiple) {
              if (index === selectionTexts.value.length - 1) {
                if (props.component === 'select') return <div
                  style={{ 'color': state.lastItemColor, 'padding-right': '5px' }}>{item}</div>
                return <div
                  style={{ 'color': state.lastItemColor, 'padding-right': '5px' }}>{item}</div>
              }
              return <div style={{ 'padding-right': '5px' }}>{item + ', '} </div>
            }
            //single in select
            else if (props.component === 'select') return selectionTexts.value.join('')
            else return null
          }
        )


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
            {genSelectionSlot()}
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
                    'rules', 'type', 'appendIcon', 'prependIcon', 'prependInnerIcon', 'appendInnerIcon', 'disabled', 'readOnly', 'clearIconColor']),
                  value: tfValue.value,
                  prependValue: prependText.value
                },
                on: {
                  'click:clearIcon': clearSelection,
                  click: [toggleContent, inputClick],
                  focus: onInputClick,
                  blur: onInputBlur,
                  delete: onInputDelete,
                  enter: inputAddSelection,
                  keydown: onInputKeyDown,
                  input: onInputChange,
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


      function genMenu(state) {
        const nudgeBottom = computed(() => !!props.hint ? '22px' : '2px')
        return <GMenu {...{
          props: {
            ...Object.assign(defaultMenuProps, props.menuProps),
            nudgeBottom: nudgeBottom.value,
            value: state.showOptions,
            eager: props.eager,
          },
          scopedSlots: {
            activator: ({ toggleContent }) => genTextField(toggleContent),
            default: () => genMenuContent(state)
          },
          on: {
            input: (e) => state.showOptions = state.isFocused ? true : e,
          },

        }} ref='menu'
        />

      }

      function genComponent() {
        return <div class={[props.component, { [`${props.component}__active`]: state.showOptions }]}>
          {genMenu(state)}
        </div>
      }

      return {
        genComponent,
        selectedValue,
        selectionTexts,
        listType,
        prependText,
        tfValue,
        lazySearch,
        listSearchText,
        state,
        renderList,
      }
    },
    render() {
      return this.genComponent()
    }
  }
}
export default componentsFactory

