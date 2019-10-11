<template>
	<div class="g-switch-wrapper">
		<label class="g-switch-container" @click.prevent="activate">
			<input type="checkbox">
			<span class="g-switch" :class="classes" :style="styles">
				<span class="g-switch-track"></span>
				<span class="g-switch-thumb"></span>
			</span>
			<slot name="label">
				<span class="g-switch-label">{{label}}</span>
			</slot>
		</label>
	</div>
</template>

<script>
  import { computed, ref, watch } from '@vue/composition-api';
  import colorHandler from '../../mixins/colorHandler';

  export default {
    name: 'GSwitch',
    model: {
      prop: 'inputValue'
    },
    props: {
      label: String,
      color: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      inset: Boolean,
      flat: Boolean,
      inputValue: null,
      value: null
    },
    setup(props, context) {
      //internal value for v-model
      const internalValue = computed(() => props.inputValue);
      const isSelectedArray = Array.isArray(internalValue.value);
      //value return when switch active
      const value = computed(() => (
        props.value
					? props.value
					: (internalValue.value && !isSelectedArray ? internalValue.value : true)
				));
			//active state
      let isActive = ref(false);
      if (internalValue.value && isSelectedArray) {
        isActive.value = internalValue.value.some(v => v === value.value)
      } else if (internalValue.value === true
									|| internalValue.value === 'true'
									|| (internalValue.value === value.value)) {
        isActive.value = true;
      }
			//define props color
      const { getColorType, convertColorClass } = colorHandler(props.color);
      const type = getColorType();
      const colorClass = convertColorClass('background');

      const classes = computed(() => ({
        readonly: props.readonly,
        disabled: props.disabled,
        [colorClass]: !!type && type === 'class',
        'g-switch__active': isActive.value,
        'g-switch__flat': props.flat,
        'g-switch__inset': props.inset
      }));

      const styles = computed(() => {
        const styles = {};
        if (type === 'style') {
          Object.assign(styles, { 'color': props.color });
        }
        return styles;
      });

      function activate() {
        isActive.value = !isActive.value;
        //check whether the switch is in multiple input or not
        if (isSelectedArray) {
          const arrValue = internalValue.value;
          const index = arrValue.findIndex(v => v === value.value);
          if (isActive.value && index === -1) {
            arrValue.push(value.value);
          } else if (!isActive.value && index > -1) {
            arrValue.splice(index, 1);
          }
          context.emit('input', arrValue);
        } else {
          if (isActive.value) {
            context.emit('input', value.value);
          } else {
            context.emit('input', null);
          }
        }
      }

      return {
        classes,
        styles,
        isActive,
        activate
      }
    }
  }
</script>

<style scoped>

</style>