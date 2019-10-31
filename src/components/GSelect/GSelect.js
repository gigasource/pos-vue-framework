import {computed} from '@vue/composition-api';
import _ from "lodash";

export function getList(props, selectedItem, state){
  return computed(() =>{
    if(props.multiple) {

      if (props.allowDuplicates) {
        return props.items;
      }
      if (!props.itemValue) {
        return props.items.filter(item => !selectedItem.value.includes(item));
      }
      let _options = props.items.filter(item => {
        if (item[props.itemText]) {
          return !selectedItem.value.find(value => value === item);
        }
        return selectedItem.value.find(value => value === item);
      });
      return _options
      if (state.searchText) {
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
        _searchedOptions  = _searchedOptions .concat(items.filter(item => {
          const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
          return !text.startsWith(searchText) && text.includes(searchText);
        }));
        return _searchedOptions
      }
    }
    else{
      if (props.searchable) {
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
  })

}
//todo: check allowDuplicates
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
      return {text: item[props.itemText], value: item[props.itemValue]}||'';
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
