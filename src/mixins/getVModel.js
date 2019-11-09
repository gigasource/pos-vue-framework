import { computed, ref, watch } from '@vue/composition-api';

function getVModel(props, context) {
  return computed({
    get: () => props.value,
    set: value => {
      context.emit('input', value)
    }
  })
}

export function getInternalValue(prop, context, event = 'input') {
  const rawInternalValue = ref(prop.value);

  watch(() => prop.value, () => rawInternalValue.value = prop.value, { lazy: true });

  return computed({
    get: () => rawInternalValue.value,
    set: (value) => {
      rawInternalValue.value = value;
      context.emit(event, rawInternalValue.value)
    }
  });
}

export default getVModel;
