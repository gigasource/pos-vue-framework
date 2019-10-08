/**
 * Filled '0' on the left of the input if input length is less than target length
 *
 * @param value { number | string } input value
 * @param targetLength { number } the length of output string
 * @returns {string} Filled string
 */
export default (value, targetLength = 2) => value.toString().padStart(targetLength, '0')
