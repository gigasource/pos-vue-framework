<script>
  import { computed, ref } from '@vue/composition-api';
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

      const openPath = ref(null)

      const itemText = props.itemText || ((node, isRoot) => {
        if (node.type === 'subheader') {
          return <span class='g-treeview-subheader'>{node.subheader}</span>
        } else if (node.type === 'divider') {
          return <g-divider/>
        } else {
          return <span class='g-treeview-title'>{node.title}</span>
        }
      })

      const genNode = function ({ node, text, childrenVNodes, state, path }) {
        const icon = node.icon && <g-icon class="g-treeview-icon">{node.icon}</g-icon>
        if (openPath.value !== path && (openPath.value && !openPath.value.toString().includes(path))) {
          state.collapse = true
        }
        const children = childrenVNodes && <div vShow={!state.collapse} class="g-treeview-children">{childrenVNodes}</div>
        return <li class={[!state.collapse && childrenVNodes && openPath.value === path ? 'g-treeview__open' : null]}>
          <a class={[node.type === 'subheader' ? null : 'g-treeview-item waves-effect', props.rounded ? 'g-treeview-item__rounded' : null, !childrenVNodes && activePath.value === path ? 'g-treeview__active' : null]}
             vOn:click_stop={() => {
               activePath.value = path;
               if (childrenVNodes) {
                 state.collapse = !state.collapse;
                 openPath.value = path
               }
             }}>
            {icon}
            {text}
            <span
              class='g-treeview-action'
              vShow={childrenVNodes}>
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
		margin: 0;
	}

	li {
		padding: 0;
	}

	.g-treeview {
		&-item {
			display: flex;
			align-items: center;
			contain: layout;

			&:not(.g-treeview-subheader):hover {
				margin-right: 8px;
				background: rgba(0, 0, 0, 0.12);

				> .g-treeview-action {
					/*margin-right: 8px;*/
				}
			}

			&__rounded {
				border-top-right-radius: 32px;
				border-bottom-right-radius: 32px;
			}
		}

		&-icon {
			margin: 16px;
			font-size: 20px !important;
		}

		&-title {
			font-size: 14px;
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
			margin-right: 8px;
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

		&-children {
			.g-treeview-icon {
				font-size: 12px !important;
			}

			ul {
				padding-left: 4px;
			}
		}
	}
</style>
