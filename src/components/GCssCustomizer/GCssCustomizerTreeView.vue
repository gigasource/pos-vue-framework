<script>
  import { computed } from '@vue/composition-api';
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
      data: undefined,

      value: {
        type: Object
      }
		},
    setup (props, context) {
      const genText = genTextFactory(props.itemText)
			const genCloseEl = node => `${node['start']}...${node['end']}`
			const genEndTag = node => node['end']

      const tree = getInternalValue(props, context)

			const computedData = computed(() => props.data)

			const togglePath = (path) => {
        tree.value.activePath = path
			}

      const genIcon = function (state) {
        return <g-icon size="10" vOn:click={(e) => {
          state.collapse = !state.collapse
					e.stopPropagation()
        }}>
          {state.collapse ? 'far fa-plus-square' : 'far fa-minus-square'}
        </g-icon>
      }

      const genClosing = (node, path) => {
        return <div class={['tree-view-node', {'tree-view-node__active': path === tree.value.activePath}]} vOn:click={() => togglePath(path)}>
          <span class="tree-view-text">
						{node['end']}
          </span>
				</div>
			}

      const genNode = function ({node, text, childrenVNodes, isLast, state, path}) {
        return <li>
					<div class={['tree-view-node', {'tree-view-node__active': path === tree.value.activePath}]} vOn:click={() => togglePath(path)}>
						<span class="tree-view-prepend">
							{childrenVNodes && genIcon(state)}
						</span>
						<span class={['tree-view-text', {'tree-view-text__active': path === tree.value.activePath}]}>
              {!state.collapse ? genText.value(node) : genCloseEl(node) }
						</span>
          </div>
          {!state.collapse ? childrenVNodes : undefined}
					{!state.collapse ? genClosing(node, path) : undefined}
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

      const itemChildren = (node, {isRoot}) => {
        return node['children']
			}

      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
				itemChildren,
        data: computedData,
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
		padding: 0 4px 2px 4px;
		font-size: 10px;
	}

	.tree-view-node {

		&:not(.tree-view-text__active):hover {
			background-color: #e6edf1;
		}

		&__active {
			background-color: #e0e0e0;
		}
	}
</style>