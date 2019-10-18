import { computed } from '@vue/composition-api'
import { setBackgroundColor, setTextColor } from '../../../../mixins/colorable'
import { createNativeLocaleFormatter, pad } from '../../utils';
import {
  getDisplayed,
  getBtnActiveClass,
  getBtnDisabledClass,
  getBtnOutlinedClass,
  isSelected, isCurrent
} from '../date-picker-table'
import dateFilter from '../../dateFilter'

export const EVENT_NAMES = {
  INPUT: 'input',
  UPDATE_TABLE_DATE: 'update:table-date',
  MONTH_CLICKED: 'click:month',
  MONTH_DB_CLICKED: 'dblclick:month'
}

/**
 *
 * @private
 * @exportToTest
 * @param props
 * @param delta
 * @returns {string}
 */
export const _calculateTableDate = (props, delta) => `${parseInt(props.tableDate || '1', 10) + Math.sign(delta || 1)}`

/**
 *
 * @exportToTest
 * @param props
 * @param context
 * @returns {{onWheel: onWheel}}
 */
export const getMonthTableEvents = (props, context) => {
  return {
    onWheel: (e) => {
      if (!props.disabled && props.scrollable) {
        e.preventDefault()
        context.emit(EVENT_NAMES.UPDATE_TABLE_DATE, _calculateTableDate(props, e.deltaY))
      }
    }
  }
}

/**
 * Get month formatter
 * Month formatter is a (monthValue: string|number) => string
 * @private
 * @exportToTest
 * @param props
 * @returns {Ref<any>}
 */
export const _getMonthFormatter = (props) => computed(() => {
  // TODO: Consider validate props.format is (string) => string
  // TODO: Refactor somehow to track createNativeLocaleFormatter function call
  return props.format || createNativeLocaleFormatter(undefined, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
})



/**
 * Return click event handler object
 * @private
 * @exportToTest
 * @param monthDataItem
 * @param props
 * @param context
 * @param month
 * @returns {{click: click}}
 */
export const _getClickEventHandler = (monthDataItem, props, context, month) => {
  return {
    click: () => {
      if (monthDataItem.isAllowed && !props.readonly)
        context.emit(EVENT_NAMES.INPUT, month)
      context.emit(EVENT_NAMES.MONTH_CLICKED, month)
    }
  }
}

/**
 *
 * Return double click event handler object
 * @private
 * @exportToTest
 * @param context
 * @param month
 * @returns {function(): *}
 */
export const _getDbClickEventHandler = (context, month) => {
  return {
    dblclick: () => context.emit(EVENT_NAMES.MONTH_DB_CLICKED, month)
  }
}

/**
 * Return month color of specified month item
 * @param monthDataItem
 * @returns {string}
 * @private
 */
export const _getMonthItemColor = (monthDataItem, props) => {
  let color = ''
  if (props.color && (monthDataItem.isSelected || monthDataItem.isCurrent))
    color = props.color
  return color
}

/**
 * Get month items
 * @param props
 * @param context
 * @returns {Ref<any>}
 */
export const getMonths = (props, context) => {
  const { columns, rowNumbers } = {
    columns: [null, null, null],
    rowNumbers: 4
  }
  const { displayedYear } = getDisplayed(props)
  const isDateAvailable = dateFilter(props)
  const monthFormatter = _getMonthFormatter(props)

  return computed(() => {
    const monthData = []
    for (let rowIndex = 0; rowIndex < rowNumbers; rowIndex++) {
      const monthRow = columns.map((_, col) => {
        const month = rowIndex * columns.length + col
        const monthValue = `${displayedYear.value}-${pad(month + 1)}`
        const monthDataItem = {
          key: month,
          value: monthValue,
          isAllowed: isDateAvailable(monthValue),
          isSelected: isSelected(props, monthValue),
          isCurrent: isCurrent(props, monthValue),
        }
        monthDataItem.class = {
          ...getBtnActiveClass(monthDataItem.isSelected),
          ...getBtnOutlinedClass(monthDataItem.isCurrent),
          ...getBtnDisabledClass(monthDataItem.isAllowed, props.disabled)
        }
        monthDataItem.formattedValue = monthFormatter.value(monthValue)

        let setColor = monthDataItem.isSelected ? setBackgroundColor : setTextColor
        let color = _getMonthItemColor(monthDataItem, props)

        setColor(color, monthDataItem)
        return monthDataItem
      })

      monthData.push(monthRow)
    }

    return monthData
  })
}
