import { computed, reactive, watch } from '@vue/composition-api'
import { createNativeLocaleFormatter, daysInMonth, pad, sanitizeDateString } from './utils';
import dateFilter from './dateFilter'
import { EVENT_NAMES as TITLE_EVENT_NAMES } from './Title/GDatePickerTitleUtil'
import { EVENT_NAMES as YEAR_PICKER_EVENTS } from './Years/GDatePickerYearsUtil'
import { EVENT_NAMES as MONTH_TABLE_EVENTS } from './Table/MonthTable/GDatePickerMonthTableUtil'
import { EVENT_NAMES as DATE_TABLE_EVENTS } from './Table/DateTable/GDatePickerDateTableUtil'

export const EVENT_NAMES = {
  INPUT: 'input',
  CHANGE: 'change',
  UPDATE_PICKER_DATE: 'update:picker-date',
  CLICK_DATE: 'click:date',
  DB_CLICK_DATE: 'dblclick:date',
  CLICK_MONTH: 'click:month',
  DB_CLICK_MONTH: 'dblclick:month'
}

/**
 * * Declare date picker type
 * 'date' : allow select year, month, date
 * 'month': allow select year, month
 * 'year' : allow to select year
 * @type {{DATE: string, MONTH: string, YEAR: string}}
 */
const DATE_PICKER_TYPE = {
  DATE: 'date',
  MONTH: 'month',
  YEAR: 'year'
}
/**
 * boolean value indicate that whether user can select multiple day in date picker
 * its value is true when multiple or range option are provided
 * @param props
 * @returns {*}
 */
export const _isMultiple = (props) => computed(() => props.multiple || props.range)
/**
 * return last value of props.value if it's an array
 * otherwise, return props.value
 * @param props
 * @param isMultiple
 * @returns {*}
 */
export const _lastValue = (props, isMultiple) => computed(() => isMultiple.value ? props.value[props.value.length - 1] : props.value)
/**
 * Return selected months
 * @param props
 * @param isMultiple
 * @returns {Ref<any>}
 * @private
 */
export const _selectedMonths = (props, isMultiple) => computed(() => {
  if (!props.value || !props.value.length || props.type === DATE_PICKER_TYPE.MONTH) {
    return props.value
  } else if (isMultiple.value) {
    return (props.value).map(val => val.substr(0, 7))
  } else {
    return (props.value).substr(0, 7)
  }
})
/**
 * Return currentDay or currentMonth, or currentYear depend on picker type
 * @param props
 * @param state
 * @returns {Ref<any>}
 * @private
 */
