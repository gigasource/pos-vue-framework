import _ from 'lodash'
import {computed, ref, watch} from '@vue/composition-api';

export function groupableForList(props, vModel) {
  //mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //multiple: multiple items can be active at a time
  //allowDuplicate: choose one item multiple times
  const {returnObject = true, items, mandatory, multiple, allowDuplicates, maxSelection, itemValue, itemText} = props

  const isObjectList = computed(() => items.some(item => _.isObject(item) === true))
  const itemsHaveText = ref(items.filter(item => item[itemText]) || [])

  //filter duplicate items for correct select effect
  const uniqueItems = computed(() => {
    if(props.inMenu) return props.items
        if (items) {
          if (isObjectList.value) {
            if (returnObject) return _.uniqWith(itemsHaveText.value, _.isEqual)
             else if (itemValue) return _.uniqBy(itemsHaveText.value, itemText)
            return _.uniqBy(itemsHaveText.value, itemText)
          } else return _.uniq(items)
        } else return []
      }
  )

  const toggleItem = (item) => {
    if (multiple) {
      if (returnObject) updateMultiple(item);
        else {
        if (itemValue) updateMultiple(item[itemValue])
        else if (!itemText) updateMultiple(item);
        else updateMultiple(item)
      }
    } else {
      if (returnObject) updateSingle(item);
       else {
        if (itemValue) updateSingle(item[itemValue])
        else if (!itemText) updateSingle(item);
        else updateSingle(item)
      }
    }
  };

  const updateSingle = (item) => {
    const isSame = _.isEqual(vModel.value, item);
    if (isSame && mandatory) return;
    vModel.value = isSame ? null : item;
  };

  const updateMultiple = (item) => {
    const clonedValue = _.clone(vModel.value);
    const itemIndex = clonedValue.findIndex((i) => _.isEqual(i, item));
    //item exists + mandatory
    if (itemIndex > -1 && !allowDuplicates &&  mandatory && clonedValue.length - 1 < 1) return;
    if (itemIndex > -1 && !allowDuplicates) clonedValue.splice(itemIndex, 1);
    else clonedValue.push(item);
    vModel.value = clonedValue;
  };

  const isActiveItem = (item) => {
    if (multiple) {
      if (returnObject) return vModel.value.some(element => _.isEqual(element, item))
      else return itemValue
            ? vModel.value.includes(item[itemValue])
            : (vModel.value.includes(uniqueItems.value.indexOf(item)) || vModel.value.includes(item))
    }
    if (returnObject) return _.isEqual(vModel.value, item)
    else return itemValue ? item[itemValue] === vModel.value : (uniqueItems.value.indexOf(item) === vModel.value || vModel.value === item)
  };

  return {
    uniqueItems,
    toggleItem,
    isActiveItem
  }
}

export function makeListSelectable(props, context) {

  // 1 -> {a: 1, b: 2}
  //multiple --> returnObject ? props.value array --> object of items have value array
  const convertValueToInternalValue = function (value) {
    if (!props.itemValue || !value) return value;
    if (!Array.isArray(props.value)) {
      if (props.returnObject) {
        return props.itemValue ? props.items.find(i => i[props.itemValue] === value) : props.items.find(i => _.isEqual(i, value)) || value;}
      else if (props.itemValue) {
        return props.items.find(i => i[props.itemValue] === value) && props.items.find(i => i[props.itemValue] === value)[props.itemValue] || value;
      } else {
        return props.items || value;
      }
    }
    if (props.returnObject) return props.itemValue ? props.items.filter(i => value.some(el => el === i[props.itemValue])) : value
    else if (props.itemValue) return value
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


  //use when props.value is change from outside
  watch(() => props.value, () => {
    if (_.isEqual(rawInternalValue.value, convertValueToInternalValue(props.value))) return

    if (props.multiple && props.value && !Array.isArray(props.value)) {
      rawInternalValue.value = [convertValueToInternalValue(props.value)];
    } else {
      rawInternalValue.value = convertValueToInternalValue(props.value);
    }
  }, {lazy: true});

  watch(() => rawInternalValue.value, () => {
    if (_.isEqual(convertInternalValueToValue(rawInternalValue.value), props.value)) return

    context.emit('input', convertInternalValueToValue(rawInternalValue.value));
  })

  const {uniqueItems, toggleItem, isActiveItem} = groupableForList(props, rawInternalValue);

  return {uniqueItems, toggleItem, isActiveItem, internalValue: rawInternalValue};
}

