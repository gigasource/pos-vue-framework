<script type="text/jsx">

  import _ from 'lodash'
  import GDatePickerUtil from './GDatePickerUtil'
  import GPicker from '../GPicker/GPicker'
  //
  import { TRANSITION_NAMES } from './utils';
  import { reactive, computed, watch, ref } from '@vue/composition-api'
  //
  import { getYearRange } from './Years/GDatePickerYearsUtil';
  import { getHeaderFormatterFn, getNavigationState, NAV } from './Header/GDatePickerHeaderUtil';
  import { getDates, getDateTableEvents, getDayNameInWeek } from './Table/DateTable/GDatePickerDateTableUtil';
  import { getMonths, getMonthTableEvents } from './Table/MonthTable/GDatePickerMonthTableUtil';

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
        title,
        yearModel,
        header: headerModel,
        dates: datesModel,
        months: monthsModel,
        state,
      } = GDatePickerUtil(props, context)




      // Title render function
      const titleClasses = computed(() => {
        return {
          'g-date-picker-title': true,
          'g-date-picker-title--disabled': title.value.disabled
        }
      })
      const yearTitleClass = computed(() => {
        return {
          'g-picker__title__btn': true,
          'g-picker__title__btn--readonly': title.value.readonly,
          'g-picker__title__btn--active': true,
          'g-date-picker-title__year': true
        }
      })
      const dateTitleClass = computed(() => {
        return {
          'g-picker__title__btn': true,
          'g-picker__title__btn--readonly': title.value.readonly,
          'g-date-picker-title__date': true
        }
      })
      function datePickerTitleRenderFn() {
        return (<div class={titleClasses.value}>
          <div class={yearTitleClass.value}
               v-on:click={title.value.eventHandlers.click}>
            {title.value.year}
          </div>
          <div class={dateTitleClass.value}>
            <transition name={TRANSITION_NAMES.PICKER}>
              <div key={title.value.date}
                   domPropsInnerHTML={title.value.date}/>
            </transition>
          </div>
        </div>)
      }

      // years list render function
      const yearsData = getYearRange(yearModel)
      function yearListRenderFn() {
        const yearItems = yearsData.value.map((year) => {
          return (
              <li
                  key={year}
                  class={{ active: parseInt(yearModel.value.value) === year }}
                  v-on:click_stop={() => yearModel.value.eventHandlers.yearClicked(year)}>
                {year}
              </li>
          )
        })
        return <ul class="g-date-picker-years" ref="years">{yearItems}</ul>
      }

      // GDatePicker -> Body -> Navigation render function
      const tableTransitionName = ref('')
      const goPrev = () => {
        tableTransitionName.value = TRANSITION_NAMES.REVERSE_TAB;
        headerModel.value.eventHandlers.onPrev()
      }
      const goNext = () => {
        tableTransitionName.value = TRANSITION_NAMES.TAB
        headerModel.value.eventHandlers.onNext()
      }
      const headerCssClasses = computed(() => {
        return {
          'g-date-picker-header': true,
          'g-date-picker-header--disabled': headerModel.value.disabled
        }
      })
      const headerContentCssClass = computed(() => {
        return {
          'g-date-picker-header__value': true,
          'g-date-picker-header__value--disabled': headerModel.value.disabled
        }
      })
      const headerFormatter = getHeaderFormatterFn(headerModel)
      const { canGoPrev, canGoNext } = getNavigationState(headerModel)
      function headerRenderFn() {
        return (
            <div class={headerCssClasses.value}>
              <div class={headerContentCssClass.value}>
                <transition name={tableTransitionName.value}>
                  <div key={headerModel.value.value}>
                    <button
                        type="button"
                        v-on:click={() => {
                          headerModel.value.eventHandlers.onHeaderClicked()
                        } }>
                      {headerFormatter.value(headerModel.value.value)}
                    </button>
                  </div>
                </transition>
              </div>
              <button
                  class="g-date-picker-header__prev-button"
                  disabled={!canGoPrev.value}
                  v-on:click={() => goPrev() }></button>
              <button
                  class="g-date-picker-header__next-button"
                  disabled={!canGoNext.value}
                  v-on:click={() => goNext() }></button>
            </div>
        )
      }

      // wheel event for date/month table
      let throttleWheel = _.throttle((e) => {
        (e.deltaX < 0 ? goPrev : goNext)()
      }, 1000, { leading: true, trailing: false })
      const onWheelHandler = (e) => {
        e.preventDefault()
        throttleWheel(e)
      }

      // GDatePicker -> Body -> Date Table render function
      function addRangeClass(rows) {
        _.forEach(rows, row => {
          _.forEach(row, date => {
            if (date.isRangeStart) {
              date.class['g-btn--start-range'] = true
            } else if (date.isRangeEnd) {
              date.class['g-btn--end-range'] = true
            } else if (date.isInRange) {
              date.class['g-btn--in-range'] = true
            }
          })
        })
        return rows
      }
      const datePickerClasses = computed(() => {
        return {
          'g-date-picker-table': true,
          'g-date-picker-table--date': true,
          'g-date-picker-table--disabled': datesModel.value.disabled
        }
      })
      const dayNameInWeek = getDayNameInWeek(datesModel.value)
      const dateRows = computed(() => {
        // add range classes to date object if props.range is provided
        const rows = getDates(datesModel.value, context).value
        return datesModel.value.range ? addRangeClass(rows) : rows
      })
      function rowHeaderRenderFn(week) {
        return (<small class="g-date-picker-table--date__week">
          {String(week).padStart(2, '0')}
        </small>)
      }
      function getDateButton(date) {
        return (<button
            type="button"
            class={['g-btn', date.class]}
            style={date.style}
            disabled={datesModel.value.disabled || !date.isAllowed}
            v-on:click={() => datesModel.value.eventHandlers.onDateClicked(date)}
            v-on:dblclick={() => datesModel.value.eventHandlers.onDateDoubleClicked(date)}>
          <div class="g-btn__content">{date.content}</div>
          <div class="g-date-picker-table__events">
            {
              (date.events || []).map(event => <div class={event.class} style={event.style}></div>)
            }
          </div>
        </button>)
      }
      function getDateTds(date) {
        return <td>{ date.isWeek ? rowHeaderRenderFn(date.value) : date.isBlank ? '' : getDateButton(date)}</td>
      }
      function dateTableRenderFn() {
        return (
            <div class={datePickerClasses.value} v-on:wheel={ (e) => {
              if (datesModel.value.disabled || !props.scrollable)
                return
              onWheelHandler(e)
            } }>
              <transition name={tableTransitionName.value}>
                <table key={datesModel.value.tableDate}>
                  <thead>
                  <tr>{(dayNameInWeek.value || []).map(dayName => <th>{dayName}</th>)}</tr>
                  </thead>
                  <tbody>
                    {
                      (dateRows.value || []).map(dateRow => <tr>
                          {dateRow.map(date => getDateTds(date))}
                      </tr>)
                    }
                  </tbody>
                </table>
              </transition>
            </div>)
      }

      // Month
      const monthTableClasses = computed(() => {
        return {
          'g-date-picker-table': true,
          'g-date-picker-table--month': true,
          'g-date-picker-table--disabled': monthsModel.value.disabled
        }
      })
      function monthTableRenderFn() {
        const monthRows = getMonths(monthsModel.value, context)
        return (<div class={monthTableClasses.value} v-on:wheel={ (e) => {
          if (monthsModel.value.disabled || !props.scrollable)
            return
          onWheelHandler(e)
        } }>
          <transition name={tableTransitionName.value}>
          <table key={monthsModel.value.tableDate}>
          <tbody>
          {
            (monthRows.value || []).map((monthRow, rowIndex) => {
              return <tr key={rowIndex}>
                {
                  monthRow.map(monthItem => {
                    return <td key={monthItem.month}>
                      <button
                          type="button"
                          class={['g-btn', monthItem.class]}
                          style={monthItem.style}
                          disabled={monthsModel.value.disabled || !monthItem.isAllowed}
                          v-on:click={() => monthsModel.value.eventHandlers.onMonthClicked(monthItem.value)}>
                        <div class="g-btn__content">
                          { monthItem.formattedValue }
                        </div>
                      </button>
                    </td>
                  })
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
        return datesModel.value.show ? dateTableRenderFn() : monthTableRenderFn()
      }
      // date picker body render function
      function datePickerBodyRenderFn() {
        return yearModel.value.show ? yearListRenderFn() : [headerRenderFn(), dateMonthTableRenderFn()]
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
              <div key={state.activePicker}>
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
<style scoped>
</style>
