<template>
	<div @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
		<label class="fw-400 dgray-3 fs-small-2">
			<slot name="label">{{label}}</slot>
		</label>
		<div class="r mt-1">
			<input type="text"
						 class="tf"
						 :class="classes"
						 :style="styles"
						 :value="lazyValue"
						 :placeholder="placeholder"
						 ref="input"
						 @input="onInput"
						 @change="onChange"
						 @focus="onFocus"
						 @blur="onBlur"
						 @keydown="onKeyDown"
			/>
			<span class="textfield-icon">
				<slot name="append"></slot>
				<img v-if="isDirty && clearable" src="../../assets/delivery/cancel.svg" @click="clearValue">
			</span>
			<span class="textfield-after">
				<slot name="after" :isValidInput="isValidInput"></slot>
			</span>
		</div>
		<p v-show="isValidInput === false" class="textfield-error">{{errorMessage}}</p>
	</div>
</template>

<script>
  import { keyCodes } from '../../utils/helpers';
  import _ from 'lodash';

  //todo: input - number
  export default {
    name: 'GTextField',
    props: {
    	...{
				label: String,
				disabled: Boolean,
				readOnly: Boolean,
				appendIcon: String,
				prependIcon: String,
			},
      required: Boolean,
      placeholder: String,
      clearable: Boolean,
      rules: Function,
      errorMessage: String,
      large: Boolean,
			textColor: {
        type: String,
        default: '#000000'
      },
			bordered: Boolean,
			centered: Boolean,
			active: Boolean,
			value: [String, Number],
		},
    data() {
      return {
        lazyValue: '',
        hasMouseDown: false,
        isFocused: false,
				isValidInput: undefined
      }
    },
    computed: {
      internalValue: {
        get() {
          return this.lazyValue
        },
        set(value) {
          this.lazyValue = value;
          this.$emit('input', this.lazyValue)
        }
      },
      isDirty() {
        return (this.lazyValue && this.lazyValue.toString().length > 0)
      },
      classes() {
        return {
          'fs-small': !this.large,
          'pa-2': !this.large,
          'textfield__large': this.large,
          'ta-center': this.centered,
					'textfield__active': this.active
        }
      },
      styles() {
        let style = {};
        if (this.textColor) {
          Object.assign(style, { 'color': this.textColor });
        }
        if (this.bordered) {
          Object.assign(style, { 'border': '1px solid #c9c9c9' });
        }
        if (this.isValidInput === false) {
          Object.assign(style, { 'border': '1px solid #ff4452' });
				}
        return style;
      }
    },
    created() {
      this.lazyValue = this.value;
      this.unwatch = this.$watch('value', (newValue) => {
        this.lazyValue = newValue;
      })
    },
    beforeDestroy() {
      this.unwatch()
    },
    methods: {
      //TODO input-number
      onInput(event) {
        this.internalValue = event.target.value;
      },
      onChange(event) {
        this.$emit('change', event);
      },
      onClick(event) {
        if (this.disabled || this.isFocused) {
          return;
        }
        this.$refs.input.focus();
        this.isFocused = true;
      },
      onFocus(event) {
        if (!this.$refs.input) {
          return;
        }
        if (document.activeElement !== this.$refs.input) {
          this.$refs.input.focus();
        }
        if (!this.isFocused) {
          this.$emit('focus', event);
          this.isFocused = true;
        }
      },
      onBlur(event) {
        this.$emit('blur', event);
        this.isFocused = false;
      },
      onKeyDown(event) {
        if (event.keyCode === keyCodes.enter && this.isDirty()) {
          this.$emit('change', this.internalValue);
        }
        this.$emit('keydown', event)
      },
      onMouseDown(event) {
        this.hasMouseDown = true;
        if (event.target !== this.$refs.input) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.$emit('mousedown', event)
      },
      onMouseUp(event) {
        if (this.hasMouseDown) {
          this.onFocus();
          this.hasMouseDown = false;
          this.$emit('mouseup', event)
        }
      },
      clearValue() {
        this.internalValue = '';
      }
    },
		watch: {
			// validate after change
			internalValue: _.debounce(function()  {
				if (this.rules && typeof this.rules === 'function') {
					this.isValidInput = this.rules(this.internalValue);
				}
			}, 500)

		}
  }
</script>

<style scoped>
</style>
