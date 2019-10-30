<script>
  import { computed } from '@vue/composition-api';
  import GTreeFactory, { genTextFactory } from '../GTreeViewFactory/GTreeFactory';
  import GDivider from '../GLayout/GDivider';
  import GIcon from '../GIcon/GIcon';
  import { GExpandTransition } from '../transition/transition';

  export default {
    name: 'GSideBarTreeView',
    components: { GIcon, GDivider, GExpandTransition },
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
      data: [Object, Array],
			rounded: Boolean,
			value: null,
    },
    setup(props, context) {
			const activePath = computed({
				get: () => props.value,
				set: (val) => context.emit('input', val)
			})

      const itemText = props.itemText || ((node, isRoot) => {
        if (node.type === 'subheader') {
          return node.subheader
        } else if (node.type === 'divider') {
					return <g-divider/>
        } else {
          return node.title
        }
      })

      const genNode = function ({node, text, childrenVNodes, state, path}) {
        const icon = node.icon
          ?		<g-icon class="g-treeview-icon">{node.icon}</g-icon>
					: null
				const children = childrenVNodes ? <div vShow={!state.collapse}>{childrenVNodes}</div> : null
        return <li class={[!state.collapse && childrenVNodes ? 'g-treeview__open' : null]}>
					<a class={[node.type === 'subheader'? null : 'g-treeview-item waves-effect', props.rounded ? 'g-treeview-item__rounded' : null, !childrenVNodes && activePath.value === path ? 'g-treeview__active' : null]} vOn:click={() => activePath.value = path}>
            {icon}
            <span class={node.type === 'subheader'? 'g-treeview-subheader': 'g-treeview-title'}>{text}</span>
            <span
              class='g-treeview-action'
              vShow={childrenVNodes}
              vOn:click={() => state.collapse = !state.collapse}>
              <g-icon>
                {state.collapse ? 'chevron_right' : 'expand_more'}
              </g-icon>
            </span>
					</a>
					<g-expand-transition>{children}</g-expand-transition>
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
		padding: 0 8px 0 0;
	}

	.g-treeview {
		&-item {
			display: flex;
			align-items: center;
			contain: layout;

			&:not(.g-treeview-subheader):hover {
				background: rgba(0, 0, 0, 0.12);
			}

			&__rounded {
				border-top-right-radius: 32px;
				border-bottom-right-radius: 32px;
			}
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

		&-action {
			margin-right: 16px;
		}

		&__open {
			background-color: rgba(0, 0, 0, .035);
		}

		&__active {
			background: linear-gradient(45deg, #8e24aa, #ff6e40) !important;
		}

		&-subheader {
			display: flex;
			align-items: center;
			height: 48px;
			padding: 0 16px;
			font-size: 14px;
			font-weight: 400;
			color: rgba(0, 0, 0, 0.54);
			pointer-events: none;
			cursor: default;
		}
	}
</style>
