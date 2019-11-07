<script>
	import getVModel from '../../mixins/getVModel';
  import { ref, reactive ,onMounted, inject } from '@vue/composition-api';
  import { Point } from './CoordinateSystem';
  import { getConnectionPoint } from './ConnectorHelper';

  export default {
    name: 'GConnector2',
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
      const { model } = getVModel(props,context)
      const diagramID = inject('id');
      const connectionPoints = inject('connectionPoint');
      const zoomState = inject('zoomState')
			const originCoordinate = inject('originCoordinate')
			const eventEmitter = inject('eventEmitter');
      const connectionPaths = ref([]);
      const localConnectionPoints = ref([]);

      function getConnectionPointValue(point) {
        for (let connectionPoint of connectionPoints.value) {
          if (point.x === connectionPoint.x && point.y === connectionPoint.y) {
						return connectionPoint.value
					}
        }
			}

      onMounted(function () {
        this.$nextTick(function () {
          localConnectionPoints.value = getConnectionPoint(this.$slots.default["0"].elm, props.pointPosition)
					for (let connectionPoint of localConnectionPoints.value) {
					  connectionPoint.value = model.value
					}
          connectionPoints.value = [...connectionPoints.value, ...localConnectionPoints.value]
        })
      })

      // Draw connect path
      const isDraw = ref(false)

      function drawStart(e) {
        const target = e.target
				const targetPoint = new Point(+target.getAttribute('cx'), +target.getAttribute('cy'))
				for (let connectionPoint of connectionPoints.value) {
					if (connectionPoint.x === targetPoint.x && connectionPoint.y === targetPoint.y) {
            let tempPath = reactive({
              startPoint: connectionPoint,
              endPoint: connectionPoint,
              startControlPoint: connectionPoint,
              endControlPoint: connectionPoint
            })
						connectionPaths.value.push(tempPath)
					}
				}
				isDraw.value = true
      }

      function draw(e) {
        const target = e.target
        if (isDraw.value) {
          const tempPath = connectionPaths.value[connectionPaths.value.length-1]
					const mousePoint = new Point((e.pageX - originCoordinate.x)/zoomState.value, (e.pageY - originCoordinate.y)/zoomState.value)
          tempPath.endPoint = target.nodeName === 'circle' ? new Point(+target.getAttribute('cx'), +target.getAttribute('cy')) : mousePoint;
					tempPath.endPoint.value = getConnectionPointValue(tempPath.endPoint)
          tempPath.startControlPoint = new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.startPoint.y)
          tempPath.endControlPoint = new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.endPoint.y)
        }
      }

      function drawEnd(e) {
        if (isDraw.value) {
          const tempPath = connectionPaths.value[connectionPaths.value.length-1]
          const target = e.target
          if (target.nodeName === 'circle') {
						context.emit('connected', tempPath.endPoint.value)
            isDraw.value = false
          } else {
						connectionPaths.value.splice(connectionPaths.value.indexOf(tempPath), 1)
            isDraw.value = false
          }
        }
      }

      function removePath(e, index) {
        if (e.key === "Backspace") {
          e.target.blur()
          context.emit('disconnected', connectionPaths.value[index].endPoint.value)
          connectionPaths.value.splice(index, 1)
        }
			}

      eventEmitter.$on('draw', draw)
      eventEmitter.$on('drawEnd', drawEnd)

      function genCircle(connectionPoint, r, stroke, strokeWidth, fill) {
        return <circle vOn:mousedown={drawStart} class="g-connection-point" cx={connectionPoint.x} cy={connectionPoint.y} r={r} stroke={stroke} stroke-width={strokeWidth} fill={fill}/>
      }

      function genConnector(path, index) {
        const d = `M${path.startPoint.x} ${path.startPoint.y} C${path.startControlPoint.x} ${path.startControlPoint.y}, ${path.endControlPoint.x} ${path.endControlPoint.y}, ${path.endPoint.x} ${path.endPoint.y}`
        return <g class="g-connection-path" key={index}>
					<portal to={diagramID.value}>
            <marker id={`arrow${model.value.toString()}`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M1,1 L4,3 L1,5" stroke={props.pathColor} stroke-width="1" stroke-linejoin="bevel" fill="none"/>
            </marker>
					</portal>
          <path class="g-connection-path-main" d={d} stroke={props.pathColor} stroke-width={props.pathWidth} fill="none" marker-end={`url(#arrow${model.value.toString()})`}/>
          <path class="g-connection-path-outline" d={d} stroke="grey" stroke-width="20" stroke-opacity="0" fill="none" tabindex="0" vOn:keydown={(e) => removePath(e, index)}/>
        </g>
      }

      function genGroup() {
        return <div>
          <portal to={diagramID.value}>
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
        </div>
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