<script>
	import { getElementPosition, convertToUnit } from '../../utils/helpers';
	import { Point } from './CoordinateSystem';
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
        zoom,
        scroll
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

			onBeforeUnmount(() => {
        document.body.removeEventListener('mousemove', mouseMove)
        document.body.removeEventListener('mouseup', mouseUp)
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
				transformOrigin: zoomState.value > 1 ? `0 0` : undefined
      }))


      // Drag
      const isDrag = ref(false)
			const activeDragIds = ref([])

      const startPosition = {
        top: 0,
        left: 0,
      }

      const mouseStartPosition = {
        pageX: 0,
        pageY: 0
      }
      let target = null

			function getConnectorId(el, ids) {
        if (el.classList.contains('g-connector')) ids.push(el.id)
				if (el.children.length !== 0) {
				  for (let children of el.children) {
				    getConnectorId(children, ids)
					}
				}
			}

			function getConnectorIds(el) {
        const ids = []
				getConnectorId(el, ids)
				return ids
			}

      function dragStart(e) {
        e.preventDefault()

        target = e.currentTarget
				activeDragIds.value = getConnectorIds(target)
				console.log(activeDragIds.value)

        const rect = getElementPosition(target)
        startPosition.top = (rect.top - originCoordinate.y)/zoomState.value
        startPosition.left = (rect.left - originCoordinate.x)/zoomState.value
        mouseStartPosition.pageX = e.pageX
        mouseStartPosition.pageY = e.pageY
				isDrag.value = true
        target.style.cursor = 'move'
      }

      function drag(e) {
        e.preventDefault()

        if (isDrag.value) {
          const newTop = startPosition.top - (mouseStartPosition.pageY - e.pageY)/zoomState.value
          const newLeft = startPosition.left - (mouseStartPosition.pageX - e.pageX)/zoomState.value

          target.style.top = newTop + 'px'
          target.style.left = newLeft + 'px'
        }
      }

      function dragEnd(e) {
        e.preventDefault()

        if(isDrag.value) {
          activeDragIds.value = []
          isDrag.value = false
          target.style.cursor = ''
        }
      }

      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', dragEnd);

			// Render function
      function genDiagram() {
        return <div class="g-diagram-container" style={containerStyles.value} vOn:wheel={zoom} vOn:scroll={scroll} scroll-top="500" ref="container">
          <div class="g-diagram-content" style={contentStyles.value} ref="content">
            <portal-target name={diagramId.value} tag="svg" multiple ref="svg"/>
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
			overflow: scroll;
			@include elevation(4)
		}

		&-content {
			border: 1px solid green;
			//position: relative;
			width: 100%;
			height: 100%;
			//transform-origin: 0 0;

			//will-change: transform;

			svg {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 1000;
			}
		}
	}
</style>