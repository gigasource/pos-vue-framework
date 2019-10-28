import { reactive, set, computed } from '@vue/composition-api'
import traverse from 'traverse'



export function genTextFactory(itemText) {
  return computed(() => typeof itemText === 'function' ? itemText : node => node[itemText])
}

//consider: lazy
// expandLevel,
// formatText: function => string
// itemText (function | String) // un-necessary
// itemChildrenPath : (default: items , type: function | String)
export default function ({
                           genRootWrapper, genWrapper, genNode,
                           itemChildrenPath,
                           cptExpandLevel,
                           treeData
                         }) {
  const PATH_SEPARATOR = '.'
  if (itemChildrenPath.indexOf(PATH_SEPARATOR) >= 0) {
    console.warn(`itemChildrenPath must not contain ${PATH_SEPARATOR}`)
  }

  /**
   * Get node level from node path
   * @param path
   * @returns {number}
   */
  function getNodeLevel(path) {
    return path.split(PATH_SEPARATOR).filter(part => part === itemChildrenPath).length
  }

  /**
   * Get initial collapse state of node
   * @param path
   * @returns {boolean}
   */
  function getInitialCollapseState(path) {
    return cptExpandLevel.value <= getNodeLevel(path)
  }

  // An object contain collapse state of node
  // key: node path
  // value: object contain state of current node
  //     { collapse: Boolean }
  const treeStates = reactive({});

  /**
   * A function do some stuff to prepare data which
   * will be consumed by custom genNode function
   * @param node
   * @param path
   * @param childrenVNodes
   * @param isLast
   * @returns {*}
   */
  const preGenNode = function (node, path, childrenVNodes, isLast) {
    // initialize collapsed/expand
    if (!treeStates[path]) {
      set(treeStates, path, { collapse: getInitialCollapseState(path) })
      // ... more state go there
    }
    return genNode(node, childrenVNodes, isLast, treeStates[path], path);
  }

  const genTree = function () {
    /**
     * Block traverse down from this node
     * Boolean value returned indicate that execution for current node should be stopped
     * immediately or not
     * truly: stop execution
     * falsy: continue execute
     * @returns {boolean}
     */
    const blockUnnecessaryNode = function () {
      if (this.isRoot) {
      } else if (this.key === itemChildrenPath) {
        return true;
      } else if (this.parent && this.parent.key === itemChildrenPath) {
      } else {
        this.block();
        return true;
      }
    }

    const treeVNodeWithoutRoot = traverse(treeData).map(function (node) {
      if (blockUnnecessaryNode.bind(this)()) {
        return;
      }

      const isLastNode = () => this.parent && this.parent.node.length - 1 === +this.key;

      this.after(() => {
        this.update(preGenNode(this.node, this.path.join(PATH_SEPARATOR),
            node[itemChildrenPath] ? genWrapper(this.node[itemChildrenPath]) : null,
            isLastNode()),
            true);
      })
    })

    return genRootWrapper(treeVNodeWithoutRoot);
  }

  return {
    treeStates,
    genTree,
  }
}
