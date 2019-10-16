<template>
  <g-picker :color="headerColor || color"
            :full-width="fullWidth"
            :landscape="landscape"
            :width="width"
            :no-title="noTitle">
    <template #title>
      <g-date-picker-title
          :date="title.date"
          :disabled="title.disabled"
          :readonly="title.readonly"
          :selectingYear="title.selectingYear"
          :year="title.year"
          v-on="title.eventHandlers"/>
    </template>
    <div :key="state.activePicker">
      <g-date-picker-years v-if="year.show"
          :color="year.color"
          :min="year.min"
          :max="year.max"
          :value="year.value"
          v-on="year.eventHandlers"/>
      <template v-else>
        <g-date-picker-header
            :disabled="header.disabled"
            :readonly="header.readonly"
            :format="header.headerDateFormat"
            :min="header.min"
            :max="header.max"
            :value="header.value"
            v-on="header.eventHandlers"/>
        <g-date-picker-date-table
            v-if="dates.show"
            :allowed-dates="dates.allowedDates"
            :color="dates.color"
            :current="dates.current"
            :disabled="dates.disabled"
            :events="dates.events"
            :eventColor="dates.eventColor"
            :firstDayOfWeek="dates.firstDayOfWeek"
            :format="dates.dayFormat"
            :min="dates.min"
            :max="dates.max"
            :readonly="dates.readonly"
            :scrollable="dates.scrollable"
            :showWeek="dates.showWeek"
            :tableDate="dates.tableDate"
            :value="dates.value"
            :weekdayFormat="dates.weekdayFormat"
            :range="dates.range"
            v-on="dates.eventHandlers"
            ref="table"/>
        <g-date-picker-month-table
            v-else
            :allowedDates="months.allowedDates"
            :color="months.color"
            :current="months.current"
            :disabled="months.disabled"
            :format="months.format"
            :min="months.min"
            :max="months.max"
            :readonly="months.readonly"
            :scrollable="months.scrollable"
            :value="months.value"
            :tableDate="months.tableDate"
            v-on="months.eventHandlers"
            ref="table"/>
      </template>
    </div>

    <template #actions>
      <slot></slot>
    </template>
  </g-picker>
</template>

<!-- Short hand -->
<!--<template>-->
<!--  <g-picker :color="headerColor || color"-->
<!--            :full-width="fullWidth"-->
<!--            :landscape="landscape"-->
<!--            :width="width"-->
<!--            :no-title="noTitle">-->
<!--    <template #title>-->
<!--      <g-date-picker-title v-bind="title" v-on="title.eventHandlers"/>-->
<!--    </template>-->
<!--    <div :key="state.activePicker">-->
<!--      <g-date-picker-years v-if="year.show" v-bind="year" v-on="year.eventHandlers"/>-->
<!--      <template v-else>-->
<!--        <g-date-picker-header v-bind="header" v-on="header.eventHandlers"/>-->
<!--        <g-date-picker-date-table  v-if="dates.show" v-bind="dates" v-on="dates.eventHandlers" ref="table"/>-->
<!--        <g-date-picker-month-table v-else v-bind="months" v-on="months.eventHandlers" ref="table"/>-->
<!--      </template>-->
<!--    </div>-->
<!--    <template #actions>-->
<!--      <slot></slot>-->
<!--    </template>-->
<!--  </g-picker>-->
<!--</template>-->

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
        title,
        year,
        header,
        dates,
        months,
        state,
      } = GDatePickerUtil(props, context)

      return {
        title,
        year,
        header,
        dates,
        months,
        state,
      };
    }
  }
</script>
<style scoped>
</style>
