<!--suppress JSUnresolvedFunction -->
<template>
  <g-picker class="g-picker--date"
            :color="headerColor || color"
            :full-width="fullWidth"
            :landscape="landscape"
            :width="width"
            :no-title="noTitle"
  >
    <template #title>
      <g-date-picker-title
          #title
          v-show="!noTitle"
          :date="value ? formatters.titleDate(value) : ''"
          :disabled="disabled"
          :readonly="readonly"
          :selectingYear="state.activePicker === 'YEAR'"
          :year="formatters.year(value ? `${state.inputYear}` : state.tableDate)"
          :yearIcon="yearIcon"
          :value="isMultiple ? value[0] : value"
          v-on="titleEventHandler"
      />
    </template>

    <div :key="state.activePicker">
      <g-date-picker-years
          v-if="state.activePicker === 'YEAR'"
          :color="color"
          :format="yearFormat"
          :min="min"
          :max="max"
          :value="tableYear"
          v-on="{ input: yearClick }"
      />
      <template v-else>
        <g-date-picker-header
            :next-icon="nextIcon"
            :color="color"
            :disabled="disabled"
            :format="headerDateFormat"
            :min="state.activePicker === 'DATE' ? minMonth : minYear"
            :max="state.activePicker === 'DATE' ? maxMonth : maxYear"
            :prev-icon="prevIcon"
            :readonly="readonly"
            :value="state.activePicker === 'DATE' ? `${pad(tableYear, 4)}-${pad(tableMonth + 1)}` : `${pad(tableYear, 4)}`"
            v-on="tableHeaderEventHandler"
        />
        <g-date-picker-date-table
            v-if="state.activePicker === 'DATE'"
            :allowed-dates="allowedDates"
            :color="color"
            :current="current"
            :disabled="disabled"
            :events="events"
            :eventColor="eventColor"
            :firstDayOfWeek="firstDayOfWeek"
            :format="dayFormat"
            :min="min"
            :max="max"
            :readonly="readonly"
            :scrollable="scrollable"
            :showWeek="showWeek"
            :tableDate="`${pad(tableYear, 4)}-${pad(tableMonth + 1)}`"
            :value="generateRange()"
            :weekdayFormat="weekdayFormat"
            :range="range"
            ref="table"
            v-on="dateTableEventHandlers"
        />
        <g-date-picker-month-table
            v-else
            :allowedDates="type === 'month' ? allowedDates : null"
            :color="color"
            :current="current ? sanitizeDateString(current, 'month') : null"
            :disabled="disabled"
            :events="type === 'month' ? events : null"
            :eventColor="type === 'month' ? eventColor : null"
            :format="monthFormat"
            :min="minMonth"
            :max="maxMonth"
            :readonly="readonly && type === 'month'"
            :scrollable="scrollable"
            :value="selectedMonths"
            :tableDate="`${pad(tableYear, 4)}`"
            ref="table"
            v-on="onMonthTableEventHandler"
        />
      </template>
    </div>

    <template #actions>
      <slot></slot>
    </template>
  </g-picker>
</template>

