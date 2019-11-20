import GList from "../GList/GList";
import GIcon from "../GIcon/GIcon";
import {keyCodes} from "../../utils/helpers";
import GChip from "../GChip/GChip";

export function getInputEventHandlers(props, context, state, selections, selectedItem, lazySearch, isFocused, pressDeleteTimes, lastItemColor, toggleItem) {
  function onChipCloseClick(index = null) {
    if (props.multiple) {
      selectedItem.value.splice(index, 1);
    } else {
      selectedItem.value = null
    }
  }

  function clearSelection() {
    selectedItem.value = props.multiple ? [] : ''
    setSearch(props, context, lazySearch, selections, state)
  }

  function onInputKeyDown(e) {
    resetSelectionsDisplay(pressDeleteTimes, lastItemColor)
    if (e.keyCode === keyCodes.down) {
      const listRef = context.refs.select.$refs.list
      listRef.$el.getElementsByClassName('g-list-item')[0].focus()
    }
  }

  function onInputClick() {
    isFocused.value = true
    lazySearch.value ? state.searchText = '' : null
  }

  function onInputBlur() {
    isFocused.value = false
    resetSelectionsDisplay(pressDeleteTimes, lastItemColor)
  }

  function onInputDelete() {
    if (!props.multiple && !(props.chips || props.smallChips || props.deletableChips)) return
    console.log('delete')
    if (state.searchText) return pressDeleteTimes = 0
    else {
      if (pressDeleteTimes === 0) {
        pressDeleteTimes++
        lastItemColor.value = '#1867c0 '
      }
      if (pressDeleteTimes === 1) {
        return pressDeleteTimes++
      }
      if (pressDeleteTimes === 2) {
        props.multiple ? selectedItem.value.pop() : selectedItem.value = null
        return pressDeleteTimes
      }
    }
  }
  const inputAddSelection = () => {
    if (state.searchText.trim().length > 0) {
      let inputAddedItem
      props.itemValue
          ? inputAddedItem = {
            [props.itemText]: state.searchText,
            [props.itemValue]: state.searchText
          } :
          inputAddedItem = {
            [props.itemText]: state.searchText
          }
      toggleItem(inputAddedItem)
      setSearch(props, context, lazySearch, selections, state)
    }
  }

  return {
    onChipCloseClick, clearSelection, onInputKeyDown, onInputClick, onInputBlur, onInputDelete, inputAddSelection
  }

}

export function genTextFieldScopedSlot(props, context, selections, onChipCloseClick, lastItemColor, isDirty, labelClasses, labelStyles, validateText, isValidInput, hintClasses, errorMessages, clearSelection) {
  const textFieldScopedSlots = {
    clearableSlot: ({iconColor}) =>
        <GIcon vOn:click={clearSelection} vShow={isDirty.value && props.clearable}
               color={iconColor}>{props.clearIcon}</GIcon>,
    appendInner: ({iconColor}) =>
        <GIcon color={iconColor}>arrow_drop_down</GIcon>,
    inputSlot: ({inputErrStyles}) =>
        <div class="g-tf-input" style={[{'color': '#1d1d1d'}, inputErrStyles]}>
          {props.multiple ? genMultiSelectionsSlot() : genSingleSelectionSlot()}
        </div>,
    label: () => <label htmlFor="input" class={["g-tf-label", labelClasses.value]}
                        style={labelStyles}>{props.label}</label>,
    inputMessage: () => [<div v-show={props.counter} class={{
      'g-tf-counter': true,
      'g-tf-counter__error': !isValidInput.value
    }}>{validateText.value.length}/{props.counter}</div>,
      isValidInput.value ? <div class={["g-tf-hint", hintClasses.value]}>{props.hint}</div>
          : <div class="g-tf-error">{errorMessages.value}</div>
    ]
  }
  const genMultiSelectionsSlot = () => {
    if (props.chips || props.smallChips || props.deletableChips || props.allowDuplicates) {
      return selections.value.map((item, index) => <GChip small={props.smallChips}
                                                          close={props.deletableChips}
                                                          vOn:close={() => onChipCloseClick(index)}>{item}
      </GChip>)
    }

    return selections.value.map(function (item, index) {
          if (index === selections.value.length - 1) return <div
              style={{'color': lastItemColor.value, 'padding-right': '5px'}}>{item}</div>
          return <div style={{'padding-right': '5px'}}>{item + ', '} </div>
        }
    )
  }
  const genSingleSelectionSlot = () => {
    if ((props.chips || props.smallChips || props.deletableChips) && selections.value) {
      return <GChip small={props.smallChips} close={props.deletableChips}
                    vOn:close={() => onChipCloseClick()}>{selections.value}</GChip>
    }
  }
  return textFieldScopedSlots

}

export function genList(props, options, selectedItem, showOptions, context, lazySearch, selections, state) {
  const onClickItem = () => {
    setSearch(props, context, lazySearch, selections, state)
    showOptions.value = props.multiple
  }
  return <GList
      {...{
        props: {
          items: options.value,
          'item-title': props.itemText,
          mandatory: props.mandatory,
          allowDuplicates: props.allowDuplicates,
          multiple: props.multiple,
          selectable: true,
          inMenu: true
        },
        on: {
          'click:item': onClickItem
        },
      }
      }
      vModel={selectedItem.value}
      ref="list"
  />

}

export function resetSelectionsDisplay(pressDeleteTimes, lastItemColor) {
  pressDeleteTimes = 0
  lastItemColor.value = '#1d1d1d'
}

export function setSearch(props, context, lazySearch, selections, state) {
  context.root.$nextTick(() => {
    if (!props.multiple && !(props.chips || props.smallChips || props.deletableChips)) lazySearch.value = selections.value
    state.searchText = ''
  })
}
