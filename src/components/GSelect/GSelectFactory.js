import {computed} from '@vue/composition-api';
import _ from "lodash";

const listMultipleFilter = (props, selectedItem) => {
  let _options
  if (props.allowDuplicates) {
    _options = props.items;
  } else {
    if (props.returnObject) _options = props.items.filter(item => !selectedItem.value.find(_selectedItem => _.isEqual(_selectedItem, item)));

    else {
      if (props.itemValue) {
        _options = props.items.filter(item => !selectedItem.value.find(el => el === item[props.itemValue]))
      } else {
        _options = props.items.filter(item => !(selectedItem.value.includes(item)) )
      }
    }
    }
  return _options
  }

const searchTextFilteredItems = (props, state, items) => {
  if (!state.searchText || !state.searchText.trim()) {
    return items;
  }

  // normalize search text if used in g-select
  const searchText = !props.filter ? state.searchText.trim().toLowerCase() : state.searchText.trim();
  //Search text match
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
  } else if (typeof props.filter === 'function') {
    _filteredOptions = items.filter(item => props.filter(item[props.itemText], searchText))
  }
  return _filteredOptions
}

export function getList(props, selectedItem, state) {
  return computed(() => {
    if (props.multiple) {
      let options = listMultipleFilter(props, selectedItem)

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

export function getSelections(props, selectedItem) {
  return computed(() => {
    if (!props.multiple) {
      let item = selectedItem.value;
      if (!item && item !== 0) {
        return null;
      }
      //primitive array
      if (!props.itemValue && (typeof item === 'string' || typeof item === 'number')) return item;
      if (props.itemValue && !props.returnObject) {
        item = props.items.find(_item => _item[props.itemValue] === item) || item;
      }
      return {text: item[props.itemText], value: item[props.itemValue]} || '';
    }
    const list = selectedItem.value
    if (props.returnObject) {
      return list.map(item => {
        if (props.itemValue) {
          return {text: item[props.itemText], value: item[props.itemValue]};
        }
        return item;
      });
    }
    else if(props.itemValue) return list.map(item => props.items.find(el => el[props.itemValue] === item))
    else return list.map(item => props.items.find(el => el === item))
  })
}

export function getSelectionsForCombobox(props, selectedItem) {
  return computed(() => {
    if (!props.multiple) {
      let item = selectedItem.value;
      if (!item && item !== 0) {
        return null;
      }
      //primitive array
      if (!props.itemValue && (typeof item === 'string' || typeof item === 'number')) return item;

      if (props.itemValue && !props.returnObject) {
        let itemInList = props.items.find(_item => _item[props.itemValue] === item)
        return itemInList !== undefined ? itemInList : item;
      }
      else return {text: item[props.itemText], value: item[props.itemValue]} || '';
    }
    const list = selectedItem.value
    if (props.returnObject) {
      return list.map(item => {
        if (props.itemValue) {
          return {text: item[props.itemText], value: item[props.itemValue]};
        }
        return item;
      });
    }
    else if(props.itemValue){
      return list.map(item => {
        if(props.items.find(el => el[props.itemValue] === item)) return props.items.find(el => el[props.itemValue] === item)
        else return item
      })
    }
    // else {
    //   // if(props.items.find(el => el === item)) return list.map(item => props.items.find(el => el === item))
    //   // else return list
    // }
    return list
  })
}
