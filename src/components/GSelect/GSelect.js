import {computed} from '@vue/composition-api';
import _ from "lodash";

export function getList(props, selectedItem, state){
  return computed(() => {
    if (!props.multiple) {
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
      return _options;
    } else {
      if (props.allowDuplicates) {
        return props.items;
      }
      if (!props.itemValue) {
        return props.items.filter(item => !selectedItem.value.includes(item));
      }
      return props.items.filter(item => {
        if (item[props.itemText]) {
          return !selectedItem.value.find(value => value === item[props.itemValue]);
        }
        return selectedItem.value.find(value => value === item);
      });
    }

  })
}

export function getSelections(props, selectedItem){
  return computed(() => {
    if (!props.multiple) {
      let item = selectedItem.value;
      if (!item) {
        return '';
      }
      if (typeof item === 'string' || typeof item === 'number') {
        return item;
      }
      if (props.itemValue) {
        item = props.items.find(_item => _item[props.itemValue] === item[props.itemValue]);
      }
      return {text: item[props.itemText], value: item[props.itemValue]};
    } else {
      let list = selectedItem.value
      if (props.itemText && props.itemValue) {
        if (props.itemValue) {
          list = list.map(value => {
            return props.items.find(item => {
              if (item[props.itemText]) {
                return item[props.itemValue] === value;
              }
              return item === value;
            });
          });
        }
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


