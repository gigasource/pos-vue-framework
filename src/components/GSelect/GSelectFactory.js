import { computed } from '@vue/composition-api';
import _ from 'lodash';

const listMultipleFilter = (props, selectedValue) => {

  let _options
  if (!selectedValue.value) {
    return _options = props.items
  }
  if (props.allowDuplicates) {
    _options = props.items;
  } else {
    if (props.returnObject) _options = props.items.filter(item => !selectedValue.value.find(_selectedValue => _.isEqual(_selectedValue, item)));
    else {
      if (props.itemValue) {
        _options = props.items.filter(item => !selectedValue.value.find(el => el === item[props.itemValue]))
      } else {
        _options = props.items.filter(item => !(selectedValue.value.includes(item)) )
      }
    }
    }
  return _options
  }

const searchTextFilteredItems = (props, state, items) => {
  if (!state.searchText || !state.searchText.trim()) {
    return items;
  }
  if (items === null) {
    return
  }
  // normalize search text if used in g-select
  const searchText = !props.filter ? state.searchText.trim().toLowerCase() : state.searchText.trim();
  //match searchText
  let _filteredOptions
  if (!props.filter) {
    let _searchedOptions = items.filter(item => {
      const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
      return text.startsWith(searchText);
    });
    _filteredOptions = _searchedOptions.concat(items.filter(item => {
      const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
      return !text.startsWith(searchText) && text.includes(searchText);
    }));
  }
  //use props.filter to filter items
  else if (typeof props.filter === 'function') {
    _filteredOptions = items.filter(item => props.filter(item[props.itemText], searchText))
  }
  return _filteredOptions
}

export function getList(props, selectedValue, state) {
  return computed(() => {
    if (props.multiple) {
      let options = listMultipleFilter(props, selectedValue)

      if (props.searchable) {
        let items = _.cloneDeep(options);
        return searchTextFilteredItems(props, state, items)
      }
      return options
    }
    if (props.searchable) return searchTextFilteredItems(props, state, _.cloneDeep(props.items))
    return props.items
  })
}


//selectedValue : primitive array --> return item itself,
//selectedValue: primitive array of value --> return item have value
//selectedValue: object array --> return item match
//then normalise item in form {text:, value:}
export function getSelections(props, selectedValue) {
  const isObjectList = props.items.some(item => _.isObject(item) === true)
  return computed(() => {
    if (!props.multiple) {
      let item = selectedValue.value;
      if (!item && item !== 0) return null;
      if (!isObjectList ) return item;
      if (props.itemValue && !props.returnObject) item = props.items.find(_item => _item[props.itemValue] === item);
      else item = props.items.find(_item =>_.isEqual(item, _item))
      return item ? {text: item[props.itemText], value: item[props.itemValue]} : '';
    }
    const list = selectedValue.value
    if(!isObjectList) return list.map(item => props.items.find(el => el === item))
    if (props.returnObject) {
      if (props.itemValue) return list.map(item => ({ text: item[props.itemText], value: item[props.itemValue] }))
      return list.map(item => props.items.find(el => _.isEqual(el, item)))
    }
    else if(props.itemValue) return list.map(item => props.items.find(el => el[props.itemValue] === item))
    return list.map(item => props.items.find(el => _.isEqual(el, item)))
  })
}

//same as getSelection but accept selections not in list
export function getSelectionsForCombobox(props, selectedValue) {
  if (props.items === null || props.items.length === 0) {
    let empty = props.multiple ? [] : ''
    return selectedValue.value || empty
  }
  const isObjectList = props.items.some(item => _.isObject(item) === true)
  if (!props.multiple) {
    let item = selectedValue.value;
    if (!item && item !== 0) return null
    if (!isObjectList) return item;
    if (props.itemValue && !props.returnObject) {item = props.items.find(_item => _item[props.itemValue] === item) || item}
    else item = props.items.find(_item => _.isEqual(item, _item)) || item
    return item ? { text: item[props.itemText], value: item[props.itemValue] } : ''
  }
  else{
    const list = selectedValue.value || []
    if (!isObjectList) return list
    if (props.returnObject) {
      if (props.itemValue) return list.map(item => item[props.itemValue] ? { text: item[props.itemText], value: item[props.itemValue] } : item)
      return list
    }
    else if (props.itemValue) return list.map(item => props.items.find(el => el[props.itemValue] === item) || item)
    return list
  }

}
