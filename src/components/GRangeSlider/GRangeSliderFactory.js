import {getEventHandler, parseKeyDown, parseMouseMove} from '../GSliderRemake/GSliderFactory';

export function getRangeSliderEventHandler(props, context, state, internalValue, minValue, maxValue) {

  function getIndexOfClosestValue(arr, v) {
    if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v)) return 0
    return 1
  }

  function onMouseMove(e) {
    const {value, isInsideTrack} = parseMouseMove(e, props, context, minValue, maxValue)

    if (isInsideTrack && state.activeThumb === null) {
      state.activeThumb = getIndexOfClosestValue(internalValue.value, value)
    }

    setInternalValue(value)
  }

  function setInternalValue(value) {
    internalValue.value = internalValue.value.map((v, i) => {
      if (i === state.activeThumb) {
        return value
      } else {
        return Number(v)
      }
    })
  }

  function onSliderClick(e) {
    if (!state.isActive) {
      if (state.noClick) {
        state.noClick = false
        return
      }

      const {value, isInsideTrack} = parseMouseMove(e, props, context, minValue, maxValue)

      if (isInsideTrack) {
        state.activeThumb = getIndexOfClosestValue(internalValue.value, value)
        const refName = `thumb_${state.activeThumb}`
        const thumbRef = context.refs[refName]
        thumbRef.focus()
      }

      setInternalValue(value)

    }
  }

  function onKeyDown(e) {
    if (state.activeThumb === null) return

    const value = parseKeyDown(e, internalValue.value[state.activeThumb], props, state, minValue, maxValue)

    if (value == null) return

    setInternalValue(value)
  }

  const {
    onThumbMouseDown, onKeyUp
  } = getEventHandler(props, context, state, internalValue, minValue, maxValue, onMouseMove)

  return {
    onThumbMouseDown, onSliderClick, onKeyDown, onKeyUp
  }

}