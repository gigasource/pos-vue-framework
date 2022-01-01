const supportTouch = 'ontouchstart' in window

function removeListeners(el) {
  if (!el._fastClick || !el._fastClick.fn) return
  if (supportTouch) el.removeEventListener('touchstart', el._fastClick.fn)
  else el.removeEventListener('click', el._fastClick.fn)
}

function addListeners(el, fn) {
  el._fastClick.fn = fn
  if (supportTouch) el.addEventListener('touchstart', fn)
  else el.addEventListener('click', fn)
}
function updateFastClick(el, binding) {
  const oldFn = binding.oldValue
  const fn = binding.value
  if (!el._fastClick) el._fastClick = {}
  if (oldFn === fn) {
    return
  }
  if (typeof (fn) !== 'function') {

  } else {
    if (el._fastClick.fn) removeListeners(el)
    addListeners(el, fn)
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
