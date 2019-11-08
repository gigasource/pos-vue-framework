import { computed, ref, watch } from '@vue/composition-api';

function getVModel(props, context) {
  return computed({
    get: () => props.value,
    set: value => {
      context.emit('input', value)
    }
  })
}

export function getInternalValue(valueProps, context, event = 'input') {
  const rawInternalValue = ref(valueProps || '');

  watch(() => valueProps, () => rawInternalValue.value = valueProps, { lazy: true });

  return computed({
    get: () => rawInternalValue.value,
    set: (value) => {
      rawInternalValue.value = value;
      context.emit(event, rawInternalValue.value)
    }
  });
}

export default getVModel;
