<template>
  <div class="g-switch-wrapper">
    <label :class="containerClasses" class="g-switch-container" @click.prevent="toggle">
      <input type="checkbox">
      <span :class="classes" :style="styles" class="g-switch">
        <span class="g-switch-track"></span>
        <span class="g-switch-thumb"></span>
      </span>
      <slot name="label">
        <span v-if="label" class="g-switch-label">{{ label }}</span>
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
  emits: ['update:modelValue'],
  props: {
    label: String,
    color: String,
    required: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inset: Boolean,
    flat: Boolean,
    //custom v-model
    modelValue: null,
    //native value
    value: null,
    beforeUpdateInternalValue: Function,
  },
  setup(props, context) {
    const internalValue = computed({
      get: () => props.modelValue,
      set: val => {
        context.emit('update:modelValue', val)
      }
    });
    const isSelectedArray = Array.isArray(internalValue.value)
    //value return when switch active
    const trueValue = ref(props.value ? props.value : true);
    const isActive = ref(false)
    watch(() => internalValue.value, (newVal) => {
      if (newVal && isSelectedArray) {
        isActive.value = newVal.some(v => v === trueValue.value);
      } else if (newVal === true || newVal === 'true' || (newVal === trueValue.value)) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }
    }, { immediate: true })
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

      async function toggle() {
        if (typeof props.beforeUpdateInternalValue === 'function') {
          const canUpdate = await props.beforeUpdateInternalValue();
          if (!canUpdate)
            return
        }
        isActive.value = !isActive.value;
        //check whether the switch is in multiple input or
        if (isSelectedArray.value) {
          const index = internalValue.value.findIndex(v => isEqual(v, trueValue.value));
          if (isActive.value && index === -1) {//on && not found
            internalValue.value.push(trueValue.value);
          } else if (!isActive.value && index > -1) {//off & found
            internalValue.value.splice(index, 1);
          }
        } else {
          if (isActive.value) {//on
            internalValue.value = trueValue.value;
          } else {//off
            internalValue.value = null;
          }
        }
      }

      return {
        classes,
        styles,
        containerClasses,
        internalValue,
        isActive,
        isSelectedArray,
        toggle
      }
    }
  }
</script>

<style scoped lang="scss">
@import "GSwitch";
</style>
