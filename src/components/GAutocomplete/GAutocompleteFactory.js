import GList from '../GList/GList';
import GIcon from '../GIcon/GIcon';
import { keyCodes } from '../../utils/helpers';
import GChip from '../GChip/GChip';
import { getLabel } from '../GInput/GInputFactory';

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
    //returnObject ---> itemValue ? {text, value} : {text}
    //!returnObject ---> itemValue ? value string only
    //primitive array ---> same as above
    if (state.searchText.trim().length > 0) {
      let inputAddedItem;
      if (props.returnObbject || props.itemValue) inputAddedItem = {
          [props.itemText]: state.searchText,
          [props.itemValue]: state.searchText
        }
      else inputAddedItem = state.searchText

      toggleItem(inputAddedItem)
      setSearch(props, context, selections, state)
    }
  }

  return {
    onChipCloseClick, clearSelection, onInputKeyDown, onInputClick, onInputBlur, onInputDelete, inputAddSelection
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
