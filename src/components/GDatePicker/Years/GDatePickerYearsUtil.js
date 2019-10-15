import { computed } from '@vue/composition-api'

export const EVENT_NAMES = { INPUT: 'input' }

/**
 * Get range from props.min to props.max, included boundary
 *
 * In case min and max of props is undefined, year range will be generated base on
 * props.value and currentYearOffset (default 100):
 *   => [ props.value - currentYearOffset, ... , props.value + currentYearOffset]
 *
 * If props.value is undefined, currentYear will be used instead
 *
 * Example:
 *  props = { min: 1990, max: 1992 } => output [1990, 1991, 1992]
 *  props = { value: 1990 } => output [1890, .., 2090]
 *  props = { value: 1990, min: 1990 } => output [1990, ..., 2090]
 */
export function getYearRange(props, currentYearOffset = 100) {
  return computed(() => {
    const currentYear = props.value ? parseInt(props.value) : new Date().getFullYear()
    const maxYear = props.max ? parseInt(props.max) : (currentYear + currentYearOffset)
    const minYear = Math.min(maxYear, props.min ? parseInt(props.min) : (currentYear - currentYearOffset))
    const years = []
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year)
    }
    return years
  })
}

/**
 * Return an event handler which will be executed when user select year
 * @param context
 * @returns {function(*=): *}
 */
export function getYearOnClickEventHandler(context) {
  return (year) => context.emit(EVENT_NAMES.INPUT, year)
}
