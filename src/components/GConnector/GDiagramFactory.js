import { ref, reactive, computed, onMounted} from '@vue/composition-api';
import { getElementPosition } from '../../utils/helpers';

export default function GDiagramFactory(props, context) {
  const connectionPoints = ref([])
  const zoomState = ref(1)
  const scaleFactor = 0.05
  const minScale = 0.1
  const maxScale = 100

  const originCoordinate = reactive({
    x: 0,
    y: 0,
  })

  const startOriginCoordinate = reactive({
    x: 0,
    y: 0,
  })

  function updateOriginCoordinate() {
    const svgRect = getElementPosition(context.refs.svg.$el)
    originCoordinate.x = svgRect.left
    originCoordinate.y = svgRect.top
  }

  onMounted(() => {
    updateOriginCoordinate()
    startOriginCoordinate.x = originCoordinate.x
    startOriginCoordinate.y = originCoordinate.y
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
        pageX: e.pageX - startOriginCoordinate.x,
        pageY: e.pageY - startOriginCoordinate.y
      }
      const zoomPoint = {
        x: (mousePoint.pageX + scrollState.left)/zoomState.value,
        y: (mousePoint.pageY + scrollState.top)/zoomState.value
      }

      zoomState.value += delta * scaleFactor * zoomState.value
      zoomState.value = Math.max(minScale, Math.min(maxScale, zoomState.value))

      if (zoomState.value < 1) {
        context.root.$nextTick(() => {
          updateOriginCoordinate()
        })
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

  function scroll() {
    updateOriginCoordinate()
  }

  return {
    connectionPoints,
    zoomState,
    originCoordinate,
    zoom,
    scroll
  }
}