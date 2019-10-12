<template>
  <div class="g-date-picker-table g-date-picker-table--date"
       :class="{'g-date-picker-table--disabled': disabled}"
       v-on:wheel="onWheel">
    <transition :name="transitionName">
      <table :key="tableDate">
        <thead>
          <tr>
            <th v-for="day in days">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dateData">
            <td v-for="day in row">
              <template v-if="day.isWeek">
                <small class="g-date-picker-table--date__week'">
                  {{ String(day.value).padStart(2, '0') }}
                </small>
              </template>
              <template v-else-if="day.isBlank">
              </template>
              <template v-else>
                <button class="g-btn"
                        type="button"
                        :class="day.class"
                        :style="day.style"
                        :disabled="disabled || !day.isAllowed"
                        v-on="day.eventHandlers"
                >
                  <div class="g-btn__content">
                    {{ day.content }}
                  </div>
                  <div class="g-date-picker-table__events">
                    <div v-for="event in day.events"
                         :class="event.class"
                         :style="event.style"
                    >
                    </div>
                  </div>
                </button>

              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
  import { createRange } from '../../utils/helpers';
  import { pad, createNativeLocaleFormatter, monthChange, isDateAllowed, TRANSITION_NAMES } from './utils'
  import { computed, reactive, watch } from '@vue/composition-api';
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable'
  import GDatePickerTable from './date-picker-table'

  const CLS_BTN_START_RANGE = 'g-btn--start-range'
  const CLS_BTN_END_RANGE = 'g-btn--end-range'
  const CLS_BTN_IN_RANGE = 'g-btn--in-range'

  export const EVENT_NAMES = {
    INPUT: 'input',
    UPDATE_TABLE_DATE: 'update:table-date',
    DATE_CLICKED: 'click:date',
    DATE_DB_CLICKED: 'dblclick:date'
  }

  export default {
    name: 'GDatePickerDateTable',
    props: {
      // GDatePickerTable
      allowedDates: null,
      current: String,
      disabled: Boolean,
      format: null,
      events: {
        type: [Array, Function, Object],
        default: () => null,
      },
      eventColor: {
        type: [Array, Function, Object, String],
        default: () => 'warning',
      },
      min: String,
      max: String,
      readonly: Boolean,
      scrollable: Boolean,
      tableDate: {
        type: String,
        required: true,
      },
      value: [String, Array],

      // GDatePicker
      range: [Boolean],

      // Colorable
      color: [String],

      // GDatePickerDateTable
      firstDayOfWeek: {
        type: [String, Number],
        default: 0,
      },
      showWeek: Boolean,
      weekdayFormat: Function
    },
    setup(props, context) {
      // mixins
      const {
        genButtonClasses,
        displayedMonth,
        displayedYear,
      } = GDatePickerTable(props, context)

      // state
      const state = reactive({ isReversing: false })

      // computed
      const formatter = computed(() => {
        return props.format || createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 })
      })
      const weekdayFormatter = computed(() => {
        return props.weekdayFormat || createNativeLocaleFormatter(undefined, { weekday: 'narrow', timeZone: 'UTC' })
      })
      const weekDays = computed(() => {
        const first = parseInt(props.firstDayOfWeek, 10)

        return weekdayFormatter.value
            ? createRange(7).map(i => weekdayFormatter.value(`2017-01-${first + i + 15}`)) // 2017-01-15 is Sunday
            : createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
      })

      // methods
      function calculateTableDate(delta/*: number*/) {
        return monthChange(props.tableDate, Math.sign(delta || 1))
      }

      // Returns number of the days from the firstDayOfWeek to the first day of the current month
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

      function genEvents(date) {
        const eventColors = getEventColors(date)
        if (eventColors.length) {
          return eventColors.map(color => setBackgroundColor(color, {}))
        }
        return null
      }

      function rowsData() {
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
            isAllowed: isDateAllowed(date, props.min, props.max, props.allowedDates),
            isFloating: true,
            isSelected: date === props.value || (Array.isArray(props.value) && props.value.indexOf(date) !== -1),
            isCurrent: date === props.current
          }
          dayData.class = genButtonClasses(dayData.isAllowed, dayData.isFloating, dayData.isSelected, dayData.isCurrent)
          dayData.eventHandlers = props.disabled ? undefined : {
            click: () => {
              if (dayData.isAllowed && !props.readonly)
                context.emit(EVENT_NAMES.INPUT, date)
              context.emit(EVENT_NAMES.DATE_CLICKED, date)
            },
            dblclick: () => context.emit(EVENT_NAMES.DATE_DB_CLICKED, date),
          }
          dayData.content = formatter.value(date)
          dayData.events = genEvents(date)

          // range
          if (Array.isArray(props.value) && props.value.length > 1 && dayData.isSelected && props.range) {
            if (props.value[0] === date)
              dayData.class[CLS_BTN_START_RANGE] = true
            else if (props.value[props.value.length-1] === date)
              dayData.class[CLS_BTN_END_RANGE] = true
            else
              dayData.class[CLS_BTN_IN_RANGE] = true
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
      }

      // date table. A two-dimensions array corresponding to date in month
      const dateData = computed(() => rowsData())

      // event handler on wheel
      const onWheel = (e) => {
        if (!props.disabled && props.scrollable) {
          e.preventDefault()
          context.emit(EVENT_NAMES.UPDATE_TABLE_DATE, calculateTableDate(e.deltaY))
        }
      }

      // transition effect
      const transitionName = computed(() => state.isReversing ? TRANSITION_NAMES.REVERSE_TAB : TRANSITION_NAMES.TAB)
      watch(() => props.tableDate, (oldVal, newVal) => {
        state.isReversing = newVal < oldVal
      })

      // days name in week: Sunday, Monday, etc
      const days = computed(() => {
        const output = weekDays.value.map(d => d)
        props.showWeek && days.unshift('')
        return output
      })

      return {
        onWheel,
        transitionName,
        days,
        dateData
      }
    }
  }
</script>
<style scoped>
</style>
