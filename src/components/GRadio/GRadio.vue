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
  import { computed, inject } from '@vue/composition-api';
  import colorHandler from '../../utils/helpers';

  export default {
    name: 'GRadio',
		model: {
      prop: 'inputValue',
			event: 'change'
		},
    props: {
      label: String,
      color: String,
      disabled: Boolean,
      readonly: Boolean,
			//native value
      value: null,
			//input value for not in group
      inputValue: null
    },
    setup(props, context) {
      const inputValue = computed({
				get: () => props.inputValue,
				set: (val) => context.emit('change', val)
      });
      const model = inject('model', inputValue);
      const defaultName = 'radio-name';
      let name = inject('name', defaultName);
      if (!name) {
        //default for undefined name
        name = defaultName;
      }

			//active state
      const isActive = computed({
        get: () => props.value && (model.value === props.value || model.value === true || model.value === 'true'),
        set: (val) => {
          if (val === true) {//checked
              if(model === inputValue) {//if the radio not in group
                inputValue.value = props.value;
							} else {
                context.parent.$emit('change', props.value);
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