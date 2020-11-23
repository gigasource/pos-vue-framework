<script>
	import _ from 'lodash'
  import { getExpansionModel } from './GExpansionFactory';
  import { provide } from 'vue';
  import GSectionsHeader from './GSectionsHeader';
  import GSectionsItem from './GSectionsItem';

  export default {
    name: 'GSections',
    components: { GSectionsHeader, GSectionsItem },
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      value: null,
			returnObject: {
        type: Boolean,
				default: true
			},

      itemHeaders: {
        type: Array
      },
    },
    setup(props, context) {
      const { model, toggleItem, isActiveItem } = getExpansionModel(props, context)

			provide ('toggleItem', toggleItem)
			provide ('isActiveItem', isActiveItem)

			const genContentSlotDefault = (slotsNodes) => {
				const headerNodes = _.filter(slotsNodes, node => node.tag && node.tag.indexOf('GSectionsHeader') > -1)
        const itemNodes = _.filter(slotsNodes, node => node.tag && node.tag.indexOf('GSectionsItem') > -1)

				for (let i = 0; i < itemNodes.length; i++) {
					if (headerNodes[i]) {
            itemNodes[i].componentOptions.propsData.item = i + 1
					  headerNodes[i].componentOptions.propsData.item = i + 1
					} else {
            itemNodes[i].componentOptions.propsData.item = i + 1
            headerNodes.push(
              <g-sections-header item={i + 1} header-text={itemNodes[i].componentOptions.propsData.header}/>
            )
          }
				}

				return _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
			}

			const genContentItemHeader = () => {
				const headerNodes = []
				const itemNodes = []

				props.itemHeaders.map((header, index) => {
				  headerNodes.push(
            <g-sections-header item={index + 1} header-text={header}/>
					)
					itemNodes.push(
            <g-sections-item item={index + 1}>
              {context.slots[header] ? context.slots[header]() : undefined}
            </g-sections-item>
					)
				})

        return _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
			}

      const genSections = () => {
				return <div class='g-sections'>
					{context.slots.default ? genContentSlotDefault(context.slots.default()) : props.itemHeaders ? genContentItemHeader() : undefined}
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
