import { computed, ref } from '@vue/composition-api';
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
      if (_.isArray(props.items)) {
        return (listType.value === 'primitive') ? _.uniq(props.items) : _.uniqWith(props.items, _.isEqual)
      }
      return []
    }
  )
  const getText = computed(() => createItemFn(props.itemText))
  const getValue = computed(() => createItemFn(props.itemValue))

  //todo: normalised value: map value to an item in list if it existed
  const normalisedValue = computed(() => {
    const _normalise = function (value) {
      let _normalisedList = normalisedList.value.map(item => _.omit(item, ['elm', 'isRootInsert']))
      if (listType.value === 'primitive') return normalisedList.value.find(item => item === value)
      else if ((listType.value === 'objectReturnObject' && typeof value === 'object') || typeof value === 'object') return _normalisedList.find(item =>
        _.isEqual(item, _.omit(value, ['elm', 'isRootInsert'])))
      else {
        return _normalisedList.find(item => getValue.value(item) === value) || _normalisedList.find(item => getText.value(item) === value)
      }
    }

//todo: combobox case
    function normalise(value) {
      if (!props.freeItemAllow) return _normalise(value)
      else {
        let _normalisedVal = _normalise(value)
        if (_normalisedVal) return _normalisedVal
        return value
      }
    }

    if (!props.multiple) return normalise(props.value)
    return props.value.map(normalise)
  })

  function unNormalise(item) {
    if (listType.value !== 'objectArrayReturnValue') {
      return item
    }
    return getValue.value(item);
  }

  //todo: toggle function : toggle item into props.value
  const toggleItem = (item) => {
    if (props.multiple) {
      if (listType.value !== 'objectWithValueOrText') updateMultiple(item);
      else if (getValue.value(item)) updateMultiple(getValue.value(item))
      else if (getText.value(item)) updateMultiple(getText.value(item))
    } else {
      if (listType.value !== 'objectWithValueOrText') updateSingle(item);
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

    let _normalisedVal = [...normalisedValue.value]
    if (listType.value !== 'objectWithValueOrText') _normalisedVal = [...normalisedValue.value]
    else _normalisedVal = normalisedValue.value.map(item => getValue.value(item) || getText.value(item))

    if (normalisedValue.value.includes(item)) {
      if (props.allowDuplicates) {
        _normalisedVal.push(item)
        emitValue(unNormalise(_normalisedVal))
      } else {
        if (normalisedValue.value.length === 1 && props.mandatory) emitValue(unNormalise(normalisedValue.value))
        else {
          _normalisedVal.splice(normalisedValue.value.indexOf(item))
        }
      }
    } else {
      _normalisedVal.push(item)
      emitValue(unNormalise(_normalisedVal))
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
  const searchText = ref('')
  const searchFn = computed(() => {
    if (_.isEmpty(searchText)) return items => items;
    //todo: search logic
    return items => {
      if (props.filter) {
        return items.filter(item => {
          return props.filter(getText.value(item), searchText.value);
        });
      }
      const searchStartsWith = items.filter(item => {
        return getText.value(item).toString().toLowerCase().startsWith(searchText.value);
      });

      const searchIncludes = items.filter(i => !searchStartsWith.includes(i)).filter(item => {
        return getText.value(item).toString().toLowerCase().includes(searchText.value);
      });

      return searchStartsWith.concat(searchIncludes);
    };
  });
  const selectableList = computed(() => {
    return searchFn.value(selectableValues.value)
  })

  function emitValue(val) {
    console.log('emit value: ', JSON.stringify(val));
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

export function getSelection(props, context, selectedValue) {
  const { listType, getText, getValue } = makeListSelectable2(props, context)
  return computed(() => {
    if (!props.multiple) {
      let item = selectedValue.value
      if (!item && item !== 0) return ''
      if (listType.value === 'primitive') return item
      else if (getText.value(item) || getValue.value(item)) return { text: getText.value(item) || '', value: getValue.value(item) || '' }
      return  ''
    }
    const list = selectedValue.value
    return list.map(item => {
      if (listType.value === 'primitive') return item
      else if (getText.value(item) || getValue.value(item)) return { text: getText.value(item) || '', value: getValue.value(item) || '' }
      return  ''
    })
  })
}

