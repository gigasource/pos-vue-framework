<script>
  import { computed, inject } from '@vue/composition-api';
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
      const genText = node => `${node['name'] || node['start']}`
			const genClosedEl = node => `${node['start']}...${node['end']}`
			const genEndTag = node => `${node['end']}`
			const genEmptyEl = node => {
        if (node['start'] && node['end']) return `${node['start']}${node['end']}`
				else return `${node['name']}`
      }

      const tree = getInternalValue(props, context)

			const computedData = computed(() => props.data)

			const togglePath = (node, path) => {
        if (node.tag) tree.value.activePath = path
			}

			const mouseEnterElement = inject('mouseEnterElement')
      const mouseLeaveElement = inject('mouseLeaveElement')

			const genTextPretty = (html) => {
				let temp = html.replace(/="|"|<\/*|>/g, match => ` ${match} `)
				temp = temp.split(' ')
				let printResource = _.map(temp, (val, index, arr) => {
				  let type
					if (html.indexOf('<') === -1 || html.indexOf('>') === -1) type ='text'
					else if (val.indexOf('<') > -1 || val.indexOf('>') > -1) type = 'tagquote'
					else if (index > 0 && arr[index - 1].indexOf('<') > -1) type = 'tag'
					else if (html.indexOf(`${val}=`) > -1) type ='attribute'
					else if (val.indexOf(`"`) > -1) type = 'quote'
					else type = 'value'
					return {
					  type: type,
						string: val
					}
				})

        return <span class="tree-view-text">
					{printResource.map((val, index, arr) => {
						return <span class={`tree-view-text-${val.type}`}>
							{val.type === 'quote' || val.type === 'tagquote' || (arr[index+1] && arr[index+1].type === 'quote') || (arr[index+1] && arr[index+1].type === 'tagquote') ? val.string : val.string + ' '}
						</span>
					})}
				</span>
			}

      const genIcon = function (state) {
        return <g-icon size="10" vOn:click={(e) => {
          state.collapse = !state.collapse
					e.stopPropagation()
        }}>
          {state.collapse ? 'far fa-plus-square' : 'far fa-minus-square'}
        </g-icon>
      }

      const genCloseTag = (node, path) => {
        return <div class={['tree-view-node', {'tree-view-node__active': path === tree.value.activePath}]}
                    vOn:click={() => togglePath(node, path)}
                    vOn:mouseenter={() => {if (node.tag) mouseEnterElement(path)}}
                    vOn:mouseleave={() => {if (node.tag) mouseLeaveElement()}}>
          {genTextPretty(genEndTag(node))}
				</div>
			}

      const genNode = function ({node, childrenVNodes, state, path}) {
        return <li>
					<div class={['tree-view-node', {'tree-view-node-text': !node.tag, 'tree-view-node__active': path === tree.value.activePath}]}
               vOn:click={() => togglePath(node, path)}
               vOn:mouseenter={() => {if (node.tag) mouseEnterElement(path)}}
               vOn:mouseleave={() => {if (node.tag) mouseLeaveElement(path)}}>
						<span class="tree-view-prepend">
							{childrenVNodes && genIcon(state)}
						</span>
						{!childrenVNodes ? genTextPretty(genEmptyEl(node)) : !state.collapse ? genTextPretty(genText(node)) : genTextPretty(genClosedEl(node))}
          </div>
          {!state.collapse ? childrenVNodes : undefined}
					{childrenVNodes && !state.collapse && node['end'] ? genCloseTag(node, path) : undefined}
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

      const itemChildren = (node) => {
        return node['children']
			}

			const itemPath = (node, {isRoot, key}) => {
        if (isRoot) return
				if (key) {
				  return `children.${key}`
				}
      }

      const { treeStates, genTree } = GTreeFactory({
        genNode,
        genWrapper,
        genRootWrapper,
				itemChildren,
				itemPath,
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
		//padding: 0 4px 2px 4px;
		font-size: 10px;

		&-tag {
			color: rgb(135, 27, 127)
		}

		&-attribute {
			color: rgb(156, 78, 28)
		}

		&-quote, &-tagquote {
			color: rgb(56, 56, 61)
		}

		&-value {
			color: rgb(28, 35, 163)
		}

		&-text {
			color: rgb(56, 52, 60)
		}
	}

	.tree-view-node {

		&:not(.tree-view-node__active):not(.tree-view-node-text):hover {
			background-color: #e6edf1;
		}

		&__active {
			background-color: #e0e0e0;
		}
	}
</style>