<template>
  <div style="display: flex; flex-flow: wrap">
    <div class="clock_Container">
      <g-time-picker
          :value="'15:18:30'"
          :hour-convention="convention"
          use-seconds
          landscape
      ></g-time-picker>
    </div>

    <div class="clock_Container">
      <g-time-picker
          :value="'15:18:30'"
          :hour-convention="'24'"
          use-seconds
          scrollable
          landscape
      ></g-time-picker>
    </div>
    <div class="clock_Container">
      <g-time-picker
          :value="'15:18:30'"
          :hour-convention="convention"
          use-seconds
      ></g-time-picker>
    </div>

    <div class="clock_Container">
      <g-time-picker
          :value="'15:18:30'"
          :hour-convention="'24'"
          use-seconds
          scrollable
      ></g-time-picker>
    </div>
  </div>
</template>

<script>
  import { HourConvention } from '../components/GTimePicker/logic/GTimePickerUtil'
  import GTimePicker from '../components/GTimePicker/GTimePicker'

  export default {
    name: 'GTimePickerDemo',
    components: { GTimePicker },
    data () {
      return {
        convention: HourConvention._12HRS,
      }
    }
  }
</script>
<style scoped>
</style>
