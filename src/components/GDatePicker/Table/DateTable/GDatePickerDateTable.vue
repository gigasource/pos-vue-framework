<template>
  <div :class="datePickerClasses" @wheel="onWheel">
    <transition :name="transitionName">
      <table :key="tableDate">
        <thead>
          <tr>
            <th v-for="day in dayNames">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dateRow in dateRows">
            <td v-for="date in dateRow">
              <template v-if="date.isWeek">
                <small class="g-date-picker-table--date__week'">
                  {{ String(date.value).padStart(2, '0') }}
                </small>
              </template>
              <template v-else-if="date.isBlank"></template>
              <template v-else>
                <button class="g-btn"
                        type="button"
                        :class="date.class"
                        :style="date.style"
                        :disabled="disabled || !date.isAllowed"
                        @click="date.eventHandlers.click">
                  <div class="g-btn__content"> {{ date.content }}</div>
                  <div class="g-date-picker-table__events">
                    <div v-for="event in date.events"
                         :class="event.class"
                         :style="event.style"
                    ></div>
                  </div>
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
  import { computed, reactive, watch } from '@vue/composition-api'
  import { getDates, getDateTableEvents, getDayNameInWeek } from './GDatePickerDateTableUtil';
  import { TRANSITION_NAMES } from '../../utils'
  import _ from 'lodash'

  const CLS_BTN_START_RANGE = 'g-btn--start-range'
  const CLS_BTN_END_RANGE = 'g-btn--end-range'
  const CLS_BTN_IN_RANGE = 'g-btn--in-range'

  function addRangeClass(rows) {
    _.forEach(rows, row => {
      _.forEach(row, date => {
        if (date.isRangeStart)
          date.class[CLS_BTN_START_RANGE] = true
        else if (date.isRangeEnd)
          date.class[CLS_BTN_END_RANGE] = true
        else if (date.isInRange)
          date.class[CLS_BTN_IN_RANGE] = true
      })
    })
    return rows
  }

  export default {
    name: 'GDatePickerDateTable',
    props: {
      // GDatePickerTable
      allowedDates: null,
      current: String,
      disabled: Boolean,
      format: null,
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

      // GDatePicker
      range: [Boolean],

      // Colorable
      color: [String],

      // GDatePickerDateTable
      firstDayOfWeek: {
        type: [String, Number],
        default: 0,
      },
      showWeek: Boolean,
      weekdayFormat: Function,
    },
    setup(props, context) {
      // transition
      const state = reactive({ isReversing: false })
      watch(() => props.tableDate, (newVal, oldVal) => {
        state.isReversing = newVal < oldVal
      }, { lazy: true, flush: 'pre' })
      const transitionName = computed(() => state.isReversing ? TRANSITION_NAMES.REVERSE_TAB : TRANSITION_NAMES.TAB)

      //
      const datePickerClasses = computed(() => {
        return {
          'g-date-picker-table': true,
          'g-date-picker-table--date': true,
          'g-date-picker-table--disabled': props.disabled
        }
      })
      const dayNames = getDayNameInWeek(props)
      const dateRows = computed(() => {
        // add range classes to date object if props.range is provided
        const rows = getDates(props, context).value
        if (props.range)
          return addRangeClass(rows)
        else
          return rows
      })
      const { onWheel } = getDateTableEvents(props, context)

      return {
        datePickerClasses,
        transitionName,
        dayNames,
        dateRows,
        onWheel
      }
    }
  }
</script>
<style scoped>
</style>
