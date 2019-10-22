import { computed } from '@vue/composition-api'
import { createNativeLocaleFormatter, getCurrentMonthISOFormat, pad } from './utils';
import { isSelected, isAllowed } from './TableUtil'

/**
 * Get month formatter
 * Month formatter is a (monthValue: string|number) => string
 * @private
 * @exportToTest
 * @param props
 * @returns {Ref<any>}
 */
export const _computedMonthFormatFunc = (props) => computed(() => {
  return props.monthFormat || createNativeLocaleFormatter(undefined, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
})

/**
 *
 * @param props
 * @param state
 * @param cptMultiSelect
 * @returns {Ref<any>}
 */
export const computedMonthRows = (props, state) => {
  const { columns, rowNumbers } = {
    columns: [null, null, null],
    rowNumbers: 4
  }
  return computed(() => {
    const displayedYear = parseInt(state.viewportDate.substr(0, 4))
    const cptMonthFormatFunc = _computedMonthFormatFunc(props)
    const monthData = []
    const current = getCurrentMonthISOFormat()
    for (let rowIndex = 0; rowIndex < rowNumbers; rowIndex++) {
      const monthRow = columns.map((_, col) => {
        const month = rowIndex * columns.length + col
        const monthValue = `${displayedYear}-${pad(month + 1)}`
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
