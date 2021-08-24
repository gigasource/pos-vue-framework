export function normalizeEvent(e) {
  if (window.TouchEvent)
    if (e instanceof TouchEvent && e.touches.length > 0) {
      e.clientX = e.touches[0].clientX
      e.clientY = e.touches[0].clientY
      e.pageX = e.touches[0].pageX
      e.pageY = e.touches[0].pageY
      const { left, top } = e.target.getBoundingClientRect()
      e.offsetX = e.touches[0].clientX - left
      e.offsetY = e.touches[0].clientY - top
    }
}
