<!--suppress JSUnresolvedFunction -->
<template>
  <g-picker :color="headerColor || color"
            :full-width="fullWidth"
            :landscape="landscape"
            :width="width"
            :no-title="noTitle">
    <template #title>
      <g-date-picker-title
          :date="titleModel.date"
          :disabled="titleModel.disabled"
          :readonly="titleModel.readonly"
          :selectingYear="titleModel.selectingYear"
          :year="titleModel.year"
          v-on="titleModel.eventHandlers"
      />
    </template>
    <div :key="state.activePicker">
      <g-date-picker-years v-if="yearModel.show"
          :color="yearModel.color"
          :min="yearModel.min"
          :max="yearModel.max"
          :value="yearModel.value"
          v-on="yearModel.eventHandlers"
      />
      <template v-else>
        <g-date-picker-header
            :disabled="headerModel.disabled"
            :readonly="headerModel.readonly"
            :format="headerModel.headerDateFormat"
            :min="headerModel.min"
            :max="headerModel.max"
            :value="headerModel.value"
            v-on="headerModel.eventHandlers"
        />
        <g-date-picker-date-table
            v-if="dateTableModel.show"
            :allowed-dates="dateTableModel.allowedDates"
            :color="dateTableModel.color"
            :current="dateTableModel.current"
            :disabled="dateTableModel.disabled"
            :events="dateTableModel.events"
            :eventColor="dateTableModel.eventColor"
            :firstDayOfWeek="dateTableModel.firstDayOfWeek"
            :format="dateTableModel.dayFormat"
            :min="dateTableModel.min"
            :max="dateTableModel.max"
            :readonly="dateTableModel.readonly"
            :scrollable="dateTableModel.scrollable"
            :showWeek="dateTableModel.showWeek"
            :tableDate="dateTableModel.tableDate"
            :value="dateTableModel.value"
            :weekdayFormat="dateTableModel.weekdayFormat"
            :range="dateTableModel.range"
            v-on="dateTableModel.eventHandlers"
            ref="table"
        />
        <g-date-picker-month-table
            v-else
            :allowedDates="monthTableModel.allowedDates"
            :color="monthTableModel.color"
            :current="monthTableModel.current"
            :disabled="monthTableModel.disabled"
            :format="monthTableModel.format"
            :min="monthTableModel.min"
            :max="monthTableModel.max"
            :readonly="monthTableModel.readonly"
            :scrollable="monthTableModel.scrollable"
            :value="monthTableModel.value"
            :tableDate="monthTableModel.tableDate"
            v-on="monthTableModel.eventHandlers"
            ref="table"
        />
      </template>
    </div>

    <template #actions>
      <slot></slot>
    </template>
  </g-picker>
</template>

