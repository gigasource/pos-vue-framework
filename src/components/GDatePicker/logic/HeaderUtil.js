import { computed } from '@vue/composition-api'
import { monthChange, createNativeLocaleFormatter, sanitizeDateString, pad } from './utils'

/**
 * Detect whether dateString is Month format or not
 * Return true if dateString value in format YYYY-MM
 * Otherwise, false
 * @param dateString YYYY or YYYY-MM
 * @returns {boolean}
 */
export const isMonthFormat = (dateString) => {
  return dateString.split('-').length > 1
}

/**
 * Change month or year by {sign} depend on _currentDateMonth props.value is month or year
 * @param value an object contains 'value' property is String
 * @param sign -1 or +1
 * @returns {string} new month or year
 *
 * Example:
 * 1) Calculate month
 *  props { value: '2010-01' }
 *  sign: 1
 *  return: '2010-02'
 * 2) Calculate year
 *  props: { value: '2010' }
 *  sign: -1
 *  return: '2009'
 */
export const calculateChange = (value, sign) => {
  if (isMonthFormat(value)) {
    return monthChange(value, sign)
  } else {
    return (Number(value) + sign).toString()
  }
}

/**
 * Navigation
 * @type {{PREV: number, NEXT: number}}
 */
export const NAV = {
  PREV: -1,
  NEXT: 1
}

export const computedNavigateStatus = (props, state) => {
  // return 'YYYY-MM' from props.min if props.min provided
  const minMonth = computed(() => props.min ? sanitizeDateString(props.min, 'month') : null)
  // return 'YYYY-MM' from props.max if props.max provided
  const maxMonth = computed(() => props.max ? sanitizeDateString(props.max, 'month') : null)
  // return 'YYYY' from props.min if props.min provided
  const minYear = computed(() => props.min ? sanitizeDateString(props.min, 'year') : null)
  // return 'YYYY' from props.max if props.max provided
  const maxYear = computed(() => props.max ? sanitizeDateString(props.max, 'year') : null)
  //
  const min = computed(() => state.activePicker === 'date' ? minMonth.value : minYear.value)
  const max = computed(() => state.activePicker === 'date' ? maxMonth.value : maxYear.value)
  // get YYYY or YYYY-MM depend on active picker
  const cptViewportValue = computed(() => state.activePicker === 'date' ? state.viewportDate.substr(0, 7) : state.viewportDate.substr(0, 4))
  return computed(() => ({
    canGoPrev: !(min.value && calculateChange(cptViewportValue.value, NAV.PREV) < min.value),
    canGoNext: !(max.value && calculateChange(cptViewportValue.value, NAV.NEXT) > max.value)
  }))
}

export const _computedContent = (state) => computed(() => {
  // if active picker is date, then we should show month in the header
  // if active picker is month, the we should show year in the header
  if (state.activePicker === 'date') {
    return state.viewportDate.substr(0, 7)
  }// YYYY-MM
  else {
    return state.viewportDate.substr(0, 4)
  } // YYYY
})

export const _computedHeaderFormatFn = (props, state) => computed(() => {
  if (props.headerDateFormat) {
    return props.headerDateFormat
  } else if (state.activePicker === 'date') {
    return createNativeLocaleFormatter(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 })
  } else {
    return createNativeLocaleFormatter(undefined, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
  }
})

export const computedContents = (props, state) => computed(() => {
  const cptHeaderContent = _computedContent(state)
  const cptHeaderContentFormatFn = _computedHeaderFormatFn(props, state)
  return {
    headerContent: cptHeaderContent.value,
    formattedHeaderContent: cptHeaderContentFormatFn.value(cptHeaderContent.value)
  }
})
