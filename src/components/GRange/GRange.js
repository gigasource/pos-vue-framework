import {addOnceEventListener, keyCodes, passiveSupported} from '../../utils/helpers';

export function getEventHandlerRange(props, context, state, internalValue, parseMouseMove, onSliderMouseUp) {
  function onThumbMouseDown(e) {
    state.oldValue = internalValue.value;
    state.keyPressed = 2
    state.isActive = true

    const mouseUpOptions = passiveSupported ? {passive: true, capture: true} : true
    const mouseMoveOptions = passiveSupported ? {passive: true} : false
    if ('touches' in e) {
      context.root.$el.addEventListener('touchmove', onMouseMove, mouseMoveOptions)
      addOnceEventListener(context.root.$el, 'touchend', onSliderMouseUp, mouseUpOptions)
    } else {
      context.root.$el.addEventListener('mousemove', onMouseMove, mouseMoveOptions)
      addOnceEventListener(context.root.$el, 'mouseup', onSliderMouseUp, mouseUpOptions)
    }

    context.emit('start', internalValue.value)
  }

  function onMouseMove(e) {
    const {value, isInsideTrack} = parseMouseMove(e)

    if (isInsideTrack && state.activeThumb === null) {
      state.activeThumb = getIndexOfClosestValue(internalValue.value, value)
    }

    setInternalValue(value)
  }

  function onSliderClick(e) {
    if (!state.isActive) {
      if (state.noClick) {
        state.noClick = false
        return
      }

      const {value, isInsideTrack} = parseMouseMove(e)

      if (isInsideTrack) {
        state.activeThumb = getIndexOfClosestValue(internalValue.value, value)
        const refName = `thumb_${state.activeThumb}`
        const thumbRef = context.refs[refName]
        thumbRef.focus()
      }

      setInternalValue(value)

      context.emit('change', internalValue.value)
    }
  }

  function onKeyDown(e) {
    if (state.activeThumb === null) return

    const value = parseKeyDown(e, internalValue[state.activeThumb])

    if (value == null) return

    setInternalValue(value)
    context.emit('change', internalValue.value)
  }

  function setInternalValue(value) {
    internalValue.value = internalValue.value.map((v, i) => {
      if (i === state.activeThumb) return value
      else return Number(v)
    })
  }

  return {onThumbMouseDown, onMouseMove, onSliderClick}
}

function getIndexOfClosestValue(arr, v) {
  if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v)) return 0
  else return 1
}