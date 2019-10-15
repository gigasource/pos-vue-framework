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

export default (props) => (value) => _isDateAllowed(value, props.allowedDates) && _isValueInRange(value, props.min, props.max)
