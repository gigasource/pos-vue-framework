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
  import colorHandler from '../../utils/helpers';
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
      const internalValue = computed({
				get: () => props.inputValue,
				set: val => {context.emit('change', val)}
			});
      const isSelectedArray = computed(() => Array.isArray(internalValue.value));
      //value return when checkbox checked
      const trueValue = props.value ? cloneDeep(props.value) : true;
      let isActive = ref(false);
      //determinate state
      let isDeterminate = ref(true);
      if (props.indeterminate) {
        isDeterminate.value = false;
      }
      //change determinate & active state when value changes
      watch(() => internalValue.value, (newVal) => {
        //inputValue & value is both array
        if (isSelectedArray.value && Array.isArray(props.value)) {
          if (isEqual(sortBy(newVal), sortBy(props.value))) {
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
          if(Array.isArray(props.value)){
            if(props.value.some(v => v === internalValue.value)){
              isDeterminate.value = false;
              isActive.value = false;
              internalValue.value = [internalValue.value];
						}
					}
          if (newVal && isSelectedArray.value)
            isActive.value = newVal.some(v => v === trueValue);
          else
          	isActive.value = newVal === true || newVal === 'true' || (newVal === trueValue);
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
        if (isSelectedArray.value && !Array.isArray(value)) {
          const index = internalValue.value.findIndex(v => v === value);
          if (isActive.value && index === -1) { //checked & not found in array
            internalValue.value.push(value);
          } else if (!isActive.value && index > -1) { //not checked & found in array
            internalValue.value.splice(index, 1);
          }
        } else {
          if (isActive.value) { //checked
            internalValue.value = value;
          } else {
            if (Array.isArray(value)) {
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
        activate,
        trueValue
      }
    },
  }
</script>

<style>

</style>