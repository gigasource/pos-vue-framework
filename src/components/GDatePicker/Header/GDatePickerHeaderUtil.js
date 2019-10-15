import { computed } from '@vue/composition-api'
import { monthChange, createNativeLocaleFormatter } from '../utils'

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
export function getHeaderFormatter(props) {
  return computed(() => {
    if (props.format) {
      return props.format
    } else if (isMonthFormat(String(props.value))) {
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
const calculateChange = (props, sign) => {
  if (isMonthFormat(props.value)) {
    return monthChange(props.value, sign)
  } else {
    return (Number(props.value) + sign).toString()
  }
}

/**
 * Navigation
 * @type {{PREV: number, NEXT: number}}
 */
const NAV = {
  PREV: -1,
  NEXT: 1
}

/**
 * Event names
 * @type {{INPUT: string, TOGGLE: string}}
 */
export const EVENT_NAMES = {
  TOGGLE: 'toggle',
  INPUT: 'input'
}

/**
 *
 * @param props
 * @returns {Ref<any>}
 */
export const getPrevBtnDisabledState = (props) => computed(() => props.disabled || (props.min && calculateChange(props, NAV.PREV) < props.min))

/**
 *
 * @param props
 * @returns {Ref<any>}
 */
export const getNextBtnDisabledState = (props) => computed(() => props.disabled || (props.max && calculateChange(props, NAV.NEXT) < props.max))

/**
 *
 * @param props
 * @param context
 * @returns {{nextClick: (function(): *), onHeaderClicked: (function(): *), prevClick: (function(): *)}}
 */
export const getHeaderEvents = (props, context) => {
  const onHeader = () => context.emit(EVENT_NAMES.TOGGLE)
  const onPrev = () => context.emit(EVENT_NAMES.INPUT, calculateChange(props, NAV.PREV))
  const onNext = () => context.emit(EVENT_NAMES.INPUT, calculateChange(props, NAV.NEXT))

  return {
    onHeader,
    onPrev,
    onNext
  }
}
