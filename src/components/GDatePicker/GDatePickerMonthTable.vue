<script>
  import { pad, createNativeLocaleFormatter } from './util'
  import { computed, createElement as h, reactive, watch } from '@vue/composition-api';
  import GDatePickerTable from './mixins/date-picker-table'

  export default {
    name: 'GDatePickerMonthTable',
    props: {
      // GDatePickerTable's props
      allowedDates: null,
      current: String,
      disabled: Boolean,
      format:null,
      events: {
        type: [Array, Function, Object],
        default: () => null,
      },
      eventColor: {
        type: [Array, Function, Object, String],
        default: () => 'warning',
      },
      min: String,
      max: String,
      readonly: Boolean,
      scrollable: Boolean,
      tableDate: {
        type: String,
        required: true,
      },
      value: [String, Array],
      // GDatePickerMonthTable's props
    },
    setup(props, context) {
      // mixins
      const { genTable, genButton, displayedYear } = GDatePickerTable(props, context)

      // computed
      const formatter = computed(() => {
        return props.format || createNativeLocaleFormatter(undefined /*this.currentLocale*/, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
      })

      // methods
      function calculateTableDate(delta/*: number*/) {
        return `${parseInt(props.tableDate, 10) + Math.sign(delta || 1)}`
      }

      function genTBody() {
        const children = []
        const cols = Array(3).fill(null)
        const rows = 12 / cols.length

        for (let row = 0; row < rows; row++) {
          const tds = cols.map((_, col) => {
            const month = row * cols.length + col
            const date = `${displayedYear.value}-${pad(month + 1)}`
            return h('td', {
              key: month,
            }, [
              genButton(date, false, 'month', formatter.value),
            ])
          })

          children.push(h('tr', {
            key: row,
          }, tds))
        }

        return h('tbody', children)
      }

      return () => {
        return genTable('g-date-picker-table g-date-picker-table--month', [
          genTBody(),
        ], calculateTableDate)
      }
    }
  }
</script>
<style scoped>
</style>
