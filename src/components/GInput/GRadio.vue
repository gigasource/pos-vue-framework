<template>
	
</template>

<script>
  export default {
    name: 'GRadio',
		data() {
      return {
        isFocused: false
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
				default: 'radio--active'
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
      }
    },
		methods: {
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