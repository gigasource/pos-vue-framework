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
  import { computed, provide } from '@vue/composition-api';

  export default {
    name: 'GRadioGroup',
    model: {
      event: 'change'
    },
    props: {
      label: String,
      name: String,
      disabled: Boolean,
      readonly: Boolean,
      row: Boolean,
      value: null,
    },
    setup(props, context) {
      provide('name', props.name);
      const model = computed({
        get: () => (props.value),
        set: (val) => context.emit('change', val)
      });
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