<script>
  //
  import { computed, reactive, watch } from '@vue/composition-api'
  import { pad, createNativeLocaleFormatter, daysInMonth, sanitizeDateString, SANITY_TYPE } from './utils'
  import { dateFilter } from './dateFilter'

  //
  import GDatePickerTitle from './GDatePickerTitle'
  import GDatePickerHeader from './GDatePickerHeader'
  import GDatePickerDateTable from './GDatePickerDateTable'
  import GDatePickerMonthTable from './GDatePickerMonthTable'
  import GDatePickerYears from './GDatePickerYears'
  import GPicker from '../GPicker/GPicker'

  // customs event name
  import { EVENT_NAMES as TITLE_EVENT_NAMES } from './GDatePickerTitle'
  import { EVENT_NAMES as YEAR_PICKER_EVENTS } from './GDatePickerYears'
  import { EVENT_NAMES as MONTH_TABLE_EVENTS } from './GDatePickerMonthTable'
  import { EVENT_NAMES as DATE_TABLE_EVENTS } from './GDatePickerDateTable'

  const DATE_PICKER_TYPE = {
    DATE: 'date',
    MONTH: 'month',
  }

  const ACTIVE_PICKER_TYPE = {
    DATE: 'DATE',
    MONTH: 'MONTH',
    YEAR: 'YEAR'
  }

  export const EVENT_NAMES = {
    INPUT: 'input',
    CHANGE: 'change',
    UPDATE_PICKER_DATE: 'update:picker-date',
    CLICK_DATE: 'click:date',
    DB_CLICK_DATE: 'dblclick:date',
    CLICK_MONTH: 'click:month',
    DB_CLICK_MONTH: 'dblclick:month'
  }

  export default {
    name: 'GDatePicker',
    components: { GDatePickerMonthTable, GDatePickerDateTable, GDatePickerHeader, GDatePickerYears, GDatePickerTitle, GPicker },
    props: {
      //// Group: Values
      // A predicate function which validate date value and return true if input date is valid, otherwise false
      allowedDates: [Function, null],
      // Date value in ISO format 'YYYY-MM-dd' indicate the maximum selectable date boundary
      max: String,
      // Date value in ISO format 'YYYY-MM-dd' indicate the minimum selectable date boundary
      min: String,
      // events in calendar
      events: {
        type: [Array, Function, Object],
        default: () => null,
      },
      // Default value of date-picker
      value: [Array, String],


      //// Groups: Color
      // Color for picker-header and selected date
      // if both color and headerColor present, headerColor will be used for header
      color: {
        type: String,
        default: 'rgb(77, 0, 234)'
      },
      // color of events
      eventColor: {
        type: [Array, Function, Object, String],
        default: () => 'warning',
      },
      // Color for picker-header
      headerColor: String,

      //// Groups: Size
      // indicate whether picker will be shown in fullWidth
      // if both fullWidth and width value is present, width will be ignored
      fullWidth: Boolean,
      // Predefined width for date picker
      width: {
        type: [Number, String],
        default: 290,
      },


      //// Groups: Format functions for customize date picker content
      // Function formatting the day in date picker table
      dayFormat: [Function, null],
      // Function formatting month in the months table
      monthFormat: Function,
      // Function formatting week day
      weekdayFormat: Function,
      // Function formatting the tableDate in the day/month table header
      headerDateFormat: Function,
      // Function formatting currently selected date in the picker title
      titleDateFormat: Function,


      //// Groups: Visibility
      // Boolean value indicate that whether picker's title will be shown or not
      noTitle: Boolean,
      // Boolean value indicate that whether picker will be shown in landscape or portrait mode
      landscape: Boolean,
      // Represent the first day of week will be shown in calendar
      // 0 mean Sunday, 1 mean Monday, 2 mean Tuesday, etc
      // Default is Sunday
      firstDayOfWeek: {
        type: [String, Number],
        default: 0,
      },
      // A boolean value indicate that whether picker should show week or not
      // Week value will be added at the first column of calendar table
      showWeek: Boolean,
      // A boolean value indicate that whether picker is enable to show current date/month or not
      showCurrent: [Boolean, String],
      // Date picker type
      type: {
        type: String,
        default: 'date',
        validator: (type) => ['date', 'month'].includes(type),
      },
      // Default picker date
      // If the value is set, when user select year picker, picker year, month values will be focused
      pickerDate: String,


      //// Groups: Behavior
      // A boolean value indicate that whether date picker is enable for interact
      disabled: Boolean,
      // A boolean value indicate that whether picker is enable for change or not
      readonly: Boolean,
      // A boolean value indicate that whether picker is enable for scroll or not
      scrollable: Boolean,
      // A boolean value indicate that whether picker allow range select or not
      range: Boolean,
      // Boolean value indicate that whether picker allow multiple select or not
      multiple: Boolean,
    },
    setup(props, context) {
      const isDateAvailable = dateFilter(props)

      const now = new Date()
      const state = reactive({
        // 'YEAR', 'MONTH', 'DATE' - year, month, date picker will be shown depend on this value
        activePicker: props.type.toUpperCase(),
        // hold the value of input date infor
        inputDay: 0,
        inputMonth: 0,
        inputYear: 0,
        // boolean value which will be used to generate transition name
        isReversing: false,
        // current day
        now,
        // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
        tableDate: (() => {
          if (props.pickerDate) {
            return props.pickerDate
          }
          const date = (props.multiple || props.range ? props.value[props.value.length - 1] : props.value) || `${now.getFullYear()}-${now.getMonth() + 1}`
          return sanitizeDateString(date, props.type === DATE_PICKER_TYPE.DATE ? SANITY_TYPE.MONTH : SANITY_TYPE.YEAR)
        })()
      })

      // boolean value indicate that whether user can select multiple day in date picker
      // its value is true when multiple or range option are provided
      const isMultiple = computed(() => props.multiple || props.range)
      // return:
      //  if single date selection: value
      //  if multiple date selection: last date in value array
      const lastValue = computed(() => isMultiple.value ? props.value[props.value.length - 1] : props.value)
      // return selected month(s)
      const selectedMonths = computed(() => {
        if (!props.value || !props.value.length || props.type === DATE_PICKER_TYPE.MONTH) {
          return props.value
        } else if (isMultiple.value) {
          return (props.value).map(val => val.substr(0, 7))
        } else {
          return (props.value).substr(0, 7)
        }
      })
      // currentDay or currentMonth, or currentYear
      const current = computed(() => {
        if (props.showCurrent === true) {
          return sanitizeDateString(`${state.now.getFullYear()}-${state.now.getMonth() + 1}-${state.now.getDate()}`, props.type)
        }
        return props.showCurrent || null
      })

      const inputDate = computed(() => {
        return props.type === DATE_PICKER_TYPE.DATE
            ? `${state.inputYear}-${pad(state.inputMonth + 1)}-${pad(state.inputDay)}`
            : `${state.inputYear}-${pad(state.inputMonth + 1)}`
      })

      const tableMonth = computed(() => Number((props.pickerDate || state.tableDate).split('-')[1]) - 1)

      const tableYear = computed(() => Number((props.pickerDate || state.tableDate).split('-')[0]))
      // return 'YYYY-MM' from props.min if props.min provided
      const minMonth = computed(() => props.min ? sanitizeDateString(props.min, SANITY_TYPE.MONTH) : null)
      // return 'YYYY-MM' from props.max if props.max provided
      const maxMonth = computed(() => props.max ? sanitizeDateString(props.max, SANITY_TYPE.MONTH) : null)
      // return 'YYYY' from props.min if props.min provided
      const minYear = computed(() => props.min ? sanitizeDateString(props.min, SANITY_TYPE.YEAR) : null)
      // return 'YYYY' from props.max if props.max provided
      const maxYear = computed(() => props.max ? sanitizeDateString(props.max, SANITY_TYPE.YEAR) : null)

      // title format
      //  - multiple selection: `{n} selected`
      //  - single selection:
      const formatters = computed(() => {
        return {
          year: props.yearFormat || createNativeLocaleFormatter(undefined, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
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
                return generateDateRange().length + ' selected'
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

      /// Watch
      watch(() => state.tableDate, (val, prev) => {
        // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
        // compare for example '2000-9' and '2000-10'
        const sanitizeType = props.type === DATE_PICKER_TYPE.MONTH ? SANITY_TYPE.YEAR : SANITY_TYPE.MONTH
        state.isReversing = sanitizeDateString(val, sanitizeType) < sanitizeDateString(prev, sanitizeType)
        context.emit(EVENT_NAMES.UPDATE_PICKER_DATE, val)
      }, { lazy: true })
      watch(() => props.pickerDate, (val) => {
        if (val) {
          state.tableDate = val
        } else if (lastValue.value && props.type === DATE_PICKER_TYPE.DATE) {
          state.tableDate = sanitizeDateString(lastValue.value, SANITY_TYPE.MONTH)
        } else if (lastValue.value && props.type === DATE_PICKER_TYPE.MONTH) {
          state.tableDate = sanitizeDateString(lastValue.value, SANITY_TYPE.YEAR)
        }
      }, { lazy: true })
      watch(() => props.value, (newValue, oldValue) => {
        validateValue()
        setInputDate()
        if (!isMultiple.value && props.value && !props.pickerDate) {
          state.tableDate = sanitizeDateString(inputDate.value, props.type === DATE_PICKER_TYPE.MONTH ? SANITY_TYPE.YEAR : SANITY_TYPE.MONTH)
        } else if (isMultiple.value && (props.value).length && !oldValue.length && !props.pickerDate) {
          state.tableDate = sanitizeDateString(inputDate.value, props.type === DATE_PICKER_TYPE.MONTH ? SANITY_TYPE.YEAR : SANITY_TYPE.MONTH)
        }
      }, { lazy: true })
      watch(() => props.type, (type) => {
        state.activePicker = type.toUpperCase()
        // if value is string or array
        if (props.value && props.value.length) {
          const output = (isMultiple.value ? props.value : [props.value])
          .map((val) => sanitizeDateString(val, type))
          .filter(isDateAvailable)
          context.emit(EVENT_NAMES.INPUT, isMultiple.value ? output : output[0])
        }
      }, { lazy: true })

      // generate date array from input date
      // if selection method is multiple or single, return input value
      // otherwise, generate date range, boundary included
      function generateDateRange() {
        const TICKS_PER_DAY = 864e5
        let dates = props.value
        if (props.range && props.value && props.value.length === 2) {
          dates = []
          const [rangeFrom, rangeTo] = [props.value[0], props.value[1]].map(x => new Date(`${x}T00:00:00+00:00`)).sort((a, b) => a > b ? 1 : -1)
          const diffDays = Math.ceil((rangeTo.getTime() - rangeFrom.getTime()) / (1000 * 60 * 60 * 24))
          for (let day = 0; day <= diffDays; day++) {
            dates.push(new Date(rangeFrom.getTime() + day * TICKS_PER_DAY).toISOString().substring(0, 10))
          }
        }
        return dates
      }

      //
      function emitInput(newInput) {
        if (props.range && props.value) {
          props.value.length === 2
              ? context.emit(EVENT_NAMES.INPUT, [newInput])
              : context.emit(EVENT_NAMES.INPUT, [...props.value, newInput])
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

        context.emit(EVENT_NAMES.INPUT, output)
        props.multiple || context.emit(EVENT_NAMES.CHANGE, newInput)
      }

      // validate whether value is valid or not
      // in case multiple selection, value should be a date array
      // otherwise, a date string
      function validateValue() {
        if (props.value == null) {
          return
        }
        const valueType = props.value.constructor.name
        const expected = isMultiple.value ? 'Array' : 'String'
        if (valueType !== expected) {
          console.warn(`Value must be ${isMultiple.value ? 'an' : 'a'} ${expected}, got ${valueType}`)
        }
      }

      function setInputDate() {
        if (lastValue.value) {
          const array = lastValue.value.split('-')
          state.inputYear = parseInt(array[0], 10)
          state.inputMonth = parseInt(array[1], 10) - 1
          if (props.type === DATE_PICKER_TYPE.DATE) {
            state.inputDay = parseInt(array[2], 10)
          }
        } else {
          state.inputYear = state.inputYear || state.now.getFullYear()
          state.inputMonth = state.inputMonth == null ? state.inputMonth : state.now.getMonth()
          state.inputDay = state.inputDay || state.now.getDate()
        }
      }

      // Models
      const titleModel = computed(() => {
        return {
          date: props.value ? formatters.value.titleDate(props.value) : '',
          disabled: props.disabled,
          readonly: props.readonly,
          selectingYear: state.activePicker === ACTIVE_PICKER_TYPE.YEAR,
          year: formatters.value.year(props.value ? `${state.inputYear}` : state.tableDate),
          eventHandlers: {
            [TITLE_EVENT_NAMES.UPDATE_SELECTING_YEAR] : (value) => state.activePicker = value ? ACTIVE_PICKER_TYPE.YEAR : props.type.toUpperCase(),
          }
        }
      })
      const yearModel = computed(() => {
        return {
          show: state.activePicker === ACTIVE_PICKER_TYPE.YEAR,
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
              state.activePicker = ACTIVE_PICKER_TYPE.MONTH
              if (false /*TODO:this.reactive*/ && !props.readonly && !isMultiple.value && isDateAvailable(inputDate.value)) {
                context.emit(EVENT_NAMES.INPUT, inputDate.value)
              }
            }
          }
        }
      })
      const headerModel = computed(() => {
        return {
          disabled: props.disabled,
          readonly: props.readonly,
          format: props.headerDateFormat,
          isReversing: state.isReversing,
          min: state.activePicker === ACTIVE_PICKER_TYPE.DATE ? minMonth.value : minYear.value,
          max: state.activePicker === ACTIVE_PICKER_TYPE.DATE ? maxMonth.value : maxYear.value,
          value: state.activePicker === ACTIVE_PICKER_TYPE.DATE ? `${pad(tableYear.value, 4)}-${pad(tableMonth.value + 1)}` : `${pad(tableYear.value, 4)}`,
          eventHandlers: {
            toggle: () => state.activePicker = (state.activePicker === ACTIVE_PICKER_TYPE.DATE ? ACTIVE_PICKER_TYPE.MONTH : ACTIVE_PICKER_TYPE.YEAR),
            input: (value) => state.tableDate = value,
          }
        }
      })
      const dateTableModel = computed(() => {
        return {
          show: state.activePicker === ACTIVE_PICKER_TYPE.DATE,
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
          value: generateDateRange(),
          weekdayFormat: props.weekdayFormat,
          range: props.range,
          eventHandlers: {
            input: (value) => {
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
      const monthTableModel = computed(() => {
        return {
          allowedDates: props.type === DATE_PICKER_TYPE.MONTH ? props.allowedDates : null,
          color: props.color,
          current: current.value ? sanitizeDateString(current.value, SANITY_TYPE.MONTH) : null,
          disabled: props.disabled,
          format: props.monthFormat,
          min: minMonth.value,
          max: maxMonth.value,
          readonly: props.readonly && props.type === DATE_PICKER_TYPE.MONTH,
          isReversing: state.isReversing,
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
                state.activePicker = ACTIVE_PICKER_TYPE.DATE
                if (false/*TODO:this.reactive*/ && !props.readonly && !isMultiple.value && isDateAvailable(inputDate.value)) {
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

      // LIFECYCLE HOOKS
      validateValue()
      if (props.pickerDate !== state.tableDate) {
        context.emit(EVENT_NAMES.UPDATE_PICKER_DATE, state.tableDate)
      }
      setInputDate()

      //
      return {
        titleModel,
        yearModel,
        headerModel,
        dateTableModel,
        monthTableModel,
        state,
      }
    }
  }
</script>
<style scoped>
</style>
