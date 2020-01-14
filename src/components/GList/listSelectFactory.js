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
      let value = props.value

      if (_.isArray(props.items)) {
        return (listType.value === 'primitive') ? _.uniq(props.items) : _.uniqWith(props.items.map(item => _.omit(item, ['elm', 'isRootInsert'])), _.isEqual)
      }
      return []
    }
  )
  const getText = computed(() => createItemFn(props.itemText))
  const getValue = computed(() => createItemFn(props.itemValue))
  const inCombobox = props.component === 'combobox' || props.inCombobox
  //todo: normalized value: map value to an item in list if it existed
  const normalizedValue = computed(() => {

    const _normalize = props.normalize || function (value) {
      if (listType.value === 'primitive') return normalizedList.value.find(item => item === value)
      else if ((listType.value === 'objectReturnObject' && typeof value === 'object') || typeof value === 'object') return normalizedList.value.find(item =>
        _.isEqual(_.omit(item, ['elm', 'isRootInsert']), _.omit(value, ['elm', 'isRootInsert'])))
      else {
        return normalizedList.value.find(item => getValue.value(item) === value) || normalizedList.value.find(item => getText.value(item) === value)
      }
    }
    function normalize(value) {
      if (!inCombobox) return _normalize(value, props.items)
      else {
        let _normalizedVal = _normalize(value, props.items)
        if (_normalizedVal) return _normalizedVal
        return value
      }
    }

    let res
    if (!props.multiple) res = (props.value || props.value === 0) ? normalize(props.value) : undefined
    else res = props.value ? props.value.map(normalize) : []
    context.emit('update:selectedValue', res);
    console.log('update:selectedValue')
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
    if (props.multiple) {
      if (listType.value !== 'objectWithValueOrText' || typeof item !== 'object') updateMultiple(item);
      else if (getValue.value(item) || getValue.value(item) === 0) updateMultiple(getValue.value(item))
      else if (getText.value(item)) updateMultiple(getText.value(item))
    } else {
      if (listType.value !== 'objectWithValueOrText' || typeof item !== 'object') updateSingle(item);
      else if (getValue.value(item) || getValue.value(item) === 0) updateSingle(getValue.value(item))
      else if (getText.value(item)) updateSingle(getText.value(item))
    }
  };

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
  }


}
function isTruthy(value){
  return value === 0 || !!value
}

//todo: getText Function
//todo: in combobox case
export function getSelectionText(props, selectedValue, listType, getText, getValue) {
  return computed(() => {
    if (!props.multiple) {
      let item = selectedValue.value && selectedValue.value
      let _item = props.items.find(el => getValue.value(el) ? getValue.value(el) === item : getText.value(el) === item)
      if (!item && item !== 0) return ''
      if (listType.value === 'primitive') return item
      if (isTruthy(getText.value(_item|| item))) return getText.value(_item|| item)
      if (isTruthy(getValue.value(_item|| item))) return getValue.value(_item|| item)
      return ''
    }

    const list = selectedValue.value || []
    return list.map(item => {
      let _item = props.items.find(el => getValue.value(el) ? getValue.value(el) === item : getText.value(el) === item)
      if (listType.value === 'primitive') return item
      if (isTruthy(getText.value(_item|| item))) return getText.value(_item|| item)
      if (isTruthy(getValue.value(_item|| item))) return getValue.value(_item|| item)
      return ''
    })
  })
}


//get select for select and autocomplete
export function getSelection2(props, context, selectedValue, listType, getText, getValue) {
  return computed(() => {
    if (!props.multiple) {
      let item = selectedValue.value && selectedValue.value
      if (!item && item !== 0) return ''
      if (listType.value === 'primitive') return item
      else if (isTruthy(getText.value(item)) || isTruthy(getValue.value(item)) ) return { text: isTruthy(getText.value(item)) ? getText.value(item) : '', value: isTruthy(getValue.value(item)) ?  getValue.value(item) : '' }
      return ''
    }
    const list = selectedValue.value || []
    return list.map(item => {
      if (listType.value === 'primitive') return item
      else if (isTruthy(getText.value(item)) || isTruthy(getValue.value(item)) ) return { text: isTruthy(getText.value(item)) ? getText.value(item) : '', value: isTruthy(getValue.value(item)) ?  getValue.value(item) : '' }
      return ''
    })
  })
}

//get select for combobox
export function getSelection3(props, selectedValue, listType, getText, getValue) {
  return computed(() => {
    if (!props.multiple) {
      let item = selectedValue.value
      let _item = props.items.find(el => getValue.value(el) ? getValue.value(el) === item : getText.value(el) === item)
      if (!item && item !== 0) return ''
      if (listType.value === 'primitive') return item
      return { text: getText.value(_item || item) || '', value: (getValue.value(_item || item) || getValue.value(_item || item) === 0) ? getValue.value(_item || item) : '' }
    }
    const list = selectedValue.value || []
    return list.map(item => {
      let _item = props.items.find(el => getValue.value(el) ? getValue.value(el) === item : getText.value(el) === item)
      if (listType.value === 'primitive') return item
      return { text: getText.value(_item || item) || '', value: (getValue.value(_item || item) || getValue.value(_item || item) === 0) ? getValue.value(_item || item) : '' }

    })
  })
}
export function getSelectionText2(props, selection){
  return computed(() => {
    if (props.multiple) {
      return selection.value.map(item => {
        if (item || item === 0) {
          if (item['text'] ||  item['text'] === 0) return  item['text']
          if (item['value'] ||  item['value'] === 0) return  item['value']
          else return item}
        return ''
      })
    }
    if (selection.value || selection.value === 0) {
      if (selection.value['text'] ||  selection.value['text'] === 0) return  selection.value['text']
      if (selection.value['value'] ||  selection.value['value'] === 0) return  selection.value['value']
      else return selection.value}
    return ''
  })
}

