<template>
	<div class="g-switch-wrapper">
		<label class="g-switch-container" :class="containerClasses" @click.prevent="toggle">
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
  import { computed, ref, watch } from 'vue';
  import colorHandler from '../../utils/helpers';
  import { isEqual } from 'lodash';

  export default {
    name: 'GSwitch',
    model: {
      prop: 'inputValue',
      event: 'change'
    },
    props: {
      label: String,
      color: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      inset: Boolean,
      flat: Boolean,
      //custom v-model
      inputValue: null,
      //native value
      value: null
    },
    setup(props, context) {
      const internalValue = computed({
        get: () => props.inputValue,
        set: val => {
          context.emit('change', val)
        }
      });
      const isSelectedArray = Array.isArray(internalValue.value);
      //value return when switch active
      const trueValue = props.value ? props.value : true;
      let isActive = ref(false);
      watch(() => internalValue.value, (newVal) => {
        if (newVal && isSelectedArray) {
          isActive.value = newVal.some(v => v === trueValue);
        } else if (newVal === true || newVal === 'true' || (newVal === trueValue)) {
          isActive.value = true;
        } else {
          isActive.value = false;
				}
      });

      //define props color
      const { getColorType, convertColorClass } = colorHandler();
      const type = computed(() => getColorType(props.color));
      const colorClass = computed(() => convertColorClass(props.color, 'background'));

      const classes = computed(() => ({
        [colorClass.value]: !!type.value && type.value === 'class',
        'g-switch__active': isActive.value,
        'g-switch__flat': props.flat,
        'g-switch__inset': props.inset
      }));

      const styles = computed(() => {
        const styles = {};
        if (type.value === 'style') {
          Object.assign(styles, { 'background-color': props.color });
        }
        return styles;
      });

      const containerClasses = computed(() => ({
        readonly: props.readonly,
        disabled: props.disabled,
      }));

      function toggle() {
        isActive.value = !isActive.value;
        //check whether the switch is in multiple input or
        if (isSelectedArray) {
          const index = internalValue.value.findIndex(v => isEqual(v,trueValue));
          if (isActive.value && index === -1) {//on && not found
            internalValue.value.push(trueValue);
          } else if (!isActive.value && index > -1) {//off & found
            internalValue.value.splice(index, 1);
          }
        } else {
          if (isActive.value) {//on
            internalValue.value = trueValue;
          } else {//off
            internalValue.value = null;
          }
        }
      }

      return {
        classes,
        styles,
        containerClasses,
        isActive,
        toggle
      }
    }
  }
</script>

<style scoped lang="scss">
 @import "GSwitch";
</style>
