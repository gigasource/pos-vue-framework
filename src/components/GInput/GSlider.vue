<template>
	<div class="slider" :class="{'slider-disabled': disabled}" @click="onSliderClick" >
		<input type="range" :value="internalValue" readonly/>
		<div class="slider-track-container" ref="track">
			<div class="slider-track" :style="trackStyle"></div>
			<div class="slider-fill" :style="trackFillStyle"></div>
		</div>
		<!-- add tabIndex=0 to enable focus/blur for div element -->
		<div class="slider-thumb-container" ref="thumb" :style="thumbContainerStyle" tabindex="0"
				 @focus="onFocus" @blur="onBlur" @keyup="onKeyUp" @keydown="onKeyDown" @mousedown="onThumbMouseDown" @touchstart="onThumbMouseDown">
			<div class="slider-thumb" :style="thumbStyle"></div>
			<div v-show="showLabel" class="slider-thumb-label" :style="thumbLabelStyle">
				<span>{{ parseInt(internalValue) }}</span>
			</div>
		</div>
		<div v-if="tick" class="slider-tick-container">
			<span class="slider-tick" v-for="(step, i) in steps" :key="i"></span>
		</div>
	</div>
</template>

<script>
  import { addOnceEventListener, keyCodes, passiveSupported } from '../../utils/helpers';
  import { isEqual } from 'lodash';

  export default {
    name: 'GSlider',
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
			value: [Number, String],
			vertical: Boolean,
			step: [Number, String],
			tick: Boolean,
			tickLabels: Array,
			tickSize: {
        type: [Number, String],
				default: 2
			}
		},
		data() {
      return {
        lazyValue: 0,
				keyPressed: 0,
        isFocused: false,
				isActive: false,
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
			    value = isNaN(value) ? this.minValue : value;
			    if(value === this.lazyValue) return;
			    this.lazyValue = value;
					this.$emit('input', value);
				}
			},
			inputWidth() {
        return (this.internalValue - this.minValue) / (this.maxValue - this.minValue) * 100;
			},
			trackStyle() {
        const startDir = this.vertical ? 'top' : 'right';
        const endDir = this.vertical ? 'height' : 'width';
        const bg = 'background-color';

        const start = '0';
        const end = this.disabled ? `calc(${100 - this.inputWidth}% - 0.5rem)` : `calc(${100 - this.inputWidth}%)`;
        const color = this.disabled ? this.trackFillColor : this.trackColor;
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

        const start = '0';
        const end = 'auto';
        const value = this.disabled ? `calc(${this.inputWidth}% - 0.5rem)` : `${this.inputWidth}%`;
        const color = this.trackFillColor;

        return {
          [startDir]: start,
          [endDir]: end,
          [valueDir]: value,
          [bg]: color,
        }
			},
			thumbContainerStyle() {
        const direction = this.vertical ? 'top' : 'left';
        let value = this.inputWidth;
        value = this.vertical ? 100 - value : value;

        return {
          [direction]: `${value}%`,
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
			steps() {
				//TODO slider ticks + steps
			}
		},
		created() {
			this.lazyValue = typeof this.value === 'string' ? parseFloat(this.value) : this.value;
			if(this.lazyValue > this.maxValue) {
			  this.lazyValue = this.maxValue;
			} else if(this.lazyValue < this.minValue){
			  this.lazyValue = this.minValue;
			}
    },
		methods: {
      onThumbMouseDown (e) {
      	console.log(this)
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
      },
      onMouseMove (e) {
        const { value } = this.parseMouseMove(e);
        this.internalValue = value;
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
        if (this.noClick) {
          this.noClick = false;
          return;
        }
        const thumb = this.$refs.thumb;
				thumb.focus();
        this.onMouseMove(e);
        this.$emit('change', this.internalValue);
      },
      onBlur (e) {
        this.isFocused = false;

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
		}
  }
</script>

<style scoped>

</style>
