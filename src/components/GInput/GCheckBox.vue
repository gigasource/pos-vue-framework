<template>
		<label :class="checkBoxClass">
			<input type="checkbox">
			<span class="checkmark"></span>
			{{label}}
		</label>
</template>

<script>
  export default {
    name: 'GCheckBox',
    props: {
      label: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      value: String
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
			checkBoxClass() {
        let defaultClasses = {'fs-small-2': true, 'mb-2': true, 'check-box-square': true};
        return {
          readonly: this.readonly,
					disabled: this.disabled,
					...defaultClasses
				};
			}
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>