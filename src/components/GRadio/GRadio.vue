<template>
  <div class="g-radio-wrapper">
    <div :class="classes" :style="styles" class="g-radio" @click="activate">
      <input ref="radio" :name="name" type="radio">
      <span class="g-radio-checkmark"></span>
      <div class="g-radio-hover"></div>
      <slot name="label">
        <label class="g-radio-label">{{ label }}</label>
      </slot>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue';
import colorHandler from '../../utils/helpers';

export default {
  name: 'GRadio',
  emits: ['update:modelValue'],
  props: {
    label: String,
    color: String,
    disabled: Boolean,
    readonly: Boolean,
    small: Boolean,
    //native value
    value: null,
    //input value for not in group
    modelValue: null
  },
  setup(props, context) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: val => context.emit('update:modelValue', val)
    });


    const model = inject('model', inputValue);

    const defaultName = 'radio-name';
    let name = inject('name', defaultName);
    if (!name) {
      //default for undefined name
      name = defaultName;
    }

    // const trueValue = props.value ? props.value : true;

    //active state
    const isActive = computed({
      get: () => (model.value === props.value),
      set: (val) => {
        if (val === true) {//checked
          if (model === inputValue) {//if the radio not in group
            inputValue.value = props.value;
          } else {
            model.value = props.value;
          }
        }
      }
    });
    //define props color
    const { getColorType, convertColorClass } = colorHandler();
      const type = computed(() => getColorType(props.color));
      const colorClass = computed(() => convertColorClass(props.color));

      const classes = computed(() => ({
        'g-radio__readonly': props.readonly,
        'g-radio__disabled': props.disabled,
        [colorClass.value]: !!type.value && type.value === 'class',
        'g-radio__active': isActive.value,
        'g-radio__small': props.small
      }));

      const styles = computed(() => {
        const styles = {};
        if (type.value === 'style') {
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

<style scoped lang="scss">
@import "GRadio";
</style>
