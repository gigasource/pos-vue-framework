<script>
  import { createItemFn, makeListSelectable } from './listSelectFactory';
  import { ref, computed, provide } from '@vue/composition-api';
  import { keyCodes } from '../../utils/helpers';
  import GDivider from '../GLayout/GDivider';
  import GIcon from '../GIcon/GIcon';
  import GAvatar from '../GAvatar/GAvatar';
  import GImg from '../GImg/GImg';

  export default {
    name: 'GList',
    props: {
      name: {
        type: String,
        default: name
      },
      inCombobox: Boolean,
      height: String,
      width: String,
      disabled: Boolean,
      rounded: Boolean,
      shaped: Boolean,
      elevation: {
        type: [Number, String],
        default: 2,
      },
      dense: Boolean,
      nav: Boolean,
      items: {
        type: Array,
        default: () => []
      },
      multiSection: Boolean,
      subheader: String,
      divider: {
        type: [Boolean, String],
        default: false,
      },
      prependType: {
        type: String,
        default: 'avatar',
      },
      subtextWrap: Boolean,
      selectable: Boolean,
      value: {
        type: [String, Object, Number, Array, Function],
        default: null
      },
      multiple: Boolean,
      mandatory: Boolean,
      allowDuplicates: Boolean,
      itemText: {
        type: [String, Array, Function],
        default: 'text'
      },
      itemValue: {
        type: [String, Array, Function],
        default: 'value'
      },
      normalize: Function,
      activeClass: String,
      inMenu: Boolean,
      returnObject: Boolean,
      svg: Boolean,
      appendIcon: String,
    },
    setup: function (props, context) {
      const lazyItems = ref([])

      const internalItems = computed({
        get() {
          return props.items || lazyItems.value
        },
        set(value) {
          lazyItems.value = value
        }
      })

      const {
        selectableValues: renderList,
        normalizedValue: internalValue,
        toggleItem,
        isActiveItem,
      } = props.selectable ? makeListSelectable(props, context, internalItems) : {}

      const getText = computed(() => createItemFn(props.itemText))

      function onArrowDown(index) {
        index < ((renderList.value && renderList.value.length) - 1) ? index += 1 : index = 0
        context.refs.list.getElementsByClassName('g-list-item')[index].focus()
        context.emit('keydown:down')
      }

      function onArrowUp(index) {
        index > 0 ? index -= 1 : index = (renderList.value && (renderList.value.length - 1))
        context.refs.list.getElementsByClassName('g-list-item')[index].focus()
        context.emit('keydown:up')
      }

      function onSelect(item) {
        if (!props.selectable) {
          return;
        }
        toggleItem(item)
        context.emit('click:item', item)
      }

      const getListEvents = (item, index) => {
        return {
          click: () => props.selectable ? onSelect(item) : context.emit('click:item', item),
          keydown: (e) => {
            switch (e.keyCode) {
              case keyCodes.down:
                props.selectable ? onArrowDown(index) : context.emit('keydown:down', index)
                break
              case keyCodes.up:
                props.selectable ? onArrowUp(index) : context.emit('keydown:up', index)
                break
              case keyCodes.enter:
                props.selectable ? onSelect(item) : context.emit('keydown:enter', item)
                break
            }
          }
        }
      }

      function genSubheader(item) {
        return context.slots['subheader']
          ? context.slots['subheader']()
          : <div class="g-list-header">{props.multiSection ? item.subheader : props.subheader}</div>
      }

      function genDivider() {
        return <GDivider inset={props.divider === 'inset'}/>
      }


      const prependClasses = computed(() => {
        if (!['icon', 'avatar', 'image'].includes(props.prependType)) {
          return `g-list-item-icon`
        }
        return `g-list-item-${props.prependType}`;
      })
      const genItemPrepend = (item) => {
        const getPrepend = () => {
          switch (props.prependType) {
            case 'icon':
              return <GIcon svg={props.svg}>{item.prepend}</GIcon>
            case 'avatar':
              return <GAvatar>
                <GImg src={item.prepend}/>
              </GAvatar>
            case 'image':
              return <g-img src={item.prepend}/>
            default:
              return item.prepend
          }
        }
        return (item.prepend && props.prependType) ? <div class={prependClasses.value}>
          {getPrepend()}
        </div> : null
      }


      const lineNumber = computed(() => {
        if (!internalItems.value.length) {
          return
        }
        if (!internalItems.value.find(i => i.subtext)) {
          return 1;
        }
        if (internalItems.value.find(i => i.subtext2)) {
          return 3;
        }
        return 2;
      })
      const genItemContent = (item) => {
        return <div class="g-list-item-content">
          <div class="g-list-item-text">{getText.value(item) || item}</div>
          {lineNumber.value > 1 ? <div class="g-list-item-text__sub">{item.subtext} </div> : null}
          {lineNumber.value === 3 ? <div class="g-list-item-text__sub"> {item.subtext2}</div> : null}
        </div>
      }


      const genItemAppend = (item) => {
        if (props.appendIcon && item.append) return <div class="g-list-item-action">
          <GIcon svg={svg}>{item.append}</GIcon>
        </div>
        if (item.prepend) return <template>{item.append}</template>
      }

      function genItemSelectable(item, index) {
        return <div class={['g-list-item', 'waves-effect', 'waves-auto', { 'g-list-item__active': isActiveItem(item), [props.activeClass]: isActiveItem(item) }]}
                    tabIndex="0"
                    {...{ on: getListEvents(item, index) }}
                    ref="listItemRef"
        >
          {
            [(context.slots['prepend'] && context.slots['prepend']({ isSelected: isActiveItem(item), item: item })) || genItemPrepend(item),
              (context.slots['content'] && context.slots['content']()) || genItemContent(item),
              (context.slots['append'] && context.slots['append']({ isSelected: isActiveItem(item), item: item })) || genItemAppend(item),
            ]
          }
        </div>
      }

      function genItemDisplayOnly(item, index) {
        return <div class={['g-list-item', 'waves-effect', 'waves-auto', { 'g-list-item__disabled': item.disabled, [props.activeClass]: item.active }]}
                    tabIndex="0"
                    {...{ on: getListEvents(item, index) }}
                    ref="listItemRef"
        >
          {
            [(context.slots['prepend'] && context.slots['prepend']({ item: item })) || genItemPrepend(item),
              (context.slots['content'] && context.slots['content']()) || genItemContent(item),
              (context.slots['append'] && context.slots['append']({ item: item })) || genItemAppend(item),
            ]
          }
        </div>
      }

      function genMultiSectionList() {
        return internalItems.value.map((item, index) => {
          if (item.type === 'subheader') return genSubheader(item)
          else if (item.type === 'divider') return genDivider()
          else return context.slots['list-item']
              ? context.slots['list-item']()
              : props.selectable ? genItemSelectable(item, index) : genItemDisplayOnly(item, index)
        })

      }

      function genSingleSectionList() {
        const genListItemSelectable = (item, index) => {
          return [
            context.slots['list-item']
              ? context.slots['list-item']({ item: item, isSelected: isActiveItem(item), on: getListEvents(item, index) })
              : genItemSelectable(item, index),

            (props.divider && index < renderList.value.length - 1) ? genDivider() : null]
        }
        const genListItemDisplayOnly = (item, index) => {
          return [
            context.slots['list-item']
              ? context.slots['list-item']({ item: item, on: getListEvents(item, index) })
              : genItemDisplayOnly(item, index),

            (props.divider && index < internalItems.value.length - 1) ? genDivider() : null]
        }
        return [
          props.subheader ? genSubheader() : null,
          props.selectable ? renderList.value.map(genListItemSelectable) : internalItems.value.map(genListItemDisplayOnly)
        ]

      }

      const classes = computed(() => ({
        'g-list__disabled': props.disabled,
        'g-list__two-line': (lineNumber.value === 2 && !props.subtextWrap),
        'g-list__three-line': (lineNumber.value === 2 && props.subtextWrap) || lineNumber.value === 3,
        'g-list__rounded': props.rounded,
        'g-list__shaped': props.shaped,
        ['elevation-' + props.elevation]: true,
        'g-list__dense': props.dense,
        'g-list__inMenu': props.inMenu,
        'g-list__nav': props.nav,
        'g-list__empty': props.selectable && !internalItems.value.length
      }));
      const styles = computed(() => ({
        ...props.height && { 'height': props.height },
        ...props.width && { 'width': props.width }
      }));

      function genList() {
        const genListWithItem = (props.multiSection) ? genMultiSectionList : genSingleSectionList
        return <div class={['g-list', 'check', classes.value]} style={styles.value} ref="list" vOn:click={(e) => context.emit('click', e)}>
          {context.slots['prepend-item'] && context.slots['prepend-item']()}
          {context.slots['default'] ? context.slots['default']() : genListWithItem()}
          {context.slots['append-item'] && context.slots['append-item']()}
        </div>
      }

      if (props.selectable) {
        provide('getListEvents', getListEvents)
        const add = (item) => {
          if (renderList.value.includes(item)) {
            return {
              isItemAdded: false,
              index: -1
            }
          } else {
            internalItems.value.push(item)
            return {
              isItemAdded: true,
              index: renderList.value.findIndex(el => el === item)
            }
          }
        }
        provide('add', add)
        provide('listInternalValue', internalValue)
        provide('toggleItem', toggleItem)
        provide('isActiveItem', isActiveItem)
      }
      provide('selectable', props.selectable)


      return props.selectable
        ? {
          genList,
          renderList,
          internalValue,
          internalItems
        }
        : { genList, internalItems }
    },
    render() {
      return this.genList()
    }
  }
</script>
<style scoped lang="scss">
	@import "_GList.scss";
</style>
