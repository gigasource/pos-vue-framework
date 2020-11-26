import { computed } from 'vue'
import { sanitizeDateString, pad } from './utils'
import dayjs from 'dayjs';

/**
 * Navigation
 * @type {{PREV: number, NEXT: number}}
 */
export const NAV = {
  PREV: -1,
  NEXT: 1
}

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
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
export const _monthChange = (value, sign) => {
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
export const _calculateChange = (value, sign) => {
  if (isMonthFormat(value)) {
    return _monthChange(value, sign)
  } else {
    return (Number(value) + sign).toString()
  }
}

/**
 * Get navigation state
 * @export4test
 * @param props
 * @param state
 * @returns {Ref<any>}
 * @private
 */
export const _computedNavigateStatus = (props, state) => {
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
    canGoPrev: !(min.value && _calculateChange(cptViewportValue.value, NAV.PREV) < min.value),
    canGoNext: !(max.value && _calculateChange(cptViewportValue.value, NAV.NEXT) > max.value)
  }))
}

/**
 * Get computed header content
 * @export4test
 * @param state
 * @returns {Ref<any>}
 * @private
 */
export const _computedHeaderContent = state => {
  return computed(() => dayjs(state.viewportDate).format(state.activePicker === 'date' ? 'YYYY-MM' : 'YYYY'));
}

/**
 * get header format function
 * @export4test
 * @param props
 * @param state
 * @returns {Ref<any>}
 * @private
 */
export const _computedHeaderFormatFn = (props, state) => {
  const formatFn = date => dayjs(date).format(state.activePicker === 'date' ? 'MMMM YYYY' : 'YYYY')
  return computed(() => props.headerDateFormat || formatFn)
}

/**
 * @export4test
 * @private
 * @param props
 * @param state
 * @returns {Ref<any>}
 * @private
 */
export const _computedContents = (props, state) => {
  const cptHeaderContentFormatFn = _computedHeaderFormatFn(props, state)
  const cptHeaderContent = _computedHeaderContent(state)

  return computed(() => ({
    headerContent: cptHeaderContent.value,
    formattedHeaderContent: cptHeaderContentFormatFn.value(cptHeaderContent.value)
  }))
}

/**
 *
 * @param props
 * @param state
 * @returns {Ref<any>}
 * @private
 */
export const computedHeaderModel = ({ props, state }) => {
  const cptContents = _computedContents(props, state)
  const cptNavigateStatus = _computedNavigateStatus(props, state)
  const cptChangePrev = computed(() => _calculateChange(cptContents.value.headerContent, NAV.PREV))
  const cptChangeNext = computed(() => _calculateChange(cptContents.value.headerContent, NAV.NEXT))

  return computed(() => ({
    content: cptContents.value.formattedHeaderContent,
    canGoPrev: cptNavigateStatus.value.canGoPrev,
    canGoNext: cptNavigateStatus.value.canGoNext,
    on: {
      headerClicked: () => state.activePicker = (state.activePicker === 'date' ? 'month' : 'year'),
      prevClicked: () => state.viewportDate = cptChangePrev.value,
      nextClicked: () => state.viewportDate = cptChangeNext.value
    }
  }))
}
