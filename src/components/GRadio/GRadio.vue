<template>
	<div class="g-radio-wrapper">
		<div class="g-radio" :class="classes" :style="styles"  @click="activate">
			<input type="radio" ref="radio" :name="name">
			<span class="g-radio-checkmark"></span>
			<div class="g-radio-hover"></div>
			<slot name="label">
				<label class="g-radio-label">{{label}}</label>
			</slot>
		</div>
	</div>
</template>

<script>
  import { computed, ref, inject } from '@vue/composition-api';
  import colorHandler from '../../mixins/colorHandler';

  export default {
    name: 'GRadio',
    props: {
      label: String,
      color: String,
      disabled: Boolean,
      readonly: Boolean,
      value: null,
      inputValue: null
    },
    setup(props, context) {
      let inputValue = {};
      if (props.inputValue) {
        inputValue = props.inputValue
      }
      const model = inject('model', inputValue);

      const defaultName = 'radio-name';
      let name = inject('name', defaultName);
      if (!name) {
        //default for undefined name
        name = defaultName;
      }
			//multiple options
      const multiple = inject('multiple', false);
			//active state
      const isActive = computed({
        get: () => {
          if (multiple) {
            return model.value.some(v => v === props.value);
          } else {
            return props.value && (model.value === props.value || model === props.value);
          }
        },
        set: (val) => {
          if (val === true) {
            if (multiple) {
              if (!model.value.some(v => v === props.value)) {
                context.parent.$emit('input', [...model.value, props.value]);
              }
            } else {
              context.parent.$emit('input', props.value);
            }
          }
        }
      });
			//define props color
      const { getColorType, convertColorClass } = colorHandler(props.color);
      const type = getColorType();
      const colorClass = convertColorClass();

      const classes = computed(() => ({
        'g-radio__readonly': props.readonly,
        'g-radio__disabled': props.disabled,
        [colorClass]: !!type && type === 'class',
        'g-radio__active': isActive.value,
      }));

      const styles = computed(() => {
        const styles = {};
        if (type === 'style') {
          Object.assign(styles, { 'color': props.color });
        }
        return styles;
      });

      function activate() {
        if (!isActive.value) {
          isActive.value = true;
        }
      }

      return {
        name,
        classes,
        styles,
        activate,
      }
    }
  }
</script>

<style scoped>

</style>