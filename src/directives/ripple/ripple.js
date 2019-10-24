let classList

function bind(el, binding) {
  classList = [
    'waves-effect',
    (!!binding.value && `waves-${binding.value}`)
  ]
  el.classList.add(...classList)
}

function unbind(el) {
  el.classList.remove(classList)
  classList = null
}
const Ripple = { bind, unbind }
export default Ripple