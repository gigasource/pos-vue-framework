<script type="text/jsx">
  import _ from 'lodash'
  import { getScopeIdRender } from '../../utils/helpers'

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  import { reactive, computed, watch } from 'vue';
  import dayjs from 'dayjs';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GDateSelect',
    components: { GIcon },
    props: {
      label: String,
      value: String,
      min: String,
      max: String,
      disabled: false,
      readonly: false,
    },
    events: ['input'],
    setup(props, context) {
      const state = reactive({
        year: 0,
        month: 0,
        day: 0
      })

      watch(() => props.value, () => {
        // month start from 0 in js, but display from 1 in string, so we need to subtract 1 when convert it to integer
        const [year, month, day] = _.map((props.value ? props.value : dayjs().format('YYYY-MM-dd')).split('-'), v => parseInt(v))
        state.year = year
        state.month = month - 1
        state.day = day
      }, { flush: 'pre' })

      function _getYear(date) {
        return parseInt(date.split('-')[0])
      }

      function _getMonth(date) {
        return parseInt(date.split('-')[1]) - 1
      }

      function _getDay(date) {
        return parseInt(date.split('-')[2])
      }

      // extract max value
      const cptMaxYear = computed(() => {
        return props.max ? _getYear(props.max) : parseInt(dayjs().format('YYYY')) + 10
      })
      const cptMaxMonth = computed(() => {
        if (props.max) {
          return _getMonth(props.max)
        } else {
          return 11
        }
      })
      const cptMaxDay = computed(() => {
        if (props.max) {
          return _getDay(props.max)
        } else {
          return dayjs(`${cptMaxYear.value}-${cptMaxMonth.value + 1}`).daysInMonth()
        }
      })

      // extract min value
      const cptMinYear = computed(() => {
        return props.min ? _getYear(props.min) : parseInt(dayjs().format('YYYY')) - 10
      })
      const cptMinMonth = computed(() => {
        if (props.min) {
          return _getMonth(props.min)
        } else {
          return 0
        }
      })
      const cptMinDay = computed(() => {
        if (props.min) {
          return _getDay(props.min)
        } else {
          return 1
        }
      })

      // get available year, month, day
      const cptYears = computed(() => {
        return _.range(cptMinYear.value, cptMaxYear.value + 1)
      })

      const cptMonths = computed(() => {
        if (props.max) {
          // start date
          if (cptMaxYear.value === state.year) {
            return _.range(0, cptMaxMonth.value + 1)
          } else {
            return _.range(0, 12)
          }
        } else if (props.min) {
          if (cptMinYear.value === state.year) {
            return _.range(cptMinMonth.value, 12)
          } else {
            return _.range(0, 12)
          }
        }
      })

      const cptDays = computed(() => {
        const _daysInMonth = dayjs(`${state.year}-${state.month + 1}`).daysInMonth()
        if (props.max) {
          if (cptMaxYear.value === state.year && cptMaxMonth.value === state.month) {
            return _.range(1, cptMaxDay.value + 1)
          } else {
            return _.range(1, _daysInMonth + 1)
          }
        } else if (props.min) {
          if (cptMinYear.value === state.year && cptMinMonth.value === state.month) {
            return _.range(cptMinDay.value, _daysInMonth + 1)
          } else {
            return _.range(1, _daysInMonth + 1)
          }
        }
      })

      const emitNewDate = () => {
        if (props.max) {
          // ensure selected date is not > maximum date
          if (state.year === cptMaxYear.value) {
            if (state.month > cptMaxMonth.value) {
              state.month = cptMaxMonth.value
            }

            if (state.month === cptMaxMonth.value) {
              if (state.day > cptMaxDay.value) {
                state.day = cptMaxDay.value
              }
            }
          }
        } else if (props.min) {
          // ensure selected date is not < minimum date
          if (state.year === cptMinYear.value) {
            if (state.month < cptMinMonth.value) {
              state.month = cptMinMonth.value
            }

            if (state.month === cptMaxMonth.value) {
              if (state.day < cptMinDay.value) {
                state.day = cptMinDay.value
              }
            }
          }
        }

        // for both start and end range, when ever the user change month,
        // ensure the selected day not bigger than the maximum day in a month
        // i.e: selected day: 31, switch to Feb, then selected day will be adjust to 28 or 29 depend on the year is leap year or not
        const _daysInMonth = dayjs(`${state.year}-${state.month + 1}`).daysInMonth()
        if (state.day > _daysInMonth) {
          state.day = _daysInMonth
        }

        // month + 1
        const newDate = `${_.padStart(state.year, 4)}-${_.padStart(state.month + 1, 2, '0')}-${_.padStart(state.day, 2, '0')}`
        if ((props.min && newDate < props.min) || (props.max && newDate > props.max)) {
          return
        }
        context.emit('input', newDate)
      }
      const showMonth = () => {
        context.refs.month.click()
      }
      const showDay = () => context.refs.day.click()
      const showYear = () => context.refs.year.click()


      function renderGDateSelect() {
        return <div class="g-date-select">
          <label>{props.label}</label>
          <div>
            <span class="dropdown" onClick_stop={() => showMonth()}>
              <select ref="month" onChange={e => {
                state.month = Number(e.target.value)
                emitNewDate()
              }}>
                {_.map(cptMonths.value, month => <option selected={month === state.month} value={month}>{monthNames[month]}</option>)}
              </select>
              <g-icon class="dropdown__icon" small>fas fa-chevron-down</g-icon>
            </span>

            <span class="dropdown" onClick_stop={() => showDay()}>
              <select ref="day" onChange={e => {
                state.day = Number(e.target.value)
                emitNewDate()
              }}>
                {_.map(cptDays.value, day => <option selected={day === state.day} value={day}>{day}</option>)}
              </select>
              <g-icon class="dropdown__icon" small>fas fa-chevron-down</g-icon>
            </span>

            <span class="dropdown" onClick_stop={() => showYear()}>
              <select ref="year" onChange={e => {
                state.year = Number(e.target.value)
                emitNewDate()
              }}>
                {_.map(cptYears.value, year => <option selected={year === state.year} value={year}>{year}</option>)}
              </select>
              <g-icon class="dropdown__icon" small>fas fa-chevron-down</g-icon>
            </span>

          </div>
        </div>
      }
      
      return getScopeIdRender()(renderGDateSelect)
    }
  }
</script>

<style scoped lang="scss">
  .g-date-select {
    & label {
      margin-bottom: 8px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      /* identical to box height */

      display: flex;
      align-items: center;
      text-align: center;

      /* Grey/grey */

      color: #9E9E9E;
    }

    & select {
      height: 40px;
      padding: 10px 32px 10px 16px;
      margin-right: 8px;
      font-size: 14px;
			font-weight: 700;
			font-family: "Muli", sans-serif;
      outline: none;
			color: #212B35;
      background: #EBEBEB;
      border: 1px solid #DBDBDB;
      border-radius: 2px;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    & .dropdown {
      display: inline-block;
      position: relative;

      &__icon {
        position: absolute;
        top: 50%;
        right: 18px;
        transform: translateY(-50%);
        pointer-events: none;
      }
    }
  }
</style>
