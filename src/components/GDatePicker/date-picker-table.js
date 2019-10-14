import { computed } from '@vue/composition-api';

export default (props, context) => {
  const displayedMonth = computed(() => {
    return Number(props.tableDate.split('-')[1]) - 1
  })
  const displayedYear = computed(() => {
    return Number(props.tableDate.split('-')[0])
  })

  function genButtonClasses(isAllowed, isFloating, isSelected, isCurrent) {
    return {
      'g-size--default': !isFloating,
      'g-btn--active': isSelected,
      'g-btn--flat': !isAllowed || props.disabled,
      'g-btn--text': isSelected === isCurrent,
      'g-btn--rounded': isFloating,
      'g-btn--disabled': !isAllowed || props.disabled,
      'g-btn--outlined': isCurrent && !isSelected,
    }
  }

  return {
    genButtonClasses,
    displayedMonth,
    displayedYear,
  }
}
