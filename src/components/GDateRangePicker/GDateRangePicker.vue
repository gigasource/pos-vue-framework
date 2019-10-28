<template>
  <div>
    <div style="display: flex">
      <div style="display: flex; flex-direction: column;">
        <span style="padding: 5px">From:</span>
        <g-date-picker
            no-title
            range
            v-model="state.range"
            :type="'date'"
            :max="state.range[1]"
        />
      </div>

      <div style="display: flex; flex-direction: column;">
        <span style="padding: 5px">To:</span>
        <g-date-picker
            no-title
            range
            v-model="state.range"
            :min="state.range[0]"
            :type="'date'"/>
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
      // The DatePicker has been changed so DateRangePicker doesn't work as expected
      // TODO: Correct range picker behavior
      const now = new Date()
      const startRange = new Date(now.getTime() - 86400000 * 4).toISOString().substr(0, 10)
      const endRange = new Date(now.getTime() + 86400000 * 4).toISOString().substr(0, 10)

      const state = reactive({
        range: [startRange, endRange],
      })

      // const startRangeEventHandler = {
      //   'input': (range) => {
      //     console.log('start range emit', range)
      //     state.range = [range[0], state.range[1]]
      //     console.log(state.range)
      //   }
      // }
      //
      // const endRangeEventHandler = {
      //   'input': (range) => {
      //     console.log('end range emit', range)
      //     state.range = [state.range[0], range[range.length-1]]
      //     console.log(state.range)
      //   }
      // }

      // TODO: Remove duplicate
      // Get range diff
      const TICKS_PER_DAY = 864e5
      const descOrder = (a, b) => a > b ? 1 : -1

      const selectedRanges = computed(() => {
        const [rangeFrom, rangeTo] = [state.range[0], state.range[1]].map(x => new Date(`${x}T00:00:00+00:00`)).sort(descOrder)
        return (Math.ceil((rangeTo.getTime() - rangeFrom.getTime()) / TICKS_PER_DAY) + 1) + ' selected'
      })

      return {
        state,
        selectedRanges,
        // startRangeEventHandler,
        // endRangeEventHandler
      }
    }
  }
</script>
<style scoped>
</style>
