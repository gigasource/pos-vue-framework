import { computed } from '@vue/composition-api'
import { pad } from './utils';
import { createRange } from '../../../utils/helpers';
import { setBackgroundColor } from '../../../mixins/colorable'
import { isSelected, computedDisplayMonth, computedDisplayYear, isAllowed, applyNewSelectedValue } from './TableUtil'
import dayjs from 'dayjs';

export const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Return true if year is leapYear, otherwise false
 * @param year
 * @returns {boolean}
 * @private
 */
export function _isLeapYear (year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

export function daysInMonth(year, month) {
 return _isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month + 1] : DAYS_IN_MONTH[month + 1]
}

/**
 * Return number of day in a month
 * @param cptYear
 * @param cptMonth
 * @returns {number}
 * @private
 */
export const _computedDaysInMonth = (cptYear, cptMonth) => computed(() => {
  return daysInMonth(cptYear.value, cptMonth.value)
})

/**
 * Return day name in a week depend on props.firstDayOfWeek options
 * If props.firstDayOfWeek undefined, Sunday will be considered as fist day of week
 * Otherwise, first day of week will be set depend on corresponding props.firstDayOfWeek value
 *
 * +------------------------------+
 * | firstDayOfWeek | day name    |
 * |----------------|-------------|
 * | 0              | Sunday      |
 * | 1              | Monday      |
 * | 2              | Tuesday     |
 * ...
 * @param props
 * @returns {Ref<any>}
 */
export const _computedDayNameInWeek = (props) => {
  const narrowWeekDayFn = (date => dayjs(date).format('dd').substr(0, 1))
  const weekdayFormatter = computed(() => props.weekdayFormat || narrowWeekDayFn)

  const weekDays = computed(() => {
    const first = parseInt(props.firstDayOfWeek, 10)
    return weekdayFormatter.value
        ? createRange(7).map(i => weekdayFormatter.value(`2017-01-${first + i + 15}`)) // 2017-01-15 is Sunday
        : createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
  })

  return computed(() => {
    const output = weekDays.value.map(d => d)
    props.showWeek && output.unshift('')
    return output
  })
}

/**
 * Returns number of the days from the firstDayOfWeek to the first day of the _currentDateMonth month
 * @param props
 * @param displayedYear
 * @param displayedMonth
 * @returns {number}
 * @private
 */
const _computedDaysBeforeFirstDayOfTheMonth = (props, displayedYear, displayedMonth) => computed(() => {
  const firstDayOfTheMonth = new Date(`${displayedYear.value}-${pad(displayedMonth.value + 1)}-01T00:00:00+00:00`)
  const weekDay = firstDayOfTheMonth.getUTCDay()
  return (weekDay - parseInt(props.firstDayOfWeek) + 7) % 7
})

/**
 * Return a week number of the week in year
 * @returns {number}
 * @private
 */
export function _computedWeekNumber(props, cptYear, cptMonth) {
  // https://en.wikipedia.org/wiki/Zeller%27s_congruence
  const dayOfYearArr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  return computed(() => {
    let dayOfYear = dayOfYearArr[cptMonth.value]
    if (cptMonth.value > 1 && _isLeapYear(cptYear.value)) {
      dayOfYear++
    }
    const offset = (
        cptYear.value +
        ((cptYear.value - 1) >> 2) -
        Math.floor((cptYear.value - 1) / 100) +
        Math.floor((cptYear.value - 1) / 400) -
        Number(props.firstDayOfWeek)
    ) % 7
    return Math.floor((dayOfYear + offset) / 7) + 1
  })
}

