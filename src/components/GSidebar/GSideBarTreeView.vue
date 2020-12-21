<script>
import {computed, reactive, watch} from 'vue';
import GTreeFactory from '../GTreeViewFactory/GTreeFactory';
import {GExpandTransition} from '../transition/transition';
import GSpacer from "../GLayout/GSpacer";
import _ from 'lodash';
import {getScopeIdRender} from "../../utils/helpers";

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
        return this.$slots.default();
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
    modelValue: null,
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
      default: false,
    },
    nodeExpansionHistory: {
      type: Array,
      default: () => [],
    },
    genNode: Function
  },
  emits: ['node-expansion-toggled', 'node-selected', 'update:modelValue', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout'],
  setup(props, context) {
    let prevSelectedPath = null
    let prevOpenPath = null // for items with children but not clickable
    const treeStates = reactive({})

    // common functions
    const toggleNodeExpansion = _.throttle((e, path, node) => {
      e.stopPropagation()
      if (!treeStates[path]) return

      setNodeState(path, {
        collapse: !treeStates[path].collapse
      })
      setParentNodesState(path, {
        collapse: false
      })

      // autoCollapse === true means that only 1 item with children can be expanded
      if (props.autoCollapse && prevOpenPath && getRootPath(prevOpenPath) !== getRootPath(path)) {
        setRootNodeState(prevOpenPath, {
          collapse: true
        })
      }

      prevOpenPath = path
      context.emit('node-expansion-toggled', path, !treeStates[path].collapse, node)
    }, 200, {trailing: false})

    const setNodeState = function (path, state) {
      if (!treeStates[path]) return

      if (!_.isNil(state.collapse)) treeStates[path].collapse = state.collapse
      if (!_.isNil(state.selected)) treeStates[path].selected = state.selected
    }

    const setParentNodesState = (path, state) => {
      while (path.indexOf('.') > -1) {
        path = path.slice(0, path.lastIndexOf('.'))
        path = path.slice(0, path.lastIndexOf('.'))
        if (path.includes('.')) {
          setNodeState(path, state)
        }
      }
    }

    const setRootNodeState = (path, state) => {
      setNodeState(getRootPath(path), state)
    }

    const getRootPath = path => {
      if (path && path.indexOf('.') >= 1) {
        const paths = path.split('.')
        return `${paths[0]}.${paths[1]}`
      }
      return path
    }

    watch(() => props.modelValue, () => {
      if (!props.modelValue || props.modelValue === prevSelectedPath) return

      if (prevSelectedPath)
        setNodeState(prevSelectedPath, {
          selected: false
        })

      prevSelectedPath = props.modelValue
      if (!prevOpenPath) prevOpenPath = props.modelValue

      setNodeState(props.modelValue, {
        selected: true
      })
      setParentNodesState(props.modelValue, {
        collapse: false
      })
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

    const _genNode = function ({node, text, childrenVNodes, path, isLast}) {
      if (treeStates[path] && props.nodeExpansionHistory.includes(path)) {
        treeStates[path].collapse = false
      }

      return <tree-node-wrapper vSlots={{default: () => genNodeContent({node, text, childrenVNodes, path, isLast})}}/>
    }

    const genNodeContent = function ({node, text, childrenVNodes, path, isLast}) {
      // gen icon
      const isChildNode = path.split('.').length > 2
      if (props.itemIcon) {
        if (typeof props.itemIcon === 'function') node.icon = props.itemIcon({
          node,
          text,
          childrenVNodes,
          state: treeStates[path],
          path
        })
        else node.icon = props.itemIcon
      }

      if (isChildNode && _.isNil(node.icon)) {
        node.icon = 'radio_button_unchecked' // Set default icon for children nodes
        node.iconType = 'small'
      }

      const icon = (node.type !== 'divider' && node.type !== 'subheader') &&
        ((context.slots.icon && context.slots.icon({node})) ||
          <g-icon class={["g-treeview-icon", node.iconType === 'small' && "g-treeview-icon__small"]}
                  svg={node.svgIcon}>{node.icon || ''}</g-icon>)

      // gen children
      const children = childrenVNodes &&
        <div vShow={!treeStates[path].collapse} class="g-treeview-children">{childrenVNodes}</div>

      // gen badge
      const badgeScopedSlots = {
        badge: () => <span>{node.badge}</span>
      }
      const badge = node.badge && <g-badge inline={true} color={node.badgeColor} vSlots={badgeScopedSlots}
                                           style={childrenVNodes || context.slots['prepend-icon'] || node.appendIcon ? {'margin-right': '4px'} : {'margin-right': '44px'}}/>

      const appendIcon = node.appendIcon && <g-icon small class="mx-1">{node.appendIcon}</g-icon>

      const eventListeners = {
        onClick: (e) => {
          e.stopPropagation()
          if (node.type === 'subheader') return

          if (node.clickable || !childrenVNodes) {
            context.emit('node-selected', node, path, treeStates[path])
            context.emit('update:modelValue', path)

            node.href
            && context.root.$router
            && context.root.$router.currentRoute.path !== node.href
            && context.root.$router.push(node.href);
          } else {
            toggleNodeExpansion(e, path, node)
          }
        },
        onMouseenter: (e) => {
          e.stopPropagation()
          context.emit('mouseenter', e, path)
        },
        onMouseleave: (e) => {
          e.stopPropagation()
          context.emit('mouseleave', e, path)
        },
        onMouseover: (e) => {
          e.stopPropagation()
          context.emit('mouseover', e, path)
        },
        onMouseout: (e) => {
          e.stopPropagation()
          context.emit('mouseout', e, path)
        },
        onDblclick(e) {
          toggleNodeExpansion(e, path, node)
        },
      };

      // gen node
      const data = {
        class: [node.type !== 'subheader' && node.type !== 'divider'
          ? 'g-treeview-item waves-effect'
          : null,
          props.rounded ? 'g-treeview-item__rounded' : null,
          (!childrenVNodes || node.clickable) && (treeStates[path].selected || path === props.value)
            ? 'g-treeview__active'
            : null],
        ...eventListeners,
      }

      const textColor = {
        'color': node.textColor
      }

      const fallbackContent = <li class={!treeStates[path].collapse && childrenVNodes && 'g-treeview__open'}>
        <a {...data} style={node && node.type === 'subheader' && 'cursor: default'}>
          {icon}
          <span style={node.textColor && textColor}>{text}</span>
          <g-spacer/>
          {badge}
          {node && node.type !== 'divider' && node.type !== 'subheader' &&
          context.slots['prepend-icon'] && context.slots['prepend-icon']({node, path})}
          <span class='g-treeview-action' vShow={childrenVNodes}>
              <g-icon onClick={e => toggleNodeExpansion(e, path, node)}>
                {treeStates[path].collapse ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
              </g-icon>
            </span>
          {appendIcon}
        </a>
        <g-expand-transition>{children}</g-expand-transition>
      </li>

      return (context.slots['default']
        && context.slots['default'](
          {
            node,
            nodeState: treeStates[path],
            nodeData: data,
            nodeListeners: eventListeners,
            nodePath: path,
            nodeText: text,
            toggleNodeExpansion,
            childrenVNodes: children,
            isLast,
          }
        ))
        || fallbackContent
    }

    let genNode = !props.genNode ? _genNode : function (arg) {
      return props.genNode(arg, _genNode, context);
    };

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
      data: computed(() => props.data),
      itemText: itemTextFn,
      itemChildren: props.itemChildren,
      expandLevel: props.expandLevel,
      treeStates,
    })

    return {treeStates, genTree}
  },
  render() {
    const scopeIdRender = getScopeIdRender()
    return scopeIdRender(this.genTree)()
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

      &:not(.g-treeview-subheader):not(.g-treeview__active):hover {
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
      background: linear-gradient(45deg, #8e24aa, #ff6e40);
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
