<script>
  import {computed, ref, reactive, watch, set} from '@vue/composition-api';
  import GTreeFactory from '../GTreeViewFactory/GTreeFactory';
  import {GExpandTransition} from '../transition/transition';
  import GSpacer from "../GLayout/GSpacer";
  import _ from 'lodash';

  export default {
    name: 'GSideBarTreeView',
    components: {
      GSpacer, GExpandTransition,
      TreeNodeWrapper: {
        props: {
          state: {
            type: Object,
            default: () => ({collapse: true, selected: false})
          }
        },
        render() {
          return this.$scopedSlots.default && this.$scopedSlots.default({state: this.state});
        }
      }
    },
    props: {
      itemText: {
        type: [Function, String]
      },
      itemChildren: {
        default: 'items',
        type: [Function, String]
      },
      itemIcon: {
        default: null,
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
      noPadding: {
        type: Boolean,
        default: true,
      },
      autoCollapse: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, context) {
      let prevSelectedPath = null
      let prevOpenPath = null // for items with children but not clickable
      const treeState = reactive({})

      // common functions
      const toggleNodeExpansion = _.throttle((e, path) => {
        e.stopPropagation()
        if (!treeState[path]) return

        // autoCollapse === false means that only 1 item with children can be expanded
        if (props.autoCollapse) {
          if (prevOpenPath && prevOpenPath !== path) treeState[prevOpenPath].collapse = true
          prevOpenPath = path
        }

        treeState[path].collapse = !treeState[path].collapse;
      }, 200, {trailing: false})

      const setTreeState = function (path, state) {
        if (!treeState[path]) {
          set(treeState, path, state)
        } else {
          treeState[path].collapse = state.collapse
          treeState[path].selected = state.selected
        }
      }

      watch(() => props.value, () => {
        if (!props.value || props.value === prevSelectedPath) return

        if (prevSelectedPath) treeState[prevSelectedPath].selected = false
        prevSelectedPath = props.value

        setTreeState(props.value, {
          selected: true,
          collapse: true
        })

        let path = props.value
        while (path.indexOf('.') > -1) {
          path = path.slice(0, path.lastIndexOf('.'))
          path = path.slice(0, path.lastIndexOf('.'))
          if (path.includes('.')) {
            setTreeState(path, {
              collapse: false,
              selected: false,
            })
          }
        }
      })

      // generate components
      const rootWrapperClasses = computed(() => ({['elevation-' + (props.flat ? '0' : props.elevation)]: true}))
      const genRootWrapper = function (childrenVNodes) {
        return <ul class={["g-treeview-wrapper", rootWrapperClasses.value, props.noPadding && 'no-padding']}>
          {childrenVNodes}</ul>
      }

      const genChildrenNodeWrapper = function (childrenVNodes) {
        return <ul class={[props.noPadding && 'no-padding']}>{childrenVNodes}</ul>
      }

      const genNode = function ({node, text, childrenVNodes, path}) {
        return <tree-node-wrapper {...{
          scopedSlots: {default: ({state}) => genNodeContent({node, text, childrenVNodes, path, state})}
        }}/>
      }

      const genNodeContent = function ({node, text, childrenVNodes, state, path}) {
        // gen icon
        const isChildNode = path.split('.').length > 2
        if (props.itemIcon) {
          if (typeof props.itemIcon === 'function') node.icon = props.itemIcon({
            node,
            text,
            childrenVNodes,
            state,
            path
          })
          else node.icon = props.itemIcon
        }

        if (isChildNode && !node.icon) {
          node.icon = 'radio_button_unchecked' // Set default icon for children nodes
          node.iconType = 'small'
        }

        const icon = (node.type !== 'divider' && node.type !== 'subheader') &&
            <g-icon class={["g-treeview-icon", node.iconType === 'small' && "g-treeview-icon__small"]}
                    svg={node.svgIcon}>{node.icon || ''}</g-icon>

        // gen children
        const children = childrenVNodes &&
            <div vShow={!treeState[path].collapse} class="g-treeview-children">{childrenVNodes}</div>

        // gen badge
        const scopedSlots = {
          badge: () => <span>{node.badge}</span>
        }
        const badge = node.badge && <g-badge inline color={node.badgeColor} scopedSlots={scopedSlots}
                                             style={childrenVNodes || context.slots['prepend-icon'] || node.appendIcon ? {'margin-right': '4px'} : {'margin-right': '44px'}}/>

        const appendIcon = node.appendIcon && <g-icon small class="mx-1">{node.appendIcon}</g-icon>

        // gen node
        const data = {
          class: [node.type !== 'subheader' && node.type !== 'divider'
              ? 'g-treeview-item waves-effect'
              : null,
            props.rounded ? 'g-treeview-item__rounded' : null,
            (!childrenVNodes || node.clickable) && treeState[path].selected
                ? 'g-treeview__active'
                : null],
          on: {
            click: (e) => {
              e.stopPropagation()
              if (node.clickable || !childrenVNodes) {
                context.emit('node-selected', node, path)
                context.emit('input', path)

                node.href
                && context.root.$router
                && context.root.$router.currentRoute.path !== node.href
                && context.root.$router.push(node.href);
              } else {
                toggleNodeExpansion(e, path)
              }
            },
            mouseenter: (e) => {
              e.stopPropagation()
              context.emit('mouseenter', e, path)
            },
            mouseleave: (e) => {
              e.stopPropagation()
              context.emit('mouseleave', e, path)
            },
            dblclick(e) {
              toggleNodeExpansion(e, path)
            }
          },
        }

        const textStyle = {
          'color': node.textColor
        }

        return <li class={!treeState[path].collapse && childrenVNodes && 'g-treeview__open'}>
          <a {...data}>
            {icon}
            <span style={node.textColor && textStyle}>{text}</span>
            <g-spacer/>
            {badge}
            {node && node.type !== 'divider' && node.type !== 'subheader' &&
            context.slots['prepend-icon'] && context.slots['prepend-icon']({node, path})}
            <span
                class='g-treeview-action'
                vShow={childrenVNodes}>
              <g-icon vOn:click={e => toggleNodeExpansion(e, path)}>
                {treeState[path].collapse ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
              </g-icon>
            </span>
            {appendIcon}
          </a>
          <g-expand-transition>{children}</g-expand-transition>
        </li>
      }

      const itemTextFn = (typeof props.itemText === 'function' && props.itemText) || ((node, isRoot) => {
        if (node && node.type === 'subheader') {
          return <span class='g-treeview-subheader'>{node.subheader}</span>
        } else if (node && node.type === 'divider') {
          return <g-divider/>
        } else {
          return <span class='g-treeview-title'>{node.title || node[props.itemText]}</span>
        }
      })

      const {genTree} = GTreeFactory({
        genNode,
        genWrapper: genChildrenNodeWrapper,
        genRootWrapper,
        data: props.data,
        itemText: itemTextFn,
        itemChildren: props.itemChildren,
        expandLevel: props.expandLevel,
        treeStates: treeState,
      })

      return {treeState, genTree}
    },
    render() {
      return this.genTree()
    },
  }
</script>

<style scoped lang="scss">
  ul {
    list-style-type: none;
    margin: 0;

    &.g-treeview-wrapper {
      padding: 0;
    }

    &.no-padding {
      padding: 0;
    }
  }

  .g-treeview-wrapper ::v-deep {
    .g-treeview-wrapper {
      overflow-y: auto;
      height: 100%;
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
      }
    }
  }
</style>
