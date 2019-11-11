import {addOnceEventListener, keyCodes, passiveSupported} from '../../utils/helpers';
import {isEqual} from 'lodash';


export function getEventHandler(props, context, state, internalValue, minValue, maxValue) {
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
    const {value} = parseMouseMove(e)
    internalValue.value = value
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
  }

  function onSliderClick(e) {
    if (state.noClick) {
      state.noClick = false
      return
    }
    const thumb = context.refs.thumb
    thumb.focus()
    onMouseMove(e)
    context.emit('change', internalValue)
  }

  function onFocus(e) {
    state.isFocused = true
    context.emit('focus', e)
  }

  function onBlur(e) {
    state.isFocused = false
    context.emit('blur', e)
  }

  function onKeyUp() {
    state.keyPressed = 0
  }

  function onKeyDown(e) {
    if (props.disabled || props.readonly) return

    const value = parseKeyDown(e, internalValue.value)
    if (value == null) return

    internalValue.value = value
    context.emit('change', value)
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

  return {onThumbMouseDown, parseMouseMove, onSliderMouseUp, onSliderClick, onFocus, onBlur, onKeyDown, onKeyUp}
}


export function helperFunctions(props, minValue, maxValue) {
  function roundValue(value) {
    if (!props.step) return value
    // Format input value using the same number
    // of decimals places as in the step prop
    const stepNumeric = props.step > 0 ? parseFloat(props.step) : 0
    const trimmedStep = props.step.toString().trim()
    const decimals = trimmedStep.indexOf('.') > -1
        ? (trimmedStep.length - trimmedStep.indexOf('.') - 1)
        : 0
    const offset = minValue.value % stepNumeric

    const newValue = Math.round((value - offset) / stepNumeric) * stepNumeric + offset

    return parseFloat(Math.min(newValue, maxValue.value).toFixed(decimals))
  }

  function setLazyValue() {
    let lazyValue = typeof props.value === 'string' ? parseFloat(props.value) : props.value;

    if (lazyValue > maxValue.value) {
      lazyValue = maxValue.value;
    } else if (lazyValue < minValue.value) {
      lazyValue = minValue.value;
    }
    return lazyValue
  }

  return {roundValue, setLazyValue}
}
