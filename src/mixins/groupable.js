import _ from 'lodash'

function groupable({ mandatory, multiple, maxSelection }, vModel) {
  //mandatory: requires at least 1 to be active at all times, unless value is null/undefined (at init)
  //multiple: multiple items can be active at a time
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
    if (itemIndex > -1) {
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

export default groupable
