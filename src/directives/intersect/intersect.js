function inserted(el, binding) {
  const modifiers = binding.modifiers || {}
  const value = binding.value
  const options = binding.arg || {}
  const isObject = typeof value === 'object'
  const callback = isObject ? value.handler : value
  const observer = new IntersectionObserver((
      entries,
      observer
  ) => {
    if (!el._observe) return
    const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))
    if (isIntersecting) callback(entries, observer, isIntersecting)

    if (el._observe.init && modifiers.once) unbind(el)
    else (el._observe.init = true)
  }, options)

  el._observe = {init: false, observer}
  observer.observe(el)
}

function unbind(el) {
  if (!el._observe) return
  el._observe.observer.unobserve(el)
  delete el._observe
}

const Intersect = {inserted, unbind}
export default Intersect
