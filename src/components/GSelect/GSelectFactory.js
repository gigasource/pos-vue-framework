import {computed} from '@vue/composition-api';
import _ from "lodash";

export function getList(props, selectedItem, state) {
  return computed(() => {
    if (props.multiple) {
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
      if (props.searchable) {
        let items = _.cloneDeep(_options);
        if (!state.searchText) {
          return items;
        }
        const searchText = !props.filter ? state.searchText.trim().toLowerCase() : state.searchText;
        if (!searchText) {
          return items;
        }
        //Search text match
        let filteredOptions
        if (!props.filter) {
          let _searchedOptions = items.filter(item => {
            const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
            return text.startsWith(searchText);
          });
          filteredOptions = _searchedOptions.concat(items.filter(item => {
            const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
            return !text.startsWith(searchText) && text.includes(searchText);
          }));
        } else if (typeof props.filter === 'function') {
          filteredOptions = items.filter(item => props.filter(item[props.itemText], searchText))
        }

        if (props.allowDuplicates) {
          return filteredOptions
        }
        if (!props.itemValue) {
          return filteredOptions.filter(item => !selectedItem.value.find(_selectedItem => _.isEqual(_selectedItem, item)));
        }
        return filteredOptions.filter(item => {
          if (item[props.itemText]) {
            return !selectedItem.value.find(value => _.isEqual(value, item));
          }
          return selectedItem.value.find(value => _.isEqual(value, item));
        });
      } else return _options
    } else if (props.searchable) {
      {
        let items = _.cloneDeep(props.items);
        if (!state.searchText) {
          return items;
        }
        const searchText = !props.filter ? state.searchText.trim().toLowerCase() : state.searchText;
        if (!searchText) {
          return items;
        }
        //Search text match
        let filteredOptions
        if (!props.filter) {
          let _searchedOptions = items.filter(item => {
            const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
            return text.startsWith(searchText);
          });
          filteredOptions = _searchedOptions.concat(items.filter(item => {
            const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
            return !text.startsWith(searchText) && text.includes(searchText);
          }));
        } else if (typeof props.filter === 'function') {
          filteredOptions = items.filter(item => props.filter(item[props.itemText], searchText))
        }
        return filteredOptions
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
