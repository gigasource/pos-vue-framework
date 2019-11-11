<script>
  import {computed, reactive, watch, onBeforeMount, onMounted, onUpdated} from '@vue/composition-api';
  import {getEventHandler, helperFunctions} from "./GSlider";
  import {convertToUnit} from "../../utils/helpers";

  export default {
    name: "GSliderJSX",
    props: {
      value: [Number, String],
      min: {
        type: [Number, String],
        default: 0,
      },
      max: {
        type: [Number, String],
        default: 100,
      },
      vertical: Boolean,
      readonly: Boolean,
      disabled: Boolean,
      inverseLabel: Boolean,
      //step
      step: {
        type: [Number, String],
        default: 1,
      },
      ticks: {
        type: [Boolean, String],
        default: false,
        validator: v => typeof v === 'boolean' || v === 'always',
      },
      tickSize: {
        type: [Number, String],
        default: 2,
      },
      tickLabels: {
        type: Array,
        default: () => ([]),
      },
      //track
      trackFillColor: String,
      trackBgrColor: String,
      //thumb
      thumbColor: String,
      thumbSize: {
        type: [Number, String],
        default: 32,
      },
      thumbLabel: {
        type: [Boolean, String],
        default: null,
        validator: v => typeof v === 'boolean' || v === 'always',
      },
    },

    setup(props, context) {
      const minValue = computed(() => parseFloat(props.min))
      const maxValue = computed(() => parseFloat(props.max))
      const step = computed(() => props.step > 0 ? parseFloat(props.step) : 0)
      const {roundValue, setLazyValue} = helperFunctions(props, minValue, maxValue)

      const state = reactive({
        app: null,
        lazyValue: setLazyValue(),
        oldValue: 0,
        keyPressed: 0,
        isFocused: false,
        isActive: false,
        noClick: false,
      })
      //todo add transition later
      const trackTransition = computed(() => state.keyPressed >= 2 ? 'none' : '')
      const internalValue = computed({
        get() {
          return state.lazyValue;
        },
        set(val) {
          val = isNaN(val) ? minValue.value : val;
          const value = roundValue(Math.min(Math.max(val, minValue.value), maxValue.value))
          if (value === state.lazyValue) return;
          state.lazyValue = value;
          context.emit('input', value);
        }
      })
      watch(() => minValue.value, () => {
        minValue.value > internalValue.value && context.emit('input', minValue.value)
      })
      watch(() => maxValue.value, () => {
        maxValue.value < internalValue.value && context.emit('input', maxValue.value)
      })
      watch(() => props.value, (val) => internalValue.value = val)

      const inputWidth = computed(() => (roundValue(internalValue.value) - minValue.value) / (maxValue.value - minValue.value) * 100
      )
      const {onThumbMouseDown, onSliderClick, onFocus, onBlur, onKeyDown, onKeyUp} = getEventHandler(props, context, state, internalValue, minValue, maxValue)

      //function genInput
      function genInput() {
        return <input ref="input" type="range" value={internalValue.value} tabIndex="-1" readOnly disabled={props.disabled}/>
      }

      //function genTrack
      const trackBgrStyle = computed(() => {
        const startDir = props.vertical ? 'top' : 'right'
        const endDir = props.vertical ? 'height' : 'width'
        const bg = 'background-color'

        const start = '0'
        const end = props.disabled ? `calc(${100 - inputWidth.value}% - 0.5rem)` : `calc(${100 - inputWidth.value}%)`
        const color = props.disabled ? props.trackFillColor : props.trackBgrColor
        return {
          [startDir]: start,
          [endDir]: end,
          [bg]: color,
          transition: trackTransition.value,
        }
      })
      const trackFillStyle = computed(() => {
        const startDir = props.vertical ? 'bottom' : 'left'
        const endDir = props.vertical ? 'top' : 'right'
        const valueDir = props.vertical ? 'height' : 'width'
        const bg = 'background-color'

        const start = '0'
        const end = 'auto'
        const value = props.disabled ? `calc(${inputWidth.value}% - 0.5rem)` : `${inputWidth.value}%`
        const color = props.trackFillColor

        return {
          [startDir]: start,
          [endDir]: end,
          [valueDir]: value,
          [bg]: color,
          transition: trackTransition.value,
        }
      })

      function genTrack() {
        return <div class="g-slider--track-container" ref="track">
          <div class="g-slider--track-background" style={trackBgrStyle.value}/>
          <div class="g-slider--track-fill" style={trackFillStyle.value}/>
        </div>
      }

      //function genThumbContainer
      const thumbStyle = computed(() => {
        return {'background-color': props.thumbColor}
      })

      function genThumb() {
        return <div class="g-slider--thumb" style={thumbStyle.value}/>
      }

      const showThumbLabel = computed(() => !props.disabled && !!(props.thumbLabel))

      function genThumbLabelContent(value) {
        return context.slots['thumb-label'] ?
            context.slots['thumb-label']({value}) :
            <span>{[String(value)]}</span>
      }

      function genThumbLabel(content) {
        const size = convertToUnit(props.thumbSize)
        const transform = props.vertical
            ? `translateY(20%) translateY(${(Number(props.thumbSize) / 3) - 1}px) translateX(55%) rotate(135deg)`
            : `translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg)`
        const style = {
          backgroundColor: props.thumbColor || '#cccc',
          height: size,
          width: size,
          transform
        }
        const show = state.isFocused || state.isActive || props.thumbLabel === 'always' ? '' : 'none'

        return <div class="g-slider--thumb-label-container"
                    style={{'display': show}}>
          <div class="g-slider--thumb-label" style={style}>
            <div>{content}</div>
          </div>
        </div>
      }

      const thumbContainerClasses = computed(() => {
        return {
          'g-slider--thumb-container': true,
          'g-slider--thumb-container__active': state.isActive,
          'g-slider--thumb-container__focused': state.isFocused,
          'g-slider--thumb-container__show-label': showThumbLabel.value,
        }
      })
      const thumbContainerStyle = computed(() => {
        const direction = props.vertical ? 'top' : 'left';
        let value = inputWidth.value;
        value = props.vertical ? 100 - value : value;

        return {
          [direction]: `${value}%`,
          transition: trackTransition.value,
        }
      })

      function genThumbContainer() {
        const content = genThumbLabelContent(internalValue.value)
        return <div class={thumbContainerClasses.value} ref="thumb"
                    style={thumbContainerStyle.value}
                    tabIndex={props.disabled || props.readonly ? -1 : context.attrs.tabindex ? context.attrs.tabindex : 0}
                    vOn:focus={onFocus}
                    vOn:blur={onBlur}
                    vOn:keyup={onKeyUp}
                    vOn:keydown={onKeyDown}
                    vOn:mousedown={onThumbMouseDown}
                    vOn:touchstart={onThumbMouseDown}>
          {genThumb()}
          {showThumbLabel.value && genThumbLabel(content)}
        </div>
      }

      //function genStep
      const showTicks = computed(() => props.tickLabels.length > 0 || !!(!props.disabled && step.value && props.ticks))
      const numTicks = computed(() => Math.ceil((maxValue.value - minValue.value) / step.value))

      function genSteps() {
        if (!props.step || !showTicks.value) return null

        const tickSize = parseFloat(props.tickSize)
        const range = createRange(numTicks.value + 1)

        function createRange(length) {
          return Array.from({length}, (v, k) => k)
        }

        const direction = props.vertical ? 'bottom' : 'left'
        const offsetDirection = props.vertical ? 'right' : 'top'

        if (props.vertical) range.reverse()

        function genTicks() {
          return range.map(i => {
            const index = i

            const width = i * (100 / numTicks.value)
            const filled = width < inputWidth.value
            const tickStyle = {
              width: `${tickSize}px`,
              height: `${tickSize}px`,
              [direction]: `calc(${width}% - ${tickSize / 2}px)`,
              [offsetDirection]: `calc(50% - ${tickSize / 2}px)`,
            }

            return <span class={["g-slider--tick", {'g-slider--tick__filled': filled}]} style={tickStyle}>
             {props.tickLabels[index] && (<div class="g-slider--tick-label">
               {props.tickLabels[index]}
             </div>)}
          </span>
          })
        }

        return <div
            class={['g-slider--ticks-container', {'g-slider--ticks-container__always-show': props.ticks === 'always' || props.tickLabels.length > 0}]}>
          {genTicks()}
        </div>
      }

      // todo add computed color ?

      const sliderClasses = computed(() => {
        return {
          'g-slider': true,
          'g-slider__horizontal': !props.vertical,
          'g-slider__vertical': props.vertical,
          'g-slider__focused': state.isFocused,
          'g-slider__active': state.isActive,
          'g-slider__disabled': props.disabled,
          'g-slider__readonly': props.readonly,
        }
      })

      function genSlider() {
        return <div class="g-input">
          <div class={sliderClasses.value} vOn:click={onSliderClick}>
            {genInput()}
            {genTrack()}
            {genSteps()}
            {genThumbContainer()}
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

<style scoped lang="scss">
  @import "_GSlider.scss";
</style>
