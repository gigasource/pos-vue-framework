export const EVENT_NAMES = {
  UPDATE_SELECTING_YEAR: 'update:selecting-year'
}

export function getYearButtonClickHandler(props, context) {
  return (e) => {
    e.stopPropagation()
    if (props.selectingYear || props.readonly)
      return
    context.emit(EVENT_NAMES.UPDATE_SELECTING_YEAR, true)
  }
}
