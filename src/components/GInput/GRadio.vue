<template>
	<label :for="id" :class="radioClass" @click.prevent="onClick">
		<input :id="id" :name="name" type="radio">
		<span :class="checkmarkClass" ></span>
		{{label}}
	</label>
</template>

<script>
  export default {
    name: 'GRadio',
		data() {
      return {
        isFocused: false,
				isActive: false,
			}
		},
    props: {
      label: String,
      disabled: Boolean,
      readonly: Boolean,
      value: [String, Boolean, Number, Array, Object],
			onIcon: String,
			offIcon: String,
			name: String,
			id: String,
			activeClass: {
        type: String,
				default: 'radio__active'
        //TODO custom color active
			}
    },
    computed: {
      computedValue: {
        get() {
          return this.value;
        },
        set (value) {
          this.$emit('input', value);
        }
      },
      radioClass() {
        let defaultClasses = {'radio': true, 'fs-small': true};
        return {
          ...defaultClasses,
					readonly: this.readonly,
					disabled: this.disabled
				};
      },
			checkmarkClass() {
        return {
          checkmark: !this.isActive,
          [this.activeClass]: this.isActive
        }
			}
    },
		methods: {
      onClick (event) {
        this.isActive = !this.isActive;
        this.$emit('click', event);
      },
      onFocus (event) {
        this.isFocused = true;
        this.$emit('focus', event);
      },
      onBlur (event) {
        this.isFocused = false;
        this.$emit('blur', event);
      },
      onChange(event) {
        this.$emit('change', event);
      },
      onKeydown: () => {}, // Override default with noop
		}
  }
</script>

<style scoped>

</style>