import { computed } from '@vue/composition-api'
import { createNativeLocaleFormatter, daysInMonth, isLeapYear, monthChange, pad } from '../../utils';
import { createRange } from '../../../../utils/helpers';
import { setBackgroundColor, setTextColor } from '../../../../mixins/colorable'
import {
  getDisplayed,
  getBtnActiveClass,
  getBtnDisabledClass,
  getBtnOutlinedClass,
  getBtnRoundedClass, isSelected, isCurrent
} from '../date-picker-table'
import dateFilter from '../../dateFilter'

export const EVENT_NAMES = {
  INPUT: 'input',
  UPDATE_TABLE_DATE: 'update:table-date',
  DATE_CLICKED: 'click:date',
  DATE_DB_CLICKED: 'dblclick:date'
}

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
export const getDayNameInWeek = (props) => {
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
 * @param context
 * @returns {{onWheel: onWheel}}
 */
export const getDateTableEvents = (props, context) => {
  return {
    onWheel: (e) => {
      if (!props.disabled && props.scrollable) {
        e.preventDefault()
        context.emit(EVENT_NAMES.UPDATE_TABLE_DATE, calculateTableDate(props, e.deltaY))
      }
    }
  }
}

/**
 *
 * @param props
 * @param delta
 * @returns {string}
 */
export const calculateTableDate = (props, delta) => monthChange(props.tableDate, Math.sign(delta || 1))

/**
 *
 * @param props
 * @returns {Ref<any>}
 * @private
 */
export const _getDateFormatter = (props) => computed(() => {
  return props.format || createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 })
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
export function _getWeekNumber(props, displayedYear, displayedMonth) {
  let dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][displayedMonth.value]
  if (displayedMonth.value > 1 && isLeapYear(displayedYear.value))
    dayOfYear++
  const offset = (
      displayedYear.value +
      ((displayedYear.value - 1) >> 2) -
      Math.floor((displayedYear.value - 1) / 100) +
      Math.floor((displayedYear.value - 1) / 400) -
      Number(props.firstDayOfWeek)
  ) % 7 // https://en.wikipedia.org/wiki/Zeller%27s_congruence
  return Math.floor((dayOfYear + offset) / 7) + 1
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
export function _genEvents(date, props) {
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
 * @param context
 * @param date
 * @private
 */
export function _addEventHandler(dateItem, props, context, date) {
  dateItem.eventHandlers = props.disabled ? undefined : {
    click: () => {
      if (dateItem.isAllowed && !props.readonly) {
        context.emit(EVENT_NAMES.INPUT, date)
      }
      context.emit(EVENT_NAMES.DATE_CLICKED, date)
    },
    dblclick: () => context.emit(EVENT_NAMES.DATE_DB_CLICKED, date),
  }
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
 * Return a date table - a two dimensions array with each row is a week
 * @param props
 * @param context
 * @returns {Ref<any>}
 */
export const getDates = (props, context) => {
  const { displayedMonth, displayedYear } = getDisplayed(props)
  const isDateAvailable = dateFilter(props)
  const dateFormatter = _getDateFormatter(props)

  return computed(() => {
    const weeks = []
    let week = []

    let weekNumber = _getWeekNumber(props, displayedYear, displayedMonth)
    // add week first
    props.showWeek && week.push({ isWeek: true, value: weekNumber++ })

    // add blank day before the first day of the month
    let dayBeforeFirstDayOfMonths = _weekDaysBeforeFirstDayOfTheMonth(props, displayedYear, displayedMonth)
    while (dayBeforeFirstDayOfMonths--)
      week.push({ isBlank: true })

    // add days in month
    const daysInMonth = daysInMonth(displayedYear.value, displayedMonth.value + 1)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${displayedYear.value}-${pad(displayedMonth.value + 1)}-${pad(day)}`

      let dateItem = {
        isAllowed: isDateAvailable(date),
        isSelected: isSelected(props, date),
        isCurrent: isCurrent(props, date)
      }

      dateItem.class = {
        ...getBtnActiveClass(dateItem.isSelected),
        ...getBtnRoundedClass(),
        ...getBtnDisabledClass(dateItem.isAllowed, props.disabled),
        ...getBtnOutlinedClass(dateItem.isCurrent)
      }

      _addEventHandler(dateItem, props, context, date)

      dateItem.content = dateFormatter.value(date)
      dateItem.events = _genEvents(date, props)

      if (props.range)
        _addRangeInformation(dateItem, props, date)

      // set color
      let setColor = dateItem.isSelected ? setBackgroundColor : setTextColor
      let color = (dateItem.isSelected || dateItem.isCurrent) && (props.color || '')

      setColor(color, dateItem)
      week.push(dateItem)

      if (week.length % (props.showWeek ? 8 : 7) === 0) {
        weeks.push(week)
        week = []
        if (day < daysInMonth && props.showWeek)
          week.push({ isWeek: true, value: weekNumber++ })
      }
    }
    if (week.length) {
      weeks.push(week)
    }
    return weeks
  })
}


