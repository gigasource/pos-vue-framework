<template>
  <div class="g-input">
    <div class="g-slider" @click="onSliderClick">
      <input ref="input" :value="internalValue" type="range" :readonly="readonly">
      <div class="g-slider--track-container" ref="track">
        <div class="g-slider--track-background" :style="trackBgrStyle"></div>
        <div class="g-slider--track-fill" :style="trackFillStyle"></div>
      </div>
      <div class="g-slider--thumb-container" ref="thumb"
           :style="thumbContainerStyle"
           @focus="onFocus"
           @blur="onBlur"
           @keyup="onKeyUp"
           @keydown="onKeyDown"
           @mousedown="onThumbMouseDown"
           @touchstart="onThumbMouseDown">
        <div class="g-slider--thumb"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref, computed, reactive, onMounted, onUpdated} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate} from '../GInput/GInputField';
  import {addOnceEventListener, keyCodes, passiveSupported} from '../../utils/helpers';
  import isEqual from 'lodash';

  export default {
    name: "GSlider",
    props: {
      value: {
        type: [String, Number],
        default: 50
      },
      min: {
        type: [String, Number],
        default: 0
      },
      max: {
        type: [String, Number],
        default: 100
      },
      readonly: Boolean,
    },
    setup(props, context) {
      const state = reactive({
        lazyValue: 0,
        keyPressed: 0,
        isFocused: false,
        isActive: false,
        noClick: false,
      })
      const internalValue = getInternalValue(props, context)
      const minValue = computed(() => parseFloat(props.min))
      const maxValue = computed(() => parseFloat(props.max))
      const inputWidth = computed(() => (internalValue.value - minValue.value) / (maxValue.value - minValue.value) * 100)

      const trackBgrStyle = computed(() => {
      })

      const trackFillStyle = computed(() => {
      })

      const thumbContainerStyle = computed(() => {
        return {
          'left': inputWidth.value + '%',
        }
      })

      function onThumbMouseDown(e) {
        //console.log('thumb mouse down')
        //this.oldValue = internalValue.value;
        state.keyPressed = 2
        state.isActive = true

        const mouseUpOptions = passiveSupported ? {passive: true, capture: true} : true
        const mouseMoveOptions = passiveSupported ? {passive: true} : false
        if ('touches' in e) {
          context.root.$el.addEventListener('touchmove', onMouseMove, mouseMoveOptions)
          console.log(context)
          addOnceEventListener(context.root.$el, 'touchend', onSliderMouseUp, mouseUpOptions)
        } else {
          context.root.$el.addEventListener('mousemove', onMouseMove, mouseMoveOptions)
          console.log(context)
          addOnceEventListener(context.root.$el, 'mouseup', onSliderMouseUp, mouseUpOptions)
        }

        context.emit('start', internalValue.value)
      }

      function onMouseMove(e) {
        console.log('mouse move')
        const {value} = parseMouseMove(e)
        internalValue.value = value
      }

      function parseMouseMove(e) {
        console.log('parse mouse move')
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
        //console.log('slider mouse up')
        e.stopPropagation()
        state.keyPressed = 0
        const mouseMoveOptions = passiveSupported ? {passive: true} : false
        context.root.$el.removeEventListener('touchmove', onMouseMove, mouseMoveOptions)
        context.root.$el.removeEventListener('mousemove', onMouseMove, mouseMoveOptions)

        context.emit('end', internalValue.value)
        // if (!isEqual(context.refs.thumb.oldValue, internalValue.value)) {
        //   context.emit('change', internalValue.value)
        //   state.noClick = true
        // }

        state.isActive = false
        if (state.isFocused) {
          state.isFocused = false
        }
      }

      function onSliderClick(e) {
        if (props.noClick) {
          props.noClick = false
          return
        }
        const thumb = context.refs.thumb
        thumb.focus()
        onMouseMove(e)
        context.emit('change', internalValue)
      }

      function onFocus() {

      }

      function onBlur() {

      }

      function onKeyUp() {

      }

      function onKeyDown() {

      }

      //onUpdated(() => console.log(internalValue.value))

      return {
        internalValue,
        trackBgrStyle,
        trackFillStyle,
        thumbContainerStyle,
        //
        onThumbMouseDown,
        onSliderClick,
        onFocus,
        onBlur,
        onKeyUp,
        onKeyDown,
      }
    }
  }
</script>
