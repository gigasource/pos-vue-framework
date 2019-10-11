<template>
  <ul class="g-date-picker-years" ref="years">
    <li v-for="year in yearsData"
        :key="year"
        :class="{ active: parseInt(value, 10) === year }"
        @click="onClick(year)">
      {{ year }}
    </li>
  </ul>
</template>

<script>
  import { createNativeLocaleFormatter } from './util';
  import { computed, onMounted } from '@vue/composition-api';
  import { setTextColor } from '../../mixins/colorable';

  export default {
    name: 'GDatePickerYears',
    props: {
      format: null,
      min: [Number, String],
      max: [Number, String],
      readonly: Boolean,
      value: [Number, String],
    },
    setup(props, context) {
      const formatter = computed(() => {
        if (context.refs.years) props.format || createNativeLocaleFormatter(undefined/*this.currentLocale*/, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
      })

      onMounted(() => {
        context.root.$nextTick(() => {
          const activeItem = context.refs.years.getElementsByClassName('active')[0]
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
      })

      let yearsData = computed(() => {
        const data = []
        const selectedYear = props.value ? parseInt(props.value, 10) : new Date().getFullYear()
        const maxYear = props.max ? parseInt(props.max, 10) : (selectedYear + 100)
        const minYear = Math.min(maxYear, props.min ? parseInt(props.min, 10) : (selectedYear - 100))

        for (let year = maxYear; year >= minYear; year--) {
          data.push(year)
        }
        return data
      })

      // methods
      // function genYearItem(year/*: number*/) {
      //   const formatted = formatter.value(`${year}`)
      //   const active = parseInt(props.value, 10) === year
      //   const color = active && (props.color || 'primary')
      //
      //   return h('li', setTextColor(color, {
      //     key: year,
      //     class: { active },
      //     on: {
      //       click: () => context.emit('input', year),
      //     },
      //   }), formatted)
      // }

      function onClick(year) {
        context.emit('input', year)
      }

      return {
        yearsData,
        formatter,
        onClick
      }
    }
  }
</script>
