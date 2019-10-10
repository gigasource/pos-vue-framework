<script>
  import { createRange } from '../../utils/helpers';
  import { pad, createNativeLocaleFormatter, monthChange } from './util'
  import { computed, createElement as h } from '@vue/composition-api';
  import GDatePickerTable from './mixins/date-picker-table'

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
      const {
        displayedMonth,
        displayedYear,
        genButton,
        genTable
      } = GDatePickerTable(props, context)

      // computed
      const formatter = computed(() => {
        return props.format || createNativeLocaleFormatter(undefined/*TODO: this.currentLocale*/, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 })
      })

      const weekdayFormatter = computed(() => {
        return props.weekdayFormat || createNativeLocaleFormatter(undefined/*TODO: this.currentLocale*/, { weekday: 'narrow', timeZone: 'UTC' })
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

      function genTHead() {
        const days = weekDays.value.map(day => h('th', day))
        props.showWeek && days.unshift(h('th'))
        return h('thead', genTR(days))
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

      function genWeekNumber(weekNumber/*: number*/) {
        return h('td', [
          h('small', {
            staticClass: 'g-date-picker-table--date__week',
          }, String(weekNumber).padStart(2, '0')),
        ])
      }

      function genTBody() {
        const children = []
        const daysInMonth = new Date(displayedYear.value, displayedMonth.value + 1, 0).getDate()
        let rows = []
        let day = weekDaysBeforeFirstDayOfTheMonth()
        let weekNumber = getWeekNumber()

        props.showWeek && rows.push(genWeekNumber(weekNumber++))

        while (day--) rows.push(h('td'))
        for (day = 1; day <= daysInMonth; day++) {
          const date = `${displayedYear.value}-${pad(displayedMonth.value + 1)}-${pad(day)}`

          rows.push(h('td', [
            genButton(date, true, 'date', formatter.value),
          ]))

          if (rows.length % (props.showWeek ? 8 : 7) === 0) {
            children.push(genTR(rows))
            rows = []
            day < daysInMonth && props.showWeek && rows.push(genWeekNumber(weekNumber++))
          }
        }

        if (rows.length) {
          children.push(genTR(rows))
        }

        return h('tbody', children)
      }

      function genTR(children) {
        return [h('tr', children)]
      }

      return () => {
        return genTable('g-date-picker-table g-date-picker-table--date', [
          genTHead(),
          genTBody(),
        ], calculateTableDate)
      }
    }
  }
</script>
<style scoped>
</style>
