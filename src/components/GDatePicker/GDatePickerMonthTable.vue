<template>
  <div class="g-date-picker-table g-date-picker-table--month"
       :class="{'g-date-picker-table--disabled': disabled}"
       v-on:wheel="onWheel">
    <transition :name="transitionName">
      <table :key="tableDate">
        <tbody>
          <tr v-for="(row, rowIndex) in monthDatas" :key="rowIndex">
            <td v-for="month in row" :key="month.month">
              <button class="g-btn"
                      type="button"
                      :class="month.class"
                      :style="month.style"
                      :disabled="disabled || !month.isAllowed"
                      v-on="month.eventHandlers">
                <div class="g-btn__content">
                  {{ month.content }}
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
  import { pad, createNativeLocaleFormatter, TRANSITION_NAMES } from './utils'
  import { dateFilter } from './dateFilter'
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable'
  import { computed, reactive, watch } from '@vue/composition-api'
  import GDatePickerTable from './date-picker-table'

  export const EVENT_NAMES = {
    INPUT: 'input',
    UPDATE_TABLE_DATE: 'update:table-date',
    MONTH_CLICKED: 'click:month',
    MONTH_DB_CLICKED: 'dblclick:month'
  }

  export default {
    name: 'GDatePickerMonthTable',
    props: {
      // GDatePickerTable's props
      allowedDates: null,
      current: String,
      disabled: Boolean,
      format:null,
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
      color: [String],
      // GDatePickerMonthTable's props
    },
    setup(props, context) {
      // mixins
      const { displayedYear, genButtonClasses } = GDatePickerTable(props, context)
      const isDateAvailable = dateFilter(props)

      // header
      const state = reactive({ isReversing: false })
      const transitionName = computed(() => state.isReversing ? TRANSITION_NAMES.REVERSE_TAB : TRANSITION_NAMES.TAB)
      watch(() => props.tableDate, (newVal, oldVal) => state.isReversing = newVal < oldVal, { lazy: true, flush: 'pre' })


      // month
      const monthFormatter = computed(() => {
        return props.format || createNativeLocaleFormatter(undefined, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
      })
      function calculateTableDate(delta) {
        return `${parseInt(props.tableDate, 10) + Math.sign(delta || 1)}`
      }
      const monthDatas = computed(() => {
        const monthData = []
        const colNumbers = Array(3).fill(null)
        const rowNumbers = 12 / colNumbers.length
        for (let rowIndex = 0; rowIndex < rowNumbers; rowIndex++) {
          const row = colNumbers.map((_, col) => {
            const month = rowIndex * colNumbers.length + col + 1
            const date = `${displayedYear.value}-${pad(month)}`

            const monthData = {
              key: month,
              isAllowed: isDateAvailable(date),
              isSelected: date === props.value || (Array.isArray(props.value) && props.value.indexOf(date) !== -1),
              isCurrent: date === props.current,
            }
            monthData.class = genButtonClasses(monthData.isAllowed, false, monthData.isSelected, monthData.isCurrent)
            monthData.content = monthFormatter.value(date)
            monthData.eventHandlers = props.disabled ? undefined : {
              click: () => {
                if (monthData.isAllowed && !props.readonly)
                  context.emit(EVENT_NAMES.INPUT, date)

                context.emit(EVENT_NAMES.MONTH_CLICKED, date)
              },
              dblclick: () => context.emit(EVENT_NAMES.MONTH_DB_CLICKED, date),
            }

            let setColor = monthData.isSelected ? setBackgroundColor : setTextColor
            let color = (monthData.isSelected || monthData.isCurrent) && (props.color || '')

            setColor(color, monthData)
            return monthData
          })

          monthData.push(row)
        }

        return monthData
      })
      const onWheel = (e) => {
        if (!props.disabled && props.scrollable) {
          e.preventDefault()
          context.emit(EVENT_NAMES.UPDATE_TABLE_DATE, calculateTableDate(e.deltaY))
        }
      }

      return {
        onWheel,
        transitionName,
        monthDatas,
      }
    }
  }
</script>
<style scoped>
</style>
