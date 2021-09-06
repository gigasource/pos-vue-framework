function closeConditional() {
  return false
}

// TODO: Increase performance
function directive(e, el, binding) {
  binding.arg = binding.arg || {}
  const isActive = (binding.arg.closeConditional || closeConditional)

  if (!e || isActive(e) === false) return

  if (('isTrusted' in e && !e.isTrusted))  {
    return
  }

  const elements = (binding.arg.include || (() => []))()
  // Add the root element for the component this directive was defined on
  elements.push(el)
  // todo: This just a hot fix
  !elements.some(el => el && el.contains(e.target)) && setTimeout(() => {
    isActive(e) && binding.value && binding.value(e)
  }, 0)
}

const ClickOutside = {
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding)

    const app = window
    if ('ontouchstart' in window) {
      app.addEventListener('touchstart', onClick, true)
    } else {
      app.addEventListener('click', onClick, true)
    }
    el._clickOutside = onClick
  },

  beforeUnmount(el) {
    if (!el._clickOutside) return

    const app = window
    if ('ontouchstart' in window) {
      app && app.removeEventListener('touchstart', el._clickOutside, true)
    } else {
      app && app.removeEventListener('click', el._clickOutside, true)
    }
    delete el._clickOutside
  },
}

export default ClickOutside
