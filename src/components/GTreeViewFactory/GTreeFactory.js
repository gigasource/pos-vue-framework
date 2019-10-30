import { reactive, set, computed } from '@vue/composition-api'
import traverse from 'traverse'
import * as _ from 'lodash';


export function genTextFactory(itemText) {
  return computed(() => typeof itemText === 'function' ? itemText : node => node[itemText])
}

//consider: lazy
// expandLevel,
// itemText (function | String)
// itemChildren : (default: items , type: function | String)
export default function ({
                           genRootWrapper, genWrapper, genNode,
                           itemText,
                           itemChildren,
                           cptExpandLevel,
                           data
                         }) {
  const childrenProp = 'children'

  // An object contain collapse state of node
  // key: node path
  // value: object contain state of current node
  //     { collapse: Boolean }
  const treeStates = reactive({});

  const genText = computed(() => typeof itemText === 'function' ? itemText : (node, isRoot) => node[itemText]);

  /**
   * A function do some stuff to prepare data which
   * will be consumed by custom genNode function
   * @param node
   * @param path
   * @param childrenVNodes
   * @param isLast
   * @returns {*}
   */
  const preGenNode = function (node, path, childrenVNodes, isLast, isRoot, actualLevel) {
    // initialize collapsed/expand
    if (!treeStates[path]) {
      set(treeStates, path, { collapse: cptExpandLevel.value <= actualLevel })
    }
    const text = genText.value(node, isRoot);
    return genNode({node, text, childrenVNodes, isLast, state: treeStates[path], path});
  }

  const genChildren = computed(() => typeof itemChildren === 'function' ? itemChildren : node => node[itemChildren]);

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
      let stopExecutionImmediately = false
      if (this.isRoot) {

      } else if (this.key === childrenProp) {
        stopExecutionImmediately = true;
      } else if (this.parent && this.parent.key === childrenProp) {

      } else {
        this.block();
        stopExecutionImmediately = true;
      }
      return stopExecutionImmediately
    }

    /**
     * Get level_ of parent node if it's not root node
     * @param ctx
     * @returns {number|*}
     * @private
     */
    function getParentLevel_(ctx) {
      if (ctx.parent._level === undefined)
        return getParentLevel_(ctx.parent)
      else
        return ctx.parent._level
    }

    const treeVNodeWithoutRoot = traverse(data).map(function (node) {
      if (blockUnnecessaryNode.bind(this)()) {
        return;
      }

      const isLastNode = () => this.parent && this.parent.node.length - 1 === +this.key;

      // since original object has been modified, this.level no longer correct anymore
      // that why we need to cache the _level value in this object
      this._level = this.isRoot ? 0 : getParentLevel_(this) + 1
      const children = genChildren.value(node, this.isRoot);

      this.update({ [childrenProp]: children })

      this.after(nodeAfterConvert => {
        this.update(preGenNode(node, this.path.join('.'),
            Array.isArray(nodeAfterConvert.children) && nodeAfterConvert.children.length > 0 ? genWrapper(nodeAfterConvert.children) : null,
            isLastNode(), this.isRoot, this._level),
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
