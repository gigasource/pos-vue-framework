import _ from 'lodash'
import {ref, watch, computed} from '@vue/composition-api';
import {getInternalValue} from '../../utils/helpers';

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

export function groupableForList(props, vModel) {
  const itemTextFn = computed(() => createItemFn(props.itemText))
  const itemValueFn = computed(() => createItemFn(props.itemValue))

  //props.mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //props.multiple: props.multiple items can be active at a time
  //allowDuplicate: choose one item props.multiple times
  const uniqueItems = ref([])
  const isObjectList = ref(props.items && props.items.some(item => _.isObject(item) === true))
  watch(() => props.items, () => {
    if (props.items) {
      if (isObjectList.value) return uniqueItems.value = _.uniqWith(props.items, _.isEqual)
      return uniqueItems.value = _.uniq(props.items)
    }
    return uniqueItems.value = []
  })

  const toggleItem = (item) => {
    const isObject = typeof item === 'object'
    if (props.multiple) {
      if (props.returnObject || !isObjectList.value) {
        updateMultiple(item)
      } else if (props.itemValue) {
        isObject ? updateMultiple(itemValueFn.value(item)) : updateMultiple(item)
      } else if (props.itemText) {
        isObject ? updateMultiple(itemTextFn.value(item)) : updateMultiple(item)
      }
    } else {
      if (props.returnObject || !isObjectList.value) updateSingle(item);
      else if (props.itemValue) {
        isObject ? updateSingle(itemValueFn.value(item)) : updateSingle(item)
      } else if (props.itemText) {
        isObject ? updateSingle(itemTextFn.value(item)) : updateSingle(item)
      }
    }
  };

  const updateSingle = (item) => {
    const isSame = _.isEqual(vModel.value, item);
    if (isSame && props.mandatory) return;
    vModel.value = isSame ? null : item;
  };

  const updateMultiple = (item) => {
    const clonedValue = _.clone(vModel.value);
    const itemIndex = clonedValue.findIndex((i) => _.isEqual(i, item));
    //item exists + props.mandatory
    if (itemIndex > -1 && !props.allowDuplicates && props.mandatory && clonedValue.length - 1 < 1) return;
    if (itemIndex > -1 && !props.allowDuplicates) return clonedValue.splice(itemIndex, 1)
    else clonedValue.push(item);
    vModel.value = clonedValue;
  };

  const isActiveItem = (item) => {
    const isObjectList = props.items.some(item => typeof item === 'object')
    if (props.multiple) return isObjectList ? vModel.value.some(element => _.isEqual(element, item))
      || vModel.value.includes(itemValueFn.value(item))
      || vModel.value.includes(itemTextFn.value(item))
      : vModel.value.some(el => el === item)

    return isObjectList ? _.isEqual(vModel.value, item)
      || (!!props.itemValue && vModel.value === itemValueFn.value(item))
      || (!!props.itemText && vModel.value === itemTextFn.value(item)) : vModel.value === item
  };

  return {
    uniqueItems,
    toggleItem,
    isActiveItem
  }
}

export function makeListSelectable(props, context) {
  const itemValueFn = computed(() => createItemFn(props.itemValue))

  const isObjectList = ref(props.items && props.items.some(_.isObject))
  // 1 -> {a: 1, b: 2}
  //props.multiple --> props.returnObject ? props.value array --> object of items have value array
  const convertValueToInternalValue = function (value) {
    //primitive array
    if (!isObjectList.value || !value) return value;
    //for single select
    if (!Array.isArray(props.value)) {
      //{a:1, b:2} in value --> {a:1, b:2} inlist
      if (props.returnObject) return props.items.find(i => _.isEqual(i, value)) || value
      // 1  value, props.itemValue: a -->  {a:1} in list --> 1
      else if (props.itemValue) return value;
    }
    //props.multiple select
    if (props.returnObject) {
      let itemInList = props.items.filter(i => value.some(el => _.isEqual(el, i)))
      return itemInList.length ? itemInList : value
    } else if (props.itemValue) {
      let itemsHaveValueInlist = props.items.filter(i => value.some(el => el === itemValueFn.value(i)))
      return itemsHaveValueInlist.length ? itemsHaveValueInlist.map(item => itemValueFn.value(item)) : value
    } else {
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


  //use when props.value is change from outside
  watch(() => props.value, () => {
    if (_.isEqual(rawInternalValue.value, props.value)) return

    if (props.multiple && props.value && !Array.isArray(props.value)) {
      rawInternalValue.value = [convertValueToInternalValue(props.value)];
    } else {
      rawInternalValue.value = convertValueToInternalValue(props.value);
    }
  }, {lazy: true});

  watch(() => rawInternalValue.value, () => {
    if (_.isEqual(rawInternalValue.value, props.value)) return

    context.emit('input', convertInternalValueToValue(rawInternalValue.value));
  })

  const {uniqueItems, toggleItem, isActiveItem} = groupableForList(props, rawInternalValue);
  return {uniqueItems, toggleItem, isActiveItem, internalValue: rawInternalValue};
}

export function makeCombobox(props, context) {
  const internalValue = getInternalValue(props, context)
  const {uniqueItems, toggleItem, isActiveItem} = groupableForList(props, internalValue);
  return {uniqueItems, toggleItem, isActiveItem, internalValue};
}
