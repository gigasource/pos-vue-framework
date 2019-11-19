import {computed} from '@vue/composition-api';
import _ from "lodash";

const listMultipleFilter = (props, selectedItem,) => {
  let _options
  if (props.allowDuplicates) {
    _options = props.items;
  } else {
    if (!props.itemValue) {
      _options = props.items.filter(item => !selectedItem.value.find(_selectedItem => _.isEqual(_selectedItem, item)));
    } else {
      _options = props.items.filter(item => {
        if (item[props.itemText]) {
          return !selectedItem.value.find(value => _.isEqual(value, item));
        }
        return !selectedItem.value.find(_selectedItem => (_selectedItem[props.itemValue] === item[props.itemValue]));
      });
    }
  }
return _options
}
const searchTextFilteredItems = (props, state, items) => {
  if (!state.searchText) {
    return items;
  }
  const searchText = !props.filter ? state.searchText.trim().toLowerCase() : state.searchText;
  if (!searchText) {
    return items;
  }
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
          let filteredOptions = searchTextFilteredItems(props, state, items)
          listMultipleFilter(props, selectedItem, filteredOptions)
          return filteredOptions
        } else return options
      } else if (props.searchable) {
        {
          let items = _.cloneDeep(props.items);
          return searchTextFilteredItems(props, state, items)
        }
      } else return props.items
    })

  }

  export function getSelections(props, selectedItem) {
    return computed(() => {
      if (!props.multiple) {
        let item = selectedItem.value;
        if (!item) {
          return null;
        }
        if (typeof item === 'string' || typeof item === 'number') {
          return item;
        }
        if (props.itemValue) {
          item = props.items.find(_item => _item[props.itemValue] === item[props.itemValue]) || item;
        }
        return {text: item[props.itemText], value: item[props.itemValue]} || '';
      } else {
        let list = selectedItem.value
        if (props.itemText && props.itemValue) {
          return list.map(item => {
            if (item[props.itemText]) {
              return {text: item[props.itemText], value: item[props.itemValue]};
            }
            return item;
          });
        }
        return list
      }
    })
  }
