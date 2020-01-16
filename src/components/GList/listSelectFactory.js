import { computed } from '@vue/composition-api';
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

export function makeListSelectable2(props, context) {
  const getText = computed(() => createItemFn(props.itemText))
  const getValue = computed(() => createItemFn(props.itemValue))
  const inCombobox = props.component === 'combobox' || props.inCombobox
  const listType = computed(() => {
    if (props.items.length > 0) {
      const isObjectType = props.items.some(item => typeof item === 'object')
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
      if (_.isArray(props.items)) {
        let c = _
        return (listType.value === 'primitive') ? _.uniq(props.items) : c.uniqWith(props.items.map(item => _.omit(item, ['elm', 'isRootInsert'])), c.isEqual)
      }
      return []
    }
  )


  //todo: normalized value: map value to an item in list if it existed

  const normalize = (value, isFromInput) => {
    const _normalize = props.normalize || function (value) {
      if (listType.value === 'primitive') return props.items.find(item => item === value)
      else if ((listType.value === 'objectReturnObject' && typeof value === 'object') || typeof value === 'object') return props.items.find(item =>
        _.isEqual(_.omit(item, ['elm', 'isRootInsert']), _.omit(value, ['elm', 'isRootInsert'])))
      else {
        return props.items.find(item => getValue.value(item) === value) || props.items.find(item => getText.value(item) === value)
      }
    }

    if (!inCombobox) return _normalize(value, props.items, isFromInput)
    else {
      let _normalizedVal = _normalize(value, props.items, isFromInput)
      if (_normalizedVal) return _normalizedVal
      return value
    }
  }

  const normalizedValue = computed(() => {
    let res
    if (!props.multiple) res = (props.value || props.value === 0) ? normalize(props.value) : undefined
    else res = props.value ? props.value.map(normalize) : []
    context.emit('update:selectedValue', res);
    console.log('update:selectedValue', res)
    if (process.env.NODE_ENV === 'test') console.log('update:selectedValue')
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
    else if (getText.value(item)) _update(getText.value(item))
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

    if (normalizedValue.value.includes(item)) {
      if (props.allowDuplicates) {
        _normalizedVal.push(item)
        emitValue(_normalizedVal.map(unNormalize))
      } else {
        if (normalizedValue.value.length === 1 && props.mandatory) emitValue(normalizedValue.value.map(unNormalize()))
        else {
          _normalizedVal.splice(normalizedValue.value.indexOf(item))
        }
      }
    } else {
      _normalizedVal.push(item)
      emitValue(_normalizedVal.map(unNormalize))
    }

  };


  //todo: check item active (selected or not)
  const isActiveItem = (item) => {
    if (props.multiple) return listType.value !== 'primitive' ? normalizedValue.value.some(element => _.isEqual(element, item))
      || normalizedValue.value.includes(getText.value(item))
      || normalizedValue.value.includes(getValue.value(item))
      : normalizedValue.value.some(el => el === item)

    return listType.value !== 'primitive' ? _.isEqual(normalizedValue.value, item)
      || (!!props.itemValue && normalizedValue.value === getValue.value(item))
      || (!!props.itemText && normalizedValue.value === getText.value(item))
      : normalizedValue.value === item
  };


  //todo: this is list filter by selectedItem, searchText
  const selectableValues = computed(() => {
    if (!props.multiple) return normalizedList.value
    if (props.allowDuplicates) return normalizedList.value
    return normalizedList.value.filter(item => !normalizedValue.value.some(el => _.isEqual(el, item)))
  })

  const searchFn = computed(() => {

    let searchText = props.searchText || ''

    if (_.isEmpty(searchText.trim() || searchText)) return items => items;
    //todo: search logic
    return items => {
      if (props.filter) {
        return items.filter(item => {
          return props.filter(getText.value(item), searchText);
        });
      }
      searchText = searchText.toString().toLowerCase()
      const searchStartsWith = items.filter(item => {
        return getText.value(item).toString().toLowerCase().startsWith(searchText);
      });

      const searchIncludes = items.filter(i => !searchStartsWith.includes(i)).filter(item => {
        return getText.value(item).toString().toLowerCase().includes(searchText);
      });

      return searchStartsWith.concat(searchIncludes);
    };
  });
  const selectableList = computed(() => {
    context.emit('update:list', searchFn.value(selectableValues.value))
    return searchFn.value(selectableValues.value)
  })

  function emitValue(val) {
    console.log('emit value: ', JSON.stringify(val));
    console.log('input')
    context.emit('input', val);

  }

  return {
    getText,
    getValue,
    listType,
    normalizedList,
    selectableList,
    normalizedValue,
    toggleItem,
    isActiveItem,
    normalize
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
