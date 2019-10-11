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

  function genButtonEvents(value, isAllowed, mouseEventType) {
    if (props.disabled)
      return undefined

    return {
      click: () => {
        isAllowed && !props.readonly && context.emit('input', value)
        context.emit(`click:${mouseEventType}`, value)
      },
      dblclick: () => context.emit(`dblclick:${mouseEventType}`, value),
    }
  }

  return {
    genButtonClasses,
    genButtonEvents,

    displayedMonth,
    displayedYear,
  }
}
