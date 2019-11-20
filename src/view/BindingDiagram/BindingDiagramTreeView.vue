<script>
  import { ref, computed } from '@vue/composition-api';
  import { getInternalValue } from '../../mixins/getVModel';
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
      data: [Object, Array],

			value: ''
    },
    setup(props, context) {
      const genText = genTextFactory(props.itemText)

			const activePath = getInternalValue(props, context)

			const genIcon = function (state) {
        return <g-icon size="16" vOn:click={() => state.collapse = !state.collapse}>
						{state.collapse ? 'far fa-plus-square' : 'far fa-minus-square'}
					</g-icon>
			}

      const genNode = function ({node, text, childrenVNodes, isLast, state, path}) {
        return <li>
          <span class="tree-view-prepend">
						{childrenVNodes && genIcon(state)}
					</span>
					<span class={['tree-view-text', {'tree-view-text__active': path === activePath.value}]} vOn:click={() => activePath.value = path}>
						{genText.value(node)}
          </span>
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
	}

	.g-tree-view__collapse-expand {
		alignment: center;
		margin-right: 3px;

		span {
			width: 5px;
			height: 5px;
		}
	}

	.tree-view-prepend {
		padding-right: 4px;
	}

	.tree-view-text {
		border-radius: 4px;
		padding: 2px 4px;

		&:not(.tree-view-text__active):hover {
			background-color: lightgreen;
		}

		&__active {
			background-color: forestgreen;
			color: white;
		}
	}

</style>
