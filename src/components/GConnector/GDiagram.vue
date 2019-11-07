<script>
	import { convertToUnit } from '../../utils/helpers';
  import { ref, reactive, computed, provide } from '@vue/composition-api';
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
      const diagramId = reactive({
        value: 'null'
      });

      const connectionPoints = ref([])

      const eventEmitter = new Vue()

      const zoomState = ref(1)

			const scaleFactor = 0.05
			const minScale = 0.1
			const maxScale = 100

			const originCoordinate = reactive({
				x: +props.left,
				y: +props.top,
			})

      function zoom(e) {
        if (!Number.isInteger(e.deltaY)) {
          e.preventDefault()

					const delta = e.deltaY > 0 ? -1 : 1
					const scrollState = {
            top: context.refs.container.scrollTop,
						left: context.refs.container.scrollLeft
					}
					const mousePoint = {
            pageX: e.pageX - +props.left,
						pageY: e.pageY - +props.top
					}
					const zoomPoint = {
            x: (mousePoint.pageX + scrollState.left)/zoomState.value,
            y: (mousePoint.pageY + scrollState.top)/zoomState.value
					}

					zoomState.value += delta * scaleFactor * zoomState.value
					zoomState.value = Math.max(minScale, Math.min(maxScale, zoomState.value))
					if (zoomState.value < 1) {
					  originCoordinate.x = +props.left + (1 - zoomState.value)/2*context.refs.content.offsetWidth
            originCoordinate.y = +props.top + (1 - zoomState.value)/2*context.refs.content.offsetHeight
					} else {
						const newZoomPoint = {
						  x: zoomPoint.x * zoomState.value,
							y: zoomPoint.y * zoomState.value
						}

						context.refs.container.scrollLeft = newZoomPoint.x - mousePoint.pageX
            context.refs.container.scrollTop = newZoomPoint.y - mousePoint.pageY
					}
        }
      }

      function scroll(e) {
        originCoordinate.x = +props.left - e.target.scrollLeft;
        originCoordinate.y = +props.top - e.target.scrollTop;
      }

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

      provide('id', diagramId)
      provide('zoomState', zoomState)
			provide('originCoordinate', originCoordinate)
      provide('connectionPoint', connectionPoints)
      provide('eventEmitter', eventEmitter);


      document.body.addEventListener('mousemove', function (e) {
        eventEmitter.$emit('draw', e)
      })

      document.body.addEventListener('mouseup', function (e) {
        eventEmitter.$emit('drawEnd', e)
      })

      function genDiagram() {
        return <div class="g-diagram-container" style={containerStyles.value} vOn:wheel={zoom} vOn:scroll={scroll} scroll-top="500" ref="container">
          <div class="g-diagram-content" style={contentStyles.value} ref="content">
            <portal-target name={diagramId.value} tag="svg" multiple width="1000" height="1000" ref="svg">

            </portal-target>
            <portal to={diagramId.value}>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M1,1 L4,3 L1,5" stroke="green" stroke-width="1" stroke-linejoin="bevel" fill="none"/>
                </marker>
            </portal>
            {context.slots.default ? context.slots.default() : undefined}
          </div>
        </div>
      }

      return {
        diagramId,
        connectionPoints,
        containerStyles,
        zoomState,

        genDiagram
      }
    },
    render() {
      return this.genDiagram()
    },
    mounted() {
      this.diagramId.value = `${this._uid}`
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