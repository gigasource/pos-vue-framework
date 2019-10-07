<template>
	<div class="g-radio-wrapper">
		<div class="g-radio" :class="classes" :style="styles">
			<input type="radio" ref="radio" :name="name" @click="activate">
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
      value: null
    },
    setup(props, context) {
      const model = inject('model', {});
      const name = inject('name', 'radio-name');
      const isActive = computed({
				get: () => (model.value === props.value),
				set: (val) => {
				  if(val === true)
				  	context.parent.$emit('input', props.value);
				}
      });
      const {getColorType, convertColorClass} = colorHandler(props.color);
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
        model,
        name,
        classes,
				styles,
        activate
      }
    }
  }
</script>

<style scoped>

</style>