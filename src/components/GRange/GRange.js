import {addOnceEventListener, keyCodes, passiveSupported} from '../../utils/helpers';
import {isEqual} from "lodash";

export function getEventHandlerRange(props, context, state, internalValue, minValue, maxValue) {
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

  function parseMouseMove(e) {
    const start = props.vertical ? 'top' : 'left'
    const length = props.vertical ? 'height' : 'width'
    const click = props.vertical ? 'clientY' : 'clientX'

    const {
      [start]: trackStart,
      [length]: trackLength,
    } = context.refs.track.getBoundingClientRect()
    const clickOffset = 'touches' in e ? e.touches[0][click] : e[click]
    let clickPos = Math.min(Math.max((clickOffset - trackStart) / trackLength, 0), 1) || 0
    if (props.vertical) clickPos = 1 - clickPos

    const isInsideTrack = clickOffset >= trackStart && clickOffset <= trackStart + trackLength
    const value = parseFloat(props.min) + clickPos * (maxValue.value - minValue.value)

    return {value, isInsideTrack}
  }

  function onSliderMouseUp(e) {
    e.stopPropagation()
    state.keyPressed = 0
    const mouseMoveOptions = passiveSupported ? {passive: true} : false
    context.root.$el.removeEventListener('touchmove', onMouseMove, mouseMoveOptions)
    context.root.$el.removeEventListener('mousemove', onMouseMove, mouseMoveOptions)

    context.emit('end', internalValue.value)
    if (!isEqual(state.oldValue, internalValue.value)) {
      context.emit('change', internalValue.value)
      state.noClick = true
    }

    state.isActive = false
    if (state.isFocused) {
      state.isFocused = false
    }
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

  function onKeyUp() {
    state.keyPressed = 0
  }

  function onKeyDown(e) {
    if (state.activeThumb === null) return

    console.log(internalValue.value[state.activeThumb])
    const value = parseKeyDown(e, internalValue.value[state.activeThumb])

    if (value == null) return

    setInternalValue(value)
    context.emit('change', internalValue.value)
  }

  function parseKeyDown(e, value) {
    if (props.disabled) return

    const {pageup, pagedown, end, home, left, right, down, up} = keyCodes

    if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return

    e.preventDefault(props)
    const step = props.step ? parseFloat(props.step) : 1
    const steps = (maxValue.value - minValue.value) / step
    if ([left, right, down, up].includes(e.keyCode)) {
      state.keyPressed += 1

      const increase = [right, up]
      const direction = increase.includes(e.keyCode) ? 1 : -1
      const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1)

      value = value + (direction * step * multiplier)
    } else if (e.keyCode === home) {
      value = minValue.value
    } else if (e.keyCode === end) {
      value = maxValue.value
    } else {
      const direction = e.keyCode === pagedown ? 1 : -1
      value = value - (direction * step * (steps > 100 ? steps / 10 : 10))
    }

    return value
  }

  function setInternalValue(value) {
    internalValue.value = internalValue.value.map((v, i) => {
      if (i === state.activeThumb) return value
      else return Number(v)
    })
  }



  return {onThumbMouseDown, parseMouseMove, onSliderMouseUp, onSliderClick, onKeyDown, onKeyUp}
}

function getIndexOfClosestValue(arr, v) {
  if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v)) return 0
  else return 1
}