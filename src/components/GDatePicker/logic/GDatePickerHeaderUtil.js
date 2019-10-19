import { computed } from '@vue/composition-api'
import { monthChange, createNativeLocaleFormatter } from './utils'
import { DATE_PICKER_TYPE } from './GDatePickerUtil';

/**
 * Detect whether dateString is Month format or not
 * Return true if dateString value in format YYYY-MM
 * Otherwise, false
 * @param dateString YYYY or YYYY-MM
 * @returns {boolean}
 */
function isMonthFormat(dateString) {
  return dateString.split('-').length > 1
}

/**
 * Create header format function
 * @param props
 * @returns {function(_inputDate: string): string} A function which format _inputDate string
 */
export function getHeaderFormatterFn(headerModel) {
  return computed(() => {
    if (headerModel.value.format) {
      return headerModel.value.format
    } else if (isMonthFormat(headerModel.value.value)) {
      return createNativeLocaleFormatter(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 })
    } else {
      return createNativeLocaleFormatter(undefined, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
    }
  })
}

/**
 * Change month or year by {sign} depend on _currentDateMonth props.value is month or year
 * @param props an object contains 'value' property is String
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

/**
 * Get navigation state depend on min, max date values and disabled flag
 * @param headerModel
 * @returns {{canGoNext: Ref<any>, canGoPrev: Ref<any>}}
 */
export const getNavigationState = (headerModel) => {
  return {
    canGoPrev: computed(() => !(headerModel.value.disabled || (headerModel.value.min && calculateChange(headerModel.value.value, NAV.PREV) < headerModel.value.min))),
    canGoNext: computed(() => !(headerModel.value.disabled || (headerModel.value.max && calculateChange(headerModel.value.value, NAV.NEXT) > headerModel.value.max)))
  }
}
