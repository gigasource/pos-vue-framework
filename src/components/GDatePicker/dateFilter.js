/**
 * Check if provided value is in range
 * @param value
 * @param min
 * @param max
 * @param isValueInRangeCustomFn
 * @returns {boolean|*}
 */
export const isValueInRange = (value, min, max) => {
  return (!min || value >= min) && (!max || value <= max)
}

export function dateFilter(props) {
  return function isDateAvailable(value) {
    // date rejected by date filter function
    if ((typeof props.allowedDates === 'function') && !props.allowedDates(value))
      return false

    // date rejected or not depend on selected range
    return isValueInRange(value, props.min, props.max)
  }
}
