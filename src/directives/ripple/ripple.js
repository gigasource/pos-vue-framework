let classList

function bind(el, binding) {
  classList = ['waves-effect']
  if (binding.value) classList.push(`waves-${binding.value}`)
  el.classList.add(...classList)
}

function update(el) {
  if (!el.classList.contains('waves-effect')) el.classList.add(...classList)
}

function unbind() {
  classList = null
}
const Ripple = { bind, update, unbind }
export default Ripple