<script>
  import { ref, reactive, computed, provide } from '@vue/composition-api';
  import Vue from 'vue';

  export default {
    name: 'GDiagram',
    props: {},
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
				x: 0,
				y: 0
			})

      function zoom(e) {
        if (!Number.isInteger(e.deltaY)) {
          e.preventDefault()

					const delta = e.deltaY > 0 ? -1 : 1
					const scroll = {
            top: context.refs.container.scrollTop,
						left: context.refs.container.scrollLeft
					}
					const zoomPoint = {
            x: (e.pageX + scroll.left)/zoomState.value,
            y: (e.pageY + scroll.top)/zoomState.value
					}

					zoomState.value += delta * scaleFactor * zoomState.value
					zoomState.value = Math.max(minScale, Math.min(maxScale, zoomState.value))
					if (zoomState.value < 1) {
					  originCoordinate.x = (1 - zoomState.value)/2*context.refs.content.offsetWidth
            originCoordinate.y = (1 - zoomState.value)/2*context.refs.content.offsetHeight
					} else {
						const newZoomPoint = {
						  x: zoomPoint.x * zoomState.value,
							y: zoomPoint.y * zoomState.value
						}

						context.refs.container.scrollLeft = newZoomPoint.x - e.pageX
            context.refs.container.scrollTop = newZoomPoint.y - e.pageY
					}
        }
      }

      function scroll(e) {
        originCoordinate.x = -e.target.scrollLeft;
        originCoordinate.y = -e.target.scrollTop;
      }

      const containerStyles = computed(() => ({
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
        return <div class="g-diagram-container" vOn:wheel={zoom} vOn:scroll={scroll} scroll-top="500" ref="container">
          <div class="g-diagram-content" style={containerStyles.value} ref="content">
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
	.g-diagram {
		&-container {
			border: 1px solid red;
			width: 100%;
			height: 100%;
			overflow: scroll;
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