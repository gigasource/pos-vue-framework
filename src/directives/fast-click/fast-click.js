import {isSSR} from '../../utils/ssr';
import {passiveSupported} from '../../utils/helpers';
const supportTouch = isSSR ? false : 'ontouchstart' in window;

function removeListeners(el) {
  if (!el._fastClick || !el._fastClick.fn) return
  const {fallbackToClickEvent, fn} = el._fastClick
  if (supportTouch) {
    if (fallbackToClickEvent) el.removeEventListener('click', fn)
    else el.removeEventListener('touchstart', fn)
  } else {
    if (fallbackToClickEvent) el.removeEventListener('click', fn)
    else el.removeEventListener('mousedown', fn)
  }
}

function addListeners(el, fallbackToClickEvent, fn) {
  el._fastClick.fn = fn
  el._fastClick.fallbackToClickEvent = fallbackToClickEvent
  if (supportTouch) {
    if (fallbackToClickEvent) el.addEventListener('click', fn)
    else el.addEventListener('touchstart', fn, passiveSupported ? {passive: true} : false)
  } else {
    if (fallbackToClickEvent) el.addEventListener('click', fn)
    else el.addEventListener('mousedown', fn, passiveSupported ? {passive: true} : false)
  }
}
function updateFastClick(el, binding) {
  const {oldFn, oldFallbackToClickEvent} = binding.oldValue || {}
  const {fallbackToClickEvent, fn} = binding.value
  if (!el._fastClick) el._fastClick = {}
  if (oldFn === fn && oldFallbackToClickEvent === fallbackToClickEvent) {
    return
  }
  if (typeof (fn) !== 'function') {

  } else {
    if (el._fastClick.fn) removeListeners(el)
    addListeners(el, fallbackToClickEvent, fn)
  }
}
module.exports = {
  mounted: (el, binding) => {
    updateFastClick(el, binding)
  },
  unmounted: (el) => {
    removeListeners(el)
    delete el._fastClick
  },
  updated: (el, binding) => {
    updateFastClick(el, binding)
  }
}
