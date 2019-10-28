import _ from 'lodash'
import {computed, ref, watch} from "@vue/composition-api";

function groupable({ mandatory, multiple, maxSelection, allowDuplicates }, vModel) {
  //mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //multiple: multiple items can be active at a time
  //allowDuplicate: choose one item multiple times
  const toggleItem = (item) => {
    if (multiple) {
      updateMultiple(item);
    } else {
      updateSingle(item);
    }
  };

  const updateSingle = (item) => {
    const isSame = item === vModel.value;
    if (isSame && mandatory) {
      return;
    }
    vModel.value = isSame ? null : item;
  };

  const updateMultiple = (item) => {
    const clonedValue = _.clone(vModel.value);
    const itemIndex = clonedValue.findIndex((i) => i === item);
    //item exists + mandatory
    if (itemIndex > -1 && mandatory && clonedValue.length - 1 < 1) {
      return;
    }
    if (itemIndex > -1 && !allowDuplicates) {
      clonedValue.splice(itemIndex, 1);
    } else {
      if (maxSelection) {
        if (clonedValue.length < maxSelection) {
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
    return multiple ? vModel.value.includes(item) : vModel.value === item;
  };

  return {
    toggleItem,
    isActiveItem
  }
}

export function makeSelectable(props, context) {
  // 1 -> {a: 1, b: 2}
  const convertValueToInternalValue = function (value) {
    if (!props.itemValue) return value;
    if (!Array.isArray(props.value)) return props.items.find(i => i[props.itemValue] === value);
    return props.items.filter(i => value.includes(i[props.itemValue]));
  }

  // {a: 1, b: 2} -> 1
  const convertInternalValueToValue = function (internalValue) {
    if (!props.itemValue) return internalValue;
    if (!Array.isArray(internalValue)) return internalValue[props.itemValue];
    return internalValue.map(i => i[props.itemValue]);
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
  }, {lazy: true});

  const internalValue = computed({
    get: () => {
      return rawInternalValue.value;
    },
    set: (value) => {
      rawInternalValue.value = value;
      //todo: convert here
      context.emit('input', convertInternalValueToValue(rawInternalValue.value))
      ignoreWatchValue = true;
    }
  });

  const {toggleItem, isActiveItem} = groupable(props, internalValue);

  return {toggleItem, isActiveItem, internalValue};
}

export default groupable
