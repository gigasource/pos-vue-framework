function closeConditional() {
  return false
}

function directive(e, el, binding) {
  binding.arg = binding.arg || {}
  const isActive = (binding.arg.closeConditional || closeConditional)

  if (!e || isActive(e) === false) return

  if (('isTrusted' in e && !e.isTrusted) || ('pointerType' in e && !e.pointerType)) return

  const elements = (binding.arg.include || (() => []))()
  // Add the root element for the component this directive was defined on
  elements.push(el)
  !elements.some(el => el.contains(e.target)) && setTimeout(() => {
    isActive(e) && binding.value && binding.value(e)
  }, 0)
}

const ClickOutside = {
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding)

    const app = window
    app.addEventListener('click', onClick, true)
    el._clickOutside = onClick
  },

  beforeUnmount(el) {
    if (!el._clickOutside) return

    const app = document.body
    app && app.removeEventListener('click', el._clickOutside, true)
    delete el._clickOutside
  },
}

export default ClickOutside
