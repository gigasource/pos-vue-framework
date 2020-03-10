import { keyCodes } from '../../utils/helpers';
import { ref, watch } from '@vue/composition-api'

export function getInputEventHandlers(props, context, state, selectedItem, lazySearch, searchText, addValueFromInput, unNormalize, renderList) {
  const isInputDisplay = !props.multiple && !(props.chips || props.smallChips || props.deletableChips)
  const activeListItemIndex = ref(-1)

  function onChipCloseClick(index) {
    if (props.multiple) selectedItem.value.splice(index, 1)
    let _value = props.multiple ? selectedItem.value.map(unNormalize) : null
    context.emit('input', _value)
  }

  function clearSelection() {
    context.emit('input', props.multiple ? [] : '')
  }

  // change focused element when index changes
  watch(activeListItemIndex, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      const listRef = context.refs.menu.$refs.list

      if (listRef && renderList.value.length) {
        if (newVal >= 0) {
          // add 1 to index if there is a prepend item slot
          const index = context.slots['prepend-item'] ? newVal + 1 : newVal

          const currentFocusEl = listRef.$el.getElementsByClassName('g-list-item')[index];
          if (currentFocusEl) {
            currentFocusEl.classList.add('g-list-item__focus')
            currentFocusEl.scrollIntoView(false)
          }
        }
        if (oldVal >= 0) {
          // add 1 to index if there is a prepend item slot
          const index = context.slots['prepend-item'] ? oldVal + 1 : oldVal

          const prevFocusEl = listRef.$el.getElementsByClassName('g-list-item')[index];
          prevFocusEl && prevFocusEl.classList.remove('g-list-item__focus')
        }
      }
    }
  }, { lazy: true })

  // reset index when suggestion list changes
  watch(renderList, newValues => {
    if (!newValues.length) activeListItemIndex.value = -1
    else if (activeListItemIndex.value >= newValues.length) activeListItemIndex.value = newValues.length - 1
  })

  function onInputKeyDown(e) {
    if (props.component !== 'select') resetSelectionsDisplay(state)

    if (e.keyCode === keyCodes.down) {
      if (activeListItemIndex.value < renderList.value.length - 1) activeListItemIndex.value = activeListItemIndex.value + 1
    } else if (e.keyCode === keyCodes.up) {
      if (activeListItemIndex.value > 0) activeListItemIndex.value = activeListItemIndex.value - 1
    }
  }

  function onInputChange(text) {
    context.emit('update:searchText', text)
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
          context.emit('input', selectedItem.value.map(unNormalize))
        } else {context.emit('input', null)}
        return state.pressDeleteTimes
      }
    }
  }

  const inputAddSelection = () => {
    if (activeListItemIndex.value >= 0) {
      if (props.multiple) selectedItem.value.push(renderList.value[activeListItemIndex.value])
      let _value = props.multiple ? selectedItem.value.map(unNormalize) : renderList.value[activeListItemIndex.value]
      lazySearch.value = ''
      return context.emit('input', _value)
    }

    if (props.component !== 'combobox') return
    if (lazySearch.value.trim().length > 0) {
      addValueFromInput((parseInt(lazySearch.value) || lazySearch.value))
      lazySearch.value = ''
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

export function getListEventHandlers(list, context) {

  function onListArrowDown(index) {
    index < ((list && list.length) - 1) ? index += 1 : index = 0
    context.refs.menu.$refs.list.$el.getElementsByClassName('g-list-item')[index].focus()
  }

  function onListArrowUp(index) {
    index > 0 ? index -= 1 : index = (list && (list.length - 1))
    context.refs.menu.$refs.list.$el.getElementsByClassName('g-list-item')[index].focus()
  }

  return {
    onListArrowDown,
    onListArrowUp
  }
}



