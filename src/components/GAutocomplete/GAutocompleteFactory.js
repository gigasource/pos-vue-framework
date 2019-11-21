import GList from "../GList/GList";
import GIcon from "../GIcon/GIcon";
import {keyCodes} from "../../utils/helpers";
import GChip from "../GChip/GChip";
import {getLabel} from "../GInput/GInputFactory";

export function getInputEventHandlers(props, context, state, selections, selectedItem, isFocused, toggleItem, pressDeleteTimes) {
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
    resetSelectionsDisplay(state, pressDeleteTimes)
    if (e.keyCode === keyCodes.down) {
      const listRef = context.refs.select.$refs.list
      listRef.$el.getElementsByClassName('g-list-item')[0].focus()
    }
  }

  function onInputClick() {
    resetSelectionsDisplay(state, pressDeleteTimes)
    isFocused.value = true
    state.lazySearch ? state.searchText = '' : null
  }

  function onInputBlur() {
    isFocused.value = false
    resetSelectionsDisplay(state, pressDeleteTimes)
  }

  function onInputDelete() {
    if (!props.multiple && !(props.chips || props.smallChips || props.deletableChips)) return
    console.log(pressDeleteTimes)
    if (state.searchText) return pressDeleteTimes = 0
    else {
      if (pressDeleteTimes === 0) {
        pressDeleteTimes++
        state.lastItemColor = '#1867c0 '
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
      setSearch(props, context, selections, state)
    }
  }

  return {
    onChipCloseClick, clearSelection, onInputKeyDown, onInputClick, onInputBlur, onInputDelete, inputAddSelection
  }

}

export function genTextFieldScopedSlot(props, context, selections, onChipCloseClick, isDirty, isValidInput, labelClasses, labelStyles, validateText, state, hintClasses, errorMessages, clearSelection) {
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
                        style={labelStyles.value}>{props.label}</label>,
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
              style={{'color': state.lastItemColor, 'padding-right': '5px'}}>{item}</div>
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

export function genList(props, options, selectedItem, context, selections, state) {
  const onClickItem = () => {
    setSearch(props, context, selections, state)
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

export function resetSelectionsDisplay(state, pressDeleteTimes) {

  pressDeleteTimes = 0
  state.lastItemColor = '#1d1d1d'
  console.log('reset: '+ pressDeleteTimes)
}

export function setSearch(props, context, selections, state) {
  context.root.$nextTick(() => {
    if (!props.multiple && !(props.chips || props.smallChips || props.deletableChips)) state.lazySearch = selections.value
    state.searchText = ''
  })
}
