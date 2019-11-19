<script>
  import { computed } from '@vue/composition-api';
  import GTreeFactory, { genTextFactory } from '../../components/GTreeViewFactory/GTreeFactory';
	import GIcon from '../../components/GIcon/GIcon';

  export default {
    name: 'BindingDiagramTreeView',
		components: { GIcon },
    props: {
      itemText: {
        default: 'content',
        type: [Function, String]
      },
      itemChildren: {
        default: 'children',
        type: [Function, String]
      },
      expandLevel: {
        type: Number,
        default: 0
      },
      data: Object
    },
    setup(props) {
      const genText = genTextFactory(props.itemText)

      const genNode = function ({node, text, childrenVNodes, isLast, state, path}) {
        return <li>
          <g-icon>fas fa-folder</g-icon>
					{genText.value(node)}
          {!state.collapse ? childrenVNodes : null}
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

      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
        data: props.data,
        itemChildren: props.itemChildren,
        expandLevel: props.expandLevel
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
