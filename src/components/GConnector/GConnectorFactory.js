import { ref, reactive, computed, watch, onMounted, onBeforeUnmount} from '@vue/composition-api';
import { Point, Circle } from './CoordinateSystem';
import { getElementPosition } from '../../utils/helpers';

export function getConnectionPoint(el, originPoint, zoomState, position) {
  const rect = getElementPosition(el);
  const offsetWidth = el.offsetWidth;
  const offsetHeight = el.offsetHeight;
  const topPoint = new Point((rect.left - originPoint.x)/zoomState + offsetWidth / 2, (rect.top - originPoint.y)/zoomState, 'top')
  const leftPoint = new Point((rect.left - originPoint.x)/zoomState, (rect.top - originPoint.y)/zoomState + offsetHeight / 2, 'left')
  const bottomPoint = new Point((rect.left - originPoint.x)/zoomState + offsetWidth / 2, (rect.top - originPoint.y)/zoomState + offsetHeight, 'bottom')
  const rightPoint = new Point ((rect.left - originPoint.x)/zoomState + offsetWidth, (rect.top - originPoint.y)/zoomState + offsetHeight / 2, 'right')

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

export default function GConnectorFactory(props, context, model, eventEmitter, isActive, isBooted, diagramId, id, connectionPoints, zoomState, originCoordinate, activeDrawId, initConnections) {
  const localConnectionPoints = ref([]);
  const connectionPaths = ref([]);

  function initConnectionPoints() {
    context.root.$nextTick(() => {
      localConnectionPoints.value = getConnectionPoint(context.slots.default()["0"].elm, originCoordinate, zoomState.value, props.pointPosition)
      for (let connectionPoint of localConnectionPoints.value) {
        connectionPoint.value = model.value
        connectionPoint.id = id.value
        if (props.startLimit !== undefined) connectionPoint.startLimit = +props.startLimit
        if (props.endLimit !== undefined) connectionPoint.endLimit = +props.endLimit
      }
      connectionPoints.value = [...connectionPoints.value, ...localConnectionPoints.value]
    })
  }

  function updateConnectionPoints() {
    localConnectionPoints.value = getConnectionPoint(context.slots.default()["0"].elm, originCoordinate, zoomState.value, props.pointPosition)
    for (let localConnectionPoint of localConnectionPoints.value) {
      for (let connectionPoint of connectionPoints.value) {
        if (id.value === connectionPoint.id && localConnectionPoint.position === connectionPoint.position) {
          connectionPoint.x = localConnectionPoint.x
          connectionPoint.y = localConnectionPoint.y
          break
        }
      }
    }
  }

  // Calculate local connection points when mounted
  onMounted(() => {
    initConnectionPoints()
  })

  // Initial connection paths
  watch(initConnections, newVal => {
    if (newVal.length > 0) {
      for (let connection of newVal) {
        if (localConnectionPoints.value.includes(connection.startPoint)) {
          connection.startPoint.startCount++
          connection.endPoint.endCount++
          connectionPaths.value.push(drawPath(connection.startPoint, connection.endPoint))
        }
      }
    }
  }, {lazy: true})

  // Calculate local connection points when booted
  watch(isBooted, () => {
    updateConnectionPoints()
  }, {lazy: true})

  // Update when toggle
  model.value.show !== undefined && watch(() => model.value.show, () => {
    if (isActive.value) eventEmitter.$emit(`update${diagramId.value}`)
  })

  // Connection Region is a circle around a connection point
  const connectionRegions = computed(() => {
    return connectionPoints.value.map(connectionPoint => new Circle(connectionPoint, +props.pointRadius))
  })


  // Draw new connection path

  function drawPath(startPoint, endPoint) {
    let tempPath = reactive({
      startPoint: startPoint,
      endPoint: endPoint,
      startControlPoint: computed(() => {
        return new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.startPoint.y)
      }),
      endControlPoint: computed(() => {
        return new Point((tempPath.startPoint.x + tempPath.endPoint.x)/2, tempPath.endPoint.y)
      }),
    })
    return tempPath
  }

  function drawStart(e) {
    const mousePoint = new Point((e.pageX - originCoordinate.x)/zoomState.value, (e.pageY - originCoordinate.y)/zoomState.value)
    const targetRegion = mousePoint.isInside(connectionRegions.value)
    if (targetRegion === undefined) return
    if (targetRegion.center.startCount < targetRegion.center.startLimit) {
      targetRegion.center.startCount++
      connectionPaths.value.push(drawPath(targetRegion.center, targetRegion.center))
      activeDrawId.value = id.value
    }
  }

  function draw(e) {
    const tempPath = connectionPaths.value[connectionPaths.value.length-1]
    const mousePoint = new Point((e.pageX - originCoordinate.x)/zoomState.value, (e.pageY - originCoordinate.y)/zoomState.value)
    const targetRegion = mousePoint.isInside(connectionRegions.value)
    tempPath.endPoint =  targetRegion ? targetRegion.center : mousePoint;
  }

  function drawEnd() {
    const tempPath = connectionPaths.value[connectionPaths.value.length-1]
    if (connectionPoints.value.includes(tempPath.endPoint) && tempPath.endPoint !== tempPath.startPoint && tempPath.endPoint.endCount < tempPath.endPoint.endLimit && (!props.filter || (props.filter && props.filter(tempPath.startPoint.value, tempPath.endPoint.value)))) {
      tempPath.endPoint.endCount++
      context.emit('connected', tempPath.endPoint.value)
      activeDrawId.value = null
    } else {
      tempPath.startPoint.startCount--
      connectionPaths.value.splice(connectionPaths.value.indexOf(tempPath), 1)
      activeDrawId.value = null
    }
  }

  // Remove connected path
  function removePath(e, index) {
    if (e.key === "Backspace") {
      e.target.blur()
      const tempPath = connectionPaths.value[index]
      context.emit('disconnected', tempPath.endPoint.value)
      tempPath.startPoint.startCount--
      tempPath.endPoint.endCount--
      connectionPaths.value.splice(index, 1)
    }
  }

  // Update connection points before unmount
  onBeforeUnmount(() => {
    eventEmitter.$emit(`update${diagramId.value}`)
  })

  return {
    connectionPaths,
    localConnectionPoints,
    connectionRegions,
    drawStart,
    draw,
    drawEnd,
    removePath,
    updateConnectionPoints
  }
}