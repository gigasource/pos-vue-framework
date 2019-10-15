<template>
  <ul class="g-date-picker-years" ref="years">
    <li v-for="year in yearsData"
        :key="year"
        :class="{ active: parseInt(value) === year }"
        @click="yearClicked(year)">
      {{ year }}
    </li>
  </ul>
</template>

<script>
  import { onMounted } from '@vue/composition-api';
  import { getYearOnClickEventHandler, getYearRange } from './GDatePickerYearsUtil';
  const ACTIVE_YEAR_CLASS_NAME = 'active'
  export default {
    name: 'GDatePickerYears',
    props: {
      // lowest year
      min: [Number, String],
      // biggest year
      max: [Number, String],
      // selected year
      value: [Number, String],
      // boolean value indicate whether the components is readonly or not
      readonly: Boolean
    },
    setup(props, context) {
      onMounted(() => {
        // show active item in the middle (vertical)
        const activeItem = context.refs.years.getElementsByClassName(ACTIVE_YEAR_CLASS_NAME)[0]
        if (activeItem) {
          context.refs.years.scrollTop = activeItem.offsetTop - context.refs.years.offsetHeight / 2 + activeItem.offsetHeight / 2
        } else if (props.min && !props.max) {
          context.refs.years.scrollTop = context.refs.years.scrollHeight
        } else if (!props.min && props.max) {
          context.refs.years.scrollTop = 0
        } else {
          context.refs.years.scrollTop = context.refs.years.scrollHeight / 2 - context.refs.years.offsetHeight / 2
        }
      })

      const yearsData = getYearRange(props)
      const yearClicked = getYearOnClickEventHandler(context)

      return {
        yearsData,
        yearClicked
      }
    }
  }
</script>
<style scoped>
</style>
