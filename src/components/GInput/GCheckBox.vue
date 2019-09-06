<template>
	<label :class="checkBoxClass">
		<input type="checkbox">
		<span class="checkmark"></span>
		{{label}}
	</label>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GCheckBox',
    props: {
      label: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      value: [String, Boolean, Number, Array, Object]
    },
    setup(props, { emit }) {
      const computedValue = computed({
        get: () => props.value,
        set: (value) => {
          emit('input', value);
        }
      });
      const checkBoxClass = computed(() => {
        const defaultClasses = { 'fs-small-2': true, 'mb-2': true, 'check-box-square': true };
        return {
          readonly: this.readonly,
          disabled: this.disabled,
          ...defaultClasses
        };
			});
			return {
        computedValue,
				checkBoxClass
			}
    },
  }
</script>

<style scoped>

</style>