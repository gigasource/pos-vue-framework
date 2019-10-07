<template>
	<div class="g-checkbox-wrapper">
		<div class="g-checkbox" :class="checkboxClass" :style="checkboxStyle">
			<input type="checkbox" ref="input" :checked="isActive.value" @click="activate">
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
      prop: 'inputValue'
    },
    props: {
      label: String,
      color: String,
      required: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      indeterminate: Boolean,
      inputValue: null,
      value: null
    },
    setup(props, context) {
      const internalValue = computed(() => props.inputValue);
      const isSelectedArray = Array.isArray(internalValue.value);
      const trueValue = props.value
													? cloneDeep(props.value)
													: (internalValue.value && !isSelectedArray ? internalValue.value : true);

      let isActive = ref(false);
      if (internalValue.value && isSelectedArray) {
        isActive.value = internalValue.value.some(v => v === trueValue)
      } else if (internalValue.value === true
									|| internalValue.value === 'true'
									|| (internalValue.value === trueValue)) {
        isActive.value = true;
      }

      let isDeterminate = ref(true);
      if(props.indeterminate) {
        isDeterminate.value = false;
			}

      watch(internalValue, (newVal) => {
        if(isSelectedArray && Array.isArray(props.value)) {
          if(isEqual(sortBy(newVal), sortBy(props.value))) {
            isDeterminate.value = true;
            isActive.value = true;
          } else if (isSelectedArray && newVal.length === 0){
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

      const {getColorType, convertColorClass} = colorHandler(props.color);
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
        if (isSelectedArray && !Array.isArray(value)) {
          const arrValue = internalValue.value;
          const index = arrValue.findIndex(v => v === value);
          if (isActive.value && index === -1) {
            arrValue.push(value);
          } else if (!isActive.value && index > -1) {
            arrValue.splice(index, 1);
          }
          context.emit('input', arrValue);
        } else {
          if (isActive.value) {
            context.emit('input', value);
          } else {
            if(Array.isArray(value)) {
              context.emit('input', []);
						} else {
              context.emit('input', null);
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