import { computed } from 'vue';
import _ from 'lodash';

export function createItemFn(prop) {
  return typeof prop === 'function'
    ? prop
    : item => {
      if (!_.isObject(item)) return item

      if (_.isArray(prop)) {
        const key = prop.find(Object.keys(item).includes)
        return item[key]
      } else {
        return item[prop]
      }
    }
}

const log = (val) => {
  if (process.env.NODE_ENV === 'test') console.log(val)
}

export function makeListSelectable(props, context, internalItems) {
  const listItems = computed(() => internalItems ? internalItems.value : props.items)
  const getText = computed(() => createItemFn(props.itemText))
  const getValue = computed(() => createItemFn(props.itemValue))
  const inCombobox = (props.component && props.component === 'combobox') || props.inCombobox
  const listType = computed(() => {
    if (listItems.value.length > 0) {
      const isObjectType = listItems.value.some(item => typeof item === 'object')
      if (isObjectType && props.returnObject) return 'objectReturnObject'
      else if (isObjectType) return 'objectWithValueOrText'
      return 'primitive'
    } else {
      if (props.isPrimitiveList) return 'primitive'
      else if (props.returnObject) return 'objectReturnObject'
      return 'objectWithValueOrText'
    }

  })

  const normalizedList = computed(() => {
      if (_.isArray(listItems.value)) {
        return (listType.value === 'primitive') ? _.uniq(listItems.value) : _.uniqWith(listItems.value.map(item => _.omit(item, ['elm', 'isRootInsert'])), _.isEqual)
      }
      return []
    }
  )


  //todo: normalized value: map value to an item in list if it existed

  const normalize = (value, isFromInput) => {
    const _normalize = props.normalize || function (value) {
      if (listType.value === 'primitive') return listItems.value.find(item => item === value)
      else if ((listType.value === 'objectReturnObject' && typeof value === 'object') || typeof value === 'object') return listItems.value.find(item =>
        _.isEqual(_.omit(item, ['elm', 'isRootInsert']), _.omit(value, ['elm', 'isRootInsert'])))
      else {
        return listItems.value.find(item => getValue.value(item) === value) || listItems.value.find(item => getText.value(item) === value)
      }
    }

    if (!inCombobox) return _normalize(value, listItems.value, isFromInput)
    else {
      let _normalizedVal = _normalize(value, listItems.value, isFromInput)
      if (_normalizedVal) return _normalizedVal
      return value
    }
  }

  const normalizedValue = computed(() => {
    let res
    if (!props.multiple) res = (props.value || props.value === 0) ? normalize(props.value) : undefined
    else res = props.value ? props.value.map(item => normalize(item)) : []
    context.emit('update:selectedValue', res);
    log('update:selectedValue', res)
    log('update:selectedValue')
    return res
  })

  function unNormalize(item) {
    if (listType.value !== 'objectWithValueOrText' || typeof item !== 'object') {
      return item
    }
    return getValue.value(item);
  }

  //todo: toggle function : toggle item emit value into props.value
  const toggleItem = (item) => {
    const _update = props.multiple ? updateMultiple : updateSingle;
    if (listType.value !== 'objectWithValueOrText' || typeof item !== 'object') _update(item);
    else if (getValue.value(item) || getValue.value(item) === 0) _update(getValue.value(item))
    else if (getText.value(item)|| getText.value(item) === 0) _update(getText.value(item))
  };

  function addValueFromInput(val) {
    toggleItem(normalize(val, true));
  }

  const updateSingle = (item) => {
    const isSame = normalizedValue.value === item;
    if (isSame && props.mandatory) return;
    isSame ? emitValue(undefined) : emitValue(unNormalize(item));
  };

  const updateMultiple = (item) => {
    let _normalizedVal
    if (listType.value !== 'objectWithValueOrText' || inCombobox) _normalizedVal = [...normalizedValue.value]
    else _normalizedVal = normalizedValue.value.map(item => getValue.value(item) || getText.value(item))

    if (_normalizedVal.includes(item)) {
      if (props.allowDuplicates) {
        _normalizedVal.push(item)
        emitValue(_normalizedVal.map(unNormalize))
      } else {
        if (normalizedValue.value.length === 1 && props.mandatory) emitValue(normalizedValue.value.map(unNormalize()))
        else {
          _normalizedVal.splice(normalizedValue.value.indexOf(item), 1)
          emitValue(_normalizedVal.map(unNormalize))
        }
      }
    } else {
      _normalizedVal.push(item)
      emitValue(_normalizedVal.map(unNormalize))
    }

  };

  //todo: this is list filter by selectedItem, searchText
  const selectableValues = computed(() => {
    if (!props.multiple) return normalizedList.value
    if (props.allowDuplicates) return normalizedList.value
    return normalizedList.value.filter(item => !normalizedValue.value.some(el => _.isEqual(el, item)))
  })

  const searchFn = (searchText, items) => {

    let _searchText = searchText || ''

    if (_.isEmpty(_searchText.trim() || _searchText)) return items;
    //todo: search logic
      if (props.filter) {
        return items.filter(item => {
          return props.filter(getText.value(item), _searchText);
        });
      }
      _searchText = _searchText.toString().toLowerCase()
      const searchStartsWith = items.filter(item => {
        return getText.value(item).toString().toLowerCase().startsWith(_searchText);
      });

      const searchIncludes = items.filter(i => !searchStartsWith.includes(i)).filter(item => {
        return getText.value(item).toString().toLowerCase().includes(_searchText);
      });

      return searchStartsWith.concat(searchIncludes);
  }
  const selectableList = computed(() => searchFn('', selectableValues))

  //check if item is selected
  const isActiveItem = (item) => {
    let _normalizedValue = props.multiple ? props.value||[] : [props.value]
    return listType.value !== 'primitive' ? _normalizedValue.some(element => _.isEqual(element, item))
      || _normalizedValue.some(element => _.isEqual(element, getValue.value(item)))
      || _normalizedValue.some(element => _.isEqual(element, getText.value(item)))
      : _normalizedValue.some(el => el === item)

  };

  function emitValue(val) {
    log('emit value: ', JSON.stringify(val));
    log('input')
    context.emit('input', val);

  }

  return {
    getText,
    getValue,
    listType,
    normalizedList,
    selectableValues,
    selectableList,
    normalizedValue,
    toggleItem,
    normalize,
    addValueFromInput,
    searchFn,
    isActiveItem,
    unNormalize
  }


}

function isTruthy(value) {
  return value === 0 || !!value
}

//todo: getText Function
//todo: in combobox case
export function getSelectionText(props, selectedValue, listType, getText, getValue) {
  return computed(() => {
    let list;
    if (!props.multiple) {
      list = isTruthy(selectedValue.value) ? [selectedValue.value] : [];
    } else {
      list = selectedValue.value || []
    }

    return list.map(item => {
      let _item = props.items.find(el => getValue.value(el) ? getValue.value(el) === item : getText.value(el) === item)
      if (listType.value === 'primitive') return item
      if (isTruthy(getText.value(_item || item))) return getText.value(_item || item)
      if (isTruthy(getValue.value(_item || item))) return getValue.value(_item || item)
      return ''
    })
  })
}
