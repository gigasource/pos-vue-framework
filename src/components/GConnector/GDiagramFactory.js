import {ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, watch} from 'vue';
import {getElementPosition} from '../../utils/helpers';
import {ResizeObserver as ResizeObserverPolyfill} from '@juggle/resize-observer';
import {isCSR} from '../../utils/ssr';

let ResizeObserver;
if (isCSR)
  ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

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

export default function GDiagramFactory(props, context, {container, svg}) {
  const connectionPoints = ref([])
  const zoomState = ref(1)
  const minScale = computed(() => +props.minZoom)
  const maxScale = computed(() => +props.maxZoom)
  const scaleFactor = computed(() => (+props.zoomSpeed) / 100)
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

  if (isCSR)
    window.getElementPosition = getElementPosition;

  function updateOriginCoordinate() {
    const svgRect = getElementPosition(svg.value)
    console.log(svgRect);
    originCoordinate.x = svgRect.left
    originCoordinate.y = svgRect.top
    //console.log(originCoordinate);
    console.log(svg.value);
  }

  function updateContainer() {
    const rect = container.value.getBoundingClientRect()

    containerPosition.top = rect.top
    containerPosition.left = rect.left
    containerPosition.bottom = rect.bottom
    containerPosition.right = rect.right
    containerDimension.width = container.value.clientWidth
    containerDimension.height = container.value.clientHeight

    svgDimension.width = container.value.clientWidth
    svgDimension.height = container.value.clientHeight
    maxSvgDimension.width = svgDimension.width / minScale.value
    maxSvgDimension.height = svgDimension.height / minScale.value
  }

  // Update data when mounted
  onMounted(() => {
    updateContainer()
    updateOriginCoordinate()
    startOriginCoordinate.x = originCoordinate.x
    startOriginCoordinate.y = originCoordinate.y
    svgObserve.observe(svg.value);
  })

  let svgObserve;
  if (isCSR) {
    svgObserve = new ResizeObserver(() => nextTick(() => {
      updateOriginCoordinate()
      startOriginCoordinate.x = originCoordinate.x
      startOriginCoordinate.y = originCoordinate.y
    }))
  }

  // Update data when resize window
  function updateOnResize() {
    const rect = container.value.getBoundingClientRect()

    containerDimension.width = container.value.clientWidth
    containerDimension.height = container.value.clientHeight

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
        top: container.value.scrollTop,
        left: container.value.scrollLeft
      }
      const mousePoint = {
        pageX: e.pageX - startOriginCoordinate.x,
        pageY: e.pageY - startOriginCoordinate.y
      }
      const zoomPoint = {
        x: (mousePoint.pageX + scrollState.left) / zoomState.value,
        y: (mousePoint.pageY + scrollState.top) / zoomState.value
      }

      zoomState.value += delta * scaleFactor.value * zoomState.value
      zoomState.value = Math.max(minScale.value, Math.min(maxScale.value, zoomState.value))

      if (zoomState.value < 1) {
        svgDimension.width = Math.max(containerDimension.width / zoomState.value, svgDimension.width)
        svgDimension.height = Math.max(containerDimension.height / zoomState.value, svgDimension.height)
        nextTick(() => {
          updateOriginCoordinate()
        })
      }

      const newZoomPoint = {
        x: zoomPoint.x * zoomState.value,
        y: zoomPoint.y * zoomState.value
      }

      container.value.scrollLeft = newZoomPoint.x - mousePoint.pageX
      container.value.scrollTop = newZoomPoint.y - mousePoint.pageY
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

    const rect = getElementPosition(target)
    startPosition.top = (rect.top - originCoordinate.y) / zoomState.value
    startPosition.left = (rect.left - originCoordinate.x) / zoomState.value
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
          container.value.scrollLeft = svgDimension.width - containerDimension.width
          // target.scrollIntoView()
        }
        if (newTop + target.offsetHeight > svgDimension.height) {
          svgDimension.height = newTop + target.offsetHeight
          container.value.scrollTop = svgDimension.height - containerDimension.height
          // target.scrollIntoView()
        }
      } else {
        const newLeft = target.offsetLeft + 5
        target.style.left = newLeft + 'px'

        if (newLeft + target.offsetWidth > svgDimension.width) {
          svgDimension.width = newLeft + target.offsetWidth
          container.value.scrollLeft = svgDimension.width - containerDimension.width
        }
        // target.scrollIntoView()
      }
    }
  }

  function dragEnd(e) {
    e.preventDefault()

    if (isDrag.value) {
      activeDragIds.value = []
      isDrag.value = false
      target.style.cursor = ''
    }
  }


  return {
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
