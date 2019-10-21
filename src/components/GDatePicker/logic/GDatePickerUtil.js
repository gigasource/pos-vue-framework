import { computed, reactive } from '@vue/composition-api'
import { createNativeLocaleFormatter, getCurrentDateISOFormat, pad, sanitizeDateString } from './utils';
import { computedYearRange } from './YearsUtil'
import { computedMonthRows } from './MonthTableUtil'
import { computedDatesInMonth, computedDayNameInWeek } from './DateTableUtil'
import {
  calculateChange, computedContents,
  computedFormattedContent,
  _computedHeaderFormatFn,
  computedNavigateStatus,
  NAV
} from './HeaderUtil';

export const EVENT_NAMES = {
  INPUT: 'input',
  UPDATE_PICKER_DATE: 'update:picker-date',
  CLICK_DATE: 'click:date',
  DB_CLICK_DATE: 'dblclick:date',
  CLICK_MONTH: 'click:month',
  DB_CLICK_MONTH: 'dblclick:month'
}

/**
 * boolean value indicate that whether user can select multiple day in date picker
 * its value is true when multiple or range option are provided
 * @param props
 * @returns {*}
 */
export const _computedIsMultiple = (props) => computed(() => props.multiple || props.range)

/**
 * Title format
 * @param props
 * @param cptIsMultiSelect
 * @param dateRanges
 * @returns {Ref<any>}
 * @private
 */
