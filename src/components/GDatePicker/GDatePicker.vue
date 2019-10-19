<script type="text/jsx">
  import _ from 'lodash'
  import { computed, ref } from '@vue/composition-api'
  import { TRANSITION_NAMES } from './logic/utils'
  import { getHeaderFormatterFn, getNavigationState } from './logic/GDatePickerHeaderUtil'
  import { getYearRange } from './logic/GDatePickerYearsUtil'
  import { getDatesInMonth, getDayNameInWeek } from './logic/GDatePickerDateTableUtil'
  import { getMonths } from './logic/GDatePickerMonthTableUtil'
  import GDatePickerUtil, { DATE_PICKER_TYPE } from './logic/GDatePickerUtil'
  import GPicker from '../GPicker/GPicker'

  export default {
    name: 'GDatePicker',
    components: { GPicker },
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
        datePickerState,
      } = GDatePickerUtil(props, context)

      // Title render function
      const titleClasses = computed(() => ({
        'g-date-picker-title': true,
        'g-date-picker-title--disabled': props.disabled
      }))
      const titleYearContentClass = computed(() => ({
        'g-picker__title__btn': true,
        'g-picker__title__btn--active': true,
        'g-picker__title__btn--readonly': props.readonly,
        'g-date-picker-title__year': true
      }))
      const titleDateContentClass = computed(() => ({
        'g-picker__title__btn': true,
        'g-picker__title__btn--readonly': props.readonly,
        'g-date-picker-title__date': true
      }))
      function datePickerTitleRenderFn() {
        return (<div class={titleClasses.value}>
          <div class={titleYearContentClass.value}
               v-on:click={ e => titleModel.value.on.yearClicked(e) }>
            { titleModel.value.year }
          </div>
          <div class={titleDateContentClass.value}>
            <transition name={TRANSITION_NAMES.PICKER}>
              <div key={titleModel.value.date}
                   domPropsInnerHTML={ titleModel.value.date }/>
            </transition>
          </div>
        </div>)
      }

      // year list
      function yearListRenderFn() {
        return <ul class="g-date-picker-years" ref="years">{
          yearModel.value.years.map(year => (
              <li
                  key={ year }
                  class={{ 'active': parseInt(yearModel.value.selectedYear) === year }}
                  v-on:click_stop={() => yearModel.value.on.yearClicked(year)}>
                { year }
              </li>
          ))
        }</ul>
      }

      // GDatePicker -> Body -> Header render function
      const transition = ref('')
      const goPrev = () => {
        transition.value = TRANSITION_NAMES.REVERSE_TAB;
        headerModel.value.on.prevClicked()
      }
      const goNext = () => {
        transition.value = TRANSITION_NAMES.TAB
        headerModel.value.on.nextClicked()
      }
      const headerCssClasses = computed(() => ({
        'g-date-picker-header': true,
        'g-date-picker-header--disabled': props.disabled
      }))
      const headerContentCssClass = computed(() => ({
        'g-date-picker-header__value': true,
        'g-date-picker-header__value--disabled': props.disabled
      }))
      function headerRenderFn() {
        return (
            <div class={headerCssClasses.value}>
              <div class={headerContentCssClass.value}>
                <transition name={transition.value}>
                  <div key={headerModel.value.content}>
                    <button
                        type="button"
                        v-on:click_stop={() => {
                          headerModel.value.on.headerClicked()
                        }}>
                      { headerModel.value.content }
                    </button>
                  </div>
                </transition>
              </div>
              <button
                  class="g-date-picker-header__prev-button"
                  disabled={!headerModel.value.canGoPrev}
                  v-on:click_stop={() => goPrev()}></button>
              <button
                  class="g-date-picker-header__next-button"
                  disabled={!headerModel.value.canGoNext}
                  v-on:click_stop={() => goNext()}></button>
            </div>
        )
      }

      // GDatePicker -> Body -> Date/Months Table
      // 1> wheel event
      let throttleWheel = _.throttle(e => (e.deltaX < 0 ? goPrev : goNext)(), 1000, { leading: true, trailing: false })
      const onWheelHandler = (e) => {
        e.preventDefault()
        if (props.disabled || !props.scrollable) {
          return
        }
        throttleWheel(e)
      }

      // 2> GDatePicker / Body / DateTable render function
      const datePickerClasses = computed(() => ({
        'g-date-picker-table': true,
        'g-date-picker-table--date': true,
        'g-date-picker-table--disabled': props.disabled
      }))
      function addRangeClass(dateRows) {
        if (props.range) {
          _.forEach(dateRows, dateRow => {
            _.forEach(dateRow, date => {
              if (date.isRangeStart) {
                date.class['g-table-item--start-range'] = true
              } else if (date.isRangeEnd) {
                date.class['g-table-item--end-range'] = true
              } else if (date.isInRange) {
                date.class['g-table-item--in-range'] = true
              }
            })
          })
        }
        return dateRows
      }
      function dateButtonRenderFn(date) {
        return (<button
            type="button"
            class={['g-table-item', date.class]}
            style={date.style}
            disabled={props.disabled || !date.isAllowed}
            v-on:click_stop={() => dateTableModel.value.on.onDateClicked(date)}
            v-on:dblclick_stop={() => dateTableModel.value.on.onDateDoubleClicked(date)}>
          <div class="g-table-item__content">{date.content}</div>
          <div class="g-date-picker-table__events">
            {
              (date.events || []).map(event => <div class={event.class} style={event.style}></div>)
            }
          </div>
        </button>)
      }
      function weekRenderFn(week) {
        return (<small class="g-date-picker-table--date__week">
          {String(week).padStart(2, '0')}
        </small>)
      }
      function dateTableDataRenderFn(date) {
        return <td>{date.isWeek ? weekRenderFn(date.value) : (date.isBlank ? '' : dateButtonRenderFn(date))}</td>
      }
      function dateTableRenderFn() {
        return (
            <div class={datePickerClasses.value} v-on:wheel_stop={onWheelHandler}>
              <transition name={transition.value}>
                <table key={dateTableModel.value.tableDate}>
                  <thead>
                  <tr>{dateTableModel.value.dayNames.map(dayName => <th>{dayName}</th>)}</tr>
                  </thead>
                  <tbody>
                  {
                    addRangeClass(dateTableModel.value.dateRows).map(dateRow => <tr>
                      {dateRow.map(date => dateTableDataRenderFn(date))}
                    </tr>)
                  }
                  </tbody>
                </table>
              </transition>
            </div>)
      }

      // 3> GDatePicker / Body / MonthTable
      const monthTableClasses = computed(() => ({
        'g-date-picker-table': true,
        'g-date-picker-table--month': true,
        'g-date-picker-table--disabled': props.disabled
      }))
      function monthTableRenderFn() {
        return (<div class={monthTableClasses.value} v-on:wheel={onWheelHandler}>
          <transition name={transition.value}>
            <table key={monthTableModel.value.tableDate}>
              <tbody>
              {
                monthTableModel.value.monthRows.map((monthRow, rowIndex) => {
                  return <tr key={rowIndex}>
                    {
                      monthRow.map(monthItem =>
                          <td key={monthItem.month}>
                            <button
                                type="button"
                                class={['g-table-item', monthItem.class]}
                                style={monthItem.style}
                                disabled={props.disabled || !monthItem.isAllowed}
                                v-on:click_stop={() => monthTableModel.value.on.monthClicked(monthItem.value)}
                                v-on:dblclick_stop={() => monthTableModel.value.on.monthDoubleClicked(monthItem.value)}
                            >
                              <div class="g-table-item__content">
                                {monthItem.formattedValue}
                              </div>
                            </button>
                          </td>
                      )
                    }
                  </tr>
                })
              }
              </tbody>
            </table>
          </transition>
        </div>)
      }

      // date/month table render function
      function dateMonthTableRenderFn() {
        return datePickerState.activePicker === DATE_PICKER_TYPE.DATE ? dateTableRenderFn() : monthTableRenderFn()
      }

      // date picker body render function
      function datePickerBodyRenderFn() {
        return datePickerState.activePicker === DATE_PICKER_TYPE.YEAR ? yearListRenderFn() : [headerRenderFn(), dateMonthTableRenderFn()]
      }

      // datepicker render function
      return function datePickerRenderFn() {
        return (
            <g-picker
                color={props.headerColor || props.color}
                fullWidth={props.fullWidth}
                landscape={props.landscape}
                width={props.width}
                noTitle={props.noTitle}>
              <template slot="title">
                {datePickerTitleRenderFn()}
              </template>
              <div key={datePickerState.activePicker}>
                {datePickerBodyRenderFn()}
              </div>
              <template slot="actions">
                <slot/>
              </template>
            </g-picker>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../style/variables";
  @import "../../style/colors";

  /*TITLE*/
  .g-date-picker-title {
    display: flex;
    flex-direction: column;
    line-height: 1;

    &__year {
      display: inline-flex;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    &__date {
      font-size: 28px;
      text-align: left;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      padding-bottom: 8px;
      margin-bottom: -8px;
    }

    &--disabled {
      pointer-events: none;
    }
  }

  /*YEAR PICKER*/
  .g-date-picker-years {
    font-size: 16px;
    font-weight: 400;
    height: 298px;
    list-style-type: none;
    overflow: auto;
    text-align: center;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;

    li {
      cursor: pointer;
      padding: 8px 0;
      transition: none;
      width: 100%;
      display: inline-block;

      &.active {
        font-size: 26px;
        font-weight: 500;
        padding: 10px 0;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.12);
      }
    }
  }

  /*HEADER*/
  .g-date-picker-header {
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &--disabled {
      pointer-events: none;
    }

    &__value {
      flex: 1;
      position: relative;
      overflow: hidden;

      div {
        transition: $primary-transition;
        width: 100%;
      }

      button {
        cursor: pointer;
        font-weight: bold;
        outline: none;
        padding: 0.5rem;
        transition: $primary-transition;
        background-color: transparent;
        border-style: none;
        color: rgb(83, 83, 83);
      }
    }

    %navigate_button {
      height: 24px;
      width: 24px;
      border: none;
      background-color: transparent;
    }

    &__prev-button {
      @extend %navigate_button;
      margin-right: 24px;

      &::after {
        content: '\F141';
        font-family: "Material Design Icons";
      }
    }

    &__next-button {
      @extend %navigate_button;

      &::after {
        content: '\F142';
        font-family: "Material Design Icons";
      }
    }
  }


  /*TABLE*/
  $highlightedItem: rgb(231, 215, 253);

  .g-date-picker-table {
    position: relative;
    padding: 0 12px;
    height: 254px;

    table {
      transition: $primary-transition;
      table-layout: fixed;
      width: 100%;
    }

    tr {
      height: 32px;
    }

    td, th {
      text-align: center;
      position: relative;
    }

    th {
      font-size: 12px;
    }

    button {
      background-color: transparent;
      border-style: none;
      color: inherit;
      box-shadow: none;
    }

    &--date .g-table-item {
      height: 32px;
      width: 32px;
    }

    .g-table-item {
      margin: 0;
      z-index: auto;
      font-size: 12px;
      background-color: transparent;
      border-style: none;
      color: inherit;
      width: 100%;

      &--active {
        color: map-get($shades, 'white');
      }

      &--rounded {
        border-radius: 28px;
      }

      &--outlined {
        border: thin solid currentColor;
      }

      &--start-range {
        position: relative;
        width: 100%;

        &::after {
          top: 0;
          position: absolute;
          content: '';
          width: 50%;
          height: 100%;
          right: -3px;
          background-color: $highlightedItem;
          z-index: -1;
        }
      }

      &--end-range {
        position: relative;
        width: 100%;

        &::after {
          top: 0;
          position: absolute;
          content: '';
          width: 50%;
          height: 100%;
          left: -3px;
          background-color: $highlightedItem;
          z-index: -1;
        }
      }

      &--in-range {
        background-color: $highlightedItem !important;
        border-radius: 0 !important;
        width: 100%;

        > .g-table-item__content {
          color: #535353;
        }
      }
    }

    &--disabled {
      pointer-events: none;
    }
  }

  .g-date-picker-table--date {
    th {
      padding: 8px 0;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.38);
    }

    td {
      width: 32px;
      padding: 2px 0;
    }

    & .g-date-picker-table__events {
      bottom: 6px;
      height: 8px;
      left: 0;
      position: absolute;
      text-align: center;
      white-space: pre;
      width: 100%;

      > div {
        border-radius: 50%;
        display: inline-block;
        height: 8px;
        margin: 0 1px;
        width: 8px;
      }
    }
  }

  .g-date-picker-table--month {
    td {
      width: 33.333333%;
      height: 56px;

      .g-table-item {
        width: 100%;
      }
    }
  }
</style>

