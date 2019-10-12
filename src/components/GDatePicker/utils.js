/**
 * Make ISO string
 * @param dateString
 * @returns {string}
 */
const makeIsoString = (dateString) => {
  const [year, month, date] = dateString.trim().split(' ')[0].split('-')
  return [pad(year, 4), pad(month || 1), pad(date || 1)].join('-')
}

/**
 *
 * @param locale {string | undefined}
 * @param options {Intl.DateTimeFormatOptions}
 * @param substrOptions {SubstrOptions = { start: 0, length: 0 }}
 * @returns {function(string): string | undefined}
 */
export function createNativeLocaleFormatter (locale, options, substrOptions = { start: 0, length: 0 }) {
  try {
    const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options)
    return (dateString) => intlFormatter.format(new Date(`${makeIsoString(dateString)}T00:00:00+00:00`))
  } catch (e) {
    return (substrOptions.start || substrOptions.length)
        ? (dateString) => makeIsoString(dateString).substr(substrOptions.start || 0, substrOptions.length)
        : undefined
  }
}



/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
export const monthChange = (value, sign) => {
  const [year, month] = value.split('-').map(Number)

  if (month + sign === 0) {
    return `${year - 1}-12`
  } else if (month + sign === 13) {
    return `${year + 1}-01`
  } else {
    return `${year}-${pad(month + sign)}`
  }
}

/**
 * Filled '0' on the left of the input if input length is less than target length
 *
 * @param value { number | string } input value
 * @param targetLength { number } the length of output string
 * @returns {string} Filled string
 */
export const pad = (value, targetLength = 2) => value.toString().padStart(targetLength, '0')


// --
export const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function isLeapYear (year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

export function daysInMonth (year, month) {
  return isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH[month]
}

export const TRANSITION_NAMES = {
  TAB: 'tab-transition',
  REVERSE_TAB: 'tab-reverse-transition',
  PICKER: 'picker-transition'
}

export const SANITY_TYPE = {
  DATE: 'date',
  MONTH: 'month',
  YEAR: 'year'
}
// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
export function sanitizeDateString(dateString/*: string*/, type/*: SANITY_TYPE*/)/*: string*/ {
  const [year, month = 1, date = 1] = dateString.split('-')
  return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}
