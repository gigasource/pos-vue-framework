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
						return 'lime-darken-4'
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
				return <g-connector point-radius="8"
														point-color={itemColor.value}
														point-position="x"
														path-color={itemColor.value}
														path-width="2"
														value={model.value}
														vOn:connected={endVal => connect(model.value, endVal)}
														vOn:disconnected={endVal => disconnect(model.value, endVal)}>
          <div class={['g-binding-diagram-item', `b-${itemColor.value}`, `text-${itemColor.value}`]} vShow={model.value.show}>
            <div class={['g-binding-diagram-item-type', `bg-${itemColor.value}`]}>
              {model.value.type}
            </div>
            {model.value.key}
            <span/>
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
	.g-binding-diagram-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 30px;
		border: 1px solid;
		border-radius: 6px;
		padding: 10px;
		margin: 3px 0;
		font-size: 14px;

		&-type {
			padding: 2px;
			border-radius: 4px;
			font-size: 10px;
			color: white;
		}
	}
</style>