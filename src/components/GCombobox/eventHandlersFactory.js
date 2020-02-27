import { keyCodes } from '../../utils/helpers';

export function getInputEventHandlers(props, context, state, selectedItem, lazySearch, searchText, addValueFromInput, emitValue) {
  const isInputDisplay = !props.multiple && !(props.chips || props.smallChips || props.deletableChips)

  function onChipCloseClick(index = null) {
    if (props.multiple) {
      selectedItem.value.splice(index, 1)
    } else {
      selectedItem.value = null
    }
    emitValue(selectedItem.value)
  }

  function clearSelection() {
    emitValue(props.multiple ? [] : '')
  }

  function onInputKeyDown(e) {
    if (props.component !== 'select') resetSelectionsDisplay(state)
    if (e.keyCode === keyCodes.down) {
      const listRef = context.refs.menu.$refs.list
      listRef.$el.getElementsByClassName('g-list-item')[0].focus()
    }
  }

  function onInputChange(text) {
    if (props.component === 'select') return
    lazySearch.value = text
  }

  function onInputClick() {
    resetSelectionsDisplay(state)
    state.isFocused = true
  }

  function onInputBlur() {
    state.isFocused = false
    resetSelectionsDisplay(state)
  }

  function onInputDelete() {
    if (isInputDisplay) return
    if (searchText.value) {
      return state.pressDeleteTimes = 0
    } else {
      if (state.pressDeleteTimes === 0) {
        state.pressDeleteTimes++
        state.lastItemColor = '#1867c0 '
      }
      if (state.pressDeleteTimes === 1) {
        return state.pressDeleteTimes++
      }
      if (state.pressDeleteTimes === 2) {

        if (props.multiple) {
          selectedItem.value.pop()
          emitValue(selectedItem.value)
        } else {
          emitValue(null)
        }
        return state.pressDeleteTimes
      }
    }
  }

  const inputAddSelection = () => {
    if (props.component !== 'combobox') return
    if (lazySearch.value.trim().length > 0) {
      addValueFromInput((parseInt(lazySearch.value) || lazySearch.value))
      lazySearch.value = ''
    }
  }

  return {
    onChipCloseClick,
    clearSelection,
    onInputKeyDown,
    onInputClick,
    onInputBlur,
    onInputDelete,
    inputAddSelection,
    onInputChange
  }

}

export function resetSelectionsDisplay(state) {
  state.pressDeleteTimes = 0
  state.lastItemColor = '#1d1d1d'
}




