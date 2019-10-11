<template>
	<div class="g-checkbox-wrapper">
		<div class="g-checkbox" :class="checkboxClass" :style="checkboxStyle" @click="activate">
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
  import colorHandler from '../../mixins/colorHandler';
  import { isEqual, sortBy, cloneDeep } from 'lodash';

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
      //custom v-model
      inputValue: null,
      //native value
      value: null
    },
    setup(props, context) {
      const isSelectedArray = Array.isArray(props.inputValue);
      //value return when checkbox checked
      const trueValue = props.value
        ? cloneDeep(props.value)
        : (props.inputValue && !isSelectedArray ? props.inputValue : true);
      let isActive = ref(false);
      //set active state if inputvalue is an array
      if (props.inputValue && isSelectedArray) {
        isActive.value = props.inputValue.some(v => v === trueValue);
      }
      //checked if inputvalue correct
      if (props.inputValue === true
        || props.inputValue === 'true'
        || (props.inputValue === trueValue)) {
        isActive.value = true;
      }
      //determinate state
      let isDeterminate = ref(true);
      if (props.indeterminate) {
        isDeterminate.value = false;
      }
      //change determine & active state when internal value change
      watch(() => props.inputValue, (newVal) => {
        //inputValue & value is both array
        if (isSelectedArray && Array.isArray(props.value)) {
          //compare 2 array (equal, inputValue is new array, other)
          if (isEqual(sortBy(newVal), sortBy(props.value))) {
            isDeterminate.value = true;
            isActive.value = true;
          } else if (isSelectedArray && newVal.length === 0) {
            isDeterminate.value = true;
            isActive.value = false;
          } else {
            isDeterminate.value = false;
            isActive.value = false;
          }
        } else if (newVal && isSelectedArray) {
          isActive.value = newVal.some(v => v === trueValue)
        } else if (newVal === true || newVal === 'true' || (newVal === trueValue)) {
          isActive.value = true;
        }
      });
      //define props color is a class or a css style
      const { getColorType, convertColorClass } = colorHandler(props.color);
      const type = getColorType();
      const colorClass = convertColorClass();

      const checkboxClass = computed(() => ({
        'g-checkbox__readonly': props.readonly,
        'g-checkbox__disabled': props.disabled,
        'g-checkbox__required': !isActive.value && props.required,
        'g-checkbox__indeterminate': !isDeterminate.value,
        [colorClass]: !!type && type === 'class',
        'g-checkbox__active': isActive.value,
      }));

      const checkboxStyle = computed(() => {
        const style = {};
        if (type === 'style') {
          Object.assign(style, { 'color': props.color });
        }
        return style;
      });

      function activate() {
        isActive.value = !isActive.value;
        isDeterminate.value = true;
        const value = cloneDeep(trueValue);
        //if the checkbox is not checkbox for all & in an multiple input
        if (isSelectedArray && !Array.isArray(value)) {
          const arrValue = props.inputValue;
          const index = arrValue.findIndex(v => v === value);
          if (isActive.value && index === -1) { //checked & not found in array
            arrValue.push(value);
          } else if (!isActive.value && index > -1) { //not checked & found in array
            arrValue.splice(index, 1);
          }
          context.emit('change', arrValue);
        } else {
          if (isActive.value) { //checked
            context.emit('change', value);
          } else {
            if (Array.isArray(value)) {
              context.emit('change', []);
            } else {
              context.emit('change', null);
            }
          }
        }
      }

      return {
        checkboxClass,
        checkboxStyle,
        isActive,
        activate,
        trueValue
      }
    },
  }
</script>

<style scoped>

</style>