export const _currentDateMonth = (props) => computed(() => {
  if (props.showCurrent) {
    const now = new Date()
    return sanitizeDateString(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`, props.type)
  }
})
/**
 *
 * @param props
 * @param state
 * @returns {Ref<any>}
 * @private
 */
export const _inputDate = (props, state) => computed(() => {
  return props.type === DATE_PICKER_TYPE.DATE
      ? `${state.inputYear}-${pad(state.inputMonth + 1)}-${pad(state.inputDay)}`
      : `${state.inputYear}-${pad(state.inputMonth + 1)}`
})
/**
 *
 * @param props
 * @param state
 * @returns {{tableYear: Ref<any>, tableMonth: Ref<any>}}
 * @private
 */
export const _getTableDateElement = (props, state) => {
  return {
    tableMonth: computed(() => Number((state.tableDate).split('-')[1]) - 1),
    tableYear: computed(() => Number((state.tableDate).split('-')[0]))
  }
}
/**
 * Return minimum month/year, maximum month/year if props.min or props.max exists
 *
 * @param props
 * @returns {{minYear: Ref<any>, maxYear: Ref<any>, minMonth: Ref<any>, maxMonth: Ref<any>}}
 * @private
 */
export const _getDateBoundary = (props) => {
  // return 'YYYY-MM' from props.min if props.min provided
  const minMonth = computed(() => props.min ? sanitizeDateString(props.min, DATE_PICKER_TYPE.MONTH) : null)
  // return 'YYYY-MM' from props.max if props.max provided
  const maxMonth = computed(() => props.max ? sanitizeDateString(props.max, DATE_PICKER_TYPE.MONTH) : null)
  // return 'YYYY' from props.min if props.min provided
  const minYear = computed(() => props.min ? sanitizeDateString(props.min, DATE_PICKER_TYPE.YEAR) : null)
  // return 'YYYY' from props.max if props.max provided
  const maxYear = computed(() => props.max ? sanitizeDateString(props.max, DATE_PICKER_TYPE.YEAR) : null)

  return {
    minMonth,
    maxMonth,
    minYear,
    maxYear
  }
}
/**
 * Title format
 * @param props
 * @param isMultiple
 * @param dateRanges
 * @returns {Ref<any>}
 * @private
 */
export const _getTitleFormatterFn = (props, isMultiple, dateRanges) => {
  const defaultTitleMultipleDateFormatter = computed(() => {
    return dates => {
      if (isMultiple.value) {
        if (Array.isArray(dates)) {
          if (props.multiple) {
            return dates.length + ' selected'
          } else {
            return dateRanges.value.length + ' selected'
          }
        } else {
          return '1 selected'
        }
      } else {
        if (Array.isArray(dates)) {
          return defaultTitleDateFormatter.value(dates[0])
        } else {
          return defaultTitleDateFormatter.value(dates)
        }
      }
    }
  })

  const defaultTitleDateFormatter = computed(() => {
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

  return computed(() => {
    return {
      year: props.yearFormat || createNativeLocaleFormatter(undefined, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
      titleDate: props.titleDateFormat || (isMultiple.value ? defaultTitleMultipleDateFormatter.value : defaultTitleDateFormatter.value),
    }
  })
}
/**
 * Emit input event
 * @param props
 * @param context
 * @returns {Function}
 * @private
 */
export const _emitInputFn = (props, context) => {
  /**
   * Emit input if datepicker in range selection mode
   * @param props
   * @param context
   * @param newDate
   * @private
   */
  const _emitInputRangeSelection = (newDate) => {
    // contains 2 items (it's mean previous range)
    // then we need to create new range
    // => emit newInput as the first range boundary
    // otherwise, emit newInput as the last boundary
    const shouldCreateNewRange = (props.value.length === 2)
    if (shouldCreateNewRange) {
      context.emit(EVENT_NAMES.INPUT, [newDate])
    } else {
      context.emit(EVENT_NAMES.INPUT, [...props.value, newDate])
    }
  }

  /**
   * Emit input date for multiple selection date picker
   * @param props
   * @param context
   * @param newDate
   * @private
   */
  const _emitInputMultipleSelection = (newDate) => {
    let selectedDates = Array.isArray(props.value) ? props.value : [props.value]
    // If newDate is not exist in selectedDates, then add it to selectedDates
    // Otherwise, remove it from selectedDates
    let newDateIndex = selectedDates.indexOf(newDate)
    if (newDateIndex === -1 /*newDate is not existed in selectedDate*/) {
      selectedDates.push(newDate)
    } else {
      selectedDates.splice(newDateIndex, 1)
    }
    context.emit(EVENT_NAMES.INPUT, selectedDates)
    context.emit(EVENT_NAMES.CHANGE, newDate)
  }

  /**
   * Emit input event for single selection date picker
   * @param props
   * @param context
   * @param newDate
   * @private
   */
  const _emitInputSingleSelection = (newDate) => {
    context.emit(EVENT_NAMES.INPUT, newDate)
  }

  const emitFn = computed(() => (
      props.range
          ? _emitInputRangeSelection
          : props.multiple
          ? _emitInputMultipleSelection
          : _emitInputSingleSelection
  ))
  return newDate => emitFn.value(newDate)
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

// validate whether value is valid or not
// in case multiple selection, value should be a date array
// otherwise, a date string
export const _validateValue = (props, isMultiple) => {
  return () => {
    if (props.value == null) {
      return
    }
    const valueType = props.value.constructor.name
    const expected = isMultiple.value ? 'Array' : 'String'
    if (valueType !== expected) {
      console.warn(`Value must be ${isMultiple.value ? 'an' : 'a'} ${expected}, got ${valueType}`)
    }
  }
}

/**
 * Set input date
 */
export const _setInputDateFn = (props, state, lastValue) => {
  return () => {
    if (lastValue.value) {
      const array = lastValue.value.split('-')
      state.inputYear = parseInt(array[0], 10)
      state.inputMonth = parseInt(array[1], 10) - 1
      if (props.type === DATE_PICKER_TYPE.DATE) {
        state.inputDay = parseInt(array[2], 10)
      }
    } else {
      const now = new Date()
      state.inputYear = state.inputYear || now.getFullYear()
      state.inputMonth = state.inputMonth == null ? state.inputMonth : now.getMonth()
      state.inputDay = state.inputDay || now.getDate()
    }
  }
}

// Models
export const _getTitleModel = (props, state, formatters) => {
  return computed(() => {
    return {
      date: props.value ? formatters.value.titleDate(props.value) : '',
      disabled: props.disabled,
      readonly: props.readonly,
      selectingYear: state.activePicker === DATE_PICKER_TYPE.YEAR,
      year: formatters.value.year(props.value ? `${state.inputYear}` : state.tableDate),
      eventHandlers: {
        [TITLE_EVENT_NAMES.UPDATE_SELECTING_YEAR]: value /*boolean*/ => {
          state.activePicker = (value ? DATE_PICKER_TYPE.YEAR : props.type)
        }
      }
    }
  })
}
export const _getYearModel = ({ props, state, tableYear, tableMonth }) => {
  return computed(() => {
    return {
      show: state.activePicker === DATE_PICKER_TYPE.YEAR,
      color: props.color,
      min: props.min,
      max: props.max,
      value: tableYear.value,
      eventHandlers: {
        [YEAR_PICKER_EVENTS.INPUT]: (value) => {
          state.inputYear = value
          if (props.type === DATE_PICKER_TYPE.MONTH) {
            state.tableDate = `${value}`
          } else {
            state.tableDate = `${value}-${pad((tableMonth.value || 0) + 1)}`
          }
          if (props.type !== DATE_PICKER_TYPE.YEAR) {
            state.activePicker = DATE_PICKER_TYPE.MONTH
          }
        }
      }
    }
  })
}
export const _getHeaderModel = ({ props, state, minMonth, maxMonth, minYear, maxYear, tableYear, tableMonth }) => {
  return computed(() => {
    return {
      disabled: props.disabled,
      readonly: props.readonly,
      format: props.headerDateFormat,
      min: state.activePicker === DATE_PICKER_TYPE.DATE ? minMonth.value : minYear.value,
      max: state.activePicker === DATE_PICKER_TYPE.DATE ? maxMonth.value : maxYear.value,
      value: state.activePicker === DATE_PICKER_TYPE.DATE ? `${pad(tableYear.value, 4)}-${pad(tableMonth.value + 1)}` : `${pad(tableYear.value, 4)}`,
      eventHandlers: {
        toggle: () => state.activePicker = (state.activePicker === DATE_PICKER_TYPE.DATE ? DATE_PICKER_TYPE.MONTH : DATE_PICKER_TYPE.YEAR),
        input: (value) => state.tableDate = value,
      }
    }
  })
}
export const _getDateTableModel = ({ props, context, state, current, tableYear, tableMonth, emitInput, inputDate }) => {
  return computed(() => {
    return {
      show: state.activePicker === DATE_PICKER_TYPE.DATE,
      allowedDates: props.allowedDates,
      color: props.color,
      current: current.value,
      disabled: props.disabled,
      events: props.events,
      eventColor: props.eventColor,
      firstDayOfWeek: props.firstDayOfWeek,
      format: props.format,
      min: props.min,
      max: props.max,
      readonly: props.readonly,
      scrollable: props.scrollable,
      showWeek: props.showWeek,
      tableDate: `${pad(tableYear.value, 4)}-${pad(tableMonth.value + 1)}`,
      value: _generateDateRange(props).value,
      weekdayFormat: props.weekdayFormat,
      range: props.range,
      eventHandlers: {
        [DATE_TABLE_EVENTS.INPUT]: (value) => {
          state.inputYear = parseInt(value.split('-')[0], 10)
          state.inputMonth = parseInt(value.split('-')[1], 10) - 1
          state.inputDay = parseInt(value.split('-')[2], 10)
          emitInput(inputDate.value)
        },
        [DATE_TABLE_EVENTS.UPDATE_TABLE_DATE]: (value) => state.tableDate = value,
        [DATE_TABLE_EVENTS.DATE_CLICKED]: (value) => context.emit(EVENT_NAMES.CLICK_DATE, value),
        [DATE_TABLE_EVENTS.DATE_DB_CLICKED]: (value) => context.emit(EVENT_NAMES.DB_CLICK_DATE, value),
      }
    }
  })
}
export const _getMonthTableModel = ({ props, context, state, isMultiple, current, minMonth, maxMonth, selectedMonths, tableYear, isDateAvailableFn, inputDate, emitInput }) => {
  return computed(() => {
    return {
      allowedDates: props.type === DATE_PICKER_TYPE.MONTH ? props.allowedDates : null,
      color: props.color,
      current: current.value ? sanitizeDateString(current.value, DATE_PICKER_TYPE.MONTH) : null,
      disabled: props.disabled,
      format: props.monthFormat,
      min: minMonth.value,
      max: maxMonth.value,
      readonly: props.readonly && props.type === DATE_PICKER_TYPE.MONTH,
      scrollable: props.scrollable,
      value: selectedMonths.value,
      tableDate: pad(tableYear.value, 4),
      eventHandlers: {
        input: (value) => {
          state.inputYear = parseInt(value.split('-')[0], 10)
          state.inputMonth = parseInt(value.split('-')[1], 10) - 1
          if (props.type === DATE_PICKER_TYPE.DATE) {
            if (state.inputDay) {
              state.inputDay = Math.min(state.inputDay, daysInMonth(state.inputYear, state.inputMonth + 1))
            }
            state.tableDate = value
            state.activePicker = DATE_PICKER_TYPE.DATE
            if (false/*TODO:this.reactive*/ && !props.readonly && !isMultiple.value && isDateAvailableFn(inputDate.value)) {
              context.emit(EVENT_NAMES.INPUT, inputDate.value)
            }
          } else {
            emitInput(inputDate.value)
          }
        },
        [MONTH_TABLE_EVENTS.UPDATE_TABLE_DATE]: (value) => state.tableDate = value,
        [MONTH_TABLE_EVENTS.MONTH_CLICKED]: (value) => context.emit(EVENT_NAMES.CLICK_MONTH, value),
        [MONTH_TABLE_EVENTS.MONTH_DB_CLICKED]: (value) => context.emit(EVENT_NAMES.DB_CLICK_MONTH, value),
      }
    }
  })
}

/**
 *
 * @param props
 * @param context
 * @returns {{header: Ref<any>, year: Ref<any>, months: Ref<any>, state: UnwrapRef<{inputMonth: undefined, activePicker: *, inputYear: undefined, inputDay: undefined, tableDate}>, title: Ref<any>, dates: Ref<any>}}
 */
export default (props, context) => {
  const state = reactive({
    // string value indicate what component should be shown
    // 'year': year picker
    // 'month': month picker
    // 'date': date picker
    activePicker: props.type,
    // hold the value of input date
    inputDay: undefined,
    inputMonth: undefined,
    inputYear: undefined,
    // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
    tableDate: (() => {
      const now = new Date()
      const date = (props.multiple || props.range ? props.value[props.value.length - 1] : props.value) || `${now.getFullYear()}-${now.getMonth() + 1}`
      return sanitizeDateString(date, props.type === DATE_PICKER_TYPE.DATE ? DATE_PICKER_TYPE.MONTH : DATE_PICKER_TYPE.YEAR)
    })()
  })
  const isMultiple = _isMultiple(props)
  const lastValue = _lastValue(props, isMultiple)
  const selectedMonths = _selectedMonths(props, isMultiple)
  const current = _currentDateMonth(props)
  const inputDate = _inputDate(props, state)
  const { tableMonth, tableYear }  = _getTableDateElement(props, state)
  const dateRanges = _generateDateRange(props)
  const { minMonth, maxMonth, minYear, maxYear } = _getDateBoundary(props)
  const formatFn = _getTitleFormatterFn(props, isMultiple, dateRanges)
  const emitInputFn = _emitInputFn(props, context)
  const isDateAvailableFn = dateFilter(props)
  const validateValueFn = _validateValue(props, isMultiple)
  const setInputDateFn = _setInputDateFn(props, state, lastValue)

  //
  watch(() => state.tableDate, (val) => {
    context.emit(EVENT_NAMES.UPDATE_PICKER_DATE, val)
  }, { lazy: true, flush: 'pre' } )
  watch(() => props.value, (newValue, oldValue) => {
    validateValueFn()
    setInputDateFn()
    if (!isMultiple.value && props.value) {
      state.tableDate = sanitizeDateString(inputDate.value, props.type === DATE_PICKER_TYPE.MONTH ? DATE_PICKER_TYPE.YEAR : DATE_PICKER_TYPE.MONTH)
    } else if (isMultiple.value && (props.value).length && !oldValue.length) {
      state.tableDate = sanitizeDateString(inputDate.value, props.type === DATE_PICKER_TYPE.MONTH ? DATE_PICKER_TYPE.YEAR : DATE_PICKER_TYPE.MONTH)
    }
  }, { lazy: true, flush: 'pre' })
  watch(() => props.type, (type) => {
    state.activePicker = type
    if (props.value && props.value.length) {
      const output = (isMultiple.value ? props.value : [props.value])
      .map((val) => sanitizeDateString(val, type))
      .filter(isDateAvailableFn)

      context.emit(EVENT_NAMES.INPUT, isMultiple.value ? output : output[0])
    }
  }, { lazy: true, flush: 'pre' })

  //
  validateValueFn()
  setInputDateFn()

  return {
    title: _getTitleModel(props, state, formatFn),
    year: _getYearModel({
      props, state, tableYear, tableMonth
    }),
    header: _getHeaderModel({
      props, state,
      minMonth, maxMonth, minYear, maxYear,
      tableYear, tableMonth
    }),
    dates: _getDateTableModel({
      props, context, state,
      current, tableYear, tableMonth,
      inputDate,
      emitInput: emitInputFn
    }),
    months: _getMonthTableModel({
      props, context, state,
      current, minMonth, maxMonth, selectedMonths,
      tableYear,
      isMultiple,
      isDateAvailableFn,
      inputDate,
      emitInput: emitInputFn
    }),
    state
  }
}
