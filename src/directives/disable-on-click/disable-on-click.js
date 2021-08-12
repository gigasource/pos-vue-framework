export default {
  mounted(el, binding) {
    const disableOnClick = () => {
      const originalOpacity = el.style.opacity
      const originalPointerEvents = el.style.pointerEvents
      el.style.opacity = 0.6
      el.style.pointerEvents = 'none'
      setTimeout(() => {
        el.style.opacity = originalOpacity
        el.style.pointerEvents = originalPointerEvents
      }, binding.value ? Number(binding.value) : 3000)
    }
    el.addEventListener('click', disableOnClick)
    el._disableOnClick = disableOnClick
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el._disableOnClick)
    delete el._disableOnClick
  }
}
