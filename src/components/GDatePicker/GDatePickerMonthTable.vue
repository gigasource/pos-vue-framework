<template>
  <div class="g-date-picker-table g-date-picker-table--month"
       :class="{'g-date-picker-table--disabled': disabled}"
       v-on:wheel="onWheel">
    <transition :name="transitionName">
      <table :key="tableDate">
        <tbody>
          <tr v-for="(row, rowIndex) in monthData" :key="rowIndex">
            <td v-for="month in row" :key="month.month">
              <button class="g-btn"
                      type="button"
                      :class="month.class"
                      :style="month.style"
                      :disabled="disabled || !month.isAllowed"
                      v-on="month.events">
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
  import { pad, createNativeLocaleFormatter } from './util'
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable'
  import { computed, reactive, watch } from '@vue/composition-api'
  import isDateAllowed from './util/isDateAllowed'
  import GDatePickerTable from './mixins/date-picker-table'

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
      const { displayedYear, genButtonClasses, genButtonEvents } = GDatePickerTable(props, context)

      // data
      const state = reactive({ isReversing: false })

      // computed
      const formatter = computed(() => {
        return props.format || createNativeLocaleFormatter(undefined, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
      })

      // methods
      function calculateTableDate(delta) {
        return `${parseInt(props.tableDate, 10) + Math.sign(delta || 1)}`
      }

      function getMonths() {
        const monthData = []
        const colNumbers = Array(3).fill(null)
        const rowNumbers = 12 / colNumbers.length
        for (let rowIndex = 0; rowIndex < rowNumbers; rowIndex++) {
          const row = colNumbers.map((_, col) => {
            const month = rowIndex * colNumbers.length + col
            const date = `${displayedYear.value}-${pad(month + 1)}`

            const monthData = {
              key: month,
              isAllowed: isDateAllowed(date, props.min, props.max, props.allowedDates),
              isSelected: date === props.value || (Array.isArray(props.value) && props.value.indexOf(date) !== -1),
              isCurrent: date === props.current,
            }
            monthData.class = genButtonClasses(monthData.isAllowed, false, monthData.isSelected, monthData.isCurrent)
            monthData.events = genButtonEvents(date, monthData.isAllowed, 'month')
            monthData.content = formatter.value(date)

            let setColor = monthData.isSelected ? setBackgroundColor : setTextColor
            let color = (monthData.isSelected || monthData.isCurrent) && (props.color || '')

            setColor(color, monthData)
            return monthData
          })

          monthData.push(row)
        }

        return monthData
      }

      const monthData = computed(() => getMonths())

      const transitionName = computed(() => state.isReversing ? 'tab-reverse-transition' : 'tab-transition')
      watch(() => props.tableDate, (oldVal, newVal) => {
        state.isReversing = newVal < oldVal
      })

      const onWheel = (e) => {
        if (!props.disabled && props.scrollable) {
          e.preventDefault()
          context.emit('update:table-date', calculateTableDate(e.deltaY))
        }
      }

      return {
        onWheel,
        transitionName,
        monthData,
      }
    }
  }
</script>
<style scoped>
</style>
