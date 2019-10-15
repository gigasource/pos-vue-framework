<template>
  <div :class="monthTableClasses" v-on:wheel="onWheel">
    <transition :name="transitionName">
      <table :key="tableDate">
        <tbody>
          <tr v-for="(monthRow, rowIndex) in monthRows" :key="rowIndex">
            <td v-for="month in monthRow" :key="month.month">
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
  import { TRANSITION_NAMES } from '../../utils'
  import { computed, reactive, watch } from '@vue/composition-api'
  import { getMonths, getMonthTableEvents } from './GDatePickerMonthTableUtil';

  const CLS_MONTH_TABLE = {
    DATE_PICKER_TABLE: 'g-date-picker-table',
    DATE_PICKER_TABLE_DISABLED: 'g-date-picker-table--disabled',
    MONTH_TABLE: 'g-date-picker-table--month',
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
    },
    setup(props, context) {
      // transition
      const state = reactive({ isReversing: false })
      const transitionName = computed(() => state.isReversing ? TRANSITION_NAMES.REVERSE_TAB : TRANSITION_NAMES.TAB)
      watch(() => props.tableDate, (newVal, oldVal) => state.isReversing = newVal < oldVal, { lazy: true, flush: 'pre' })

      // month data
      const monthTableClasses = computed(() => {
        return {
          [CLS_MONTH_TABLE.DATE_PICKER_TABLE]: true,
          [CLS_MONTH_TABLE.DATE_PICKER_TABLE_DISABLED]: props.disabled,
          [CLS_MONTH_TABLE.MONTH_TABLE]: true
        }
      })
      const monthRows = getMonths(props, context)
      const {onWheel} = getMonthTableEvents(props, context)

      return {
        monthTableClasses,
        onWheel,
        transitionName,
        monthRows,
      }
    }
  }
</script>
<style scoped>
</style>
