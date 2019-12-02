<script>
  import { getInternalValue } from '../../mixins/getVModel';
  import { ref, computed, provide, inject, onMounted, onBeforeUnmount } from '@vue/composition-api';
  import GBindingDiagramItem from './GBindingDiagramItem';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GBindingDiagramItemGroup',
    components: { GBindingDiagramItem },
    props: {
      value: Object,

			top: {
        type: [Number, String],
				default: 0
      },
			left: {
        type: [Number, String],
        default: 0
      }
		},
    setup (props, context) {
      const model = getInternalValue(props, context)
			const itemZIndex = inject('itemZIndex')

			const onMousedown = function (e) {
        itemZIndex.value++
				e.currentTarget.style.zIndex = itemZIndex.value
        context.emit('edit', model.value.path)
        context.emit('dragStart', e)
			}

      function connect(startVal, endVal) {
        context.emit('connected', startVal, endVal)
      }

      function disconnect(startVal, endVal) {
        context.emit('disconnected', startVal, endVal)
      }

			const styles = computed(() => ({
				top: convertToUnit(props.top),
				left: convertToUnit(props.left)
			}))

      const genBindingDiagramItemGroup = () => {
				return <div class="g-binding-item-group b-grey" style={styles.value} vOn:mousedown={onMousedown}>
					{model.value.name}
					{model.value.items.map((item) => {
            return <g-binding-diagram-item value={item} path={model.value.path} vOn:connected={connect} vOn:disconnected={disconnect}/>
					})}
				</div>
			}

			return {
        genBindingDiagramItemGroup
			}
		},
		render () {
      return this.genBindingDiagramItemGroup()
		}
  }
</script>
<style scoped lang="scss">
	.g-binding-item-group {
		position: absolute;
		background-color: white;
		//top: 20px;
		//left: 20px;
		display: flex;
		flex-direction: column;
		padding: 3px 6px;
		border: 1px solid;
		border-radius: 6px;
		width: 200px;
	}
</style>