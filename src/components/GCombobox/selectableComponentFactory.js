import { getSelectionText, makeListSelectable2 } from '../GList/listSelectFactory';
import { computed, reactive, ref } from '@vue/composition-api'
import GMenu from '../GMenu/GMenu';
import GList from '../GList/GList';
import GTextField from '../GInput/GTextField';
import GIcon from '../GIcon/GIcon';
import GChip from '../GChip/GChip';
import { getInputEventHandlers } from './eventHandlersFactory';

export function SelectableComponent(props, context) {

  const { getText, getValue, listType, toggleItem, normalize } = makeListSelectable2(props, context)

  //menu content lazy by default, preload selectedValue
  const selectedValue = ref(props.value)
  //watch(() => props.value, () => selectedValue.value = props.value)

  const selectionTexts = getSelectionText(props, selectedValue, listType, getText, getValue)

  const lazySearch = ref('')

  const tfValue = computed(() => {
    if (props.component === 'select') return selectionTexts.value.join(', ')
    return (props.component !== 'select' && !(props.multiple || props.chips || props.smallChips || props.deletableChips)) ? selectionTexts.value.join('') : lazySearch.value

  })

  //for textField validation and state calculation in case textField doesn't have value itself
  const prependText = computed(() => {
    if (props.component === 'select') return ''
    return selectionTexts.value.join('')
  })

  const state = reactive({
    searchText: '',
    lastItemColor: '#1d1d1d',
    pressDeleteTimes: 0,
    isFocused: false,
    showOptions: false
  })

  const listSearchText = computed(() => {
    if (lazySearch.value === selectionTexts.value.join('')) return ''
    return lazySearch.value
  })


  const {
    onChipCloseClick,
    clearSelection,
    onInputKeyDown,
    onInputClick,
    onInputBlur,
    onInputDelete,
    onInputChange,
    inputAddSelection,

  } = getInputEventHandlers(props, context, state, selectedValue, lazySearch, listSearchText, toggleItem)

  const selectableList = ref(props.items)

  const genList = (state) => {
    const onClickItem = () => {
      state.showOptions = props.multiple
    }
    return <GList
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
          searchText: listSearchText.value,
          normalize: props.normalize,
        },
        on: {
          'click:item': onClickItem,
          input: e => {
            context.emit('input', e)
          },
          'update:selectedValue': e => {
            selectedValue.value = e
            context.emit('list update value')
          },
          'update:list': e => selectableList.value = e,
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
    if (!selectableList.value.length) return <div>
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
              style={{ 'color': state.lastItemColor, 'padding-right': '5px' }}>{item + ', '}</div>
          }
          return <div style={{ 'padding-right': '5px' }}>{item + ', '} </div>
        }
        //single in select
        else if (props.component === 'select') return selectionTexts.value.join('')
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


//todo: v-model textField
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
              prependValue: props.component === 'select' ? '' : prependText.value
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
    selectableList

  }
}
