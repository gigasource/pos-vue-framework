import _ from 'lodash'
import { computed, ref, watch } from '@vue/composition-api';

export function groupableForList(props, vModel) {
  //mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //multiple: multiple items can be active at a time
  //allowDuplicate: choose one item multiple times
  const { returnObject = true, items, mandatory, multiple, allowDuplicates, maxSelection, itemValue, itemText } = props

  const isObjectList = computed(() => items.some(item => _.isObject(item) === true))
  const itemsHaveText = ref(items.filter(item => item[itemText]) || [])

  //filter duplicate items for correct select effect
  const uniqueItems = computed({
      get: () => {
        if (items) {
          if (isObjectList.value) {
            if (returnObject) {
              return _.uniqWith(itemsHaveText.value, _.isEqual)
            } else if (itemValue) {
              return _.uniqBy(itemsHaveText.value, itemText)
            }
            return _.uniqBy(itemsHaveText.value, itemText)
          } else {
            return _.uniq(items)
          }
        } else {
          return []
        }
      },
      set: (value) => {
        itemsHaveText.value = value
      }
    }
  )
  const selectedIndex = multiple ? ref([]) : ref(null)
  const toggleItem = (item, index) => {
    if (multiple) {
      if (returnObject && itemText) {
        updateMultiple(item, index);
      } else {
        itemValue ? updateMultiple(item[itemValue], index) : updateMultiple(uniqueItems.value.indexOf(item), index)
      }
    } else {
      if (returnObject && itemText) {
        updateSingle(item, index);
      } else {
        if (itemValue) {
          updateSingle(item[itemValue], index)
        } else {
          updateSingle(uniqueItems.value.indexOf(item), index)
        }
      }
    }
  };

  const updateSingle = (item, index) => {
    const isSame = _.isEqual(vModel.value, item) && selectedIndex.value === index;
    if (isSame && mandatory) {
      return;
    }
    vModel.value = isSame ? null : item;
    selectedIndex.value = index
  };

  const updateMultiple = (item, index) => {
    const clonedValue = _.clone(vModel.value);
    const isExisting = clonedValue.includes(uniqueItems[index]);
    //item exists + mandatory
    if (isExisting && mandatory && clonedValue.length - 1 < 1) {
      return;
    }
    if (isExisting && !allowDuplicates) {
      clonedValue.splice(index, 1);
      const iLocation = selectedIndex.value.findIndex(i => i === index)
      selectedIndex.value.splice(iLocation, 1)
    } else {
      clonedValue.push(item);
      selectedIndex.value.push(index)
    }
    vModel.value = clonedValue;
  };

  const isActiveItem = (item, index) => {
    if (multiple) {
      if (returnObject) {
        return vModel.value.some(element => _.isEqual(element, item))
      } else {
        return itemValue
          ? vModel.value.includes(item[itemValue]) && selectedIndex.value.includes(index)
          : vModel.value.includes(uniqueItems.value.indexOf(item))
      }
    }
    if (returnObject) {
      return _.isEqual(vModel.value, item)
    } else {
      return itemValue ? item[itemValue] === vModel.value && selectedIndex.value === index : uniqueItems.value.indexOf(item) === vModel.value
    }
  };

  return {
    uniqueItems,
    toggleItem,
    isActiveItem
  }
}

export function makeListSelectable(props, context) {

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
      return internalValue
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

  const { uniqueItems, toggleItem, isActiveItem } = groupableForList(props, rawInternalValue);

  return { uniqueItems, toggleItem, isActiveItem, internalValue: rawInternalValue };
}

export default groupableForList