<script>
  import GDatePickerTitle from './GDatePickerTitle'
  import GDatePickerHeader from './GDatePickerHeader'
  import GDatePickerDateTable from './GDatePickerDateTable'
  import GDatePickerMonthTable from './GDatePickerMonthTable'
  import GDatePickerYears from './GDatePickerYears'

  import { computed, reactive, watch } from '@vue/composition-api';
  import { pad, createNativeLocaleFormatter } from './util'
  import _isDateAllowed from './util/isDateAllowed'
  import { daysInMonth } from './util/daysInMonth';
  import GPicker from '../GPicker/GPicker';

  // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
  // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
  function sanitizeDateString(dateString/*: string*/, type/*: 'date' | 'month' | 'year'*/)/*: string*/ {
    const [year, month = 1, date = 1] = dateString.split('-')
    return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
  }

  export default {
    name: 'GDatePicker',
    components: { GDatePickerMonthTable, GDatePickerDateTable, GDatePickerHeader, GDatePickerYears, GDatePickerTitle, GPicker },
    props: {
      allowedDates: null,
      // Function formatting the day in date picker table
      dayFormat: Function,
      disabled: Boolean,
      events: {
        type: [Array, Function, Object],
        default: () => null,
      },
      eventColor: {
        type: [Array, Function, Object, String],
        default: () => 'warning',
      },
      firstDayOfWeek: {
        type: [String, Number],
        default: 0,
      },
      // Function formatting the tableDate in the day/month table header
      headerDateFormat: Function,
      max: String,
      min: String,
      // Function formatting month in the months table
      monthFormat: Function,
      multiple: Boolean,
      nextIcon: {
        type: String,
        default: '$next',
      },
      pickerDate: String,
      prevIcon: {
        type: String,
        default: '$prev',
      },
      range: Boolean,
      readonly: Boolean,
      scrollable: Boolean,
      showCurrent: {
        type: [Boolean, String],
        default: true,
      },
      showWeek: Boolean,
      // Function formatting currently selected date in the picker title
      titleDateFormat: Function,
      type: {
        type: String,
        default: 'date',
        validator: (type) => ['date', 'month'].includes(type),
      },
      value: [Array, String],
      weekdayFormat: Function,
      // Function formatting the year in table header and pickup title
      yearFormat: Function,
      yearIcon: String,

      // picker mixins
      fullWidth: Boolean,
      headerColor: String,
      landscape: Boolean,
      noTitle: Boolean,
      width: {
        type: [Number, String],
        default: 290,
      },

      // colorable
      color: {
        type: String,
        default: 'rgb(77, 0, 234)'
      }
    },
    setup(props, context) {
      // data
      const now = new Date()
      const state = reactive({
        activePicker: props.type.toUpperCase(),
        inputDay: 0,
        inputMonth: 0,
        inputYear: 0,
        isReversing: false,
        now,
        // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
        tableDate: (() => {
          if (props.pickerDate) {
            return props.pickerDate
          }
          const date = (props.multiple || props.range ? props.value[props.value.length - 1] : props.value) || `${now.getFullYear()}-${now.getMonth() + 1}`
          return sanitizeDateString(date, props.type === 'date' ? 'month' : 'year')
        })()
      })

      // computed
      const isMultiple = computed(() => props.multiple || props.range)
      const lastValue = computed(() => isMultiple.value ? (props.value)[(props.value).length - 1] : (props.value))
      const selectedMonths = computed(() => {
        if (!props.value || !props.value.length || props.type === 'month') {
          return props.value
        } else if (isMultiple.value) {
          return (props.value).map(val => val.substr(0, 7))
        } else {
          return (props.value).substr(0, 7)
        }
      })
      const current = computed(() => {
        if (props.showCurrent === true) {
          return sanitizeDateString(`${state.now.getFullYear()}-${state.now.getMonth() + 1}-${state.now.getDate()}`, props.type)
        }
        return props.showCurrent || null
      })
      const inputDate = computed(() => {
        return props.type === 'date'
            ? `${state.inputYear}-${pad(state.inputMonth + 1)}-${pad(state.inputDay)}`
            : `${state.inputYear}-${pad(state.inputMonth + 1)}`
      })
      const tableMonth = computed(() => Number((props.pickerDate || state.tableDate).split('-')[1]) - 1)
      const tableYear = computed(() => Number((props.pickerDate || state.tableDate).split('-')[0]))
      const minMonth = computed(() => props.min ? sanitizeDateString(props.min, 'month') : null)
      const maxMonth = computed(() => props.max ? sanitizeDateString(props.max, 'month') : null)
      const minYear = computed(() => props.min ? sanitizeDateString(props.min, 'year') : null)
      const maxYear = computed(() => props.max ? sanitizeDateString(props.max, 'year') : null)
      const formatters = computed(() => {
        return {
          year: props.yearFormat || createNativeLocaleFormatter(undefined /*TODO: this.currentLocale*/, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
          titleDate: props.titleDateFormat || (isMultiple.value ? defaultTitleMultipleDateFormatter.value : defaultTitleDateFormatter.value),
        }
      })
      const defaultTitleMultipleDateFormatter = computed(() => {
        return dates => {
          if (isMultiple.value) {
            if (Array.isArray(dates)) {
              if (props.multiple) {
                return dates.length + ' selected'
              } else {
                return generateRange().length + ' selected'
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

        const titleDateFormatter = createNativeLocaleFormatter(undefined /*TODO: this.currentLocale*/, titleFormats[props.type], {
          start: 0,
          length: { date: 10, month: 7, year: 4 }[props.type],
        })

        const landscapeFormatter = (date) => titleDateFormatter(date)
        .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
        .replace(', ', ',<br>')

        return props.landscape ? landscapeFormatter : titleDateFormatter
      })

      /// Watch
      watch(() => state.tableDate, (val, prev) => {
        // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
        // compare for example '2000-9' and '2000-10'
        const sanitizeType = props.type === 'month' ? 'year' : 'month'
        state.isReversing = sanitizeDateString(val, sanitizeType) < sanitizeDateString(prev, sanitizeType)
        context.emit('update:picker-date', val)
      }, { lazy: true })
      watch(() => props.pickerDate, (val) => {
        if (val) {
          state.tableDate = val
        } else if (lastValue.value && props.type === 'date') {
          state.tableDate = sanitizeDateString(lastValue.value, 'month')
        } else if (lastValue.value && props.type === 'month') {
          state.tableDate = sanitizeDateString(lastValue.value, 'year')
        }
      }, { lazy: true })
      watch(() => props.value, (newValue, oldValue) => {
        checkMultipleProp()
        setInputDate()
        if (!isMultiple.value && props.value && !props.pickerDate) {
          state.tableDate = sanitizeDateString(inputDate.value, props.type === 'month' ? 'year' : 'month')
        } else if (isMultiple.value && (props.value).length && !oldValue.length && !props.pickerDate) {
          state.tableDate = sanitizeDateString(inputDate.value, props.type === 'month' ? 'year' : 'month')
        }
      }, { lazy: true })
      watch(() => props.type, (type) => {
        state.activePicker = type.toUpperCase()

        if (props.value && props.value.length) {
          const output = (isMultiple.value ? (props.value) : [props.value])
          .map((val) => sanitizeDateString(val, type))
          .filter(isDateAllowed)
          context.emit('input', isMultiple.value ? output : output[0])
        }
      }, { lazy: true })

      //// LIFECYCLE HOOKS
      // created
      checkMultipleProp()
      if (props.pickerDate !== state.tableDate) {
        context.emit('update:picker-date', state.tableDate)
      }
      setInputDate()

      //// Methods
      function emitInput(newInput) {
        if (props.range && props.value) {
          props.value.length === 2
              ? context.emit('input', [newInput])
              : context.emit('input', [...props.value, newInput])
          return
        }
        let output = [];
        if (props.multiple) {
          if (typeof props.value === 'string') {
            output = [props.value]
          } else {
            output = props.value
          }
          let newInputIndex = output.indexOf(newInput)
          if (newInputIndex === -1) {
            output.push(newInput)
          } else {
            output.splice(newInputIndex, 1)
          }
        } else {
          output = newInput
        }

        context.emit('input', output)
        props.multiple || context.emit('change', newInput)
      }

      function checkMultipleProp() {
        if (props.value == null) {
          return
        }
        const valueType = props.value.constructor.name
        const expected = isMultiple.value ? 'Array' : 'String'
        if (valueType !== expected) {
          console.warn(`Value must be ${isMultiple.value ? 'an' : 'a'} ${expected}, got ${valueType}`)
        }
      }

      function isDateAllowed(value) {
        return _isDateAllowed(value, props.min, props.max, props.allowedDates)
      }

      function yearClick(value) {
        state.inputYear = value
        if (props.type === 'month') {
          state.tableDate = `${value}`
        } else {
          state.tableDate = `${value}-${pad((tableMonth.value || 0) + 1)}`
        }
        state.activePicker = 'MONTH'
        if (false /*TODO:this.reactive*/ && !props.readonly && !isMultiple.value && isDateAllowed(inputDate.value)) {
          context.emit('input', inputDate.value)
        }
      }

      function monthClick(value) {
        state.inputYear = parseInt(value.split('-')[0], 10)
        state.inputMonth = parseInt(value.split('-')[1], 10) - 1
        if (props.type === 'date') {
          if (state.inputDay) {
            state.inputDay = Math.min(state.inputDay, daysInMonth(state.inputYear, state.inputMonth + 1))
          }

          state.tableDate = value
          state.activePicker = 'DATE'
          if (false/*TODO:this.reactive*/ && !props.readonly && !isMultiple.value && isDateAllowed(inputDate.value)) {
            context.emit('input', inputDate.value)
          }
        } else {
          emitInput(inputDate.value)
        }
      }

      function dateClick(value) {
        state.inputYear = parseInt(value.split('-')[0], 10)
        state.inputMonth = parseInt(value.split('-')[1], 10) - 1
        state.inputDay = parseInt(value.split('-')[2], 10)
        emitInput(inputDate.value)
      }

      function generateRange() {
        let proxyValue = props.value
        if (props.range && props.value && props.value.length === 2) {
          proxyValue = []
          const [rangeFrom, rangeTo] = [props.value[0], props.value[1]].map(x => new Date(`${x}T00:00:00+00:00`)).sort((a, b) => a > b ? 1 : -1)
          const diffDays = Math.ceil((rangeTo.getTime() - rangeFrom.getTime()) / (1000 * 60 * 60 * 24))
          for (let i = 0; i <= diffDays; i++) {
            const current = new Date(+rangeFrom + i * 864e5)
            proxyValue.push(current.toISOString().substring(0, 10))
          }
        }
        return proxyValue
      }

      function setInputDate() {
        if (lastValue.value) {
          const array = lastValue.value.split('-')
          state.inputYear = parseInt(array[0], 10)
          state.inputMonth = parseInt(array[1], 10) - 1
          if (props.type === 'date') {
            state.inputDay = parseInt(array[2], 10)
          }
        } else {
          state.inputYear = state.inputYear || state.now.getFullYear()
          state.inputMonth = state.inputMonth == null ? state.inputMonth : state.now.getMonth()
          state.inputDay = state.inputDay || state.now.getDate()
        }
      }

      const tableHeaderEventHandler = {
        toggle: () => state.activePicker = (state.activePicker === 'DATE' ? 'MONTH' : 'YEAR'),
        input: (value) => state.tableDate = value,
      }
      const titleEventHandler = {
        'update:selecting-year': (value) => state.activePicker = value ? 'YEAR' : props.type.toUpperCase(),
      }

      const dateTableEventHandlers = {
        input: dateClick,
        'update:table-date': (value) => state.tableDate = value,
        'click:date': (value) => context.emit('click:date', value),
        'dblclick:date': (value) => context.emit('dblclick:date', value),
      }
      const onMonthTableEventHandler = {
        input: monthClick,
        'update:table-date': (value) => state.tableDate = value,
        'click:month': (value) => context.emit('click:month', value),
        'dblclick:month': (value) => context.emit('dblclick:month', value),
      }

      return {
        tableHeaderEventHandler,
        titleEventHandler,
        dateTableEventHandlers,
        onMonthTableEventHandler,
        generateRange,
        yearClick,
        tableYear,
        minMonth,
        maxMonth,
        minYear,
        maxYear,
        formatters,
        current,
        selectedMonths,
        isMultiple,
        tableMonth,
        state,
        pad,
        sanitizeDateString
      }
    }
  }
</script>
<style scoped>
</style>
