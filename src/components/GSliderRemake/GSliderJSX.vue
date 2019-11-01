<script>
  import {ref, computed, reactive, onMounted, onUpdated} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate} from '../GInput/GInputField';
  import {addOnceEventListener, keyCodes, passiveSupported} from '../../utils/helpers';
  import isEqual from 'lodash';

  export default {
    name: "GSliderJSX",
    props: {
      value: {
        type: [String, Number],
        default: 50,
      },
      min: {
        type: [String, Number],
        default: 0,
      },
      max: {
        type: [String, Number],
        default: 100,
      },
      readonly: Boolean,
      vertical: Boolean,
    },

    setup(props, context) {
      const minValue = computed(() => parseFloat(props.min))
      const maxValue = computed(() => parseFloat(props.max))
      const state = reactive({
        lazyValue: setLazyValue(),
        oldValue: 0,
        keyPressed: 0,
        isFocused: false,
        isActive: false,
        noClick: false,
      })

      function setLazyValue() {
        let lazyValue = typeof props.value === 'string' ? parseFloat(props.value) : props.value;

        if (lazyValue > maxValue.value) {
          lazyValue = maxValue.value;
        } else if (lazyValue < minValue.value) {
          lazyValue = minValue.value;
        }
        return lazyValue
      }

      const internalValue = computed({
        get() {
          if (state.lazyValue)
            return state.lazyValue;
        },
        set(value) {
          value = isNaN(value) ? minValue.value : value;
          if (value === state.lazyValue) return;
          state.lazyValue = value;
          context.emit('input', value);
        }
      })

      const inputWidth = computed(() => (internalValue.value - minValue.value) / (maxValue.value - minValue.value) * 100)

      const trackBgrStyle = computed(() => {
        const startDir = props.vertical ? 'top' : 'right';
        const endDir = props.vertical ? 'height' : 'width';
        const bg = 'background-color';

        const start = '0';
        const end = props.disabled ? `calc(${100 - inputWidth.value}% - 0.5rem)` : `calc(${100 - inputWidth.value}%)`;
        const color = props.disabled ? props.trackFillColor : props.trackColor;
        return {
          [startDir]: start,
          [endDir]: end,
          [bg]: color,
        }
      })

      const trackFillStyle = computed(() => {
        const startDir = props.vertical ? 'bottom' : 'left';
        const endDir = props.vertical ? 'top' : 'right';
        const valueDir = props.vertical ? 'height' : 'width';
        const bg = 'background-color';

        const start = '0';
        const end = 'auto';
        const value = props.disabled ? `calc(${props.inputWidth}% - 0.5rem)` : `${props.inputWidth}%`;
        const color = props.trackFillColor;

        return {
          [startDir]: start,
          [endDir]: end,
          [valueDir]: value,
          [bg]: color,
        }
      })

      const thumbContainerStyle = computed(() => {
        const direction = props.vertical ? 'top' : 'left';
        let value = inputWidth.value;
        value = props.vertical ? 100 - value : value;

        return {
          [direction]: `${value}%`,
        }
      })

      const thumbStyle = computed(() => {
        return {'background-color': props.thumbColor}
      })

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
        console.log('end')
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
        if (props.noClick) {
          props.noClick = false
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
        state.isFocused = false;
        context.emit('blur', e);
      }

      function onKeyUp() {
        state.keyPressed = 0;
      }

      function onKeyDown(e) {
        if (props.disabled || props.readonly) return;

        const value = parseKeyDown(e, props.internalValue);

        if (value == null) return;

        internalValue.value = value;
        context.emit('change', value);
      }

      function parseKeyDown(e, value) {
        if (props.disabled) return;

        const {pageup, pagedown, end, home, left, right, down, up} = keyCodes;

        if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return;

        e.preventDefault();
        const step = 1;
        const steps = (maxValue.value - minValue.value) / step;
        if ([left, right, down, up].includes(e.keyCode)) {
          state.keyPressed += 1;

          const increase = [right, up];
          const direction = increase.includes(e.keyCode) ? 1 : -1;
          const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1);

          value = value + (direction * step * multiplier);
        } else if (e.keyCode === home) {
          value = minValue.value;
        } else if (e.keyCode === end) {
          value = maxValue.value;
        } else {
          const direction = e.keyCode === pagedown ? 1 : -1;
          value = value - (direction * step * (steps > 100 ? steps / 10 : 10));
        }

        return value;
      }

      function genSlider() {
        return <div class="g-input">
          <div class="g-slider" vOn:click={() => onSliderClick(event)}>
            <input ref="input" type="range" value={internalValue.value} readonly={props.readonly}></input>
            <div class="g-slider--track-container" ref="track">
              <div class="g-slider--track-background" style={trackBgrStyle.value}></div>
              <div class="g-slider--track-fill" style={trackFillStyle.value}></div>
            </div>
            <div class="g-slider--thumb-container" ref="thumb"
                 style={thumbContainerStyle.value}
                 vOn:focus={() => onFocus(event)}
                 vOn:blur={() => onBlur(event)}
                 vOn:keyup={() => onKeyUp(event)}
                 vOn:keydown={() => onKeyDown(event)}
                 vOn:mousedown={() => onThumbMouseDown(event)}
                 vOn:touchstart={() => onThumbMouseDown(event)}>
              <div class="g-slider--thumb" style={thumbStyle.value}></div>
            </div>
          </div>
        </div>
      }

      return {
        genSlider
      }
    },

    render() {
      return this.genSlider()
    }
  }
</script>

<style scoped>
</style>
