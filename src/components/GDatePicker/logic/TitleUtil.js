import { computed } from '@vue/composition-api'
import { createNativeLocaleFormatter, getCurrentDateISOFormat, pad, sanitizeDateString } from './utils';

/**
 * Title format
 * @param props
 * @param cptIsMultiSelect
 * @param dateRanges
 * @returns {Ref<any>}
 * @private
 */
export const _computedTitleFormatterFn = (props, cptIsMultiSelect) => computed(() => {
  const INVALID_SELECTION = '--'
  const defaultMultipleDateFormatter = computed(() => {
    return dates => {
      if (cptIsMultiSelect.value) {
        if (Array.isArray(dates)) {
          if (props.multiple) {
            return dates.length + ' selected'
          } else { // props.range
            let start = 'Start'
            let end = 'End'
            if (dates.length >= 1) start = defaultDateRangeFormatter.value(dates[0])
            if (dates.length >= 2) end = defaultDateRangeFormatter.value(dates[1])
            return props.landscape ? `${start} -<br/>${end}` : `${start} - ${end}`
          }
        } else {
          return INVALID_SELECTION
        }
      } else {
        return Array.isArray(dates) ? INVALID_SELECTION : defaultDateFormatter.value(dates)
      }
    }
  })

  const defaultDateRangeFormatter = computed(() => {
    // TODO: lanscape
    return createNativeLocaleFormatter(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })
  })

  const defaultDateFormatter = computed(() => {
    const titleFormats = {
      year: { year: 'numeric', timeZone: 'UTC' },
      month: { month: 'long', timeZone: 'UTC' },
      date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' },
    }

    const titleDateFormatter = createNativeLocaleFormatter(undefined, titleFormats[props.type], {
      start: 0,
      length: { date: 10, month: 7, year: 4 }[props.type],
    })

    const landscapeFormatter = (date) => titleDateFormatter(date)
    .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
    .replace(', ', ',<br>')

    return props.landscape ? landscapeFormatter : titleDateFormatter
  })

  return {
    year: createNativeLocaleFormatter(undefined, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
    date: props.titleDateFormat || (cptIsMultiSelect.value ? defaultMultipleDateFormatter.value : defaultDateFormatter.value),
  }
})
