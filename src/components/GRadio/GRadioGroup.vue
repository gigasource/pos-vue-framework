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
			row: Boolean,
			value: null,
		},
		setup(props, context) {
      const model = computed({
        get: () => props.value,
				set: (value) => {
          context.emit('input', value);
				}
			});
      provide('model', model);
      provide('name', props.name);
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