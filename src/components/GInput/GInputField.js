import {computed, ref, watch} from "@vue/composition-api";
import getGInput from "./GInput";
import _ from "lodash";


export default function getGInputField(props, context) {

  //computed classes, styles for input field
  const classes = computed(() => {
    return {
      'fs-small': !props.large,
      'pa-2': !props.large,
      'textfield__large': props.large,
      'ta-center': props.centered,
      'textfield__active': props.active
    }
  })
  // const {isValidInput} = getGInput(props, context)
  const styles = computed(() => {
    let styles = {};
    if (props.textColor) {
      Object.assign(styles, {'color': props.textColor});
    }
    if (props.bordered) {
      Object.assign(styles, {'border': '1px solid #c9c9c9'});
    }
    if (isValidInput === false) {
      Object.assign(styles, {'border': '1px solid #ff4452'});
    }
    return styles;
  })

  // text field value
  const lazyValue = ref(props.value);
  const internalValue = computed({
    get: () => {
      return lazyValue.value
    },
    set: (value) => {
      lazyValue.value = value;
      context.emit('input', lazyValue.value)
    }
  })

  // function onInput(event) {
  //   internalValue.value = event.target.value;
  // }

  //watcher for validation
  //fixme: debounced input validation
  const isValidInput = ref(false);
  watch(() => internalValue.value,
      _.debounce(function () {
        if (props.rules && typeof props.rules == 'function') {
          isValidInput.value = props.rules(internalValue.value);
        }
      }, 1000))

  //Active label
  //todo: style active label

  const isDirty = computed(() => internalValue.value && internalValue.value.toString().length > 0)
  const isLabelActive = computed(() => isDirty.value || isFocused.value)
  const labelStyles = computed(() => isLabelActive.value ? {'tf-label__active': true} : {'tf-label': true})


  //Value counter
  const counterValue = computed(() => {
    return (internalValue.value).toString().length
  })''


  //event handler function
  //fixme: isFocused lost reactive
  const isFocused = ref(false);

  function onClick(event) {
    if (props.disabled) return;
    if (!isFocused.value) context.refs.input.focus();
    isFocused.value = true;
    context.emit('click', event);
  }

  function onFocus(event) {
    if (!context.refs.input) {
      return;
    }
    if (document.activeElement !== context.refs.input) {
      context.refs.input.focus();
    }
    if (!isFocused.value) {
      context.emit('focus', event);
      isFocused.value = true;
    }
  }

  function onBlur(event) {
    context.emit('blur', event);
    isFocused.value = false;
  }

  //fixme: can not change internalValue.value
  // const {internalValue} = getGInput(props, context)

  function onClearIconClick(event) {
    internalValue.value = ''
    context.emit('clear', event)
  }

  return {
    styles,
    classes,
    labelStyles,
    internalValue,
    counterValue,
    onClearIconClick,
    isDirty,
    isLabelActive,
    isValidInput,
    isFocused, onClick, onFocus, onBlur
  }


}
