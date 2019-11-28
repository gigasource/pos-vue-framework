<template>
	<div class="g-checkbox-wrapper">
		<div class="g-checkbox" :class="checkboxClass" :style="checkboxStyle" @click="toggle">
			<input type="checkbox" ref="input" :checked="isActive.value">
			<span class="g-checkbox-checkmark"></span>
			<div class="g-checkbox-hover"></div>
			<slot name="label">
				<label class="g-checkbox-label">{{label}}</label>
			</slot>
		</div>
	</div>
</template>

<script>
  import { computed, ref, watch } from '@vue/composition-api';
  import colorHandler from '../../utils/helpers';
  import { isEqual, xorWith, cloneDeep } from 'lodash';

  export default {
    name: 'GCheckbox',
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
      indeterminate: Boolean,
      //check box all
      multiple: Boolean,
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
      const isSelectedArray = computed(() => Array.isArray(internalValue.value));
      //value return when checkbox checked
      const trueValue = props.value ? (props.value) : true;
      let isActive = ref(props.inputValue || false);
      //determinate state
      let isDeterminate = ref(true);
      if (props.indeterminate) {
        isDeterminate.value = false;
      }
      //change determinate & active state when value changes
      watch(() => internalValue.value, (newVal) => {
        //inputValue & value is both array
        if (props.multiple) {
          if (xorWith(newVal, props.value, isEqual).length === 0) {
            // equal arrays (all selected)
            isDeterminate.value = true;
            isActive.value = true;
          } else if (newVal.length === 0) {
            // none selected
            isDeterminate.value = true;
            isActive.value = false;
          } else {
            // partially selected
            isDeterminate.value = false;
            isActive.value = false;
          }
        } else {
          if (newVal && isSelectedArray.value) {
            isActive.value = newVal.some(v => isEqual(v, trueValue));
          } else {
            isActive.value = newVal === true || newVal === 'true' || isEqual(newVal, trueValue);
          }
        }
      }, { lazy: true });
      //define props color is a class or a css style
      const { getColorType, convertColorClass } = colorHandler();
      const type = computed(() => getColorType(props.color));
      const colorClass = computed(() => convertColorClass(props.color));

      const checkboxClass = computed(() => ({
        'g-checkbox__readonly': props.readonly,
        'g-checkbox__disabled': props.disabled,
        'g-checkbox__required': !isActive.value && props.required,
        'g-checkbox__indeterminate': !isDeterminate.value,
        [colorClass.value]: !!type.value && type.value === 'class',
        'g-checkbox__active': isActive.value,
      }));

      const checkboxStyle = computed(() => {
        const style = {};
        if (type.value === 'style') {
          Object.assign(style, { 'color': props.color });
        }
        return style;
      });

      function toggle() {
        isActive.value = !isActive.value;
        isDeterminate.value = true;

        if (isSelectedArray.value && !props.multiple) {
          //if the checkbox is not checkbox for all & in an multiple input
          const index = internalValue.value.findIndex(v => isEqual(v, trueValue));
          if (isActive.value && index === -1) { //check
            // internalValue.value.push(value);
            internalValue.value = [...internalValue.value, trueValue]
          } else if (!isActive.value && index > -1) { //uncheck
            internalValue.value.splice(index, 1);
          }
        } else {
          if (isActive.value) { //checked
            internalValue.value = cloneDeep(trueValue);
          } else {
            if (props.multiple) {
              internalValue.value = [];
            } else {
              internalValue.value = null;
            }
          }
        }
      }

      return {
        checkboxClass,
        checkboxStyle,
        isActive,
        toggle,
        trueValue
      }
    },
  }
</script>

<style scoped lang="scss">
 @import "GCheckbox";
</style>
