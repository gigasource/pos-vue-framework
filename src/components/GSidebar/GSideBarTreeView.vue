<script>
  import { computed } from '@vue/composition-api';
  import GTreeFactory, { genTextFactory } from '../GTreeViewFactory/GTreeFactory';

  export default {
    name: 'GSideBarTreeView',
    props: {
      itemText: {
        default: 'text',
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
      data: [Object, Array]
    },
    setup(props) {
      const itemText = props.itemText || ((node, isRoot) => {
        if (node.type === 'subheader') {
          return <span>{node.subheader}</span>
        } else if (node.type === 'divider') {
          return <hr/>
        } else {
          return <span>{node.title}</span>
        }
      })

      const genNode = function ({node, text, childrenVNodes, isLast, state, path}) {
        return <li>
          <span
              class='g-tree-view__collapse-expand'
              vShow={childrenVNodes}
              vOn:click={() => state.collapse = !state.collapse}>
            <span>
              {state.collapse ? '+' : '-'}
            </span>
          </span>
          {text}
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

      const cptExpandLevel = computed(() => props.expandLevel)
      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
        data: props.data,
        itemText,
        itemChildren: props.itemChildren,
        cptExpandLevel
      })

      return { treeStates, genTree }
    },
    render() {
      return this.genTree()
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
