import _ from 'lodash'
import {ref, watch} from '@vue/composition-api'

function groupable(props, vModel) {
  //mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //multiple: multiple items can be active at a time
  //allowDuplicate: choose one item multiple times
  if (typeof props.returnObject === 'undefined') props.returnObject = true

  const toggleItem = (item) => {
    if (props.multiple) {
      if (props.returnObject && props.itemText) updateMultiple(item)
      else props.itemValue ? updateMultiple(item[props.itemValue]) : updateMultiple(props.items.indexOf(item))
    } else {
      if (props.returnObject && props.itemText) updateSingle(item)
      else props.itemValue ? updateSingle(item[props.itemValue]) : updateSingle(props.items.indexOf(item))
    }
  }

  const updateSingle = (item) => {
    const isSame = vModel.value === item

    if (isSame && props.mandatory) return

    vModel.value = isSame ? null : item
  }

  const updateMultiple = (item) => {
    // use isNil because !0 will return true
    if (_.isNil(vModel.value)) vModel.value = []

    const itemIndex = vModel.value.findIndex(e => e === item)
    if (itemIndex > -1) {
      if (props.mandatory && vModel.value.length < 2) return

      if (!props.allowDuplicates) vModel.value.splice(itemIndex, 1)
    } else {
      if (!props.maxSelection || vModel.value.length < props.maxSelection) vModel.value.push(item)
    }
  }

  const isActiveItem = (item) => {
    // use isNil because !0 will return true
    if (_.isNil(vModel.value)) return false

    if (!props.returnObject) item = props.items.indexOf(item)

    if (props.multiple)
      return props.itemValue
          ? vModel.value.includes(item[props.itemValue])
          : vModel.value.includes(item)
    else
      return props.itemValue
        ? vModel.value === item[props.itemValue]
        : vModel.value === item
  };

  return {
    toggleItem,
    isActiveItem
  }
}

export function makeSelectable(props, context) {
  // 1 -> {a: 1, b: 2}
  const convertValueToInternalValue = function (value) {
    if (!props.itemValue || !value) {
      return value;
    }
    if (!Array.isArray(props.value)) {
      return props.returnObject
        ? props.items.find(i => i[props.itemValue] === value)
        : props.items.find(i => i[props.itemValue] === value)[props.itemValue];
    }
    if (props.returnObject) {
      return props.items.filter(i => value.includes(i[props.itemValue]))
    } else if (props.itemValue) {
      return value
    }
  }

  // {a: 1, b: 2} -> 1
  const convertInternalValueToValue = function (internalValue) {
    if (!props.itemValue || !internalValue) {
      return internalValue;
    }
    if (!Array.isArray(internalValue)) {
      return props.returnObject ? internalValue : internalValue[props.itemValue];
    }
    return internalValue.map(i => props.returnObject ? i : i);
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

  watch(() => props.multiple, () => {
    if (props.multiple) rawInternalValue.value = [];
    else rawInternalValue.value = null;
  }, {flush: "pre"})

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
