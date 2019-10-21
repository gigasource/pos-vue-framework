import { computed } from '@vue/composition-api'

/**
 * props.min: YYYY-MM-dd
 * props.max: YYYY-MM-dd
 *
 * Get range from props.min to props.max, included boundary
 *
 * In case min and max of props is undefined, year range will be generated base on
 * props.value and currentYearOffset (default 20):
 *   => [ props.value - currentYearOffset, ... , props.value + currentYearOffset]
 */
export function computedYearRange(props, currentYearOffset = 50) {
  return computed(() => {
    const cptMinYear = computed(() => props.min ? parseInt(props.min.substr(0, 4)) : null)
    const cptMaxYear = computed(() => props.max ? parseInt(props.max.substr(0, 4)) : null)
    const currentYear = new Date().getFullYear()
    const maxYear = cptMaxYear.value || (currentYear + currentYearOffset)
    const minYear = Math.min(maxYear, cptMinYear.value || (currentYear - currentYearOffset))
    const years = []
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year)
    }
    return years
  })
}
