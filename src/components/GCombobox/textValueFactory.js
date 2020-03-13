import { computed, ref, watch } from '@vue/composition-api';
import _ from 'lodash'

function textValueSingle(props, context, selectionTexts, addValueFromInput) {
  const searchText = ref('')

  const isChipDisplay = computed(() => {
    return props.chips || props.deletableChips || props.smallChips
  })

  const tfValue = computed({
    get() {
      let returnValue = ''

      if (tfValueType.value === 'selectionText') {
        returnValue = lastSelectionText.value
      } else if (tfValueType.value === 'searchText') {
        returnValue = searchText.value
      }

      return returnValue
    },
    set(value) {
      if (props.component === 'select') return
      context.emit('update:searchText', value)
      searchText.value = value
    }
  })

  const tfValueType = ref('')
  const lastSelectionText = computed(() => {
    if (isChipDisplay.value) return ''
    return selectionTexts.value.length ? `${_.last(selectionTexts.value)}` : ''
  })

  // change tfValueType based on dependency change
  watch(searchText, () => tfValueType.value = 'searchText')
  watch(lastSelectionText, () => tfValueType.value = 'selectionText')

  const updateValue = () => {
    if (!searchText.value) return
    props.component === 'combobox' && addValueFromInput(searchText.value)
    if (isChipDisplay.value) tfValue.value = ''
  }

  return {
    tfValue,
    searchText,
    updateValue
  }
}

function textValueMultiple(props, context, selectionTexts, addValueFromInput) {
  const searchText = ref('')

  const tfValue = computed({
    get() {
      return searchText.value
    },
    set(value) {
      searchText.value = value
    }
  })

  const updateValue = () => {
    if (!searchText.value) return
    props.component === 'combobox' && addValueFromInput(searchText.value)
    tfValue.value = ''
  }

  return {
    tfValue,
    searchText,
    updateValue
  }
}

export default function textValueFactory(props, context, selectionTexts, addValueFromInput) {
  return props.multiple
    ? textValueMultiple(props, context, selectionTexts, addValueFromInput)
    : textValueSingle(props, context, selectionTexts, addValueFromInput)
}