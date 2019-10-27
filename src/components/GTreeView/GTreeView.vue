<script>

  import { reactive } from '@vue/composition-api';
  import GTreeFactory from './GTreeFactory'

  export default {
    name: 'GTreeView',
    props: {},
    setup(props, context) {
      const genNode = function (node, childrenVNodes, isLast, state, path) {
        return <li>
          <span
              class='g-tree-view__collapse-expand'
              vShow={!!childrenVNodes}
              vOn:click={() => state.collapse = !state.collapse}>
            <span>
              {state.collapse? '+' : '-'}
            </span>
          </span>
          {node.content}
          {!state.collapse ? childrenVNodes : null}
          {isLast ? <span style="color: #959595">&nbsp;last</span> : null}
        </li>
      }

      const genWrapper = function (childrenVNodes) {
        return <ul>{childrenVNodes}</ul>
      }

      const genRootWrapper = function (childrenVNodes) {
        return (
            <div root>
              <ul>{childrenVNodes}</ul>
            </div>
        )
      }

      const treeData = reactive({ content: 'src', children: [{ content: 'assets', children: [{ content: 'config', children: [{ content: 'advance_printer.svg' }] }, { content: 'delivery' }] }, { content: 'components' }] });
      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
        treeData,
        itemText: 'content',
        itemChildrenPath: 'children',
        formatText: (v) => v[0].toUpperCase() + v.substr(1),
      })

      return { treeData, treeStates, genTree }
    },
    render() {
      return this.genTree();
    }
  }


</script>
<style scoped lang="scss">
  ul {
    list-style-type: none;
    padding-left: 20px;
    border-left: 1px dashed #aaa;
  }

  .g-tree-view__collapse-expand {
    alignment: center;
    margin-right: 3px;

    span {
      width: 5px;
      height: 5px;
    }
  }

</style>