export const _computedTitleFormatterFn = (props, cptIsMultiSelect) => computed(() => {
  const defaultMultipleDateFormatter = computed(() => {
    return dates => {
      if (cptIsMultiSelect.value) {
        if (Array.isArray(dates)) {
          if (props.multiple) {
            // multiple selection mode
            return dates.length + ' selected'
          } else {
            // range selection mode, try to count the number of date range
            // TODO: We only need the number of days in range, not the date value
            const dateRanges = _generateDateRange(props)
            return dateRanges.value.length + ' selected'
          }
        } else {
          return '1 selected'
        }
      } else {
        if (Array.isArray(dates)) {
          return defaultDateFormatter.value(dates[0])
        } else {
          return defaultDateFormatter.value(dates)
        }
      }
    }
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

export function applyNewSelectedValue(props, state, newValue) {
  if (props.range) {
    if (state.selectedValues.length !== 1) {
      state.selectedValues = [newValue]
    } else {
      if (state.selectedValues[0] > newValue) {
        state.selectedValues.unshift(newValue)
      } else if (state.selectedValues[0] < newValue) {
        state.selectedValues.push(newValue)
      } else { // equal, deselect
        state.selectedValues = []
      }
    }
  } else if (props.multiple) {
    const newValueIndex = state.selectedValues.indexOf(newValue)
    if (newValueIndex === -1) {
      state.selectedValues.push(newValue)
    } else {
      state.selectedValues.splice(newValueIndex, 1)
    }
  } else { // single
    state.selectedValues = newValue
  }
}

/**
 * generate date array from input date
 * if selection method is multiple or single, return input value
 * otherwise, generate date range, boundary included
 * @param props
 * @returns {*}
 */
export const _generateDateRange = (props) => {
  const TICKS_PER_DAY = 864e5
  const descOrder = (a, b) => a > b ? 1 : -1
  return computed(() => {
    let dates = props.value
    if (props.range && props.value && props.value.length === 2) {
      dates = []
      const [rangeFrom, rangeTo] = [props.value[0], props.value[1]].map(x => new Date(`${x}T00:00:00+00:00`)).sort(descOrder)
      const diffDays = Math.ceil((rangeTo.getTime() - rangeFrom.getTime()) / TICKS_PER_DAY)
      for (let day = 0; day <= diffDays; day++) {
        dates.push(new Date(rangeFrom.getTime() + day * TICKS_PER_DAY).toISOString().substring(0, 10))
      }
    }
    return dates
  })
}


// Models
export const _getTitleModel = ({ props, state, cptIsMultiSelect }) => computed(() => {
  const cptFormatFuncs = _computedTitleFormatterFn(props, cptIsMultiSelect)
  return {
    date: cptFormatFuncs.value.date(state.selectedValues),
    year: cptFormatFuncs.value.year(state.viewportDate),
    on: {
      yearClicked: (year) => {
        if (state.activePicker !== 'year') {
          // show year picker, highlight the year in viewportDate
          state.activePicker = 'year'
          state.viewportDate = `${year}`
        }
      }
    }
  }
})

export const _getYearModel = ({ props, state }) => computed(() => {
  const cptYears = computedYearRange(props)
  return {
    years: cptYears.value,
    selectedYear: state.viewportDate,
    on: {
      yearClicked: (year) => {
        // show month picker of the year is selected year
        state.activePicker = 'month'
        state.viewportDate = `${year}`
      }
    }
  }
})

export const _getHeaderModel = ({ props, state }) => computed(() => {
  const cptContents = computedContents(props, state)
  const cptNavigateStatus = computedNavigateStatus(props, state)

  return {
    content: cptContents.value.formattedHeaderContent,
    canGoPrev: cptNavigateStatus.value.canGoPrev,
    canGoNext: cptNavigateStatus.value.canGoNext,
    on: {
      headerClicked: () => state.activePicker = (state.activePicker === 'date' ? 'month' : 'year'),
      prevClicked: () => state.viewportDate = calculateChange(cptContents.value.headerContent, NAV.PREV),
      nextClicked: () => state.viewportDate = calculateChange(cptContents.value.headerContent, NAV.NEXT)
    }
  }
})

export const _getDateTableModel = ({ props, context, state, cptIsMultiSelect }) => computed(() => {
  const cptDayNames = computedDayNameInWeek(props)
  const cptDateRows = computedDatesInMonth(props, state)
  return {
    dayNames: cptDayNames.value,
    dateRows: cptDateRows.value,
    on: {
      onDateClicked: (dateItem) => {
        if (dateItem.isAllowed && !props.readonly) {
          applyNewSelectedValue(props, state, dateItem.value)
          context.emit('input', cptIsMultiSelect.value ? state.selectedValues.map(val => val) : state.selectedValues)
          context.emit('click:date', dateItem.value)
        }
      },
      onDateDoubleClicked: (dateItem) => {
        if (dateItem.isAllowed && !props.readonly) {
          context.emit('dblclick:date', dateItem.value)
        }
      }
    }
  }
})

export const _getMonthTableModel = ({ props, context, state, cptIsMultiSelect }) => computed(() => {
  const cptMonthRows = computedMonthRows(props, state)
  return {
    monthRows: cptMonthRows.value,
    on: {
      monthClicked: (monthItem) => {
        if (props.type === 'date') {
          // If this month is selectable, show datepicker with date data gathered from selected month
          if (monthItem.isAllowed) {
            state.activePicker = 'date'
            state.viewportDate = monthItem.value
          }
        } else if (props.type === 'month') {
          if (monthItem.isAllowed && !props.readonly) {
            applyNewSelectedValue(props, state, monthItem.value)

            // if props is month, then emit selected value
            context.emit('input', cptIsMultiSelect.value ? state.selectedValues.map(val => val) : state.selectedValues)
            context.emit('click:month', monthItem.value)
          }
        }
      },
      monthDoubleClicked: (monthItem) => {
        if (monthItem.isAllowed && !props.readonly) {
          context.emit('dblclick:month', monthItem.value)
        }
      }
    }
  }

})

/**
 * Validate if input value is correct or not
 * If user pass invalid input value, then show a warning about it
 * @param initialValue
 * @param cptIsMultiSelect
 */
function validateInitialValue(initialValue, cptIsMultiSelect) {
  if (initialValue == null) {
    return
  }
  const valueType = initialValue.constructor.name
  const expected = cptIsMultiSelect.value ? 'Array' : 'String'
  if (valueType !== expected) {
    console.warn(`Value must be ${cptIsMultiSelect.value ? 'an' : 'a'} ${expected}, got ${valueType}`)
  }
}

function getValidInitialValue(props, cptIsMultiSelect) {
  const now = new Date()
  const defaultValue = (props.type === 'date'
      ? `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
      : `${now.getFullYear()}-${now.getMonth() + 1}`)
  return (cptIsMultiSelect.value
      ? (props.value || []).map(value => value)
      : (props.value || defaultValue))
}

/**
 *
 * @param props
 * @param context
 * @returns {{header: Ref<any>, year: Ref<any>, months: Ref<any>, state: UnwrapRef<{selectedMonth: undefined, activePicker: *, selectedYear: undefined, selectedDay: undefined, tableDate}>, title: Ref<any>, dates: Ref<any>}}
 */
export default (props, context) => {
  const cptIsMultiSelect = _computedIsMultiple(props)
  validateInitialValue(props.value, cptIsMultiSelect)

  const initViewportDate = getCurrentDateISOFormat().substr(0, props.type === 'date' ? 10 : 7)

  const state = reactive({
    // string value indicate what viewport should be shown
    // 'year': year picker
    // 'month': month picker
    // 'date': date picker
    activePicker: props.type,

    // value used to activate navigation
    // values:
    //   YYYY: when show year picker, YYYY value will be used to highlight current year
    //   YYYY: when show month picker, with YYYY is the year of month picker
    //   YYYY-MM: show date picker, with YYYY-MM is the month of date picker
    viewportDate: initViewportDate,

    // store selected value(s)
    // string if single mode is used
    // array with multiple items if multiple mode is selected
    // array with 1 or 2 items if range mode is selected
    selectedValues: getValidInitialValue(props, cptIsMultiSelect),
  })

  // cause we don't support year picker atm so, context will not be used
  // year and header doesn't depend on props.multiple or props.range so cptIsMultiSelect will not be used
  return {
    titleModel: _getTitleModel({ props, state, cptIsMultiSelect }),
    yearModel: _getYearModel({ props, state }),
    headerModel: _getHeaderModel({ props, state }),
    dateTableModel: _getDateTableModel({ props, state, context, cptIsMultiSelect }),
    monthTableModel: _getMonthTableModel({ props, state, context, cptIsMultiSelect }),
    state
  }
}
