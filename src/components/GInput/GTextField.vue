<template>
	<div @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
		<label class="fw-400 dgray-3 fs-small-2 mb-2">
			<slot name="label">{{label}}</slot>
		</label>
		<div class="r">
			<input type="text"
						 class="textfield br-2 bg-lgray-5 pa-2 fs-small fw-700"
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
		</div>
	</div>
</template>

<script>
  import { keyCodes } from '../../utils/helpers';

  //todo: input - number
  export default {
    name: 'GTextField',
    props: {
      label: String,
      required: Boolean,
      placeholder: String,
      disabled: Boolean,
      readonly: Boolean,
      clearable: Boolean,
      value: [String, Number]
    },
		data() {
       return {
				 lazyValue: ''
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
			}
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
        this.$refs.input.focus();
      },
      onFocus(event) {
        if (!this.$refs.input) {
          return;
        }
        if (document.activeElement !== this.$refs.input) {
          this.$refs.input.focus();
        } else {
          this.$emit('focus', event);
        }
      },
      onBlur(event) {
        this.$emit('blur', event);
      },
      onKeyDown(event) {
        if (event.keyCode === keyCodes.enter && this.isDirty()) {
          this.$emit('change', this.internalValue);
        }
        this.$emit('keydown', event)
      },
      onMouseDown(event) {
        if (event.target !== this.$refs.input) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.$emit('mousedown', event)
      },
      onMouseUp(event) {
        this.onFocus();
        this.$emit('mousedown', event)
      },
      clearValue() {
        this.internalValue = '';
			}
    },
		watch: {
			value(val) {
			  this.lazyValue = val;
			}
		}
  }
</script>

<style scoped>
</style>