import GMenu from '../GMenu/GMenu';
import { getCurrentInstance, nextTick, resolveComponent } from 'vue'
import { getSelectionText, makeListSelectable, emitEvents as listEmitEvents } from '../GList/listSelectFactory';
import { computed, reactive, ref } from 'vue';
import { getInputEventHandlers, emitEvents as eventHandlerEmitEvents } from './eventHandlersFactory';
import GTextField from '../GInput/GTextField';
import GTextFieldBs from '../GInput/GTextFieldBs';
import GChip from '../GChip/GChip';
import GIcon from '../GIcon/GIcon';
import GList from '../GList/GList';
import textValueFactory, { emitEvents as textEmitEvents } from './textValueFactory';
import _ from 'lodash';
import { getScopeIdRender } from '../../utils/helpers';

const componentsFactory = (component, componentName) => {
  return {
    name: `${componentName}`,
    props: {
      required: Boolean,
      component: {
        type: String,
        default: component
      },
      //select props
      width: [String, Number],
      //text field's props
      ...{
        disabled: Boolean,
        readOnly: Boolean,
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
        arrow: {
          type: Boolean,
          default: true
        },
        arrowIcon: {
          type: String,
          default: 'arrow_drop_down'
        },
        arrowIconColor: String,
        rules: Array,
        type: {
          type: String,
          default: 'text'
        },
        textFieldComponent: String,
        textFieldClass: [Array, String]
      },

      //list props
      searchable: {
        type: Boolean,
        default: false
      },
      skipSearch: Boolean,
      multiple: Boolean,
      allowDuplicates: Boolean,
      mandatory: {
        type: Boolean,
        default: true
      },
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
          contentFillWidth: true,
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
      modelValue: null,
      returnObject: Boolean,
      searchText: String,
      genContent: Function,
      genActivator: Function,
      normalize: Function,
      keepMenuOnBlur: Boolean,
      menuClass: String,
      virtualEvent: Boolean,
      filter: Function
    },
    emits: _.union(eventHandlerEmitEvents, textEmitEvents, listEmitEvents, ['input-click']),
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
        isActiveItem,
        unNormalize
      } = makeListSelectable(props, context)
      const currentInstance = getCurrentInstance()

      const selectionTexts = getSelectionText(props, selectedValue, listType, getText, getValue)

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

      const {
        tfValue,
        updateValue,
        searchText: lazySearch
      } = textValueFactory(props, context, selectionTexts, addValueFromInput)

      //gen List
      const listSearchText = computed(() => {
        if (lazySearch.value === selectionTexts.value.join('')) return ''
        return lazySearch.value
      })
      const renderList = computed(() => {
        if(props.skipSearch) return selectableValues.value
        return searchFn(listSearchText.value, selectableValues.value)
      })
      const addActiveClass = () => {
        renderList.value.map((item, index) => {
          let listRef = currentInstance.refs['menu'].$refs['list']
          let domItem = listRef && listRef.$el.getElementsByClassName('g-list-item')[context.slots['prepend-item'] ? index + 1 : index]
          isActiveItem(item)
            ? nextTick(() => domItem && domItem.classList.add('g-list-item__active'))
            : nextTick(() => domItem && domItem.classList.remove('g-list-item__active'))
        })
      }

      const genList = (state) => {
        const onClickItem = (e) => {
          state.showOptions = props.multiple
          toggleItem(e)
          lazySearch.value = props.multiple || props.chips || props.deletableChips || props.smallChips ? '' : `${getText.value(e)}`
        }
        addActiveClass()
        const gListProps = {
          items: renderList.value,
          itemText: props.itemText,
          inMenu: true,
          dense: props.dense,
          'onClick:item': e => onClickItem(e)
        }
        const gListSlots = {
          'prepend-item': () => context.slots['prepend-item'] && context.slots['prepend-item'](),
          'append-item': () => context.slots['append-item'] && context.slots['append-item'](),
          'content': context.slots.item ? () => context.slots.item() : null,
          'prepend': ({ isSelected, item }) => context.slots.itemPrepend && context.slots.itemPrepend({ isSelected, item }),
        }
        return <GList {...gListProps} v-slots={gListSlots} ref="list"/>
      }

      //gen TextField
      const {
        onChipCloseClick,
        clearSelection,
        onInputKeyDown,
        onInputClick,
        onInputDelete,
        activeListItemIndex
      } = getInputEventHandlers(props, context, state, selectedValue, lazySearch, listSearchText, addValueFromInput, unNormalize, renderList, getText)

      const searchFocused = ref(false)
      const genSearchField = () => {
        return <GTextField placeholder="Search"
                           onUpdate:modelValue={e => lazySearch.value = e}
                           modelValue={listSearchText.value}
                           clearable
                           ref="searchText"
                           autofocus={searchFocused.value}
                           onKeydown={onInputKeyDown}
                           onEnter={e => {
                             if (activeListItemIndex.value >= 0) {
                               const selectedItem = renderList.value[activeListItemIndex.value]
                               if (selectedItem) toggleItem(selectedItem)
                             }
                           }}
                           class={`g-${props.component}__search`}
                           style="margin: 8px 8px 0; background-color: transparent; width: auto"
        />
      }

      const genSelectionSlot = () => {
        return selectionTexts.value.map((item, index) => {
            //chips
          if (props.chips || props.smallChips || props.deletableChips || props.allowDuplicates)
            return (
              <GChip
                small={props.smallChips}
                close={props.deletableChips}
                onClose={() => onChipCloseClick(index)}>{item}
              </GChip>
            )
            //multiple in 3 component no chips
            else if (props.multiple) {
              if (index === selectionTexts.value.length - 1) {
                if (props.component === 'select')
                  return <div style={{ 'color': state.lastItemColor, 'padding': '4px 5px 4px 0' }}>{item}</div>

                return <div style={{ 'color': state.lastItemColor, 'padding': '4px 5px 4px 0' }}>{item}</div>
              }
              return <div style={{ 'padding': '4px 5px 4px 0' }}>{item + ', '} </div>
            }
            //single in select
            else if (props.component === 'select') return selectionTexts.value.join('')
            else return null
          }
        )
      }

      const textFieldScopedSlots = computed(() => {
        const slots = {}

        // append inner
        const appendInnerSlot = context.slots['append-inner']
        if (props.arrow) {
          slots['append-inner'] = ({ iconColor }) => {
            return [
              <GIcon color={iconColor} class={['g-icon__arrow']}>arrow_drop_down</GIcon>,
              appendInnerSlot && appendInnerSlot()
            ]
          }
        } else if (appendInnerSlot) {
          slots['append-inner'] = appendInnerSlot
        }

        // append outer
        const appendOuterSlot = context.slots['append-outer']
        if (appendOuterSlot)
          slots['append-outer'] = appendOuterSlot

        // input
        slots['input-slot'] = () => <div class="input-slot" style={{ display: 'contents' }}>{genSelectionSlot()}</div>

        return slots;
      })

      const onInputEnter = e => {
        if (activeListItemIndex.value >= 0) {
          const selectedItem = renderList.value[activeListItemIndex.value]
          if (selectedItem) {
            toggleItem(selectedItem)
            if (props.multiple || props.chips || props.deletableChips || props.smallChips) {
              tfValue.value = ''
            } else {
              tfValue.value = `${getText.value(selectedItem)}`
            }
          }
        } else {
          updateValue()
        }
      }

      const onBlur = e => {
        const listRef = currentInstance.refs.list
        if (listRef && listRef.$el.contains(e.relatedTarget))
          return
        updateValue()
      }

      const inputClick = () => {
        searchFocused.value = true
        context.emit('input-click')
      }

      const genTextField = (typeof props.genActivator === 'function' && props.genActivator) ||
        function (toggleContent, props, state, { tfValue, prependText }, eventHandlers, textFieldScopedSlots) {
          const { clearSelection, onInputClick, onInputFocus, onBlur, onInputDelete, onInputEnter, onInputKeyDown } = eventHandlers
          const classes = props.textFieldClass ? props.textFieldClass : []
          const textFieldProps = {
            ..._.pick(props, [
              'disabled', 'readOnly',
              'filled', 'solo', 'outlined', 'flat', 'rounded', 'shaped', 'dense', 'clearable',
              'hint', 'persistent',
              'counter', 'placeholder', 'label', /*'prefix',*/ 'suffix',
              'rules',
              'type',
              'appendIcon', 'prependIcon', 'prependInnerIcon', 'appendInnerIcon',
              'clearIconColor', 'required', 'virtualEvent'
            ]),
            modelValue: tfValue.value,
            prependValue: prependText.value,
            // events
            'onClick:clearIcon': clearSelection,
            onClick: [toggleContent, onInputClick],
            onFocus: onInputFocus,
            onBlur: onBlur,
            onDelete: onInputDelete,
            onEnter: e => {
              onInputEnter(e)
              !props.multiple && (state.showOptions = false)
            },
            onKeydown: onInputKeyDown,
            'onUpdate:modelValue': e => {
              tfValue.value = e
              state.showOptions = e !== '';
            },
          }

          const textfield = resolveComponent(props.textFieldComponent ? props.textFieldComponent : 'GTextField')
          return (
            <textfield
                {...textFieldProps}
                v-slots={textFieldScopedSlots.value}
                style={{ 'flex-wrap': 'wrap' }}
                class={classes}
                ref="textfield"
            />
          )
        }

        //gen Menu
      const defaultMenuProps = {
        closeOnClick: true,
        closeOnContentClick: false,
        maxHeight: 300,
        offsetY: true,
        offsetOverflow: true,
        top: false,
        contentFillWidth: true
      }

      function genNoDataSlot() {
        if (!renderList.value.length) return <div>
          {context.slots['no-data'] && context.slots['no-data']()}
        </div>
      }

      const genMenuContent = (typeof props.genContent === 'function' && props.genContent) || function (state) {
        if (!renderList.value.length && !context.slots['no-data'] && !props.searchable) return <div></div>
        return [
          props.component === 'select' && props.searchable ? genSearchField() : null,
          genNoDataSlot(),
          genList(state),
        ]
      }

      function genMenu(state) {
        const nudgeBottom = computed(() => props.textFieldComponent && props.textFieldComponent !== 'GTextField' ? '2px' : (!!props.hint ? '22px' : '2px'))
        const gMenuProps = {
          // props
          ...Object.assign(defaultMenuProps, props.menuProps),
          nudgeBottom: nudgeBottom.value,
          modelValue: state.showOptions,
          eager: props.eager,
          closeOnClick: !props.keepMenuOnBlur,
          ...props.menuClass && { contentClass: props.menuClass },
          // events
          'onUpdate:modelValue': (e) => state.showOptions = e
        }
        const gMenuSlots = {
          activator: ({ toggleContent }) =>
              genTextField(toggleContent, props, state, { tfValue, prependText },
                  {
                    clearSelection,
                    onInputClick: inputClick,
                    onInputFocus: onInputClick,
                    onBlur,
                    onInputDelete,
                    onInputEnter,
                    onInputKeyDown
                  }, textFieldScopedSlots),
          default: () => genMenuContent(state)
        }
        return <GMenu {...gMenuProps} v-slots={gMenuSlots} ref='menu'/>
      }

      function genComponent() {
        return <div class={[`g-${props.component}`, { [`g-${props.component}__active`]: state.showOptions }]}>
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
      const genScopeId = getScopeIdRender()
      return genScopeId(this.genComponent)()
    }
  }
}
export default componentsFactory

