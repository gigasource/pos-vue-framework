<template>
  <ul class="g-date-picker-years" ref="years">
    <li v-for="year in yearsData"
        :key="year"
        :class="{ active: parseInt(value) === year }"
        @click="onYearClicked(year)">
      {{ year }}
    </li>
  </ul>
</template>

<script>
  import { computed, onMounted } from '@vue/composition-api';

  const ACTIVE_YEAR_CLASS_NAME = 'active'

  export const EVENT_NAMES = { INPUT: 'input' }

  /**
   * generate year data from
   * @param value
   * @param min
   * @param max
   * @returns {Array}
   */
  export function generateYearData(value, min, max) {
    const YEAR_OFFSET = 100
    const maxYear = max ? parseInt(max) : (value + YEAR_OFFSET)
    const minYear = Math.min(maxYear, min ? parseInt(min) : (value - YEAR_OFFSET))

    const years = []
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year)
    }
    return years
  }

  export default {
    name: 'GDatePickerYears',
    props: {
      min: [Number, String],    // lowest year
      max: [Number, String],    // biggest year
      value: [Number, String],  // selected year
      readonly: Boolean,        // boolean value indicate whether the components is readonly or not
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

      const yearsData = computed(() => generateYearData(props.value ? parseInt(props.value) : new Date().getFullYear(), props.min, props.max))
      const onYearClicked = (year) => context.emit(EVENT_NAMES.INPUT, year)

      return {
        yearsData,
        onYearClicked
      }
    }
  }
</script>
