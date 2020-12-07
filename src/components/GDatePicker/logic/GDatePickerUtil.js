import { computed, reactive, watch } from 'vue'
import { computedTitleModel } from './TitleUtil'
import { computedHeaderModel } from './HeaderUtil'
import { computedYearModel } from './YearsUtil'
import { computedDateTableModel, emitEvents as dateTableEvents } from './DateTableUtil'
import { computedMonthTableModel, emitEvents as monthTableEvents} from './MonthTableUtil'
import dayjs from 'dayjs';
import _ from 'lodash'

export const emitEvents = _.union(dateTableEvents, monthTableEvents)

/**
 * Validate if input value is correct or not
 * If user pass invalid input value, then show a warning about it
 * @param initialValue
 * @param cptIsMultiSelect
 */
function validateInitialValue(initialValue, cptIsMultiSelect) {
  if (initialValue == null) {
    return
  }
  const valueType = initialValue.constructor.name
  const expected = cptIsMultiSelect.value ? 'Array' : 'String'
  if (valueType !== expected) {
    console.warn(`Value must be ${cptIsMultiSelect.value ? 'an' : 'a'} ${expected}, got ${valueType}`)
  }
}

function getValidInitialValue(props, cptIsMultiSelect) {
  const now = new Date()
  const defaultValue = (props.type === 'date'
      ? `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
      : `${now.getFullYear()}-${now.getMonth() + 1}`)
  return (cptIsMultiSelect.value
      ? (props.modelValue || []).map(value => value)
      : (props.modelValue || defaultValue))
}

/**
 *
 * @param props
 * @param context
 * @returns {{header: Ref<any>, year: Ref<any>, months: Ref<any>, state: UnwrapRef<{selectedMonth: undefined, activePicker: *, selectedYear: undefined, selectedDay: undefined, tableDate}>, title: Ref<any>, dates: Ref<any>}}
 */
export default (props, context) => {
  const cptIsMultiSelect = computed(() => props.multiple || props.range)
  validateInitialValue(props.modelValue, cptIsMultiSelect)

  const state = reactive({
    // string value indicate what viewport should be shown
    // 'year': year picker
    // 'month': month picker
    // 'date': date picker
    activePicker: props.type,

    // value used to activate navigation
    // values:
    //   YYYY: when show year picker, YYYY value will be used to highlight current year
    //   YYYY: when show month picker, with YYYY is the year of month picker
    //   YYYY-MM: show date picker, with YYYY-MM is the month of date picker
    viewportDate: dayjs().format(props.type === 'date' ? 'YYYY-MM-DD': 'YYYY-MM'),

    // store selected value(s)
    // string if single mode is used
    // array with multiple items if multiple mode is selected
    // array with 1 or 2 items if range mode is selected
    selectedValues: getValidInitialValue(props, cptIsMultiSelect),
  })

  watch(() => props.modelValue, newVal => {
    // Update selectedValues state on external change of props.modelValue
    // compare newVal and state.selectedValues to reduce un-necessary update:
    // user change date -> state.selectedValues change (1) -> emit input -> props.modelValue change -> watch props.modelValue -> update state.selectedValues (2)
    if (newVal != state.selectedValues)
      state.selectedValues = getValidInitialValue(props, cptIsMultiSelect)

    // update viewport
    state.viewportDate = (cptIsMultiSelect.value
        ? props.modelValue.length === 0
          ? dayjs().format(props.type === 'date' ? 'YYYY-MM-DD': 'YYYY-MM')
          : props.focusOnFirstItem
            ? props.modelValue[0]
            : props.modelValue[props.modelValue.length - 1]
        : getValidInitialValue(props, cptIsMultiSelect)
    )
  }, { immediate: true})

  // cause we don't support year picker atm so, context will not be used
  // year and header doesn't depend on props.multiple or props.range so cptIsMultiSelect will not be used
  return {
    titleModel: computedTitleModel({ props, state, cptIsMultiSelect }),
    yearModel: computedYearModel({ props, state }),
    headerModel: computedHeaderModel({ props, state }),
    dateTableModel: computedDateTableModel({ props, state, context, cptIsMultiSelect }),
    monthTableModel: computedMonthTableModel({ props, state, context, cptIsMultiSelect }),
    state
  }
}
