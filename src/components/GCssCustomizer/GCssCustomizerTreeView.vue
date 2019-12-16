<script>
  import GTreeFactory, { genTextFactory } from '../GTreeViewFactory/GTreeFactory';
  import GIcon from '../GIcon/GIcon';
  import { getInternalValue } from '../../mixins/getVModel';

  export default {
    name: 'GCssCustomizerTreeView',
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

      value: {
        type: Object
      }
		},
    setup (props, context) {
      const genText = genTextFactory(props.itemText)

      const tree = getInternalValue(props, context)

			const togglePath = (path) => {
        tree.value.activePath = path
			}

      const genIcon = function (state) {
        return <g-icon size="10" vOn:click={() => state.collapse = !state.collapse}>
          {state.collapse ? 'far fa-plus-square' : 'far fa-minus-square'}
        </g-icon>
      }

      const genNode = function ({node, text, childrenVNodes, isLast, state, path}) {
        return <li>
          <span class="tree-view-prepend">
            {childrenVNodes && genIcon(state)}
          </span>
          <span class={['tree-view-text', {'tree-view-text__active': path === tree.value.activePath}]} vOn:click={() => togglePath(path)}>
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
        expandLevel: props.expandLevel,
      })

      return {
        treeStates,
        genTree,
      }
		},
    render() {
      return this.genTree()
    }
  }
</script>
<style scoped lang="scss">
	ul {
		list-style-type: none;
		padding-left: 16px;
		margin: 0;
		line-height: 1.2;
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
		font-size: 12px;

		&:not(.tree-view-text__active):not(.tree-view-text__disabled):not(.tree-view-text__connected):hover {
			background-color: lightgreen;
		}

		&.tree-view-text__connected:not(.tree-view-text__active):hover {
			background-color: #f097a3;
		}

		&__active {
			&:not(.tree-view-text__disabled) {
				background-color: forestgreen;
				color: white;
			}

			&.tree-view-text__connected {
				background-color: #b8162c;
				color: white;
			}
		}

		&__disabled {
			color: #d0d0d0
		}

		&__connected {
			color: #b8162c
		}
	}
</style>