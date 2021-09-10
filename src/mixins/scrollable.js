import {ref, computed, watch, nextTick, onBeforeUnmount, onMounted} from 'vue'

export default function scrollable({scrollTarget, scrollThreshold}, ctx, canScroll, thresholdMet) {
  const currentScroll = ref(0)
  const currentThreshold = ref(0)
  const isActive = ref(false)
  const isScrollingUp = ref(false)
  const previousScroll = ref(0)
  const savedScroll = ref(0)
  const target = ref()

  /**
   * The threshold that must be met before
   * thresholdMet function is invoked
   */
  const computedScrollThreshold = computed(() => scrollThreshold ? Number(scrollThreshold) : 100)

   watch(() => isScrollingUp.value, () => savedScroll.value = savedScroll.value || currentScroll.value)
   watch(() => isActive.value, () => savedScroll.value = 0)

  onMounted(() => {
    if (scrollTarget) {
      target.value = document.querySelector(scrollTarget)
      if (!target.value)
        console.warn(`Unable to locate element with identifier ${scrollTarget}`)
      else
        console.log('scroll target', target.value)
    } else {
      console.warn('no scroll target')
    }

    if (target.value)
      target.value.addEventListener('scroll', onScroll)
  })

  onBeforeUnmount(() => {
    if (target.value)
      target.value.removeEventListener('scroll', onScroll)
  })

  function onScroll() {
    if (!canScroll.value)
      return

    previousScroll.value = currentScroll.value
    currentScroll.value = target.value ? target.value.scrollTop : window.pageYOffset

    isScrollingUp.value = currentScroll.value < previousScroll.value
    currentThreshold.value = Math.abs(currentScroll.value - computedScrollThreshold.value)

    nextTick(() => {
      if (Math.abs(currentScroll.value - savedScroll.value) > computedScrollThreshold.value)
        thresholdMet(!isScrollingUp.value)
    }).then()
  }

  return onScroll
}
