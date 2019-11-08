import { ref, reactive, computed, onMounted} from '@vue/composition-api';
import { Point, Circle } from './CoordinateSystem';
import { getElementPosition } from '../../utils/helpers';

export function getConnectionPoint(el, originPoint, position) {
  const rect = getElementPosition(el);
  const offsetWidth = el.offsetWidth;
  const offsetHeight = el.offsetHeight;
  const topPoint = new Point(rect.left + offsetWidth/2 - originPoint.x, rect.top - originPoint.y, 'top')
  const leftPoint = new Point(rect.left - originPoint.x, rect.top + offsetHeight/2 - originPoint.y, 'left')
  const bottomPoint = new Point(rect.left + offsetWidth/2 - originPoint.x, rect.top + offsetHeight - originPoint.y, 'bottom')
  const rightPoint = new Point (rect.left + offsetWidth - originPoint.x, rect.top + offsetHeight/2 - originPoint.y, 'right')

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

export default function GConnectorFactory(props, context, model, connectionPoints, zoomState, originCoordinate) {
  const localConnectionPoints = ref([]);
  const connectionPaths = ref([]);

  // Calculate local connection points when mounted
  onMounted(function () {
    this.$nextTick(function () {
      localConnectionPoints.value = getConnectionPoint(this.$slots.default["0"].elm, originCoordinate, props.pointPosition)
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
  const isDraw = ref(false)

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
    isDraw.value = true
  }

  function draw(e) {
    if (isDraw.value) {
      const tempPath = connectionPaths.value[connectionPaths.value.length-1]
      const mousePoint = new Point((e.pageX - originCoordinate.x)/zoomState.value, (e.pageY - originCoordinate.y)/zoomState.value)
      const targetRegion = mousePoint.isInside(connectionRegions.value)
      tempPath.endPoint =  targetRegion ? targetRegion.center : mousePoint;
      tempPath.startControlPoint = new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.startPoint.y)
      tempPath.endControlPoint = new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.endPoint.y)
    }
  }

  function drawEnd() {
    if (isDraw.value) {
      const tempPath = connectionPaths.value[connectionPaths.value.length-1]
      if (connectionPoints.value.includes(tempPath.endPoint) && tempPath.endPoint !== tempPath.startPoint) {
        context.emit('connected', tempPath.endPoint.value)
        isDraw.value = false
      } else {
        connectionPaths.value.splice(connectionPaths.value.indexOf(tempPath), 1)
        isDraw.value = false
      }
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
    removePath
  }
}