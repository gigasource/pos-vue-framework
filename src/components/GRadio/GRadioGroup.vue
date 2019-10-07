<template>
	<div>
		<slot name="label">
			<label class="g-radio-group-label">{{label}}</label>
		</slot>
		<div class="radio-group" :class="classes">
			<slot></slot>
		</div>
	</div>
</template>

<script>
  import { computed, ref, provide } from '@vue/composition-api';

  export default {
    name: 'GRadioGroup',
    props: {
      label: String,
      name: String,
      disabled: Boolean,
      readonly: Boolean,
      multiple: Boolean,
      row: Boolean,
      value: null,
    },
    setup(props, context) {
      provide('name', props.name);
      provide('multiple', props.multiple);
      const model = computed(() => (
        (props.multiple && !Array.isArray(props.value))
					? (props.value ? [props.value] : [])
					: props.value
			));
      //change value to array if multiple
			if(props.multiple)
      	context.emit('input', model.value);
      provide('model', model);

      const classes = computed(() => ({
        readonly: props.readonly,
        disabled: props.disabled,
        'g-radio-group__horizontal': props.row,
      }));

      return {
        classes
      }
    }
  }
</script>

<style scoped>

</style>