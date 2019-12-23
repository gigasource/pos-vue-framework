import { computed, ref, watch } from '@vue/composition-api';

export function getVModel(props, context) {
  return computed({
    get: () => props.value,
    set: value => {
      context.emit('input', value)
    }
  })
}

export function getInternalValue(props, context, event = 'input') {
  const rawInternalValue = ref(props.value);

  watch(() => props.value, () => {
    if (rawInternalValue.value !== props.value) {
      rawInternalValue.value = props.value
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
