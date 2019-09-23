<template>
	<div class="slider" :class="{'slider-disabled': disabled}" @click="onSliderClick">
		<input type="range" :value="internalValue[0]" readonly>
		<input type="range" :value="internalValue[1]" readonly>
		<div class="slider-track-container" ref="track">
			<div class="slider-track" :style="trackStyle"></div>
			<div class="slider-fill" :style="trackFillStyle"></div>
		</div>
		<template v-for="(value, i) in internalValue">
			<div class="slider-thumb-container" :ref="`thumb_${i}`" :style="thumbContainerStyle(i)" :tabindex="i"
					 @focus="onFocus" @blur="onBlur" @keyup="onKeyUp(i)" @keydown="onKeyDown(i)" @mousedown="onThumbMouseDown" @touchstart="onThumbMouseDown">
				<div class="slider-thumb" :style="thumbStyle"></div>
				<div v-show="showLabel" class="slider-thumb-label" :style="thumbLabelStyle">
					<span>{{ parseInt(value) }}</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
  import { addOnceEventListener, passiveSupported } from '../../utils/helpers';
  import { isEqual } from 'lodash';

  export default {
    name: 'GRange',
		props: {
      disabled: Boolean,
      min: {
        type: [Number, String],
        default: 0
      },
      max: {
        type: [Number, String],
        default: 100
      },
      color: {
        type: String,
        default: '#000000'
      },
      trackColor: {
        type: String,
        default: '#eeeeee'
      },
      trackFillColor: {
        type: String,
        default: '#000000'
      },
      thumbColor: {
        type: String,
        default: '#000000'
      },
      thumbLabel: [Boolean, String],
      thumbLabelSize: {
        type: [Number, String],
        default: '2rem'
      },
      thumbLabelColor: String,
      thumbLabelTextColor: {
        type: String,
        default: '#ffffff'
      },
      value: {
        type: Array,
				default: () => [0, 0]
			},
		},
		data() {
      return {
        lazyValue: [0, 0],
				keyPressed: 0,
				activeThumbIndex: -1,
				isActive: false,
				isFocused: false,
				noClick: false,
			}
		},
		computed: {
      minValue() {
        return parseFloat(this.min);
      },
      maxValue() {
        return parseFloat(this.max);
      },
      internalValue: {
        get() {
          if(this.lazyValue)
            return this.lazyValue;
        },
        set(value) {
          let val = value.map(v => Math.min(Math.max(v, this.minValue), this.maxValue));
          if(val[0] > val[1] || val[1] < val[0]){
            val = [val[1], val[0]];
					}
          this.lazyValue = val;
          this.$emit('input', val);
        }
      },
      inputWidth() {
        return this.internalValue.map(v => (v - this.minValue) / (this.maxValue - this.minValue) * 100);
      },
      trackStyle() {
        const startDir = this.vertical ? 'top' : 'right';
        const endDir = this.vertical ? 'height' : 'width';
        const bg = 'background-color';

        const start = '0';
        const end = 'calc(100%)';
        const color = this.trackColor;

        return {
          [startDir]: start,
          [endDir]: end,
          [bg]: color,
        }
      },
      trackFillStyle() {
        const startDir = this.vertical ? 'bottom' : 'left';
        const endDir = this.vertical ? 'top' : 'right';
        const valueDir = this.vertical ? 'height' : 'width';
        const bg = 'background-color';

        const start = this.disabled ? `calc(${this.inputWidth[0]}% + 0.5rem)` : `${this.inputWidth[0]}%`;
        const end = 'auto';
        const value = this.disabled ? `calc(${Math.abs(this.inputWidth[0] - this.inputWidth[1])}% - 1rem)` : `calc(${Math.abs(this.inputWidth[0] - this.inputWidth[1])}%)`;
        const color = this.trackFillColor;

        return {
          [startDir]: start,
          [endDir]: end,
          [valueDir]: value,
          [bg]: color,
        }
      },
      thumbStyle() {
        return {
          'background-color': this.thumbColor
        }
      },
      thumbLabelStyle() {
        return {
          'width': this.thumbLabelSize,
          'height': this.thumbLabelSize,
          'background-color': this.thumbLabelColor ? this.thumbLabelColor : this.trackFillColor,
					'color': this.thumbLabelTextColor
        }
      },
      showLabel() {
        let showLabelOnChange = false;
        if (typeof this.thumbLabel === 'string') {
          if(this.thumbLabel === 'always') {
            return true;
          } else if (this.thumbLabel === 'true' ) {
            showLabelOnChange = true;
          }
        } else showLabelOnChange = this.thumbLabel;
        return (this.isFocused || this.isActive) && showLabelOnChange;
      },
		},
		created() {
      this.lazyValue = this.value.map(v => Math.min(Math.max(v, this.minValue), this.maxValue));
    },
		methods: {
      thumbContainerStyle(index) {
        const direction = this.vertical ? 'top' : 'left';
        let value = this.inputWidth[index];
        value = this.vertical ? 100 - value : value;

        return {
          [direction]: `${value}%`,
        }
      },
      onThumbMouseDown (e) {
        this.oldValue = this.internalValue;
        this.keyPressed = 2;
        this.isActive = true;

        const mouseUpOptions = passiveSupported ? { passive: true, capture: true } : true;
        const mouseMoveOptions = passiveSupported ? { passive: true } : false;
        if ('touches' in e) {
          this.$root.$el.addEventListener('touchmove', this.onMouseMove, mouseMoveOptions);
          addOnceEventListener(this.$root.$el, 'touchend', this.onSliderMouseUp, mouseUpOptions);
        } else {
          this.$root.$el.addEventListener('mousemove', this.onMouseMove, mouseMoveOptions);
          addOnceEventListener(this.$root.$el, 'mouseup', this.onSliderMouseUp, mouseUpOptions);
        }

        this.$emit('start', this.internalValue);
      },
      onSliderMouseUp (e) {
        e.stopPropagation();
        this.keyPressed = 0;
        const mouseMoveOptions = passiveSupported ? { passive: true } : false;
        this.$root.$el.removeEventListener('touchmove', this.onMouseMove, mouseMoveOptions);
        this.$root.$el.removeEventListener('mousemove', this.onMouseMove, mouseMoveOptions);

        this.$emit('end', this.internalValue);
        if (!isEqual(this.oldValue, this.internalValue)) {
          this.$emit('change', this.internalValue);
          this.noClick = true;
        }

        this.isActive = false;
        if(this.isFocused) {
          this.isFocused = false;
        }
        this.activeThumbIndex = -1;
      },
      onMouseMove (e) {
        const { value, isInsideTrack } = this.parseMouseMove(e)

        if (isInsideTrack) {
          this.activeThumbIndex = this.getIndexOfClosestValue(this.internalValue, value)
        }

        this.setInternalValue(value)
      },
      onKeyDown (e) {
        if (this.disabled || this.readonly) return;

        const value = this.parseKeyDown(e, this.internalValue);

        if (value == null) return;

        this.internalValue = value;
        this.$emit('change', value);
      },
      onKeyUp () {
        this.keyPressed = 0;
      },
      onSliderClick (e) {
        if (!this.isActive) {
          if (this.noClick) {
            this.noClick = false;
            return
          }

          const { value, isInsideTrack } = this.parseMouseMove(e);
          if (isInsideTrack) {
            this.activeThumbIndex = this.getIndexOfClosestValue(this.internalValue, value);
            const refName = `thumb_${this.activeThumbIndex}`;
            const thumbRef = this.$refs[refName][0]; //v-for generate ref to array
            thumbRef.focus();
          }

          this.setInternalValue(value);

          this.$emit('change', this.internalValue);
        }
      },
      onBlur (e) {
        this.isFocused = false;
				this.activeThumbIndex = -1;
        this.$emit('blur', e);
      },
      onFocus (e) {
        this.isFocused = true;
        this.$emit('focus', e);
      },
      parseMouseMove (e) {
        const start = this.vertical ? 'top' : 'left';
        const length = this.vertical ? 'height' : 'width';
        const click = this.vertical ? 'clientY' : 'clientX';

        const {
          [start]: trackStart,
          [length]: trackLength,
        } = this.$refs.track.getBoundingClientRect();
        const clickOffset = 'touches' in e ? e.touches[0][click] : e[click];

        let clickPos = Math.min(Math.max((clickOffset - trackStart) / trackLength, 0), 1) || 0;

        if (this.vertical) clickPos = 1 - clickPos;

        const isInsideTrack = clickOffset >= trackStart && clickOffset <= trackStart + trackLength;
        const value = parseFloat(this.min) + clickPos * (this.maxValue - this.minValue);

        return { value, isInsideTrack }
      },
      parseKeyDown (e, value) {
        if (this.disabled) return;

        const { pageup, pagedown, end, home, left, right, down, up } = keyCodes;

        if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return;

        e.preventDefault();
        const step = 1;
        const steps = (this.maxValue - this.minValue) / step;
        if ([left, right, down, up].includes(e.keyCode)) {
          this.keyPressed += 1;

          const increase = [right, up];
          const direction = increase.includes(e.keyCode) ? 1 : -1;
          const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1);

          value = value + (direction * step * multiplier);
        } else if (e.keyCode === home) {
          value = this.minValue;
        } else if (e.keyCode === end) {
          value = this.maxValue;
        } else {
          const direction = e.keyCode === pagedown ? 1 : -1;
          value = value - (direction * step * (steps > 100 ? steps / 10 : 10));
        }

        return value;
      },
      getIndexOfClosestValue (array, value) {
        if (Math.abs(array[0] - value) < Math.abs(array[1] - value))
          return 0;
        else
          return 1;
      },
      setInternalValue (value) {
        this.internalValue = this.internalValue.map((v, i) => {
          if (i === this.activeThumbIndex)
            return value;
          else
            return Number(v);
        })
      },
		}
  }
</script>

<style scoped>

</style>