const scaleFactor = 0.01
const minScale = 0.1
const maxScale = 100
const zoomState = '_zoomState_'

function getElementPosition(el) {
  const rect = el.getBoundingClientRect(),
    offsetX = window.scrollX || document.documentElement.scrollLeft,
    offsetY = window.scrollY || document.documentElement.scrollTop;
  return {
    top: rect.top + offsetY,
    left: rect.left + offsetX,
    bottom: rect.bottom + offsetY,
    right: rect.right + offsetX
  }
}

function zoom(e, el, vnode) {
  if(!Number.isInteger(e.deltaY)){
    e.preventDefault()
    const delta = e.deltaY > 0 ? -1 : 1

    const rect = getElementPosition(el)

    const scrollState = {
      top: el.scrollTop,
      left: el.scrollLeft
    }
    const mousePoint = {
      pageX: e.pageX - rect.left,
      pageY: e.pageY - rect.top
    }
    const zoomPoint = {
      x: (mousePoint.pageX + scrollState.left)/vnode.context[zoomState],
      y: (mousePoint.pageY + scrollState.top)/vnode.context[zoomState]
    }

    vnode.context[zoomState] += delta * scaleFactor * vnode.context[zoomState]
    vnode.context[zoomState] = Math.max(minScale, Math.min(maxScale, vnode.context[zoomState]))

    el.childNodes[0].style.transform = `scale(${vnode.context[zoomState]}, ${vnode.context[zoomState]})`
    el.childNodes[0].style.transformOrigin = vnode.context[zoomState] > 1 ? `0 0` : ""

    if (vnode.context[zoomState] > 1) {
      const newZoomPoint = {
        x: zoomPoint.x * vnode.context[zoomState],
        y: zoomPoint.y * vnode.context[zoomState]
      }

      el.scrollLeft = newZoomPoint.x - mousePoint.pageX
      el.scrollTop = newZoomPoint.y - mousePoint.pageY
    }
  }
}

const Zoom = {
  mounted (el, binding, vnode) {
    vnode.context[zoomState] = 1;

    const onWheel = (e) => zoom(e, el, vnode)
    el.addEventListener('wheel', onWheel)

    el._zoomHandler = onWheel
  },

  unmounted (el) {
    if (!el._zoomHandler) return

    el.removeEventListener('wheel', el._zoomHandler)

    delete el._zoomHandler
  }
}

export default Zoom
