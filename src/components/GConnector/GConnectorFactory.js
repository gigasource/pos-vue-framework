import { ref, reactive, computed, onMounted} from '@vue/composition-api';
import { Point, Circle } from './CoordinateSystem';
import { getElementPosition } from '../../utils/helpers';

export function getConnectionPoint(el, originPoint, zoomState, position) {
  const rect = getElementPosition(el);
  const offsetWidth = el.offsetWidth;
  const offsetHeight = el.offsetHeight;
  const topPoint = new Point((rect.left + offsetWidth / 2 - originPoint.x)/zoomState, (rect.top - originPoint.y)/zoomState, 'top')
  const leftPoint = new Point((rect.left - originPoint.x)/zoomState, (rect.top + offsetHeight / 2 - originPoint.y)/zoomState, 'left')
  const bottomPoint = new Point((rect.left + offsetWidth / 2 - originPoint.x)/zoomState, (rect.top + offsetHeight - originPoint.y)/zoomState, 'bottom')
  const rightPoint = new Point ((rect.left + offsetWidth - originPoint.x)/zoomState, (rect.top + offsetHeight / 2 - originPoint.y)/zoomState, 'right')

  switch(position) {
    case 'top':
      return [topPoint]
    case 'left':
      return [leftPoint]
    case 'bottom':
      return [bottomPoint]
    case 'right':
      return [rightPoint]
    case 'x':
      return [leftPoint, rightPoint]
    case 'y':
      return [topPoint, bottomPoint]
    default:
      return [topPoint, leftPoint, bottomPoint, rightPoint]
  }
}

export default function GConnectorFactory(props, context, model, id, connectionPoints, zoomState, originCoordinate, activeDrawId) {
  const localConnectionPoints = ref([]);
  const connectionPaths = ref([]);

  function updateConnectionPoints() {
    localConnectionPoints.value = getConnectionPoint(context.slots.default()["0"].elm, originCoordinate, zoomState.value, props.pointPosition)
    for (let connectionPoint of localConnectionPoints.value) {
      connectionPoint.value = model.value
    }

  }

  // Calculate local connection points when mounted
  onMounted(function () {
    this.$nextTick(function () {
      localConnectionPoints.value = getConnectionPoint(context.slots.default()["0"].elm, originCoordinate, zoomState.value, props.pointPosition)
      for (let connectionPoint of localConnectionPoints.value) {
        connectionPoint.value = model.value
      }
      connectionPoints.value = [...connectionPoints.value, ...localConnectionPoints.value]
    })
  })

  // Connection Region is a circle around a connection point
  const connectionRegions = computed(() => {
    return connectionPoints.value.map(connectionPoint => new Circle(connectionPoint, +props.pointRadius))
  })


  // Draw new connect path

  function drawStart(e) {
    const mousePoint = new Point((e.pageX - originCoordinate.x)/zoomState.value, (e.pageY - originCoordinate.y)/zoomState.value)
    const targetRegion = mousePoint.isInside(connectionRegions.value)
    let tempPath = reactive({
      startPoint: targetRegion.center,
      endPoint: targetRegion.center,
      startControlPoint: targetRegion.center,
      endControlPoint: targetRegion.center
    })
    connectionPaths.value.push(tempPath)
    activeDrawId.value = id.value
  }

  function draw(e) {
    const tempPath = connectionPaths.value[connectionPaths.value.length-1]
    const mousePoint = new Point((e.pageX - originCoordinate.x)/zoomState.value, (e.pageY - originCoordinate.y)/zoomState.value)
    const targetRegion = mousePoint.isInside(connectionRegions.value)
    tempPath.endPoint =  targetRegion ? targetRegion.center : mousePoint;
    tempPath.startControlPoint = new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.startPoint.y)
    tempPath.endControlPoint = new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.endPoint.y)
  }

  function drawEnd() {
    const tempPath = connectionPaths.value[connectionPaths.value.length-1]
    if (connectionPoints.value.includes(tempPath.endPoint) && tempPath.endPoint !== tempPath.startPoint) {
      context.emit('connected', tempPath.endPoint.value)
      activeDrawId.value = null
    } else {
      connectionPaths.value.splice(connectionPaths.value.indexOf(tempPath), 1)
      activeDrawId.value = null
    }
  }

  // Remove connected path
  function removePath(e, index) {
    if (e.key === "Backspace") {
      e.target.blur()
      context.emit('disconnected', connectionPaths.value[index].endPoint.value)
      connectionPaths.value.splice(index, 1)
    }
  }

  return {
    connectionPaths,
    localConnectionPoints,
    drawStart,
    draw,
    drawEnd,
    removePath,
    updateConnectionPoints
  }
}