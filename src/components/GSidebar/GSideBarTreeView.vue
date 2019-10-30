<script>
  import { computed, onMounted } from '@vue/composition-api';
  import GTreeFactory, { genTextFactory } from '../GTreeViewFactory/GTreeFactory';
  import GDivider from '../GLayout/GDivider';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GSideBarTreeView',
    components: { GIcon, GDivider },
    props: {
      itemText: {
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
          return node.subheader
        } else if (node.type === 'divider') {
					return <g-divider/>
        } else {
          return node.title
        }
      })

      const genNode = function ({node, text, childrenVNodes, isLast, state, path}) {
        const icon = node.icon
          ?		<g-icon class="g-treeview-icon">{node.icon}</g-icon>
					: null
        return <li>
					<a class="waves-effect g-treeview-item">
            {icon}
            <span class="g-treeview-title">{text}</span>
            <span
              class='g-treeview-action'
              vShow={childrenVNodes}
              vOn:click={() => state.collapse = !state.collapse}>
              <g-icon>
                {state.collapse ? 'chevron_right' : 'expand_more'}
              </g-icon>
            </span>
					</a>
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
		padding: 0;
  }

	li {
		padding: 0;
	}

	.g-treeview {
		&-item {
			display: flex;
			align-items: center;
		}

		&-icon {
			margin: 16px;
		}

		&-title {
			font-size: 16px;
			line-height: 1.75;
			flex: 1 1 100%;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
