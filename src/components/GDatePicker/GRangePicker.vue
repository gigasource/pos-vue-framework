<template>
  <div>
    <g-date-picker-title
        :date="selectedRanges"
        :selecting-year="true"
    />
    <div style="display: flex">
      <g-date-picker
          no-title
          range
          :value="state.range"
          :type="'date'"
          :max="state.range[1]"
          v-on="startRangeEventHandler"/>
      <g-date-picker
          no-title
          range
          :value="state.range"
          :min="state.range[0]"
          :type="'date'"
          v-on="endRangeEventHandler"/>
    </div>
  </div>
</template>

<script>
  import GDatePicker from './GDatePicker'
  import { EVENT_NAMES } from './GDatePickerUtil';
  import { reactive, computed } from '@vue/composition-api';
  import GDatePickerTitle from './Title/GDatePickerTitle';


  export default {
    name: 'GRangePicker',
    components: { GDatePickerTitle, GDatePicker },
    props: {},
    setup() {
      const state = reactive({
        range: ['2019-01-10', '2019-01-20'],
      })

      const startRangeEventHandler = {
        [EVENT_NAMES.INPUT]: (range) => {
          state.range = [range[0], state.range[1]]
        }
      }

      const endRangeEventHandler = {
        [EVENT_NAMES.INPUT]: (range) => {
          state.range = [state.range[0], range[range.length-1]]
        }
      }

      const TICKS_PER_DAY = 864e5
      const descOrder = (a, b) => a > b ? 1 : -1

      const selectedRanges = computed(() => {
        const [rangeFrom, rangeTo] = [state.range[0], state.range[1]].map(x => new Date(`${x}T00:00:00+00:00`)).sort(descOrder)
        return (Math.ceil((rangeTo.getTime() - rangeFrom.getTime()) / TICKS_PER_DAY) + 1) + ' selected'
      })

      return {
        state,
        selectedRanges,
        startRangeEventHandler,
        endRangeEventHandler
      }
    }
  }
</script>
<style scoped>
</style>
