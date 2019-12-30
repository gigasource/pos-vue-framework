import { computed, ref, watch } from '@vue/composition-api';
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
  const normalisedList = computed(() => {
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
  //todo: normalised value: map value to an item in list if it existed
  const normalisedValue = computed(() => {

    const _normalise = function (value) {
      if (listType.value === 'primitive') return normalisedList.value.find(item => item === value)
      else if ((listType.value === 'objectReturnObject' && typeof value === 'object') || typeof value === 'object') return normalisedList.value.find(item =>
        _.isEqual(_.omit(item, ['elm', 'isRootInsert']), _.omit(value, ['elm', 'isRootInsert'])))
      else {
        return normalisedList.value.find(item => getValue.value(item) === value) || normalisedList.value.find(item => getText.value(item) === value)
      }
    }

//todo: combobox case
    function normalise(value) {
      if (!inCombobox) return _normalise(value)
      else {
        let _normalisedVal = _normalise(value)
        if (_normalisedVal) return _normalisedVal
        return value
      }
    }

    let res
    if (!props.multiple) res = props.value ? normalise(props.value) : undefined
    else res = props.value ? props.value.map(normalise) : []
    context.emit('update:externalNormalisedValue', res);
    context.emit('update:selectedValue', res);
    return res
  })

  function unNormalise(item) {
    if (listType.value !== 'objectWithValueOrText' || typeof item !== 'object') {
      return item
    }
    return getValue.value(item);
  }

  //todo: toggle function : toggle item into props.value
  const toggleItem = (item) => {
    if (props.multiple) {
      if (listType.value !== 'objectWithValueOrText' || typeof item !== 'object') updateMultiple(item);
      else if (getValue.value(item)) updateMultiple(getValue.value(item))
      else if (getText.value(item)) updateMultiple(getText.value(item))
    } else {
      if (listType.value !== 'objectWithValueOrText' || typeof item !== 'object') updateSingle(item);
      else if (getValue.value(item)) updateSingle(getValue.value(item))
      else if (getText.value(item)) updateSingle(getText.value(item))
    }
  };

  const updateSingle = (item) => {
    const isSame = normalisedValue.value === item;
    if (isSame && props.mandatory) return;
    isSame ? emitValue(undefined) : emitValue(unNormalise(item));
  };

  const updateMultiple = (item) => {
    let _normalisedVal
    if (listType.value !== 'objectWithValueOrText' || inCombobox ) _normalisedVal = [...normalisedValue.value]
    else _normalisedVal = normalisedValue.value.map(item => getValue.value(item) || getText.value(item))

    if (normalisedValue.value.includes(item)) {
      if (props.allowDuplicates) {
        _normalisedVal.push(item)
        emitValue(_normalisedVal.map(unNormalise))
      } else {
        if (normalisedValue.value.length === 1 && props.mandatory) emitValue(normalisedValue.value.map(unNormalise()))
        else {
          _normalisedVal.splice(normalisedValue.value.indexOf(item))
        }
      }
    } else {
      _normalisedVal.push(item)
      emitValue(_normalisedVal.map(unNormalise))
    }

  };


  //todo: check item active (selected or not)
  const isActiveItem = (item) => {
    if (props.multiple) return listType.value !== 'primitive' ? normalisedValue.value.some(element => _.isEqual(element, item))
      || normalisedValue.value.includes(item[props.itemValue])
      || normalisedValue.value.includes(item[props.itemText])
      : normalisedValue.value.some(el => el === item)

    return listType.value !== 'primitive' ? _.isEqual(normalisedValue.value, item)
      || (!!props.itemValue && normalisedValue.value === item[props.itemValue])
      || (!!props.itemText && normalisedValue.value === item[props.itemText])
      : normalisedValue.value === item
  };


  //todo: this is list filter by selectedItem, searchText
  const selectableValues = computed(() => {
    if (!props.multiple) return normalisedList.value
    if (props.allowDuplicates) return normalisedList.value
    return normalisedList.value.filter(item => !normalisedValue.value.some(el => _.isEqual(el, item)))
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
      searchText= searchText.toString().toLowerCase()
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
    return searchFn.value(selectableValues.value)
  })
  // const selectableList = ref(null)
  // watch(() => props.searchText, () => selectableList.value = searchFn.value(selectableValues.value)
  // )


  function emitValue(val) {
    console.log('emit value: ', JSON.stringify(val));
    console.log('input')
    context.emit('input', val);

  }

  return {
    getText,
    getValue,
    listType,
    normalisedList,
    selectableList,
    normalisedValue,
    toggleItem,
    isActiveItem,
  }


}

export function getSelection2(props, context, selectedValue, listType, getText, getValue) {
  return computed(() => {
    if (!props.multiple) {
      let item = selectedValue.value && selectedValue.value
      if (!item && item !== 0) return ''
      if (listType.value === 'primitive') return item
      else if (getText.value(item) || getValue.value(item)) return { text: getText.value(item) || '', value: getValue.value(item) || '' }
      return ''
    }
    const list = selectedValue.value
    return list.map(item => {
      if (listType.value === 'primitive') return item
      else if (getText.value(item) || getValue.value(item)) return { text: getText.value(item) || '', value: getValue.value(item) || '' }
      return ''
    })
  })
}

export function getSelection3(props, selectedValue, listType, getText, getValue) {
  return computed(() => {
    if (!props.multiple) {
      let item = selectedValue.value
      let _item = props.items.find(el => getValue.value(el) ? getValue.value(el) === item : getText.value(el) === item)
      if (!item && item !== 0) return ''
      if (listType.value === 'primitive') return item
      return { text: getText.value(_item || item) || '', value: getValue.value(_item || item) || '' }
    }
    const list = selectedValue.value || []
    return list.map(item => {
      let _item = props.items.find(el => getValue.value(el) ? getValue.value(el) === item : getText.value(el) === item)
      if (listType.value === 'primitive') return item
      return { text: getText.value(_item || item) || '', value: getValue.value(_item || item) || '' }

    })
  })
}

