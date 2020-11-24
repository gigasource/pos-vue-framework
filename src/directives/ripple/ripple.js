let classList

function beforeMount(el, binding) {
  classList = ['waves-effect']
  if (binding.value) classList.push(`waves-${binding.value}`)
  el.classList.add(...classList)
}

function updated(el, binding) {
  classList = ['waves-effect']
  if (binding.value) classList.push(`waves-${binding.value}`)
  if (!el.classList.contains('waves-effect')) el.classList.add(...classList)
}

function beforeUnmount() {
  classList = null
}
const Ripple = { beforeMount, updated, beforeUnmount }
export default Ripple
