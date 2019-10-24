import { computed } from '@vue/composition-api'
import { pad } from './utils';
import { isSelected, isAllowed, applyNewSelectedValue } from './TableUtil'
import dayjs from 'dayjs'

const shortMonthFormatFn = monthValue => dayjs(monthValue).format('MMM')
const monthRows = {
  columns: [null, null, null],
  rowNumbers: 4
}

/**
 *
 * @param props
 * @param state
 * @returns {Ref<any>}
 */
export const _computedMonthRows = (props, state) => {
  const cptMonthFormatFunc = computed(() => props.monthFormat || shortMonthFormatFn)
  const cptDisplayedYear = computed(() => parseInt(dayjs(state.viewportDate).format('YYYY')))
  const { columns, rowNumbers } = monthRows

  return computed(() => {
    const monthData = []
    const current = dayjs().format('YYYY-MM')
    for (let rowIndex = 0; rowIndex < rowNumbers; rowIndex++) {
      const monthRow = columns.map((_, col) => {
        const month = rowIndex * columns.length + col
        const monthValue = `${cptDisplayedYear.value}-${pad(month + 1)}`
        return {
          key: month,
          value: monthValue,
          formattedValue: cptMonthFormatFunc.value(monthValue),
          isAllowed: isAllowed(props, monthValue),
          isSelected: isSelected(props, state, monthValue),
          isCurrent: props.showCurrent && monthValue === current,
        }
      })
      monthData.push(monthRow)
    }
    return monthData
  })
}


export const computedMonthTableModel = ({ props, context, state, cptIsMultiSelect }) => {
  const cptMonthRows = _computedMonthRows(props, state)

  return computed(() => ({
    monthRows: cptMonthRows.value,
    on: {
      monthClicked: (monthItem) => {
        if (props.type === 'date') {
          // If this month is selectable, show datepicker with date data gathered from selected month
          if (monthItem.isAllowed) {
            state.activePicker = 'date'
            state.viewportDate = monthItem.value
          }
        } else if (props.type === 'month') {
          if (monthItem.isAllowed && !props.readonly) {
            applyNewSelectedValue(props, state, monthItem.value)
            // if props is month, then emit selected value
            context.emit('input', cptIsMultiSelect.value ? state.selectedValues.map(val => val) : state.selectedValues)
            context.emit('click:month', monthItem.value)
          }
        }
      },
      monthDoubleClicked: (monthItem) => {
        if (monthItem.isAllowed && !props.readonly) {
          context.emit('dblclick:month', monthItem.value)
        }
      }
    }
  }))
}
