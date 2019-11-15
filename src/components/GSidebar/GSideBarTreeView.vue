<script>
  import { computed, ref } from '@vue/composition-api';
  import GTreeFactory, { genTextFactory } from '../GTreeViewFactory/GTreeFactory';
  import GDivider from '../GLayout/GDivider';
  import GIcon from '../GIcon/GIcon';
  import { GExpandTransition } from '../transition/transition';
  import GBadge from '../GBadge/GBadge';

  export default {
    name: 'GSideBarTreeView',
    components: { GBadge, GIcon, GDivider, GExpandTransition },
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
        const icon = node.icon && <g-icon class={["g-treeview-icon", node.iconType === 'small' && "g-treeview-icon__small"]}>{node.icon}</g-icon>
        if (openPath.value !== path && (openPath.value && !openPath.value.toString().includes(path+'.'))) {
          state.collapse = true
        }
        const children = childrenVNodes && <div vShow={!state.collapse} class="g-treeview-children">{childrenVNodes}</div>
        const scopedSlots = {
					badge: scope => <span>{node.badge}</span>
        }
        const badge = node.badge && <g-badge inline color={node.badgeColor} scopedSlots={scopedSlots} style={childrenVNodes ? {'margin-right': '4px'} : {'margin-right': '44px'}}/>
        const data = {
          class: [node.type !== 'subheader' && node.type !== 'divider'
            ? 'g-treeview-item waves-effect'
            : null,
            props.rounded ? 'g-treeview-item__rounded' : null,
            !childrenVNodes && activePath.value === path
              ? 'g-treeview__active'
              : null],
          on: {
            click: (e) => {
              e.stopPropagation()
              if (childrenVNodes) {
                state.collapse = !state.collapse;
                openPath.value = path
              } else
              	activePath.value = path;
            }
          },
        }
        return <li class={!state.collapse && childrenVNodes && 'g-treeview__open'}>
          <a {...data}>
            {icon}
            {text}
            {badge}
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
        return <ul class="g-treeview-wrapper">{childrenVNodes}</ul>
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

	.g-treeview-wrapper {
		overflow-y: auto;

		/* TODO custom scrollbar */
		/*&:hover::-webkit-scrollbar {*/
		/*	width: 6px;*/
		/*	display: block;*/
		/*}*/

		/*&::-webkit-scrollbar {*/
		/*	width: 6px;*/
		/*	display: none;*/
		/*}*/

		/*&::-webkit-scrollbar-thumb{*/
		/*	background-color: rgba(170, 170, 170, 0.6);*/
		/*	border-radius: 4px;*/
		/*}*/
	}

	li {
		padding: 0;
	}

	.g-treeview {
		&-item {
			display: flex;
			align-items: center;
			contain: layout;
			margin-right: 8px;
			transition: none;
			color: rgba(0, 0, 0, .87);

			&:not(.g-treeview-subheader):hover {
				background: rgba(0, 0, 0, 0.035);
			}

			&__rounded {
				border-top-right-radius: 32px;
				border-bottom-right-radius: 32px;
			}
		}

		&-icon {
			margin: 12px 16px;
			font-size: 20px !important;
			color: rgba(0, 0, 0, .54);

			&__small {
				font-size: 12px !important;
				margin: 16px 16px 16px 20px;
			}
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

			> .g-icon {
				font-size: 18px !important;
				color: rgba(0, 0, 0, .54);
			}
		}

		&__open {
			background-color: rgba(0, 0, 0, .035);

			> .g-treeview-item {
				border-radius: 0;
			}

			.g-treeview__open {
				background-color: rgba(0, 0, 0, .015);
			}
		}

		&__active {
			background: linear-gradient(45deg, #8e24aa, #ff6e40) !important;
			color: white;

			.g-icon {
				color: inherit;
			}
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
			ul {
				/*padding-left: 4px;*/
			}
		}
	}
</style>
