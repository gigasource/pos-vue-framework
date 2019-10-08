import pad from './pad'

/**
 *
 * @param locale {string | undefined}
 * @param options {Intl.DateTimeFormatOptions}
 * @param substrOptions {SubstrOptions = { start: 0, length: 0 }}
 * @returns {function(string): string | undefined}
 */
export default function createNativeLocaleFormatter (locale, options, substrOptions = { start: 0, length: 0 }) {
  /**
   * Make Iso String
   * @param dateString {string}
   * @returns {string}
   */
  const makeIsoString = (dateString) => {
    const [year, month, date] = dateString.trim().split(' ')[0].split('-')
    return [pad(year, 4), pad(month || 1), pad(date || 1)].join('-')
  }

  try {
    const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options)
    return (dateString) => intlFormatter.format(new Date(`${makeIsoString(dateString)}T00:00:00+00:00`))
  } catch (e) {
    return (substrOptions.start || substrOptions.length)
        ? (dateString) => makeIsoString(dateString).substr(substrOptions.start || 0, substrOptions.length)
        : undefined
  }
}
