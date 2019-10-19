<template>
  <div>
    <div style="display: flex">
      <div style="display: flex; flex-direction: column;">
        <span style="padding: 5px">From:</span>
        <g-date-picker
            no-title
            range
            :value="datePickerState.range"
            :type="'date'"
            :max="datePickerState.range[1]"
            v-on="startRangeEventHandler"/>
      </div>

      <div style="display: flex; flex-direction: column;">
        <span style="padding: 5px">To:</span>
        <g-date-picker
            no-title
            range
            :value="datePickerState.range"
            :min="datePickerState.range[0]"
            :type="'date'"
            v-on="endRangeEventHandler"/>
      </div>
    </div>
  </div>
</template>

<script>
  import GDatePicker from '../GDatePicker/GDatePicker'
  import { EVENT_NAMES } from '../GDatePicker/logic/GDatePickerUtil';
  import { reactive, computed } from '@vue/composition-api';


  export default {
    name: 'GRangePicker',
    components: { GDatePicker },
    props: {},
    setup() {
      const datePickerState = reactive({
        range: ['2019-01-10', '2019-01-20'],
      })

      const startRangeEventHandler = {
        [EVENT_NAMES.INPUT]: (range) => {
          datePickerState.range = [range[0], datePickerState.range[1]]
        }
      }

      const endRangeEventHandler = {
        [EVENT_NAMES.INPUT]: (range) => {
          datePickerState.range = [datePickerState.range[0], range[range.length-1]]
        }
      }

      // TODO: Remove duplicate
      // Get range diff
      const TICKS_PER_DAY = 864e5
      const descOrder = (a, b) => a > b ? 1 : -1

      const selectedRanges = computed(() => {
        const [rangeFrom, rangeTo] = [datePickerState.range[0], datePickerState.range[1]].map(x => new Date(`${x}T00:00:00+00:00`)).sort(descOrder)
        return (Math.ceil((rangeTo.getTime() - rangeFrom.getTime()) / TICKS_PER_DAY) + 1) + ' selected'
      })

      return {
        datePickerState,
        selectedRanges,
        startRangeEventHandler,
        endRangeEventHandler
      }
    }
  }
</script>
<style scoped>
</style>
