<script>
  import GAvatar from '../GAvatar/GAvatar';
  import GImg from '../GImg/GImg';
  import GIcon from '../GIcon/GIcon';
  import GDivider from '../GLayout/GDivider';
  import { keyCodes } from '../../utils/helpers';
  import { computed } from '@vue/composition-api';
  import { createItemFn } from './listSelectFactory';

  export default {
    name: 'GListDisplay',
    components: { GAvatar, GImg, GIcon, GDivider },
    props: {
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
      itemText: {
        type: [String, Array, Function],
        default: 'text'
      },
      activeClass: String,
      inMenu: Boolean,
      svg: Boolean,
      appendIcon: String,
    },
    setup: function (props, context) {
      const getText = computed(() => createItemFn(props.itemText))
      const getListEvents = (item, index) => {
        return {
          click: () => context.emit('click:item', item),
          keydown: (e) => {
            switch (e.keyCode) {
              case keyCodes.down:
                context.emit('keydown:down', index)
                break
              case keyCodes.up:
                context.emit('keydown:up', index)
                break
              case keyCodes.enter:
                context.emit('keydown:enter', item)
                break
            }
          }
        }
      }

      function genSubheader() {
        return context.slots['subheader']
          ? context.slots['subheader']()
          : <div class="g-list-header">{props.multiSection ? item.subheader : props.subheader}</div>
      }

      function genDivider() {
        return <g-divider inset={props.divider === 'inset'}/>
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
              return <g-icon svg={props.svg}>{item.prepend}</g-icon>
            case 'avatar':
              return <g-avatar>
                <g-img src={item.prepend}/>
              </g-avatar>
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
        if (!props.items) {
          return
        }
        if (!props.items.find(i => i.subtext)) {
          return 1;
        }
        if (props.items.find(i => i.subtext2)) {
          return 3;
        }
        return 2;
      })
      const genItemContent = (item) => {
        return <div class="g-list-item-content">
          <div class="g-list-item-text">{getText.value(item)}</div>
          {lineNumber.value > 1 ? <div class="g-list-item-text__sub">{item.subtext || '&nbsp;'} </div> : null}
          {lineNumber.value === 3 ? <div class="g-list-item-text__sub"> {item.subtext2 || '&nbsp;'}</div> : null}
        </div>
      }


      const genItemAppend = (item) => {
        if (props.appendIcon && item.append) return <div class="g-list-item-action">
          <g-icon svg={svg}>{item.append}</g-icon>
        </div>
        if (item.prepend) return <template>{item.append}</template>
      }

      function genItem(item, index) {
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
        return props.items.map((item, index) => {
          if (item.type === 'subheader') return genSubheader(item)
          else if (item.type === 'divider') return genDivider()
          else return context.slots['list-item'] ? context.slots['list-item']() : genItem(item, index)
        })

      }

      function genSingleSectionList() {
        const fn = (item, index) => {
          return [
            context.slots['list-item']
              ? context.slots['list-item']({ item: item, on: getListEvents(item, index) })
              : genItem(item, index),

            (props.divider && index < props.items.length - 1) ? genDivider() : null]
        }


        return [
          props.subheader ? genSubheader() : null,
          props.items.map(fn)
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
        'g-list__empty': !!props.items

      }));
      const styles = computed(() => ({
        ...props.height && { 'height': props.height },
        ...props.width && { 'width': props.width }
      }));

      function genList() {
        return <div class={['g-list', classes.value]} style={styles.value} ref="list" vOn:click={(e) => context.emit('click', e)}>
          {(props.multiSection) ? genMultiSectionList() : genSingleSectionList()}
        </div>
      }


      return {
        genList,
      }
    },
    render() {
      return this.genList()
    }
  }
</script>
<style scoped>
	@import "_GList.scss";
</style>
