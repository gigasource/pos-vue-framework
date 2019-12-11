<script>
  import {computed, ref} from '@vue/composition-api';
  import GTreeFactory, {genTextFactory} from '../GTreeViewFactory/GTreeFactory';
  import GDivider from '../GLayout/GDivider';
  import GIcon from '../GIcon/GIcon';
  import {GExpandTransition} from '../transition/transition';
  import GBadge from '../GBadge/GBadge';

  export default {
    name: 'GSideBarTreeView',
    components: {GBadge, GIcon, GDivider, GExpandTransition},
    props: {
      itemText: {
        type: [Function, String]
      },
      itemChildren: {
        default: 'items',
        type: [Function, String]
      },
      expandLevel: {
        type: Number,
        default: 0
      },
      data: [Object, Array],
      rounded: Boolean,
      value: null,
      elevation: {
        type: [String, Number],
        default: 0
      },
      flat: Boolean,
    },
    setup(props, context) {
      const classes = computed(() => ({
        ['elevation-' + (props.flat ? '0' : props.elevation)]: true,
      }))

      const activePath = computed({
        get: () => props.value,
        set: (val) => context.emit('input', val)
      })

      const openPath = ref(null)

      const itemText = (typeof props.itemText === 'function' && props.itemText) || ((node, isRoot) => {
        if (node && node.type === 'subheader') {
          return <span class='g-treeview-subheader'>{node.subheader}</span>
        } else if (node && node.type === 'divider') {
          return <g-divider/>
        } else {
          return <span class='g-treeview-title'>{node.title || node[props.itemText]}</span>
        }
      })

      const genNode = function ({node, text, childrenVNodes, state, path}) {
        const isChild = path.split('.').length > 2
        if (isChild && !node.icon) node.icon = 'radio_button_unchecked'

        const icon = (node.icon || (!node.icon && node.type !== 'divider' && node.type !== 'subheader')) &&
            <g-icon class={["g-treeview-icon", node.iconType === 'small' && "g-treeview-icon__small"]}
                    svg={node.svgIcon}>{node.icon}</g-icon>
        if (openPath.value !== path && (openPath.value && !openPath.value.toString().includes(path + '.'))) {
          state.collapse = true
        }
        const children = childrenVNodes &&
            <div vShow={!state.collapse} class="g-treeview-children">{childrenVNodes}</div>
        const scopedSlots = {
          badge: scope => <span>{node.badge}</span>
        }
        const badge = node.badge && <g-badge inline color={node.badgeColor} scopedSlots={scopedSlots}
                                             style={childrenVNodes || context.slots['prepend-icon'] || node.appendIcon ? {'margin-right': '4px'} : {'margin-right': '44px'}}/>

        const appendIcon = node.appendIcon && <g-icon small class="mx-1">{node.appendIcon}</g-icon>

        const onArrowIconClicked = (e) => {
          if (node.clickable) {
            e.stopPropagation()
            state.collapse = !state.collapse;
            openPath.value = path
          }
        }

        const data = {
          class: [node.type !== 'subheader' && node.type !== 'divider'
              ? 'g-treeview-item waves-effect'
              : null,
            props.rounded ? 'g-treeview-item__rounded' : null,
            (!childrenVNodes || node.clickable) && activePath.value === path
                ? 'g-treeview__active'
                : null],
          on: {
            click: (e) => {
              e.stopPropagation()
              if (node.clickable || !childrenVNodes) {
                context.emit('node-selected', node)
                activePath.value = path;

                node.href
                && context.root.$router
                && context.root.$router.currentRoute.path !== node.href
                && context.root.$router.push(node.href);
              } else {
                if (childrenVNodes) {
                  state.collapse = !state.collapse;
                  openPath.value = path
                }
              }
            },
            mouseenter: () => {
              context.emit('mouseenter', path)
            },
            mouseleave: () => {
              context.emit('mouseleave', path)
            },
          },
        }
        return <li class={!state.collapse && childrenVNodes && 'g-treeview__open'}>
          <a {...data}>
            {icon}
            {text}
            {badge}
            {node && node.type !== 'divider' && node.type !== 'subheader' &&
              context.slots['prepend-icon'] && context.slots['prepend-icon']({path})}
            <span
                class='g-treeview-action'
                vShow={childrenVNodes}>
              <g-icon vOn:click={onArrowIconClicked}>
                {state.collapse ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
              </g-icon>
            </span>
            {appendIcon}
          </a>
          <g-expand-transition>{children}</g-expand-transition>
        </li>
      }

      const genWrapper = function (childrenVNodes) {
        return <ul>{childrenVNodes}</ul>
      }

      const genRootWrapper = function (childrenVNodes) {
        return <ul class={["g-treeview-wrapper", classes.value]}>{childrenVNodes}</ul>
      }

      const {treeStates, genTree} = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
        data: props.data,
        itemText,
        itemChildren: props.itemChildren,
        expandLevel: props.expandLevel
      })

      return {treeStates, genTree}
    },
    render() {
      return this.genTree()
    }
  }
</script>

<style scoped lang="scss">
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .g-treeview-wrapper {
    overflow-y: auto;
    height: 100%;

    /* TODO custom scrollbar */
    /*&:hover::-webkit-scrollbar {*/
    /*	width: 6px;*/
    /*	display: block;*/
    /*}*/

    /*&::-webkit-scrollbar {*/
    /*	width: 6px;*/
    /*	display: none;*/
    /*}*/

    /*&::-webkit-scrollbar-thumb{*/
    /*	background-color: rgba(170, 170, 170, 0.6);*/
    /*	border-radius: 4px;*/
    /*}*/
  }

  li {
    padding: 0;
    line-height: 0;
  }

  .g-treeview {
    &-item {
      height: 44px;
      display: flex;
      align-items: center;
      contain: layout;
      transition: none;
      color: rgba(0, 0, 0, .87);
      margin-right: 8px;

      &:not(.g-treeview-subheader):hover {
        background: rgba(0, 0, 0, 0.035);
      }

      &__rounded {
        border-top-right-radius: 32px;
        border-bottom-right-radius: 32px;
      }
    }

    &-icon {
      margin: 12px 16px;
      font-size: 20px !important;
      width: 20px !important;
      height: 20px !important;
      color: rgba(0, 0, 0, .54);

      &__small {
        font-size: 12px !important;
        width: 12px !important;
        height: 12px !important;
        margin: 16px 20px;
      }
    }

    &-title {
      font-size: 16px;
      line-height: 1.75;
      flex: 1 1 0;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-action {
      margin-right: 4px;

      > .g-icon {
        font-size: 18px !important;
        color: rgba(0, 0, 0, .54);
      }
    }

    &__open {
      background-color: rgba(0, 0, 0, .035);

      .g-treeview__open {
        background-color: rgba(0, 0, 0, .015);
      }
    }

    &__active {
      background: linear-gradient(45deg, #8e24aa, #ff6e40) !important;
      box-shadow: 3px 3px 20px 0 rgba(255, 110, 64, .5);
      color: white;

      .g-icon {
        color: inherit;
      }
    }

    &-subheader {
      display: flex;
      align-items: center;
      height: 48px;
      padding: 0 16px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.54);
      pointer-events: none;
      cursor: default;
    }

    &-children {
      ul {
        /*padding-left: 4px;*/
      }

      i {
        font-size: 10px !important;
      }
    }
  }
</style>
