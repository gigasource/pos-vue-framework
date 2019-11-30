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

			function toggleItem() {
        context.emit('toggle')
			}

      const genBindingDiagramItem = () => {
        return <div class={['g-binding-diagram-editor-item', `b-${itemColor.value}`, `text-${itemColor.value}`]}>
          <div class={['g-binding-diagram-editor-item-type', `bg-${itemColor.value}`]}>
            {model.value.type}
          </div>
          {model.value.key}
          <g-icon color={itemColor.value} size="16" vOn:click={toggleItem}>
						{model.value.show ? 'fas fa-eye' : 'fas fa-eye-slash'}
          </g-icon>
				</div>
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
	.g-binding-diagram-editor-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 30px;
		border: 1px solid;
		border-radius: 6px;
		padding: 10px;
		margin: 5px 0;
		font-size: 14px;

		&-type {
			padding: 2px;
			border-radius: 4px;
			font-size: 10px;
			color: white;
		}
	}
</style>