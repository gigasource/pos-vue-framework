<script>
	import { getInternalValue } from '../../mixins/getVModel';
  import { ref, computed, provide, onMounted, onBeforeUnmount } from '@vue/composition-api';
	import GChip from '../GChip/GChip';
  import GConnector from '../GConnector/GConnector';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GBindingDiagramItem',
		components: { GChip, GConnector, GIcon },
    props: {
      value: {
        type: Object,
				default: {
				  type: 'prop',
					key: 'unknown'
				}
			}
		},
    setup (props, context) {
      const model = getInternalValue(props, context)

			const itemColor = computed(() => {
			  switch (model.value.type) {
					case 'prop':
					  return 'green'
          case 'emit':
            return 'teal'
          case 'slot':
            return 'pink'
					case 'data':
					  return 'cyan'
					case 'func':
						return 'lime'
					default:
					  return 'black'
        }
			})

			function connect(startVal, endVal) {
        context.emit('connected', startVal, endVal)
			}

      function disconnect(startVal, endVal) {
        context.emit('disconnected', startVal, endVal)
      }

			const genBindingDiagramItem = () => {
				return <g-connector point-radius="10"
														point-color={itemColor.value}
														point-position="x"
														path-color={itemColor.value}
														value={model.value}
														vOn:connected={endVal => connect(model.value, endVal)}
														vOn:disconnected={endVal => disconnect(model.value, endVal)}>
          <div class={['g-binding-item', `b-${itemColor.value}`, `text-${itemColor.value}`]}>
            <div class={['g-binding-item-type', `bg-${itemColor.value}`]}>
              {model.value.type}
            </div>
            {model.value.key}
            <g-icon color={itemColor.value}>fas fa-times-circle</g-icon>
          </div>
        </g-connector>
			}

			return {
        genBindingDiagramItem
			}
		},
		render () {
      return this.genBindingDiagramItem()
		}
  }
</script>
<style scoped lang="scss">
	.g-binding-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		border: 1px solid;
		border-radius: 6px;
		padding: 10px;
		margin: 5px 0;

		&-type {
			padding: 3px;
			border-radius: 4px;
			font-size: 12px;
			color: white;
		}
	}
</style>