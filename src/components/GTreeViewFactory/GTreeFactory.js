import { reactive, computed } from 'vue'
import traverse from 'traverse'

export function genTextFactory(itemText) {
  return computed(() => typeof itemText === 'function' ? itemText : node => node[itemText])
}

// ROADMAP:
// - lazy
export default function treeFactory({
                                      genRootWrapper = i => i,
                                      genWrapper = i => i,
                                      genNode = i => i,
                                      itemText = 'text',
                                      itemChildren = 'items',
                                      itemInfo = n => n,
                                      expandLevel = 1000,
                                      itemPath,
                                      data,
                                      treeStates = reactive({}),
                                    }) {
  // Block traverse down from this node
  // Boolean value returned indicate that execution for current node should be stopped immediately or not
  // true: stop execution - false: continue execute
  const childrenProp = '_children_'
  const nodeShouldBeBlocked = function (nodeContext) {
    return !(nodeContext.isRoot || (nodeContext.parent && nodeContext.parent.key === '_children_'));
  }

  itemPath = (typeof itemPath === 'function' && itemPath) || ((n, { key }) => {
    if (key) {
      if (typeof itemChildren === 'string') {
        return `${itemChildren}.${key}`
      } else if (typeof itemChildren === 'function') {
        return `item.${key}`
      }
    }
    return key;
  })

  const genText = computed(() => typeof itemText === 'function'
    ? itemText
    : (node, __) => node && node[itemText])

  // A function do some stuff to prepare data which
  // will be consumed by custom genNode function
  const preGenNode = function ({ node, path, childrenVNodes, isLast, isRoot, actualLevel }) {
    // initialize collapsed/expand
    if (!treeStates[path]) {
      treeStates[path] = {
        collapse: expandLevel <= actualLevel,
        selected: false,
      }
    }
    const text = genText.value(node, isRoot);
    return genNode({ node, text, childrenVNodes, isLast, state: treeStates[path], path })
  }

  const _itemChildren = computed(() => typeof itemChildren === 'function'
    ? itemChildren
    : node => node && node[itemChildren])

  const genTree = function () {
    // Get level_ of parent node if it's not root node
    function getParentLevel(ctx) {
      if (ctx.parent._level === undefined) {
        return getParentLevel(ctx.parent)
      } else {
        return ctx.parent._level
      }
    }

    function findParent(context) {
      if (context.parent && context.parent.node._isNode_) {
        return context.parent;
      } else if (context.parent) {
        return findParent(context.parent);
      }
    }

    const treeVNodeWithoutRoot = traverse(data.value).map(function (node) {

      if (nodeShouldBeBlocked(this) || typeof node !== 'object') {
        return
      }
      const isLastNode = () => {
        if (!this.parent) return false
        let length
        if (Array.isArray(this.parent.node_)) {
          length = this.parent.node_.length
        } else if (this.parent.node[childrenProp]) {
          length = this.parent.node[childrenProp].length
        } else {
          return false
        }
        return length - 1 === +this.key
      }
      // since original object has been modified, this.level no longer correct anymore
      // that why we need to cache the _level value in this object
      this._level = this.isRoot ? 0 : getParentLevel(this) + 1

      const isNodeRootArray = this.isRoot && Array.isArray(node)
      //const children = isNodeRootArray ? node : _itemChildren.value(node, Object.assign(this, {path: this.path.filter(p => p !== childrenProp)}))
      const itemPathValue = itemPath(node, this);
      const path = this.parents.reduce((path, parent) => {
        if (parent.node.hasOwnProperty('_path_') && parent.node._path_ !== null && parent.node._path_ !== undefined) {
          path.push(parent.node._path_)
        }
        return path;
      }, []).concat((itemPathValue !== null && itemPathValue !== undefined) ? [itemPathValue] : []);
      const parent = findParent(this);

      const _context = Object.assign(this, {
        path: path.join('.'),
        isNodeRootArray,
        parent,
        parents: this.parents.filter(p => p.node._isNode_)
      });
      const info = itemInfo(_.cloneDeep(node), _context);
      const children = isNodeRootArray ? node : _itemChildren.value(node, Object.assign(_context, { info }));
      const rawNode = _.cloneDeep(node);
      this.update({ [childrenProp]: children, _path_: itemPathValue, _isNode_: true, _info_: info })

      this.after(nodeAfterConvert => {
        if (isNodeRootArray) {
          this.update(nodeAfterConvert[childrenProp])
        } else {
          const childrenVNodes = Array.isArray(nodeAfterConvert[childrenProp]) && nodeAfterConvert[childrenProp].length > 0 ? genWrapper(nodeAfterConvert[childrenProp]) : null;

          this.update(preGenNode({
              node: rawNode,
              path: path.join('.'),
              childrenVNodes,
              isLast: isLastNode(),
              isRoot: this.isRoot,
              actualLevel: this._level
            }),
            true)
        }

      })
    })

    return genRootWrapper(treeVNodeWithoutRoot)
  }

  return {
    treeStates,
    genTree,
  }
}
