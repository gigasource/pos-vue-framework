import { computed } from '@vue/composition-api';

export const getDisplayed = (props) => {
  return {
    displayedMonth: computed(() => {
      return Number(props.tableDate.split('-')[1]) - 1
    }),
    displayedYear: computed(() => {
      return Number(props.tableDate.split('-')[0])
    })
  }
}

export const isSelected = (props, value) => {
  return value === props.value || (Array.isArray(props.value) && props.value.indexOf(value) !== -1)
}

/**
 * Return true if value is equal to props.current
 * @private
 * @exportToTest
 * @param props
 * @param month
 */
export const isCurrent = (props, value) => {
  return value === props.current
}

export function getBtnActiveClass(isSelected){
  return {
    'g-table-item--active': isSelected
  }
}

export function getBtnRoundedClass() {
  return {
    'g-table-item--rounded': true
  }
}

export function getBtnDisabledClass(isAllowed, disabled) {
  return {
    'g-table-item--disabled': !isAllowed || disabled,
  }
}

export function getBtnOutlinedClass(isCurrent, isSelected) {
  return {
    'g-table-item--outlined': isCurrent && !isSelected
  }
}
