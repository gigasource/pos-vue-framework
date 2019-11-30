<script>
  import { ref, computed, onMounted } from '@vue/composition-api';
  import { getInternalValue } from '../../mixins/getVModel';
  import GTreeFactory, { genTextFactory } from '../GTreeViewFactory/GTreeFactory';
	import GIcon from '../GIcon/GIcon';
	import _ from 'lodash';
  export default {
    name: 'GBindingDiagramTreeView',
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
			slotted: {
        type: Boolean,
				default: false
			},
      data: [Object, Array],

			value: {
        type: Object
			}
    },
    setup(props, context) {
      const genText = genTextFactory(props.itemText)

			const tree = getInternalValue(props, context)

      onMounted(() => {
        tree.value.allPaths = _.keys(treeStates)
      })

      const togglePath = (path) =>  {
				tree.value.activePath = path
			}

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
					<span class={['tree-view-text', {'tree-view-text__active': path === tree.value.activePath}]} vOn:click={() => togglePath(path)}>
						{node.virtualNode ? 'slot:' : ''} {genText.value(node)}
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

      const itemChildren = props.slotted ? function (node, {path, parent, isRoot}) {
        if (isRoot) {
          node.items = _.forEach(node.items, (val, key) => {
            val['origKey'] = key
          })
          return node.items;
        }
        if (node.virtualNode) return node.items;
        node.items = _.forEach(node.items, (val, key) => {
          val['origKey'] = key
				})
        const slotGroups = _.groupBy(node.items, i => i.slot || 'default');
        return _.map(slotGroups, (items,slot) => {
          return {
            component: slot,
						virtualNode: true,
						items
					}
				})
			} : undefined

			const itemPath = function(node, {parent, path, isRoot, key}) {
        if (isRoot) return;
        if (node.virtualNode) return `slot.${key}`;
        if (key) {
          return `${props.itemChildren}.${node.origKey || key}`;
        }
			}

      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
        data: props.data,
        itemChildren,
        itemPath,
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
		font-size: 14px;

		&:not(.tree-view-text__active):hover {
			background-color: lightgreen;
		}

		&__active {
			background-color: forestgreen;
			color: white;
		}
	}

</style>
