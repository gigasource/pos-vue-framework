<script type="text/jsx">
  import _ from 'lodash'
  import dayjs from 'dayjs';
  import { reactive, computed, ref, watch } from 'vue';
  import GDatePickerUtil from './logic/GDatePickerUtil';
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable';
  import GDateSelect from './GDateSelect';
  import GBtn from '../GBtn/GBtn'
  import GDivider from '../GLayout/GDivider';
  import { getScopeIdRender } from '../../utils/helpers';


  const DEFAULT_COLOR = '#2979FF'
  const DEFAULT_RANGE_COLOR = 'rgba(109, 159, 244, 0.2)'

  export default {
    name: 'GRangePicker',
    components: { GDivider, GDateSelect, GBtn },
    props: {
      max: String,
      min: String,
      disabled: false,
      readonly: false,
      value: Array,
      color: { type: String, default: DEFAULT_COLOR },
      rangeColor: { type: String, default: DEFAULT_RANGE_COLOR },
    },
    events: ['input'],
    setup(props, context) {
      const now = new Date()
      const TICKS_PER_DAY = 864e5
      const ISO_DATE_FORMAT = 'YYYY-MM-DD'
      const start = props.value && props.value.length > 0 ? props.value[0] : null
      const end = props.value && props.value.length > 1 ? props.value[1] : null
      const startRange = start || new Date(now.getTime() - TICKS_PER_DAY * 4).toISOString().substr(0, 10)
      const endRange = end || new Date(now.getTime() + TICKS_PER_DAY * 4).toISOString().substr(0, 10)
      //
      const rangeStartPickerProps = reactive({
        ...props,
        allowedDates: null,
        scrollable: false,
        type: 'date',
        firstDayOfWeek: 0,
        showWeek: false,
        showCurrent: false,
        range: true,
        value: [startRange, endRange],
        max: endRange,
        focusOnFirstItem: true
      })

      const rangeEndPickerProps = reactive({
        ...props,
        allowedDates: null,
        scrollable: false,
        type: 'date',
        firstDayOfWeek: 0,
        showWeek: false,
        showCurrent: false,
        range: true,
        value: [startRange, endRange],
        min: startRange,
        focusOnFirstItem: false
      })

      const { headerModel: headerModel1, dateTableModel: dateTableModel1, state: state1, } = GDatePickerUtil(rangeStartPickerProps, context)
      const { headerModel: headerModel2, dateTableModel: dateTableModel2, state: state2 } = GDatePickerUtil(rangeEndPickerProps, context)

      const selectMode = {
        custom: 0,
        today: 1,
        yesterday: 2,
        thisWeek: 3,
        thisMonth: 4
      }

      const state = reactive({
        currentMode: selectMode.custom
      })

      function selectCustom() {
        state.currentMode = selectMode.custom
      }

      // button fn
      function selectToday() {
        state.currentMode = selectMode.today
        const today = dayjs().format(ISO_DATE_FORMAT)
        rangeStartPickerProps.value = [today, today]
        rangeEndPickerProps.value = [today, today]
      }

      function selectYesterday() {
        state.currentMode = selectMode.yesterday
        const yesterday = dayjs().subtract(1, 'day').format(ISO_DATE_FORMAT)
        rangeStartPickerProps.value = [yesterday, yesterday]
        rangeEndPickerProps.value = [yesterday, yesterday]
      }

      function selectThisWeek() {
        state.currentMode = selectMode.thisWeek
        const firstDayOfWeek = dayjs().startOf('week').format(ISO_DATE_FORMAT)
        const endOfWeek = dayjs().endOf('week').format(ISO_DATE_FORMAT)
        rangeStartPickerProps.value = [firstDayOfWeek, endOfWeek]
        rangeEndPickerProps.value = [firstDayOfWeek, endOfWeek]
      }

      function selectThisMonth() {
        state.currentMode = selectMode.thisMonth
        const daysInMonth = dayjs().daysInMonth()
        rangeStartPickerProps.value = [`${dayjs().format('YYYY-MM')}-01`, `${dayjs().format('YYYY-MM')}-${daysInMonth}`]
        rangeEndPickerProps.value = [`${dayjs().format('YYYY-MM')}-01`, `${dayjs().format('YYYY-MM')}-${daysInMonth}`]
      }


      function setStartDateItem(dateItem) {
        if (dateItem.isAllowed && !props.readonly) {
          setStartDateValue(dateItem.value)
        }
      }

      function setStartDateValue(date) {
        selectCustom()
        if (date <= rangeStartPickerProps.value[1]) {
          rangeStartPickerProps.value = [date, rangeStartPickerProps.value[1]]
          rangeEndPickerProps.value = [date, rangeEndPickerProps.value[1]]
          rangeEndPickerProps.min = date
        }
      }

      function setEndDateItem(dateItem) {
        if (dateItem.isAllowed && !props.readonly) {
          setEndDateValue(dateItem.value)
        }
      }

      function setEndDateValue(date) {
        selectCustom()
        if (date >= rangeStartPickerProps.value[0]) {
          rangeStartPickerProps.value = [rangeStartPickerProps.value[0], date]
          rangeEndPickerProps.value = [rangeEndPickerProps.value[0], date]
          rangeStartPickerProps.max = date
        }
      }

      watch(() => rangeStartPickerProps.value, newVal => {
        context.emit('input', newVal)
			})

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
              if (date.isSelected && !date.isInRange) {
                setBackgroundColor(color, date)
                setTextColor('#fff', date)
              }

              if (date.isRangeStart || date.isRangeEnd || date.isInRange) {
                setBackgroundColor(props.rangeColor || DEFAULT_RANGE_COLOR, date.background)
              }
            }
          })
        })

        return dateRows
      }

      function weekRenderFn(week) {
        return (<small class="g-date-picker-table--date__week">{String(week).padStart(2, '0')}</small>)
      }

      function renderHeaderFn(headerModel) {
        return (
            <div class={{
              'g-date-range-picker__header': true,
              'g-date-range-picker__header--disabled': props.disabled,
            }}>{headerModel.value.content}</div>
        )
      }

      function renderDateButton(dateItem, onDateItemClicked) {
        return ([<button
            class={['g-table-item', dateItem.class]}
            style={dateItem.style}
            disabled={!dateItem.isAllowed}
            onClick={e => {
              e.stopPropagation()
              onDateItemClicked(dateItem)
            }}>
          <div class="g-table-item__content">{dateItem.formattedValue}</div>
        </button>,
          <div class={['g-table-item__background', dateItem.background.class, dateItem.isRangeStart && dateItem.isRangeEnd && 'g-table-item__background--single']}
               style={dateItem.background.style}>
          </div>])
      }

      function renderDateTableData(date, onDateItemClicked) {
        return <td class={date.isBlank && 'blank'}>{date.isWeek ? weekRenderFn(date.value) : (date.isBlank ? '' : renderDateButton(date, onDateItemClicked))}</td>
      }

      function renderDateTable(state, dateTableModel, onDateItemClicked) {
        return (
            <div class='g-date-range-picker__date'>
              <table key={state.viewportDate}>
                <thead>
                <tr>{dateTableModel.value.dayNames.map(dayName => <th>{dayName}</th>)}</tr>
                </thead>
                <tbody>
                {
                  addDateItemClass(dateTableModel.value.dateRows).map(dateRow => <tr>
                    {dateRow.map(date => renderDateTableData(date, onDateItemClicked))}
                  </tr>)
                }
                </tbody>
              </table>
            </div>)
      }

      function renderGDateRangePicker () {
        return <div class="g-date-range-picker">
          <div class="action-btns">
            <g-btn outlined height="40" text-color="#2979ff" class={selectMode.custom === state.currentMode && 'btn__active'} onClick={e => selectCustom()}>Custom</g-btn>
            <g-btn outlined height="40" text-color="#2979ff" class={selectMode.today === state.currentMode && 'btn__active'} onClick={e => selectToday()}>Today</g-btn>
            <g-btn outlined height="40" text-color="#2979ff" class={selectMode.yesterday === state.currentMode && 'btn__active'} onClick={e => selectYesterday()}>Yesterday</g-btn>
            <g-btn outlined height="40" text-color="#2979ff" class={selectMode.thisWeek === state.currentMode && 'btn__active'} onClick={e => selectThisWeek()}>This week</g-btn>
            <g-btn outlined height="40" text-color="#2979ff" class={selectMode.thisMonth === state.currentMode && 'btn__active'} onClick={e => selectThisMonth()}>This month</g-btn>
          </div>
          <g-divider/>
          <div class="row-flex pa-3">
            <g-date-select
                style="flex: 1"
                label="Start Date"
                value={rangeStartPickerProps.value[0]}
                max={rangeStartPickerProps.value[1]}
                onInput={setStartDateValue}/>
            <g-date-select
                style="flex: 1"
                label="End Date"
                value={rangeStartPickerProps.value[1]}
                min={rangeStartPickerProps.value[0]}
                onInput={setEndDateValue}/>
          </div>
          <div class="row-flex px-3">
            <div style="border-radius: 5px 0 0 5px; border: 1px solid #DFE4E8;">
              {renderHeaderFn(headerModel1)}
              {renderDateTable(state1, dateTableModel1, setStartDateItem)}
            </div>
            <div style="border-radius: 0 5px 5px 0; border: 1px solid #DFE4E8; margin-left: -1px">
              {renderHeaderFn(headerModel2)}
              {renderDateTable(state2, dateTableModel2, setEndDateItem)}
            </div>
          </div>
        </div>
      }
      
      return getScopeIdRender()(renderGDateRangePicker)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/variables";
  @import "../../style/colors";

  $textDisabled: #9e9e9e;

  /* CLEAR */
  button {
    outline: none;
  }

  table {
    border-collapse: collapse;
  }

  /* Component */
  .g-date-range-picker {
    display: flex;
    flex-direction: column;
		width: 900px;

    /*HEADER*/
    &__header {
      text-align: center;
      padding: 10px;
			font-weight: 700;
			font-size: 18px;
      /* identical to box height, or 113% */
      &--disabled {
        color: #999999;
      }
    }

    /*TABLE*/
    &__date {
      position: relative;
      padding: 12px;

      table {
        table-layout: fixed;
        width: 100%;
      }

      tr {
        height: 48px;

				td:first-child{
					div.g-table-item__background:not(.g-table-item__background--start-range) {
						border-top-left-radius: 32px;
						border-bottom-left-radius: 32px;
						width: calc(100% - 8px);

						&.g-table-item__background--end-range {
							width: 0;
						}
					}
				}

				td:last-child{
					div.g-table-item__background {
						margin-right: 8px;

						&.g-table-item__background--start-range {
							width: 0;
						}

						&:not(.g-table-item__background--start-range):not(.g-table-item__background--end-range) {
							width: calc(100% - 8px);
						}

						&:not(.g-table-item__background--end-range)  {
							border-top-right-radius: 32px;
							border-bottom-right-radius: 32px;
						}
					}
				}

				td.blank + td:not(.blank) {
					div.g-table-item__background.g-table-item__background--end-range{
						width: 0;
					}

					div.g-table-item__background--in-range {
						border-top-left-radius: 32px;
						border-bottom-left-radius: 32px;
					}
				}
      }

      td, th {
        text-align: center;
        position: relative;
      }

      th {
        padding: 8px 0;
        font-weight: 600;
        font-family: Muli, Arial, serif;
        font-style: normal;
        font-size: 15px;
        line-height: 17px;
        color: #919EAB;
      }

      td {
        color: #212B35;
        width: 40px;
        padding: 2px 0;
      }
    }
  }

  .g-table-item {
    margin: 0;
    font-size: 16px;
		font-family: "Muli", sans-serif;
		font-weight: 400;
    background-color: transparent;
    border-style: none;
    color: inherit;
    height: 40px;
    width: 40px;
		position: absolute;
		top: 4px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;

    &--active {
      color: map-get($shades, 'white');
    }

    &--start-range, &--end-range {
      color: #fff;
      text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }

    &--in-range {
      color: #212B35;
    }

    &--rounded {
      border-radius: 32px;
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
      height: 40px;
      position: absolute;
			top: 4px;
			z-index: 1;

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

			&--single {
				width: 0 !important;
			}
    }
  }

	.action-btns {
		padding: 12px 16px;

		.g-btn {
			margin-right: 16px;
			padding: 0 24px !important;
			border-radius: 2px !important;
		}

		.btn__active {
			background: #2979FF;
			color: #FFF !important;
		}
	}
</style>
