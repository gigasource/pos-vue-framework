<script>
	import _ from 'lodash'
	import { VNode } from 'vue'
  import { genHeaderFactory, getExpansionModel } from './GExpansionFactory';
  import { provide } from '@vue/composition-api';
  import GSectionsHeader from './GSectionsHeader';

  export default {
    name: 'GSections',
    components: { GSectionsHeader },
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      value: null,

      itemHeader: {
        default: 'header',
        type: [String, Function]
      },
    },
    setup(props, context) {
      const { model, toggleItem, isActiveItem } = getExpansionModel(props, context)

			provide ('toggleItem', toggleItem)
			provide ('isActiveItem', isActiveItem)


			const genContent = (slotsNodes) => {
				const headerNodes = _.filter(slotsNodes, node => node.tag && node.tag.indexOf('GSectionsHeader') > -1)
        const itemNodes = _.filter(slotsNodes, node => node.tag && node.tag.indexOf('GSectionsItem') > -1)

				for (let i = 0; i < itemNodes.length; i++) {
					if (headerNodes[i]) {
					  headerNodes[i].componentOptions.propsData.item = itemNodes[i].componentOptions.propsData.item
					} else {
            headerNodes.push(
              <g-sections-header item={itemNodes[i].componentOptions.propsData.item} header-text={itemNodes[i].componentOptions.propsData.header}>

              </g-sections-header>
            )
          }
				}

				return _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
			}

      const genSections = () => {
        return <div class='g-sections'>
          {context.slots.default ? genContent(context.slots.default()) : undefined}
        </div>
      }

      return {
        genSections
      }
    },
    render() {
      return this.genSections()
    }
  }
</script>

<style lang="scss" scoped>
	.g-sections {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style-type: none;
		padding: 0;
		z-index: 1;

		> * {
			cursor: auto;
		}

		> *:last-child {
			border-bottom: 1px solid #E0E0E0;
		}
	}
</style>
