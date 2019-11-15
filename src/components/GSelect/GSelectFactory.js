import {computed} from '@vue/composition-api';
import _ from "lodash";

export function getList(props, selectedItem, state) {
  return computed(() => {
    if (props.multiple) {
      let _options
      if (props.allowDuplicates) {
        _options = props.items;
        if (!props.itemValue) {
          _options = props.items.filter(item => !selectedItem.value.find(_selectedItem => _.isEqual(_selectedItem, item)));
        }
      } else {
        _options = props.items.filter(item => {
          if (item[props.itemText]) {
            return !selectedItem.value.find(value => _.isEqual(value, item));
          }
          return selectedItem.value.find(value => _.isEqual(value, item));
        });
      }
      if (props.searchable) {
        let items = _.cloneDeep(_options);
        if (!state.searchText) {
          return items;
        }
        const searchText = state.searchText.trim().toLowerCase();
        if (!searchText) {
          return items;
        }
        //Search text match
        let _searchedOptions = items.filter(item => {
          const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
          return text.startsWith(searchText);
        });
        _searchedOptions = _searchedOptions.concat(items.filter(item => {
          const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
          return !text.startsWith(searchText) && text.includes(searchText);
        }));
        if (props.allowDuplicates) {
          return _searchedOptions
        }
        if (!props.itemValue) {
          return _searchedOptions.filter(item => !selectedItem.value.find(_selectedItem => _.isEqual(_selectedItem, item)));
        }
        return _searchedOptions.filter(item => {
          if (item[props.itemText]) {
            return !selectedItem.value.find(value => _.isEqual(value, item));
          }
          return selectedItem.value.find(value => _.isEqual(value, item));
        });
      } else return _options
    }
    else  if (props.searchable)  {
     {
        let items = _.cloneDeep(props.items);
        if (!state.searchText) {
          return items;
        }
        const searchText = state.searchText.trim().toLowerCase();
        if (!searchText) {
          return items;
        }
        //Search text match
        let _options = items.filter(item => {
          const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
          return text.startsWith(searchText);
        });
        _options = _options.concat(items.filter(item => {
          const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
          return !text.startsWith(searchText) && text.includes(searchText);
        }));
        return _options
      }
    }
    else return props.items
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
