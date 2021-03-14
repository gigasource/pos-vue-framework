<script>
	import _ from 'lodash'
  import { getExpansionModel } from './GExpansionFactory';
  import { provide } from 'vue';
  import GSectionsHeader from './GSectionsHeader';
  import GSectionsItem from './GSectionsItem';
  import {Fragment} from 'vue';
  import {genScopeId} from "../../utils/helpers";

  export default {
    name: 'GSections',
    components: { GSectionsHeader, GSectionsItem },
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      modelValue: null,
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
        if (slotsNodes[0] && slotsNodes[0].type === Fragment) {
          slotsNodes = slotsNodes[0].children;
        }
				const headerNodes = _.filter(slotsNodes, node => node.type && node.type.name.indexOf('GSectionsHeader') > -1)
        const itemNodes = _.filter(slotsNodes, node => node.type && node.type.name.indexOf('GSectionsItem') > -1)

				for (let i = 0; i < itemNodes.length; i++) {
					if (headerNodes[i]) {
            itemNodes[i].props.item = i + 1
					  headerNodes[i].props.item = i + 1
					} else {
            itemNodes[i].props.item = i + 1
            headerNodes.push(
              <g-sections-header item={i + 1} header-text={itemNodes[i].props.header}/>
            )
          }
				}

				const result =  _.compact(_.flatten(_.zip(headerNodes, itemNodes)))
        return result;
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

      const genSections = genScopeId(() => {
				return <div class='g-sections'>
					{context.slots.default ? genContentSlotDefault(context.slots.default()) : props.itemHeaders ? genContentItemHeader() : undefined}
				</div>
      })

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
