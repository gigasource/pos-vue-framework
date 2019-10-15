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
  import GDatePickerUtil from './GDatePickerUtil'
  import GDatePickerTitle from './Title/GDatePickerTitle'
  import GDatePickerHeader from './Header/GDatePickerHeader'
  import GDatePickerDateTable from './Table/DateTable/GDatePickerDateTable'
  import GDatePickerMonthTable from './Table/MonthTable/GDatePickerMonthTable'
  import GDatePickerYears from './Years/GDatePickerYears'
  import GPicker from '../GPicker/GPicker'

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
      // A boolean value indicate that whether picker is enable to show _currentDateMonth date/month or not
      showCurrent: [Boolean, String],
      // Date picker type
      type: {
        type: String,
        default: 'date',
        validator: (type) => ['date', 'month'].includes(type),
      },


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
      const {
        titleModel,
        yearModel,
        headerModel,
        dateTableModel,
        monthTableModel,
        state,
      } = GDatePickerUtil(props, context)

      return {
        titleModel,
        yearModel,
        headerModel,
        dateTableModel,
        monthTableModel,
        state,
      };
    }
  }
</script>
<style scoped>
</style>
