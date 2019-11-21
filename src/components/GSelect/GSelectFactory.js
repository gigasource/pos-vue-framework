import {computed} from '@vue/composition-api';
import _ from "lodash";

const listMultipleFilter = (props, selectedItem) => {
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
    }
    const list = selectedItem.value
    if (props.itemText && props.itemValue) {
      return list.map(item => {
        if (item[props.itemText]) {
          return {text: item[props.itemText], value: item[props.itemValue]};
        }
        return item;
      });
    }
    return list
  })
}
export function genMenu(props, context, showOptions, genSearchTextField = null, genTextField, genList, ) {
  const nudgeBottom = !!props.hint ? '22px' : '2px'
  return <g-menu vModel={showOptions.value}
                 {...{
                   props: {
                     ...props.menuProps,
                     nudgeBottom: nudgeBottom
                   },
                   scopedSlots: {
                     activator: ({toggleContent}) => genTextField(toggleContent, showOptions)
                   }
                 }}
  >
    <template slot="default">
      {genSearchTextField()}
      {context.slots['prepend-item'] && context.slots['prepend-item']()}
      {genList(showOptions)}
      {context.slots['append-item'] && context.slots['append-item']()}
    </template>
  </g-menu>
}

