<script>
	import getVModel from '../../mixins/getVModel';
  import { inject } from '@vue/composition-api';
  import GConnectorFactory from './GConnectorFactory';
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'GConnector',
		components: { Fragment },
    props: {
			value: [Number, String, Object],

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
				default: 10
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
				default: 3
			}
    },
    setup(props, context) {
      const { model } = getVModel(props, context)
      const diagramId = inject('diagramId');
      const connectionPoints = inject('connectionPoint');
      const zoomState = inject('zoomState')
			const originCoordinate = inject('originCoordinate')
			const eventEmitter = inject('eventEmitter');

			const { connectionPaths,
        localConnectionPoints,
        drawStart,
        draw,
        drawEnd,
        removePath
			} = GConnectorFactory(props, context, model, connectionPoints, zoomState, originCoordinate)

      eventEmitter.$on('draw', draw)
      eventEmitter.$on('drawEnd', drawEnd)

			// Render functions
      function genCircle(connectionPoint, r, stroke, strokeWidth, fill) {
        return <circle vOn:mousedown={drawStart} class="g-connection-point" cx={connectionPoint.x} cy={connectionPoint.y} r={r} stroke={stroke} stroke-width={strokeWidth} fill={fill}/>
      }

      function genConnector(path, index) {
        const d = `M${path.startPoint.x} ${path.startPoint.y} C${path.startControlPoint.x} ${path.startControlPoint.y}, ${path.endControlPoint.x} ${path.endControlPoint.y}, ${path.endPoint.x} ${path.endPoint.y}`
        return <g class="g-connection-path" key={index}>
          <path class="g-connection-path-main" d={d}  pathLength="50" stroke={props.pathColor} stroke-width={props.pathWidth} fill="none" marker-end={`url(#arrow${model.value.toString()})`}/>
          <path class="g-connection-path-outline" d={d} stroke="grey" stroke-width="20" stroke-opacity="0" fill="none" tabindex="0" vOn:keydown={(e) => removePath(e, index)}/>
        </g>
      }

      function genGroup() {
        return <fragment>
          <portal to={diagramId.value} slim>
						<marker id={`arrow${model.value.toString()}`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto" markerUnits="strokeWidth">
							<path d="M1,1 L4,3 L1,5" stroke={props.pathColor} stroke-width="1" stroke-linejoin="bevel" fill="none"/>
						</marker>
						<g ref="group">
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
          {context.slots.default ? context.slots.default() : undefined}
        </fragment>
      }

      return {
        genGroup,
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