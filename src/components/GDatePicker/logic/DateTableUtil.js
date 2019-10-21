import { computed } from '@vue/composition-api'
import {
  createNativeLocaleFormatter,
  daysInMonth as _daysInMonth,
  getCurrentDateISOFormat,
  isLeapYear,
  monthChange,
  pad
} from './utils';
import { createRange } from '../../../utils/helpers';
import { setBackgroundColor } from '../../../mixins/colorable'
import { isSelected, isCurrent, computedDisplayMonth, computedDisplayYear } from './TableUtil'
import dateFilter from './dateFilter'

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
export const computedDayNameInWeek = (props) => {
  const weekdayFormatter = computed(() => {
    return props.weekdayFormat || createNativeLocaleFormatter(undefined, { weekday: 'narrow', timeZone: 'UTC' })
  })

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
 *
 * @param props
 * @returns {Ref<any>}
 * @private
 */
export const _computedDayFormatFunc = (props) => computed(() => {
  return props.dayFormat || createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 })
})

/**
 * Returns number of the days from the firstDayOfWeek to the first day of the _currentDateMonth month
 * @param props
 * @param displayedYear
 * @param displayedMonth
 * @returns {number}
 * @private
 */
function _weekDaysBeforeFirstDayOfTheMonth(props, displayedYear, displayedMonth) {
  const firstDayOfTheMonth = new Date(`${displayedYear.value}-${pad(displayedMonth.value + 1)}-01T00:00:00+00:00`)
  const weekDay = firstDayOfTheMonth.getUTCDay()
  return (weekDay - parseInt(props.firstDayOfWeek) + 7) % 7
}

/**
 * Return a week number of the week in year
 * @returns {number}
 * @private
 */
export function _computedWeekNumber(props, cptYear, cptMonth) {
  return computed(() => {
    let dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][cptMonth.value]
    if (cptMonth.value > 1 && isLeapYear(cptYear.value))
      dayOfYear++
    const offset = (
        cptYear.value +
        ((cptYear.value - 1) >> 2) -
        Math.floor((cptYear.value - 1) / 100) +
        Math.floor((cptYear.value - 1) / 400) -
        Number(props.firstDayOfWeek)
    ) % 7 // https://en.wikipedia.org/wiki/Zeller%27s_congruence
    return Math.floor((dayOfYear + offset) / 7) + 1
  })
}

/**
 * Get event colors
 * @param date
 * @param props
 * @returns {Array|*}
 * @private
 */
export function _getEventColors (date, props) {
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

/**
 * Get events
 * @param date
 * @returns {null|(*|{})[]}
 * @private
 */
export function _genEvents(props, date) {
  const eventColors = _getEventColors(date, props)
  if (eventColors.length) {
    return eventColors.map(color => setBackgroundColor(color, {}))
  }
  return null
}

/**
 *
 * @param dateItem
 * @param props
 * @param date
 * @private
 */
export function _addRangeInformation(dateItem, props, date) {
  if (Array.isArray(props.value) && props.value.length > 1 && dateItem.isSelected) {
    if (props.value[0] === date) {
      dateItem.isRangeStart = true
    } else if (props.value[props.value.length - 1] === date) {
      dateItem.isRangeEnd = true
    } else {
      dateItem.isInRange = true
    }
  }
}

/**
 *
 * @param props
 * @param state
 * @returns {Ref<any>}
 */
export const computedDatesInMonth = (props, state) =>
    computed(() => {
      const cptMonth = computedDisplayMonth(state)
      const cptYear = computedDisplayYear(state)
      const cptDateFormatFunc = _computedDayFormatFunc(props)
      const isDateAvailableFn = dateFilter(props)

      // each week will be displayed in a row of Date table
      const weeks = []
      let week = []

      // add week number of option showWeek is ON
      let weekNumber = _computedWeekNumber(props, cptYear, cptMonth).value
      props.showWeek && week.push({ isWeek: true, value: weekNumber++ })

      // add blank day before the first day of the month
      let dayBeforeFirstDayOfMonths = _weekDaysBeforeFirstDayOfTheMonth(props, cptYear, cptMonth)
      while (dayBeforeFirstDayOfMonths--)
        week.push({ isBlank: true })

      const current = getCurrentDateISOFormat()

      // add days in month
      const daysInMonth = _daysInMonth(cptYear.value, cptMonth.value + 1)
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `${cptYear.value}-${pad(cptMonth.value + 1)}-${pad(day)}`
        const dateItem = {
          // raw date value which will be used to change date picker state
          value: date,
          // formatted date which will be shown in view
          formattedValue: cptDateFormatFunc.value(date),
          // boolean value indicate that whether the date can be selected
          isAllowed: isDateAvailableFn(date),
          // boolean value indicate that whether the date is selected or not
          isSelected: isSelected(props, state, date),
          // boolean value indicate whether the date is current
          isCurrent: props.showCurrent && date === current,
          // events of selected date
          events: _genEvents(props, date)
        }

        if (props.range) {
          _addRangeInformation(dateItem, props, date)
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


