import {keyCodes} from '../../utils/helpers';

export function getInputEventHandlers(props, context, state, selections, selectedItem, isFocused, toggleItem) {
  function onChipCloseClick(index = null) {
    if (props.multiple) {
      selectedItem.value.splice(index, 1);
    } else {
      selectedItem.value = null
    }
  }

  function clearSelection() {
    selectedItem.value = props.multiple ? [] : ''
    setSearch(props, context, selections, state)
  }

  function onInputKeyDown(e) {
    resetSelectionsDisplay(state)
    if (e.keyCode === keyCodes.down) {
      const listRef = context.refs.list
      listRef.$el.getElementsByClassName('g-list-item')[0].focus()
    }
  }

  function onInputChange(text) {
    state.searchText = text
    context.emit('update:searchText', text)
  }

  function onInputClick() {
    resetSelectionsDisplay(state)
    isFocused.value = true
    state.lazySearch ? state.searchText = '' : null
  }

  function onInputBlur() {
    isFocused.value = false
    resetSelectionsDisplay(state)
  }

  function onInputDelete() {
    if (!props.multiple && !(props.chips || props.smallChips || props.deletableChips)) {
      return
    }
    if (state.searchText) {
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
        props.multiple ? selectedItem.value.pop() : selectedItem.value = null
        return state.pressDeleteTimes
      }
    }
  }

  const inputAddSelection = () => {
    if (state.searchText.trim().length > 0) {
      const isObjectList = props.items.some(item => typeof item === 'object')
      const isNumberList = props.items.some(item => typeof item === 'number')
      let inputAddedItem;
      if (isObjectList && (props.returnObject || props.itemValue))
        inputAddedItem = {
        [props.itemText]: state.searchText,
        [props.itemValue]: isNumberList ? Number(state.searchText) : state.searchText
      }
      else inputAddedItem = isNumberList ? Number(state.searchText) : state.searchText
      toggleItem(inputAddedItem)
      setSearch(props, context, selections, state)
    }
  }

  return {
    onChipCloseClick, clearSelection, onInputKeyDown, onInputClick, onInputBlur, onInputDelete, inputAddSelection, onInputChange
  }

}

export function resetSelectionsDisplay(state) {

  state.pressDeleteTimes = 0
  state.lastItemColor = '#1d1d1d'
}

export function setSearch(props, context, selections, state) {
  context.root.$nextTick(() => {
    if (!props.multiple && !(props.chips || props.smallChips || props.deletableChips)) {
      state.lazySearch = selections.value
    }
    state.searchText = ''
  })
}
