import { computed } from '@vue/composition-api'
import dayjs from 'dayjs';

const _computedMultipleDateFormatFn = (props, cptIsMultiSelect, cptSingleDateFormatFn) => {
  const INVALID_SELECTION = '--'

  // multiple
  const multipleDateFormatFn = dates => Array.isArray(dates) ? dates.length + ' selected' : INVALID_SELECTION

  // range
  const formatFn = (date) => dayjs(date).format('MMM, DD')
  const dateRangeFormatFn = (dates) => {
    if (Array.isArray(dates)) {
      let start = 'Start'
      let end = 'End'
      if (dates.length >= 1) start = formatFn(dates[0])
      if (dates.length >= 2) end = formatFn(dates[1])
      return props.landscape ? `${start} -<br/>${end}` : `${start} - ${end}`
    } else {
      return INVALID_SELECTION
    }
  }

  // single
  const singleFormatFn = dates => Array.isArray(dates) ? INVALID_SELECTION : cptSingleDateFormatFn.value(dates)

  return computed(() => {
    if (cptIsMultiSelect.value)
      return props.multiple ? multipleDateFormatFn : dateRangeFormatFn
    else
      return singleFormatFn
  })
}

const _computedSingleDateFormatFn = (props) => {
  const titleFormatFn = (date) => {
    let format = 'YYYY'
    if (props.type === 'date') format = 'ddd, MMM DD'
    else if (props.type === 'month') format = 'MMMM'
    return dayjs(date).format(format)
  }
  const landscapeFormatFn = date => titleFormatFn(date).replace(',', ',<br/>')

  return computed(() => props.landscape ? landscapeFormatFn : titleFormatFn)
}

export const _computedDateFormatterFn = (props, cptIsMultiSelect) => {
  const cptSingleDateFormatFn = _computedSingleDateFormatFn(props)
  const cptMultipleDateFormatFn = _computedMultipleDateFormatFn(props, cptIsMultiSelect, cptSingleDateFormatFn)

  return computed(() => props.titleDateFormat || cptIsMultiSelect.value ? cptMultipleDateFormatFn.value : cptSingleDateFormatFn.value)
}

export const computedTitleModel = ({ props, state, cptIsMultiSelect }) => {
  const cptDateFormatFn = _computedDateFormatterFn(props, cptIsMultiSelect)
  const yearFormatFn = (date) => dayjs(date).format('YYYY')

  return computed(() => ({
    date: cptDateFormatFn.value(state.selectedValues),
    year: yearFormatFn(state.viewportDate),
    on: {
      yearClicked: (year) => {
        if (state.activePicker !== 'year') {
          // show year picker, highlight the year in viewportDate
          state.activePicker = 'year'
          state.viewportDate = `${year}`
        }
      }
    }
  }))
}