// TODO: Bring _getEventColors to GDatePicker.vue
export function _getEventColors(date, props) {
  const arrayize = (v) => Array.isArray(v) ? v : [v]
  let eventData
  let eventColors = []

  if (Array.isArray(props.events)) {
    eventData = props.events.includes(date)
  } else if (props.events instanceof Function) {
    eventData = props.events(date) || false
  } else if (props.events) {
    eventData = props.events[date] || false
  } else {
    eventData = false
  }

  if (!eventData) {
    return []
  } else if (eventData !== true) {
    eventColors = arrayize(eventData)
  } else if (typeof props.eventColor === 'string') {
    eventColors = [props.eventColor]
  } else if (typeof props.eventColor === 'function') {
    eventColors = arrayize(props.eventColor(date))
  } else if (Array.isArray(props.eventColor)) {
    eventColors = props.eventColor
  } else {
    eventColors = arrayize(props.eventColor[date])
  }

  return eventColors.filter(v => v)
}
export function _genEvents(props, date) {
  const eventColors = _getEventColors(date, props)
  if (eventColors.length) {
    return eventColors.map(color => setBackgroundColor(color, {}))
  }
  return null
}

export function _addRangeInformation(dateItem, state, date) {
  if (Array.isArray(state.selectedValues) && dateItem.isSelected) {
    if (state.selectedValues[0] === date) {
      dateItem.isRangeStart = true
    }

    if (state.selectedValues[state.selectedValues.length - 1] === date) {
      dateItem.isRangeEnd = true
    }

    if (!(dateItem.isRangeStart || dateItem.isRangeEnd))
      dateItem.isInRange = true
  }
}

export const _computedDatesInMonth = (props, state) => {
  const cptMonth = computedDisplayMonth(state)
  const cptYear = computedDisplayYear(state)

  const defaultDayFormatFn = (day => dayjs(day).format('DD'))
  const cptDateFormatFunc = computed(() => props.dayFormat || defaultDayFormatFn)
  const cptDaysInMonth = _computedDaysInMonth(cptYear, cptMonth)
  const cptWeekNumber = _computedWeekNumber(props, cptYear, cptMonth)
  const cptDaysBeforeFirstDayOfMonth = _computedDaysBeforeFirstDayOfTheMonth(props, cptYear, cptMonth)

  // each week will be displayed in a row of Date table
  return computed(() => {
    const weeks = []
    let week = []

    // add week number of option showWeek is ON
    let weekNumber = cptWeekNumber.value
    props.showWeek && week.push({ isWeek: true, value: weekNumber++ })

    // add blank day before the first day of the month
    let dayBeforeFirstDayOfMonths = cptDaysBeforeFirstDayOfMonth.value
    while (dayBeforeFirstDayOfMonths--)
      week.push({ isBlank: true })

    const currentDate =  dayjs().format('YYYY-MM-DD')

    // add days in month
    const daysInMonth = cptDaysInMonth.value
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${cptYear.value}-${pad(cptMonth.value + 1)}-${pad(day)}`
      const dateItem = {
        // raw date value which will be used to change date picker state
        value: date,
        // formatted date which will be shown in view
        formattedValue: cptDateFormatFunc.value(date),
        // boolean value indicate that whether the date can be selected
        isAllowed: isAllowed(props, date),
        // boolean value indicate that whether the date is selected or not
        isSelected: isSelected(props, state, date),
        // boolean value indicate whether the date is current
        isCurrent: props.showCurrent && date === currentDate,
        // events of selected date
        events: _genEvents(props, date)
      }

      if (props.range) {
        _addRangeInformation(dateItem, state, date)
      }

      week.push(dateItem)

      // add week
      if (week.length % (props.showWeek ? 8 : 7) === 0) {
        weeks.push(week)
        week = []
        if (day < daysInMonth && props.showWeek) {
          week.push({ isWeek: true, value: weekNumber++ })
        }
      }
    }

    if (week.length) {
      weeks.push(week)
    }

    return weeks
  })
}

export const computedDateTableModel = ({ props, context, state, cptIsMultiSelect }) => {
  const cptDayNames = _computedDayNameInWeek(props)
  const cptDateRows = _computedDatesInMonth(props, state)

  return computed(() => ({
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
  }))
}
