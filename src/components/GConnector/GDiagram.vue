<script>
	import { convertToUnit } from '../../utils/helpers';
  import { ref, computed, provide, onMounted } from '@vue/composition-api';
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

      document.body.addEventListener('mousemove', function (e) {
        eventEmitter.$emit('draw', e)
      })

      document.body.addEventListener('mouseup', function (e) {
        eventEmitter.$emit('drawEnd', e)
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

			// Render function
      function genDiagram() {
        return <div class="g-diagram-container" style={containerStyles.value} vOn:wheel={zoom} vOn:scroll={scroll} scroll-top="500" ref="container">
          <div class="g-diagram-content" style={contentStyles.value} ref="content">
            <portal-target name={diagramId.value} tag="svg" multiple ref="svg">

            </portal-target>
            {context.slots.default ? context.slots.default() : undefined}
          </div>
        </div>
      }

      return {
        genDiagram
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