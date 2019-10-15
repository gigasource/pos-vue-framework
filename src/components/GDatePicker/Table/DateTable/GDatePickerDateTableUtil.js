import { computed } from '@vue/composition-api'
import { createNativeLocaleFormatter, monthChange, pad } from '../../utils';
import { createRange } from '../../../../utils/helpers';
import { setBackgroundColor, setTextColor } from '../../../../mixins/colorable'
import GDatePickerTable from '../date-picker-table'
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


//
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
const calculateTableDate = (props, delta) => monthChange(props.tableDate, Math.sign(delta || 1))

// date table. A two-dimensions array corresponding to date in month
export const getDates = (props, context) => {
  const { genButtonClasses, displayedMonth, displayedYear } = GDatePickerTable(props, context)
  const isDateAvailable = dateFilter(props)

  // formatter
  const formatter = computed(() => {
    return props.format || createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 })
  })

  // Returns number of the days from the firstDayOfWeek to the first day of the _currentDateMonth month
  function weekDaysBeforeFirstDayOfTheMonth() {
    const firstDayOfTheMonth = new Date(`${displayedYear.value}-${pad(displayedMonth.value + 1)}-01T00:00:00+00:00`)
    const weekDay = firstDayOfTheMonth.getUTCDay()
    return (weekDay - parseInt(props.firstDayOfWeek) + 7) % 7
  }

  function getWeekNumber() {
    let dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][displayedMonth.value]
    if (displayedMonth.value > 1 &&
        (((displayedYear.value % 4 === 0) && (displayedYear.value % 100 !== 0)) || (displayedYear.value % 400 === 0))
    ) {
      dayOfYear++
    }
    const offset = (
        displayedYear.value +
        ((displayedYear.value - 1) >> 2) -
        Math.floor((displayedYear.value - 1) / 100) +
        Math.floor((displayedYear.value - 1) / 400) -
        Number(props.firstDayOfWeek)
    ) % 7 // https://en.wikipedia.org/wiki/Zeller%27s_congruence
    return Math.floor((dayOfYear + offset) / 7) + 1
  }

  function genEvents(date) {
    const eventColors = getEventColors(date)
    if (eventColors.length) {
      return eventColors.map(color => setBackgroundColor(color, {}))
    }
    return null
  }

  // events
  function getEventColors (date) {
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

  return computed(() => {
    const dateData = []
    const daysInMonth = new Date(displayedYear.value, displayedMonth.value + 1, 0).getDate()
    let row = []
    let day = weekDaysBeforeFirstDayOfTheMonth()
    let weekNumber = getWeekNumber()
    // add week first
    props.showWeek && row.push({ isWeek: true, value: weekNumber++ })
    // add blank day before the first day of the month
    while (day--) row.push({ isWeek: false, isBlank: true })
    // add days in month
    for (day = 1; day <= daysInMonth; day++) {
      const date = `${displayedYear.value}-${pad(displayedMonth.value + 1)}-${pad(day)}`
      // build day data
      let dayData = {
        isWeek: false,
        isAllowed: isDateAvailable(date),
        isFloating: true,
        isSelected: date === props.value || (Array.isArray(props.value) && props.value.indexOf(date) !== -1),
        isCurrent: date === props.current
      }
      dayData.class = genButtonClasses(dayData.isAllowed, dayData.isFloating, dayData.isSelected, dayData.isCurrent)
      dayData.eventHandlers = props.disabled ? undefined : {
        click: () => {
          if (dayData.isAllowed && !props.readonly) {
            console.log('emit input', date)
            context.emit(EVENT_NAMES.INPUT, date)
          }
          context.emit(EVENT_NAMES.DATE_CLICKED, date)
        },
        dblclick: () => context.emit(EVENT_NAMES.DATE_DB_CLICKED, date),
      }
      dayData.content = formatter.value(date)
      dayData.events = genEvents(date)

      // range
      if (Array.isArray(props.value) && props.value.length > 1 && dayData.isSelected && props.range) {
        if (props.value[0] === date) {
          dayData.isRangeStart = true
        } else if (props.value[props.value.length - 1] === date) {
          dayData.isRangeEnd = true
        } else {
          dayData.isInRange = true
        }
      }

      // set color
      let setColor = dayData.isSelected ? setBackgroundColor : setTextColor
      let color = (dayData.isSelected || dayData.isCurrent) && (props.color || '')

      setColor(color, dayData)
      row.push(dayData)

      if (row.length % (props.showWeek ? 8 : 7) === 0) {
        dateData.push(row)
        row = []
        day < daysInMonth && props.showWeek && row.push({ isWeek: true, value: weekNumber++ })
      }
    }
    if (row.length) {
      dateData.push(row)
    }
    return dateData
  })
}


