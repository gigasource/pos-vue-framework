import { computed } from '@vue/composition-api'
import groupable from '../../mixins/groupable';

export function genHeaderFactory(itemHeader) {
  return computed(() => typeof itemHeader === 'function' ? itemHeader : item => item[itemHeader])
}

export function genContentFactory(itemContent) {
  return computed(() => typeof itemContent === 'function' ? itemContent : item => item[itemContent])
}

export const getExpansionModel = function (props, context) {
  const model = computed({
    get: () => {
      if (props.value) {
        if (props.multiple && !Array.isArray(props.value)) {
          props.value = [props.value];
        }
        return props.value;
      }
      return props.multiple ? [] : null;
    },
    set: (value) => {
      context.emit('input', value);
    }
  });

  const { toggleItem, isActiveItem } = groupable({ mandatory: props.mandatory, multiple: props.multiple }, model);

  return {
    model,
    toggleItem,
    isActiveItem
  }
}
