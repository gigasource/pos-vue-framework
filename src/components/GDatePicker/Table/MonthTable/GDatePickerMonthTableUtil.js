import { computed } from '@vue/composition-api'
import { setBackgroundColor, setTextColor } from '../../../../mixins/colorable'
import { createNativeLocaleFormatter, pad } from '../../utils';
import dateFilter from '../../dateFilter'
import GDatePickerTable from '../date-picker-table'

export const EVENT_NAMES = {
  INPUT: 'input',
  UPDATE_TABLE_DATE: 'update:table-date',
  MONTH_CLICKED: 'click:month',
  MONTH_DB_CLICKED: 'dblclick:month'
}

export const getMonthTableEvents = (props, context) => {
  function calculateTableDate(delta) {
    return `${parseInt(props.tableDate, 10) + Math.sign(delta || 1)}`
  }

  return {
    onWheel: (e) => {
      if (!props.disabled && props.scrollable) {
        e.preventDefault()
        context.emit(EVENT_NAMES.UPDATE_TABLE_DATE, calculateTableDate(e.deltaY < 0 ? -1 : 1))
      }
    }
  }
}

export const getMonths = (props, context) => {
  const { displayedYear, genButtonClasses } = GDatePickerTable(props, context)
  const isDateAvailable = dateFilter(props)

  // month
  const monthFormatter = computed(() => {
    return props.format || createNativeLocaleFormatter(undefined, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })
  })

  return computed(() => {
    const monthData = []
    const colNumbers = Array(3).fill(null)
    const rowNumbers = 12 / colNumbers.length
    for (let rowIndex = 0; rowIndex < rowNumbers; rowIndex++) {
      const row = colNumbers.map((_, col) => {
        const month = rowIndex * colNumbers.length + col + 1
        const date = `${displayedYear.value}-${pad(month)}`

        const monthData = {
          key: month,
          isAllowed: isDateAvailable(date),
          isSelected: date === props.value || (Array.isArray(props.value) && props.value.indexOf(date) !== -1),
          isCurrent: date === props.current,
        }
        monthData.class = genButtonClasses(monthData.isAllowed, false, monthData.isSelected, monthData.isCurrent)
        monthData.content = monthFormatter.value(date)
        monthData.eventHandlers = props.disabled ? undefined : {
          click: () => {
            if (monthData.isAllowed && !props.readonly)
              context.emit(EVENT_NAMES.INPUT, date)

            context.emit(EVENT_NAMES.MONTH_CLICKED, date)
          },
          dblclick: () => context.emit(EVENT_NAMES.MONTH_DB_CLICKED, date),
        }

        let setColor = monthData.isSelected ? setBackgroundColor : setTextColor
        let color = (monthData.isSelected || monthData.isCurrent) && (props.color || '')

        setColor(color, monthData)
        return monthData
      })

      monthData.push(row)
    }

    return monthData
  })
}
