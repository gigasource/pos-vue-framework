<script>
	import { getInternalValue } from '../../mixins/getVModel';
  import { ref, computed, onMounted } from 'vue';
  import { isSlotPath, isRootPath } from './GBindingDiagramFactory';
  import GChip from '../GChip/GChip';
  import GConnector from '../GConnector/GConnector';
  import GIcon from '../GIcon/GIcon';
  import {genScopeId} from "../../utils/helpers";

  export default {
    name: 'GBindingDiagramItem',
		components: { GChip, GConnector, GIcon },
    props: {
      modelValue: {
        type: Object,
				default: {
				  type: 'prop',
					key: 'unknown'
				}
			},
			path: String
		},
    emits: ['update:modelValue'],
    setup (props, context) {
      const model = getInternalValue(props, context)

			const connectorModel = computed(() => ({
				type: model.value.type,
				key: model.value.key,
				show: model.value.show,
				path: props.path
			}))

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

			const computedItemColor = ref()
      let itemType = ref();

			onMounted(() => {
			  computedItemColor.value = window.getComputedStyle(itemType.value).getPropertyValue('background-color')
			})

			const startLimit = computed(() => {
        if (isSlotPath(props.path)) {
          return 0
				} else if (!isRootPath(props.path)) {
          return 1
				}
			})

			const endLimit = computed(() => {
			  if (props.path === '') return 0
				else return 1
			})

			const filter = (startVal, endVal) => {
        if (isRootPath(startVal.path) && isSlotPath(endVal.path)) return false
				if (startVal.path === endVal.path) return false
				if (startVal.type === 'prop' && endVal.type !== 'prop' && endVal.type !== 'data') return false
				if (startVal.type === 'emit' && endVal.type !== 'func') return false
				if (startVal.type === 'slot' && endVal.type !== 'slot') return false
				return true
			}

			function connect(startVal, endVal) {
        context.emit('connected', startVal, endVal)
			}

      function disconnect(startVal, endVal) {
        context.emit('disconnected', startVal, endVal)
      }

			const genBindingDiagramItem = () => {
				return <g-connector point-radius="8"
														point-color={computedItemColor.value}
														point-position="x"
														path-color={computedItemColor.value}
														path-width="2"
														modelValue={connectorModel.value}
														start-limit={startLimit.value}
														end-limit={endLimit.value}
														filter={filter}
														onConnected={endVal => connect(model.value, endVal)}
														onDisconnected={endVal => disconnect(model.value, endVal)}
														onDragEnd={() => context.emit('dragEnd')}>
          <div class={['g-binding-diagram-item', `b-${itemColor.value}`, `text-${itemColor.value}`]} vShow={model.value.show}>
            <div class={['g-binding-diagram-item-type', `bg-${itemColor.value}`]} ref={itemType}>
              {model.value.type}
            </div>
            {model.value.key}
            <span/>
          </div>
        </g-connector>
			}

			return {
        genBindingDiagramItem: genScopeId(genBindingDiagramItem)
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
