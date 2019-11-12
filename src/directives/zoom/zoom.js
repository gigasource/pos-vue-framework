const scaleFactor = 0.05
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

function zoom(e, el, binding, vnode) {
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

    let tempZoom = vnode.context[zoomState] + delta * scaleFactor * vnode.context[zoomState]
    tempZoom = Math.max(minScale, Math.min(maxScale, tempZoom))
    vnode.context[zoomState] = tempZoom

    el.childNodes[0].style.transform = `scale(${tempZoom}, ${tempZoom})`
    el.childNodes[0].style.transformOrigin = tempZoom > 1 ? `0 0` : ""

    if (tempZoom > 1) {
      const newZoomPoint = {
        x: zoomPoint.x * tempZoom,
        y: zoomPoint.y * tempZoom
      }

      el.scrollLeft = newZoomPoint.x - mousePoint.pageX
      el.scrollTop = newZoomPoint.y - mousePoint.pageY
    }
  }
}

const Zoom = {
  inserted(el, binding, vnode) {
    vnode.context[zoomState] = 1;
    el.addEventListener('wheel', e => zoom(e, el, binding, vnode))
  }
}

export default Zoom