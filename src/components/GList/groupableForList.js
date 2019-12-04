import _ from 'lodash'
import {computed, ref, watch} from '@vue/composition-api';
import {getInternalValue} from "../../utils/helpers";

export function groupableForList(props, vModel) {
  //props.mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //props.multiple: props.multiple items can be active at a time
  //allowDuplicate: choose one item props.multiple times
  const uniqueItems = ref([])

  watch(() => props.items, () => {
    const isObjectList = props.items.some(item => _.isObject(item) === true)
    const itemsHaveText = props.items.filter(item => item[props.itemText])

    if (props.items) {
      if (isObjectList.value) {
        if (props.returnObject) return uniqueItems.value = _.uniqWith(itemsHaveText.value, _.isEqual)
        else if (props.itemValue) return uniqueItems.value = _.uniqBy(itemsHaveText.value, props.itemText)
        else if (props.itemText) return uniqueItems.value = _.uniqBy(itemsHaveText.value, props.itemText)
      } else return uniqueItems.value = _.uniq(props.items)
    } else return uniqueItems.value = []
  })

  const toggleItem = (item) => {
    if (props.multiple) {
      if (props.returnObject) updateMultiple(item);
      else {
        if (props.itemValue) updateMultiple(item[props.itemValue])
        else updateMultiple(item)
      }
    } else {
      if (props.returnObject) updateSingle(item);
      else {
        if (props.itemValue) updateSingle(item[props.itemValue])
        else updateSingle(item)
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
    if (props.multiple) {
      if (props.returnObject) return vModel.value.some(element => _.isEqual(element, item))
      else return !!props.itemValue
          ? vModel.value.includes(item[props.itemValue])
          : vModel.value.includes(item)
    }
    if (props.returnObject) return _.isEqual(vModel.value, item)
    else return !!props.itemValue ? item[props.itemValue] === vModel.value : item === vModel.value
  };

  return {
    uniqueItems,
    toggleItem,
    isActiveItem
  }
}

export function makeListSelectable(props, context) {

  // 1 -> {a: 1, b: 2}
  //props.multiple --> props.returnObject ? props.value array --> object of items have value array
  const convertValueToInternalValue = function (value) {
    //primitive array
    if (!props.itemValue || !value) return value;
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
      let itemsHaveValueInlist = props.items.filter(i => value.some(el => el === i[props.itemValue]))
      return itemsHaveValueInlist.length ? itemsHaveValueInlist.map(item => item[props.itemValue]) : value
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
