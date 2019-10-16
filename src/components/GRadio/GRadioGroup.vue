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
    setup(props) {
      provide('name', props.name);
      const model = computed(() => (props.value));
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