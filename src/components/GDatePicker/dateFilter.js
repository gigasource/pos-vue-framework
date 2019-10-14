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

export function isDateAllowed(value, filterFn) {
  if (typeof filterFn !== 'function')
    return true

  return filterFn(value)
}

export function dateFilter(props) {
  return function isDateAvailable(value) {
    return isDateAllowed(value, props.allowedDates) && isValueInRange(value, props.min, props.max)
  }
}
