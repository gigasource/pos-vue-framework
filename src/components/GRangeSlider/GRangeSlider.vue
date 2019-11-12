<script>
  import {computed, reactive, watch} from '@vue/composition-api';
  import {helperFunctions} from "../GSliderRemake/GSlider";
  import {convertToUnit} from "../../utils/helpers";
  import {getCssColor} from '../../utils/colors';
  import {isEqual} from "lodash";
  import {getEventHandlerRangeSlider} from './GRangeSlider';

  export default {
    name: "GRange",
    props: {
      value: {
        type: Array,
        default: () => ([0, 0]),
      },
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
      const {roundValue} = helperFunctions(props, minValue, maxValue)

      const state = reactive({
        app: null,
        lazyValue: props.value,
        activeThumb: 0,
        oldValue: 0,
        keyPressed: 0,
        isFocused: false,
        isActive: false,
        noClick: false,
      })

      const internalValue = computed({
        get: () => state.lazyValue,
        set: (val) => {
          let value = val.map(v => roundValue(Math.min(Math.max(v, minValue.value), maxValue.value)))

          if (value[0] > value[1] || value[1] < value[0]) {
            if (state.activeThumb !== null) {
              const toFocus = state.activeThumb === 1 ? 0 : 1
              const el = context.refs[`thumb_${toFocus}`]
              el.focus()
            }
            value = [value[1], value[0]]
          }

          state.lazyValue = value
          if (!isEqual(value, props.value)) context.emit('input', value)
        }
      })

      watch(() => minValue.value, () => {
        minValue.value > Math.min(internalValue.value[0]) && context.emit('input', [minValue.value, internalValue.value[1]])
        minValue.value > Math.min(internalValue.value[1]) && context.emit('input', [internalValue.value[0], minValue.value])
      })
      watch(() => maxValue.value, () => {
        maxValue.value < Math.max(internalValue.value[0]) && context.emit('input', [maxValue.value, internalValue.value[1]])
        maxValue.value < Math.max(internalValue.value[1]) && context.emit('input', [internalValue.value[0], maxValue.value])
      })
      watch(() => props.value, (val) => internalValue.value = val)

      const inputWidth = computed(() => internalValue.value.map((v) => (roundValue(v) - minValue.value) / (maxValue.value - minValue.value) * 100))
      const trackTransition = computed(() => state.keyPressed >= 2 ? 'none' : '')
      //event handler
      const {onThumbMouseDown, onSliderClick, onKeyDown, onKeyUp} = getEventHandlerRangeSlider(props, context, state, internalValue, minValue, maxValue)

      //genInput
      function genInput(index) {
        return <input ref={`input_${index}`} type="range" value={internalValue.value[index]} readOnly
                      disabled={props.disabled}/>
      }

      //function genTrack
      const trackBgrStyle = computed(() => {
        const startDir = props.vertical ? 'bottom' : 'left'
        const endDir = props.vertical ? 'height' : 'width'
        const bg = 'background-color'

        //todo add disabled style ?
        const startLength = 0
        const startPadding = 0
        const endLength = 100
        const endPadding = 0
        const start = `calc(${startLength}% + ${startPadding}px)`
        const end = `calc(${endLength}% + ${endPadding}px)`
        const color = props.disabled ? '#d2d2d2' : (props.trackBgrColor ? getCssColor(props.trackBgrColor) : '#d2d2d2')

        return {
          [startDir]: start,
          [endDir]: end,
          [bg]: color,
          transition: trackTransition.value,
        }
      })
      const trackFillStyle = computed(() => {
        const start = props.vertical ? 'bottom' : 'left'
        const dir = props.vertical ? 'height' : 'width'
        const bg = 'background-color'

        const fillPercent = Math.abs(inputWidth.value[0] - inputWidth.value[1])
        const color = props.disabled ? '#8d8d8d' : (props.trackFillColor ? getCssColor(props.trackFillColor) : '#8d8d8d')

        return {
          [bg]: color,
          [dir]: `${fillPercent}%`,
          [start]: `${inputWidth.value[0]}%`,
          transition: trackTransition.value,
        }
      })

      function genTrack() {
        return <div class="g-slider-track-container" ref="track">
          <div class="g-slider-track-background" style={trackBgrStyle.value}/>
          <div class="g-slider-track-fill" style={trackFillStyle.value}/>
        </div>
      }

      //genStep
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

            return <span class={["g-slider-tick", {'g-slider-tick__filled': filled}]} style={tickStyle}>
             {props.tickLabels[index] && (<div class="g-slider-tick-label">
               {props.tickLabels[index]}
             </div>)}
          </span>
          })
        }

        return <div
            class={['g-slider-ticks-container', {'g-slider-ticks-container__always-show': props.ticks === 'always' || props.tickLabels.length > 0}]}>
          {genTicks()}
        </div>
      }

      //genThumb
      const thumbStyle = computed(() => {
        return {'color': props.thumbColor ? getCssColor(props.thumbColor) : '#8d8d8d'}
      })

      function genThumb() {
        return <div class="g-slider-thumb" style={thumbStyle.value}/>
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

        return <div class="g-slider-thumb-label-container"
                    style={{'display': show}}>
          <div class="g-slider-thumb-label" style={style}>
            <div>{content}</div>
          </div>
        </div>
      }

      function genThumbContainer(index) {
        const thumbContainerClasses = computed(() => {
          return {
            'g-slider-thumb-container': true,
            'g-slider-thumb-container__active': state.isActive,
            'g-slider-thumb-container__focused': state.isFocused && state.activeThumb === index,
            'g-slider-thumb-container__show-label': showThumbLabel.value,
          }
        })
        const thumbContainerStyle = computed(() => {
          const direction = props.vertical ? 'top' : 'left';
          let value = inputWidth.value[index];
          value = props.vertical ? 100 - value : value;

          return {
            [direction]: `${value}%`,
            transition: trackTransition.value,
          }
        })
        const onDrag = (e) => {
          state.isActive = true
          state.activeThumb = index

          onThumbMouseDown(e)
        }
        const onFocus = (e) => {
          state.isFocused = true
          state.activeThumb = index

          context.emit('focus', e)
        }

        const onBlur = (e) => {
          state.isFocused = false

          state.activeThumb = null

          context.emit('blur', e)
        }
        const content = genThumbLabelContent(internalValue.value[index])
        return <div class={thumbContainerClasses.value} ref={`thumb_${index}`}
                    style={thumbContainerStyle.value}
                    tabIndex={props.disabled || props.readonly ? -1 : context.attrs.tabindex ? context.attrs.tabindex : 0}
                    vOn:focus={onFocus}
                    vOn:blur={onBlur}
                    vOn:keyup={onKeyUp}
                    vOn:keydown={onKeyDown}
                    vOn:mousedown={onDrag}
                    vOn:touchstart={onDrag}>
          {genThumb()}
          {showThumbLabel.value && genThumbLabel(content)}
        </div>
      }

      //genRange
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

      function genRange() {
        return <div class={sliderClasses.value} vOn:click={onSliderClick}>
          {genInput(0)}
          {genInput(1)}
          {genTrack()}
          {genSteps()}
          {genThumbContainer(0)}
          {genThumbContainer(1)}
        </div>
      }

      return {genRange}
    },
    render() {
      return this.genRange()
    }
  }


</script>

<style scoped lang="scss">
  @import "GRangeSlider";
  @import "../GSliderRemake/_GSlider.scss";
</style>