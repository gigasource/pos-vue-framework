/**
 * Filled '0' on the left of the input if input length is less than target length
 *
 * @param value { number | string } input value
 * @param targetLength { number } the length of output string
 * @returns {string} Filled string
 */
export const pad = (value, targetLength = 2) => value.toString().padStart(targetLength, '0')

// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
export function sanitizeDateString(dateString/*: string*/, type/*: DATE_PICKER_TYPE*/)/*: string*/ {
  const [year, month = 1, date = 1] = dateString.split('-')
  return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}
