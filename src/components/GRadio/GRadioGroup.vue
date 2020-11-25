<template>
	<div>
		<slot name="label">
			<label v-if="label" class="g-radio-group-label">{{label}}</label>
		</slot>
		<div class="radio-group" :class="classes">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { computed, provide } from 'vue';

export default {
  name: 'GRadioGroup',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: {
    label: String,
    name: String,
    disabled: Boolean,
    readonly: Boolean,
    row: Boolean,
    modelValue: null,
    value: null
  },
  setup(props, context) {
    provide('name', props.name);
    const model = computed({
      get: () => (props.modelValue),
      set: (val) => context.emit('update:modelValue', val)
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

<style scoped lang="scss">
	@import "GRadio";
</style>
