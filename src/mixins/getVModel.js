import { computed, ref, watch } from 'vue';

export function getVModel(props, context) {
  return computed({
    get: () => props.modelValue,
    set: value => {
      context.emit('update:modelValue', value)
    }
  })
}

export function getInternalValue(props, context, event = 'update:modelValue') {
  const rawInternalValue = ref(props.modelValue);

  watch(() => props.modelValue, () => {
    if (rawInternalValue.value !== props.modelValue) {
      rawInternalValue.value = props.modelValue
    }
  }, { lazy: true });

  return computed({
    get: () => rawInternalValue.value,
    set: (value) => {
      if (rawInternalValue.value !== value) {
        rawInternalValue.value = value;
        context.emit(event, rawInternalValue.value)
      }
    }
  });
}

export default getVModel;
