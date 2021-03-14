import _ from 'lodash'
import { computed, ref, watch } from 'vue';

function createItemFn(prop) {
  return typeof prop === 'function'
    ? prop
    : item => {
      if (!_.isObject(item)) return item

      if (_.isArray(prop)) {
        const key = prop.find(Object.keys(item).includes)
        return item[key]
      } else {
        return item[prop]
      }
    }
}

function groupable(props, vModel) {
  //mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //multiple: multiple items can be active at a time
  //allowDuplicate: choose one item multiple times
  const toggleItem = (item) => {
    if (props.multiple) {
      if (props.returnObject) {
        updateMultiple(item);
      } else {
        updateMultiple(props.items.indexOf(item))
      }
    } else {
      if (props.returnObject) {
        updateSingle(item);
      } else {
        updateSingle(props.items.indexOf(item))
      }
    }
  };

  const updateSingle = (item) => {
    const isSame = vModel.value === item;
    if (isSame && props.mandatory) {
      return;
    }
    vModel.value = isSame ? undefined : item;
  };

  const updateMultiple = (item) => {
    const clonedValue = _.clone(vModel.value || []);
    const itemIndex = clonedValue.findIndex((i) => i === item);
    //item exists + mandatory
    if (itemIndex > -1 && props.mandatory && clonedValue.length - 1 < 1) {
      return;
    }
    if (itemIndex > -1 && !props.allowDuplicates) {
      clonedValue.splice(itemIndex, 1);
    } else {
      if (props.maxSelection) {
        if (clonedValue.length < props.maxSelection) {
          clonedValue.push(item);
        } else {
          return;
        }
      } else {
        clonedValue.push(item);
      }
    }
    vModel.value = clonedValue;
  };

  const isActiveItem = (item) => {
    if (props.multiple) {
      return props.returnObject
        ? (vModel.value || []).some(element => _.isEqual(element, item))
        : (vModel.value || []).includes(props.items.indexOf(item));
    }
    return props.returnObject
      ? _.isEqual(vModel.value, item)
      : props.items.indexOf(item) === vModel.value;
  };

  return {
    toggleItem,
    isActiveItem
  }
}

export function makeSelectable(props, context) {
  const itemValueFn = computed(() => createItemFn(props.itemValue))

  // 1 -> {a: 1, b: 2}
  const convertValueToInternalValue = function (value) {
    if (!props.itemValue || !value) return value;
    if (!Array.isArray(props.value)) return props.items.find(i => itemValueFn.value(i) === value);
    return props.items.filter(i => value.includes(itemValueFn.value(i)));
  }

  // {a: 1, b: 2} -> 1
  const convertInternalValueToValue = function (internalValue) {
    if (!props.itemValue || !internalValue) return internalValue;
    if (!Array.isArray(internalValue)) return itemValueFn.value(internalValue);
    return internalValue.map(i => itemValueFn.value(i));
  }

  let rawInternalValue;
  if (props.multiple && props.value && !Array.isArray(props.value)) {
    rawInternalValue = ref([convertValueToInternalValue(props.value)]);
  } else if (props.multiple) {
    rawInternalValue = ref(convertValueToInternalValue(props.value) || []);
  } else {
    rawInternalValue = ref(convertValueToInternalValue(props.value));
  }

  let ignoreWatchValue = false;
  let ignoreWatchInternalValue = false;

  //use when props.value is change from outside
  watch(() => props.value, () => {
    if (ignoreWatchValue) {
      return ignoreWatchValue = false;
    }

    if (props.multiple && props.value && !Array.isArray(props.value)) {
      rawInternalValue.value = [convertValueToInternalValue(props.value)];
    } else {
      rawInternalValue.value = convertValueToInternalValue(props.value);
    }
    ignoreWatchInternalValue = true;
  }, { lazy: true });

  watch(() => rawInternalValue.value, () => {
    if (ignoreWatchInternalValue) {
      return ignoreWatchInternalValue = false;
    }

    context.emit('input', convertInternalValueToValue(rawInternalValue.value));
    ignoreWatchValue = true;
  })

  const { toggleItem, isActiveItem } = groupable(props, rawInternalValue);

  return { toggleItem, isActiveItem, internalValue: rawInternalValue };
}

export default groupable
