import { computed } from '@vue/composition-api';

/**
 * Return the month which displaying in viewport
 * @param state
 * @returns {Ref<any>}
 */
export const computedDisplayMonth = (state) => computed(() => Number(state.viewportDate.split('-')[1]) - 1)
/**
 * Return the year which displaying in viewport
 * @param state
 * @returns {Ref<any>}
 */
export const computedDisplayYear = (state) => computed(() => Number(state.viewportDate.split('-')[0]))

/**
 * return true if current value is selected in single, multiple mode
 * or included in a range in props.range mode
 * @param props
 * @param state
 * @param value
 * @returns {boolean}
 */
export const isSelected = (props, state, value) => {
  if (props.range) {
    if (state.selectedValues.length === 1) {
      return state.selectedValues[0] === value
    } else if (state.selectedValues.length === 2) {
      return state.selectedValues[0] <= value && value <= state.selectedValues[1]
    } else return false
  }
  else if (props.multiple) {
    return state.selectedValues.indexOf(value) !== -1
  } else {
    return value === state.selectedValues
  }
}

/**
 * Check if provided value is in range
 * @private
 * @publicForTestOnly
 * @param value
 * @param min
 * @param max
 * @returns {boolean|*}
 */
export const _isValueInRange = (value, min, max) => {
  return (!min || value >= min) && (!max || value <= max)
}

/**
 * @private
 * @publicForTestOnly
 */
export function _isDateAllowed(value, filterFn) {
  if (typeof filterFn !== 'function')
    return true

  return filterFn(value)
}

/**
 * Check if item is allowed to select
 * @param props
 * @param value
 * @returns {boolean|*}
 */
export const isAllowed = (props, value) => _isDateAllowed(value, props.allowedDates) && _isValueInRange(value, props.min, props.max)
