<script>
  import { createNativeLocaleFormatter } from './util';
  import { setTextColor } from '../../mixins/colorable';
  import { computed, createElement as h, reactive, onMounted } from '@vue/composition-api';

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
      // TODO: Export defaultColor
      const state = reactive({ defaultColor: 'primary' })

      const formatter = computed(() => {
        return props.format || createNativeLocaleFormatter(undefined/*this.currentLocale*/, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
      })

      onMounted(() => {
        setTimeout(() => {
          // TODO: Found this.$el location
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

      // methods
      function genYearItem(year/*: number*/) {
        const formatted = formatter.value(`${year}`)
        const active = parseInt(props.value, 10) === year
        const color = active && (props.color || 'primary')

        return h('li', setTextColor(color, {
          key: year,
          class: { active },
          on: {
            click: () => context.emit('input', year),
          },
        }), formatted)
      }

      function genYearItems() {
        const children = []
        const selectedYear = props.value ? parseInt(props.value, 10) : new Date().getFullYear()
        const maxYear = props.max ? parseInt(props.max, 10) : (selectedYear + 100)
        const minYear = Math.min(maxYear, props.min ? parseInt(props.min, 10) : (selectedYear - 100))

        for (let year = maxYear; year >= minYear; year--) {
          children.push(genYearItem(year))
        }

        return children
      }

      // render
      return () => {
        return h('ul', {
          staticClass: 'g-date-picker-years',
          ref: 'years',
        }, genYearItems())
      }
    }
  }
</script>
