<script type="text/jsx">
  import _ from 'lodash'
  import { ref, computed } from 'vue'
  import GDatePickerUtil from './logic/GDatePickerUtil'
  import GPicker from '../GPicker/GPicker'
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable'
  import { getScopeIdRender } from '../../utils/helpers'
  
  const MINIMUM_WIDTH = 300
  const DEFAULT_COLOR = 'rgb(98, 0, 237)'
  const DEFAULT_RANGE_COLOR = '#ece0fd'
  
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
        default: DEFAULT_COLOR
      },
      // Range color define the color of range
      rangeColor: {
        type: String,
        default: DEFAULT_RANGE_COLOR
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
    events: [],
    setup(props, context) {
      const {
        titleModel,
        yearModel,
        headerModel,
        dateTableModel,
        monthTableModel,
        state,
      } = GDatePickerUtil(props, context)

      // Title render function
      const cptDatePickerTitleClass = computed(() => ({
        'g-date-picker-title': true,
        'g-date-picker-title--disabled': props.disabled
      }))
      function datePickerTitleRenderFn() {
        return (
            <div class={cptDatePickerTitleClass.value}>
              <div class='g-picker__title__btn g-date-picker-title__year'
                   onClick={e => {
                     e.stopPropagation();
                     titleModel.value.on.yearClicked(titleModel.value.year);
                   }}>
                {titleModel.value.year}
              </div>
              <div class='g-picker__title__btn g-date-picker-title__date'>
                  <div key={titleModel.value.date}
                       domPropsInnerHTML={titleModel.value.date}/>
              </div>
            </div>)
      }

      // year list
      function yearListRenderFn() {
        return <ul class='g-date-picker-years' ref='years'>{
          yearModel.value.years.map(year => (
              <li
                  key={year}
                  class={{ 'active': parseInt(yearModel.value.selectedYear) === year }}
                  onClick={e => {
                    e.stopPropagation();
                    yearModel.value.on.yearClicked(year)
                  }}>
                {year}
              </li>
          ))
        }</ul>
      }

      // GDatePicker -> Body -> Header render function
      const goPrev = () => {
        if (headerModel.value.canGoPrev) {
          headerModel.value.on.prevClicked()
        }
      }
      const goNext = () => {
        if (headerModel.value.canGoNext) {
          headerModel.value.on.nextClicked()
        }
      }
      const cptHeaderValueClass = computed(() => ({
        'g-date-picker-header__value': true,
        'g-date-picker-header__value--disabled': props.disabled,
      }))

      function headerRenderFn() {
        return (
            <div class='g-date-picker-header'>
              <div class={cptHeaderValueClass.value}>
                  <div key={headerModel.value.content}>
                    <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          headerModel.value.on.headerClicked()
                        }}>
                      {headerModel.value.content}
                    </button>
                  </div>
              </div>
              <button
                  class="g-date-picker-header__prev-button"
                  disabled={!headerModel.value.canGoPrev}
                  onClick={e => {
                    e.stopPropagation();
                    goPrev();
                  }}></button>
              <button
                  class="g-date-picker-header__next-button"
                  disabled={!headerModel.value.canGoNext}
                  onClick={e => {
                    e.stopPropagation();
                    goNext();
                  }}></button>
            </div>
        )
      }

      // GDatePicker -> Body -> Date/Months Table

      // 1> wheel event
      let throttleWheel = _.throttle(e => (e.deltaX < 0 ? goPrev : goNext)(), 1000, { leading: true, trailing: false })
      const onWheelHandler = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (!props.scrollable) {
          return
        }
        throttleWheel(e)
      }

      // 2> GDatePicker / Body / DateTable render function
      function addDateItemClass(dateRows) {
        _.forEach(dateRows, dateRow => {
          _.forEach(dateRow, date => {
            if (!date.isWeek && !date.isBlank) {
              date.class = {
                'g-table-item--active': date.isSelected,
                'g-table-item--start-range': date.isRangeStart,
                'g-table-item--in-range': date.isInRange,
                'g-table-item--end-range': date.isRangeEnd,
                'g-table-item--rounded': true,
                'g-table-item--readonly': props.readonly,
                'g-table-item--outlined': date.isCurrent && !date.isSelected,
                'g-table-item--disabled': !date.isAllowed || props.disabled
              }

              // range
              date.background = {
                class: {
                  'g-table-item__background--start-range': date.isRangeStart && !date.isRangeEnd,
                  'g-table-item__background--end-range': date.isRangeEnd && !date.isRangeStart,
                  'g-table-item__background--in-range': date.isInRange
                },
                style: {}
              }

              // selected
              const color = props.color || DEFAULT_COLOR
              if (!props.range) {
                if (date.isSelected) {
                  setBackgroundColor(color, date)
                }
              } else {
                // set start/end range color
                if (date.isSelected && !date.isInRange) {
                  setBackgroundColor(color, date)
                }

                // start, end, in
                // it's similar to date.isSelected, except when selected range contain only 1 value (user just select start point)
                if (date.isRangeStart || date.isRangeEnd || date.isInRange) {
                  setBackgroundColor(props.rangeColor || DEFAULT_RANGE_COLOR, date.background)
                }
              }
            }
          })
        })

        return dateRows
      }

      function dateButtonRenderFn(dateItem) {
        return ([<button
            type="button"
            class={['g-table-item', dateItem.class]}
            style={dateItem.style}
            disabled={!dateItem.isAllowed}
            onClick={e => {
              e.stopPropagation()
              dateTableModel.value.on.onDateClicked(dateItem)
            }}
            onDblclick={e => {
              e.stopPropagation()
              dateTableModel.value.on.onDateDoubleClicked(dateItem)
            }}>
          <div class="g-table-item__content">{dateItem.formattedValue}</div>
          <div class="g-date-picker-table__events">
            {
              (dateItem.events || []).map(event => <div class={event.class} style={event.style}></div>)
            }
          </div>
        </button>,
          <div class={['g-table-item__background', dateItem.background.class]}
               style={dateItem.background.style}
          >
          </div>])
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
            <div class='g-date-picker-table g-date-picker-table--date' onWheel={onWheelHandler}>
                <table key={state.viewportDate}>
                  <thead>
                  <tr>{dateTableModel.value.dayNames.map(dayName => <th>{dayName}</th>)}</tr>
                  </thead>
                  <tbody>
                  {
                    addDateItemClass(dateTableModel.value.dateRows).map(dateRow => <tr>
                      {dateRow.map(date => dateTableDataRenderFn(date))}
                    </tr>)
                  }
                  </tbody>
                </table>
            </div>)
      }

      // 3> GDatePicker / Body / MonthTable
      const addMonthRowsClass = (monthRows) => {
        _.each(monthRows, monthRow => {
          _.each(monthRow, monthItem => {
            monthItem.class = {
              'g-table-item--active': monthItem.isSelected,
              'g-table-item--disabled': !monthItem.isAllowed || props.disabled,
              'g-table-item--readonly': props.type === 'month' && props.readonly,
              'g-table-item--outlined': monthItem.isCurrent && !monthItem.isSelected
            }
            const color = props.color || DEFAULT_COLOR
            if (monthItem.isSelected) {
              setBackgroundColor(color, monthItem)
            }
          })
        })
        return monthRows
      }

      function monthTableRenderFn() {
        return (<div class='g-date-picker-table g-date-picker-table--month' onWheel={onWheelHandler}>
            <table key={state.viewportDate}>
              <tbody>
              {
                addMonthRowsClass(monthTableModel.value.monthRows).map((monthRow, rowIndex) => {
                  return <tr key={rowIndex}>
                    {
                      monthRow.map(monthItem =>
                          <td key={monthItem.month}>
                            <button
                                type="button"
                                class={['g-table-item', monthItem.class]}
                                style={monthItem.style}
                                disabled={!monthItem.isAllowed}
                                onClick={e => {
                                  e.stopPropagation()
                                  monthTableModel.value.on.monthClicked(monthItem)
                                }}
                                onDblclick={e => {
                                  e.stopPropagation()
                                  monthTableModel.value.on.monthDoubleClicked(monthItem)
                                }}
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
        </div>)
      }

      // date/month table render function
      const dateMonthTableRenderFn = () => state.activePicker === 'date' ? dateTableRenderFn() : monthTableRenderFn()
      const datePickerBodyRenderFn = () => state.activePicker === 'year' ? yearListRenderFn() : [headerRenderFn(), dateMonthTableRenderFn()]

      // datepicker render function
      function datePickerRenderFn() {
        return (
            <g-picker
                color={props.headerColor || props.color || DEFAULT_COLOR}
                fullWidth={props.fullWidth}
                landscape={props.landscape}
                width={props.width >= MINIMUM_WIDTH ? props.width : MINIMUM_WIDTH}
                noTitle={props.noTitle}
                disabled={props.disabled}>
              <template slot="title">
                {datePickerTitleRenderFn()}
              </template>
              <div key={state.activePicker}>
                {datePickerBodyRenderFn()}
              </div>
              <template slot="actions">
                {context.slots.default && context.slots.default()}
              </template>
            </g-picker>
        )
      }
      
      
      return {
        titleModel,
        yearModel,
        headerModel,
        dateTableModel,
        monthTableModel,
        state,
        renderWithScope: getScopeIdRender()(datePickerRenderFn)
      }
    },
    render() {
      return this.renderWithScope()
    }
  }

  // TODO: Fullwidth when provided max, min which generated years < total year can displayed in view
  // or the year scrollbar doesn't show
</script>
<style scoped lang="scss">
  @import "../../style/variables";
  @import "../../style/colors";
  
  
  ::v-deep button { outline: none; }
  ::v-deep table { border-collapse: collapse; }

  $textDisabled: #9e9e9e;

  /*TITLE*/
  ::v-deep .g-date-picker-title {
    display: flex;
    flex-direction: column;
    line-height: 1;

    &__year {
      display: inline-flex;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      cursor: pointer;
    }

    &__date {
      font-size: 24px;
      text-align: left;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      padding-bottom: 8px;
      margin-bottom: -8px;
    }

    &--disabled {
      color: $textDisabled;
    }
  }

  /*YEAR PICKER*/
  ::v-deep .g-date-picker-years {
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
  ::v-deep .g-date-picker-header {
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

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
        color: #666666;
      }

      &--disabled {
        button {
          color: $textDisabled;
        }
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
  ::v-deep .g-date-picker-table {
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
      color: #6e6e6e;
    }

    td {
      position: relative;
      color: #232323;
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

      &--active {
        color: map-get($shades, 'white');
      }

      &--start-range, &--end-range {
        color: #fff;
        text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      }

      &--in-range {
        color: #232323;
      }

      &--rounded {
        border-radius: 28px;
      }

      &--outlined {
        border: thin solid #232323;
      }

      &--readonly {
        pointer-events: none;
      }

      &--disabled {
        color: $textDisabled;
        border-color: $textDisabled;
      }

      &__background {
        width: 0;
        top: 2px;
        height: 32px;
        position: absolute;
        z-index: -1;

        &--start-range {
          width: 50%;
          right: 0;
        }

        &--in-range {
          width: 100%;
          right: 0;
        }

        &--end-range {
          width: 50%;
          left: 0;
        }
      }
    }
  }

  ::v-deep .g-date-picker-table--date {
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

  ::v-deep .g-date-picker-table--month {
    td {
      width: 33.333333%;
      height: 56px;

      .g-table-item {
        width: 100%;
        height: 34px;
      }
    }
  }
</style>

