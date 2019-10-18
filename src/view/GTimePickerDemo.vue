<template>
  <div>
    <g-time-picker-title
        :hour="hour"
        :minute="minute"
        :hour-convention="convention"
        :period="period"
        :selecting="selecting"
    />
  </div>
</template>

<script>
  import { Period, HourConvention, SelectingTime } from '../components/GTimePicker/Title/GTimePickerTitleUtil';
  import GTimePickerTitle from '../components/GTimePicker/Title/GTimePickerTitle';

  export default {
    name: 'GTimePickerDemo',
    components: { GTimePickerTitle },
    data () {
      return {
        hour: 15,
        minute: 50,
        convention: HourConvention._12HRS,
        period: Period.AM,
        selecting: SelectingTime.Minute,
      }
    }
  }
</script>
<style scoped>
</style>
