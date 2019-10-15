<template>
  <div style="display: flex">
    <g-date-picker no-title range :value="state.range" :type="'date'" v-on="startRangeEventHandler"></g-date-picker>
    <g-date-picker no-title range :value="state.range" :type="'date'" v-on="endRangeEventHandler"></g-date-picker>
  </div>
</template>

<script>
  import GDatePicker from './GDatePicker'
  import { EVENT_NAMES } from './GDatePickerUtil';
  import { reactive } from '@vue/composition-api';


  export default {
    name: 'GRangePicker',
    components: { GDatePicker },
    props: {},
    setup() {
      const state = reactive({
        range: ['2019-01-01', '2019-01-02'],
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

      return {
        state,
        startRangeEventHandler,
        endRangeEventHandler
      }
    }
  }
</script>
<style scoped>
</style>
