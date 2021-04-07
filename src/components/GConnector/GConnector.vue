<script>
import getInternalValue from '../../mixins/getVModel';
import {cloneVNode, getCurrentInstance, inject, onMounted, ref} from 'vue';
import GConnectorFactory from './GConnectorFactory';

export default {
    name: 'GConnector',
    props: {
			modelValue: [Number, String, Object],

			showPoint: {
			  type: Boolean,
				default: false
			},

			pointColor: {
        type: String,
        default: 'green'
			},
			pointRadius: {
			  type: [Number, String],
				default: 6
			},
			pointPosition: {
			  type: [String],
				default: 'all'
			},
			pathColor: {
			  type: String,
				default: 'green'
			},
			pathWidth: {
			  type: [Number, String],
				default: 2
			},

			startLimit: [Number, String],
			endLimit: [Number, String],
			filter: Function
    },
    emits: ['update:modelValue', 'connected', 'disconnected', 'dragEnd'],
    setup(props, context) {
      // Connector Id handling
      const id = ref('null')
      const {slots} = context;

      id.value = `${getCurrentInstance().uid}`;

      const model = getInternalValue(props, context)
      const diagramId = inject('diagramId')
      const connectionPoints = inject('connectionPoint')
      const zoomState = inject('zoomState')
			const originCoordinate = inject('originCoordinate')
			const eventEmitter = inject('eventEmitter')
			const activeDrawId = inject('activeDrawId')
      const slotVnode = ref();

			const { connectionPaths,
        localConnectionPoints,
				connectionRegions,
        drawStart,
        draw,
        drawEnd,
        removePath,
				updateConnectionPoints
			} = GConnectorFactory(props, context, model, id, connectionPoints, zoomState, originCoordinate, activeDrawId, slotVnode)

      onMounted(() => {
        eventEmitter.on(`draw${id.value}`, draw)
        eventEmitter.on(`drawEnd${id.value}`, drawEnd)
        eventEmitter.on(`drag${id.value}`, updateConnectionPoints)
        eventEmitter.on(`dragEnd${id.value}`, updateConnectionPoints)
      })

			// Render functions
      function genCircle(connectionPoint, r, stroke, strokeWidth, fill) {
        return <circle onMousedown={drawStart} class="g-connection-point" cx={connectionPoint.x} cy={connectionPoint.y} r={r} stroke={stroke} stroke-width={strokeWidth} fill={fill}/>
      }

      function genConnector(path, index) {
        const d = `M${path.startPoint.x} ${path.startPoint.y} C${path.startControlPoint.x} ${path.startControlPoint.y}, ${path.endControlPoint.x} ${path.endControlPoint.y}, ${path.endPoint.x} ${path.endPoint.y}`
        return <g class="g-connection-path" key={index}>
          <path class="g-connection-path-main" d={d}  pathLength="50" stroke={props.pathColor} stroke-width={props.pathWidth} fill="none" marker-end={`url(#arrow${id.value})`}/>
          <path class="g-connection-path-outline" d={d} stroke="grey" stroke-width="20" stroke-opacity="0" fill="none" tabindex="0" onKeydown={(e) => removePath(e, index)}/>
        </g>
      }

      function genGroup() {
        const slotContent = slots.default ? slots.default() : []
        const transformedSlotContent = slotContent.map(vnode => cloneVNode(vnode, {
          id: id.value,
          class: 'g-connector',
          ref: slotVnode,
        }))

        return <>
          <portal to={diagramId.value}>
						<marker id={`arrow${id.value}`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto" markerUnits="strokeWidth">
							<path d="M1,1 L4,3 L1,5" stroke={props.pathColor} stroke-width="1" stroke-linejoin="bevel" fill="none"/>
						</marker>
						<g ref="group" key={`g${id.value}`}>
							{
								localConnectionPoints.value.map(connectionPoint => props.showPoint
									? genCircle( connectionPoint, props.pointRadius, props.pointColor, props.pathWidth, 'transparent')
                  : genCircle( connectionPoint, props.pointRadius, undefined, undefined, 'transparent')
								)
							}
							{
								connectionPaths.value.map((connectionPath, index) => genConnector(connectionPath, index))
							}
            </g>
          </portal>
          {transformedSlotContent}
				</>
      }

      return {
        genGroup,
				localConnectionPoints,
				connectionRegions
      }
    },
    render() {
      return this.genGroup()
    }
  }
</script>
<style scoped lang="scss">
	.g-connection-point:hover {
		fill: grey;
		fill-opacity: 0.5;
	}

	.g-connection-path {
		&-outline:hover {
			stroke-opacity: 0.15;
			cursor: all-scroll;
		}

		&-outline:focus {
			outline: none;
			stroke-opacity: 0.3;
		}
	}
</style>
