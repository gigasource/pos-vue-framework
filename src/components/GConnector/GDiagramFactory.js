import { ref, reactive, computed, watch, onMounted, onBeforeUnmount} from '@vue/composition-api';
import { getElementPosition } from '../../utils/helpers';
import { getInternalValue } from '../../mixins/getVModel';

function getConnectorId(el, ids) {
  if (el.classList.contains('g-connector')) ids.push(el.id)
  if (el.children.length !== 0) {
    for (let children of el.children) {
      getConnectorId(children, ids)
    }
  }
}

function getConnectorIds(el) {
  const ids = []
  getConnectorId(el, ids)
  return ids
}

export default function GDiagramFactory(props, context) {
  const isActive = getInternalValue(props, context)
  const isBooted = ref(false)
  const connectionPoints = ref([])
  const zoomState = ref(1)
  const minScale = computed(() => +props.minZoom)
  const maxScale = computed(() => +props.maxZoom)
  const scaleFactor = computed(() => (+props.zoomSpeed)/100)
  const svgDimension = reactive({
    width: 0,
    height: 0
  })

  const maxSvgDimension = {
    width: 0,
    height: 0
  }

  const containerDimension = reactive({
    width: 0,
    height: 0
  })

  const containerPosition = reactive({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  })

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

  function updateContainer() {
    const rect = context.refs.container.getBoundingClientRect()

    containerPosition.top = rect.top
    containerPosition.left = rect.left
    containerPosition.bottom = rect.bottom
    containerPosition.right = rect.right
    containerDimension.width = context.refs.container.clientWidth
    containerDimension.height = context.refs.container.clientHeight

    svgDimension.width = context.refs.container.clientWidth
    svgDimension.height = context.refs.container.clientHeight
    maxSvgDimension.width = svgDimension.width / minScale.value
    maxSvgDimension.height = svgDimension.height / minScale.value
  }

  // Update data when mounted
  onMounted(() => {
    context.root.$nextTick(() => {
      updateContainer()
    })
    updateOriginCoordinate()
    startOriginCoordinate.x = originCoordinate.x
    startOriginCoordinate.y = originCoordinate.y
  })

  // Boot logic
  watch(isActive, newVal => {
    if (newVal) isBooted.value = newVal
  })

  // Update data when booted
  watch(isBooted, () => {
    context.root.$nextTick(() => {
      updateContainer()
    })
    updateOriginCoordinate()
    startOriginCoordinate.x = originCoordinate.x
    startOriginCoordinate.y = originCoordinate.y
  }, {lazy: true})

  // Update data when resize window
  function updateOnResize() {
    const rect = context.refs.container.getBoundingClientRect()

    containerDimension.width = context.refs.container.clientWidth
    containerDimension.height = context.refs.container.clientHeight

    maxSvgDimension.width = svgDimension.width / minScale.value
    maxSvgDimension.height = svgDimension.height / minScale.value

    svgDimension.width = Math.max(containerDimension.width / zoomState.value, svgDimension.width)
    svgDimension.height = Math.max(containerDimension.height / zoomState.value, svgDimension.height)

    updateOriginCoordinate()
  }

  window.addEventListener('resize', updateOnResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateOnResize)
  })

  // Zoom
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

      zoomState.value += delta * scaleFactor.value * zoomState.value
      zoomState.value = Math.max(minScale.value, Math.min(maxScale.value, zoomState.value))

      if (zoomState.value < 1) {
        svgDimension.width = Math.max(containerDimension.width / zoomState.value, svgDimension.width)
        svgDimension.height = Math.max(containerDimension.height / zoomState.value, svgDimension.height)
        context.root.$nextTick(() => {
          updateOriginCoordinate()
        })
      }

      const newZoomPoint = {
        x: zoomPoint.x * zoomState.value,
        y: zoomPoint.y * zoomState.value
      }

      context.refs.container.scrollLeft = newZoomPoint.x - mousePoint.pageX
      context.refs.container.scrollTop = newZoomPoint.y - mousePoint.pageY
    }
  }

  function scroll() {
    updateOriginCoordinate()
  }

  // Drag
  const isDrag = ref(false)
  const activeDragIds = ref([])

  const startPosition = {
    top: 0,
    left: 0,
  }

  const mouseStartPosition = {
    pageX: 0,
    pageY: 0
  }
  let target = null

  function dragStart(e) {
    e.preventDefault()

    target = e.currentTarget
    activeDragIds.value = getConnectorIds(target)
    // console.log(activeDragIds.value)

    const rect = getElementPosition(target)
    startPosition.top = (rect.top - originCoordinate.y)/zoomState.value
    startPosition.left = (rect.left - originCoordinate.x)/zoomState.value
    mouseStartPosition.pageX = e.pageX
    mouseStartPosition.pageY = e.pageY
    isDrag.value = true
    target.style.cursor = 'move'
  }

  function drag(e) {
    e.preventDefault()
    if (isDrag.value) {
      if (e.pageY > containerPosition.bottom) return
      if (1) {
        let newTop = startPosition.top - (mouseStartPosition.pageY - e.pageY) / zoomState.value
        let newLeft = startPosition.left - (mouseStartPosition.pageX - e.pageX) / zoomState.value

        newLeft = newLeft <= 0 ? 0 : newLeft >= maxSvgDimension.width - target.offsetWidth ? maxSvgDimension.width - target.offsetWidth : newLeft
        newTop = newTop <= 0 ? 0 : newTop >= maxSvgDimension.height - target.offsetHeight ? maxSvgDimension.height - target.offsetHeight : newTop

        target.style.left = newLeft + 'px'
        target.style.top = newTop + 'px'

        if (newLeft + target.offsetWidth > svgDimension.width) {
          svgDimension.width = newLeft + target.offsetWidth
          context.refs.container.scrollLeft = svgDimension.width - containerDimension.width
          // target.scrollIntoView()
        }
        if (newTop + target.offsetHeight > svgDimension.height) {
          svgDimension.height = newTop + target.offsetHeight
          context.refs.container.scrollTop = svgDimension.height - containerDimension.height
          // target.scrollIntoView()
        }
      } else {
        const newLeft = target.offsetLeft + 5
        target.style.left = newLeft + 'px'

        if (newLeft + target.offsetWidth > svgDimension.width) {
          svgDimension.width = newLeft + target.offsetWidth
          context.refs.container.scrollLeft = svgDimension.width - containerDimension.width
        }
          // target.scrollIntoView()
      }
    }
  }

  function dragEnd(e) {
    e.preventDefault()

    if(isDrag.value) {
      activeDragIds.value = []
      isDrag.value = false
      target.style.cursor = ''
    }
  }


  return {
    isActive,
    isBooted,
    connectionPoints,
    zoomState,
    originCoordinate,
    svgDimension,
    zoom,
    scroll,
    isDrag,
    activeDragIds,
    dragStart,
    drag,
    dragEnd
  }
}