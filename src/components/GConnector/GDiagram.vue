<script>
	import { convertToUnit } from '../../utils/helpers';
  import { ref, computed, provide, onMounted, onBeforeUnmount } from '@vue/composition-api';
  import GDiagramFactory from './GDiagramFactory';
  import Vue from 'vue';

  export default {
    name: 'GDiagram',
    props: {
      width: [Number, String],
      height: [Number, String],
			position: [String],
			top: {
        type: [Number, String],
				default: 0
			},
      left: {
        type: [Number, String],
        default: 0
      },
			minZoom: {
        type: [Number, String],
				default: 0.1
			},
      maxZoom: {
        type: [Number, String],
        default: 100
      },
      zoomSpeed: {
        type: [Number, String],
        default: 5
      }
		},
    setup(props, context) {
      const diagramId = ref('null')

      onMounted(function() {
        diagramId.value = `${this._uid}`
			})

      const eventEmitter = new Vue()

			const {
        connectionPoints,
        zoomState,
        originCoordinate,
				svgDimension,
        zoom,
        scroll,
        isDrag,
        activeDragIds,
        dragStart,
        drag,
        dragEnd
      } = GDiagramFactory(props, context)

      provide('diagramId', diagramId)
      provide('eventEmitter', eventEmitter)
      provide('connectionPoint', connectionPoints)
      provide('zoomState', zoomState)
			provide('originCoordinate', originCoordinate)

			const activeDrawId = ref(null)
			provide('activeDrawId', activeDrawId)

			const mouseMove = function (e) {
        if (activeDrawId.value) {
          eventEmitter.$emit(`draw${activeDrawId.value}`, e)
        }
				if (isDrag.value) {
				  for (let id of activeDragIds.value) {
				    eventEmitter.$emit(`drag${id}`)
					}
				}
      }

      const mouseUp = function (e) {
        if (activeDrawId.value) {
          eventEmitter.$emit(`drawEnd${activeDrawId.value}`, e)
        }
        if (isDrag.value) {
          for (let id of activeDragIds.value) {
            eventEmitter.$emit(`dragEnd${id}`)
          }
        }
      }

      document.body.addEventListener('mousemove', mouseMove)
      document.body.addEventListener('mouseup', mouseUp)
      document.body.addEventListener('mousemove', drag);
      document.body.addEventListener('mouseup', dragEnd);

			onBeforeUnmount(() => {
        document.body.removeEventListener('mousemove', mouseMove)
        document.body.removeEventListener('mouseup', mouseUp)
        document.body.removeEventListener('mousemove', drag);
        document.body.removeEventListener('mouseup', dragEnd);
			})

			// Dynamic styles
      const containerStyles = computed(() => ({
				width: convertToUnit(props.width),
				height: convertToUnit(props.height),
				position: props.position,
				top: convertToUnit(props.top),
				left: convertToUnit(props.left),
			}))

      const contentStyles = computed(() => ({
        transform: `scale(${zoomState.value}, ${zoomState.value})`,
				//transformOrigin: zoomState.value > 1 ? `0 0` : undefined
				transformOrigin: `0 0`
      }))



			// Render function
      function genDiagram() {
        return <div class="g-diagram-container" style={containerStyles.value} vOn:wheel={zoom} vOn:scroll={scroll} ref="container">
          <div class="g-diagram-content" style={contentStyles.value} ref="content">
            <portal-target name={diagramId.value} width={svgDimension.width} height={svgDimension.height} tag="svg" multiple ref="svg"/>
						<portal to={diagramId.value} slim>
							<foreignObject width="100%" height="100%">
              	{context.slots.default ? context.slots.default({ dragStart }) : undefined}
              </foreignObject>
						</portal>
          </div>
        </div>
      }

      return {
        genDiagram,
				connectionPoints
      }
    },
    render() {
      return this.genDiagram()
    }
  }
</script>
<style scoped lang="scss">
	@import "../../style/elevation";

	.g-diagram {
		&-container {
			border: 1px solid grey;
			width: 100%;
			height: 100%;
			overflow: auto;
			@include elevation(4)
		}

		&-content {
			//position: relative;
			width: 100%;
			height: 100%;
			//transform-origin: 0 0;

			//will-change: transform;

			svg {
				position: absolute;
				//width: 100%;
				//height: 100%;
				z-index: 1000;
			}
		}
	}
</style>