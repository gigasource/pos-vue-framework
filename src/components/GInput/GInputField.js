import { computed, ref, watch } from '@vue/composition-api';
import _ from 'lodash';
import { keyCodes } from '../../utils/helpers';

export function getLabel(internalValue, isValidInput, isFocused,
                         labelActiveClass = 'tf-label__active',
                         inValidStyle = { 'color': 'red' }) {
  //Activate label
  const isDirty = computed(() => internalValue.value && internalValue.value.toString().length > 0)
  const isLabelActive = computed(() => isDirty.value || isFocused.value)
  const labelClasses = computed(() => isLabelActive.value ? { labelActiveClass: true } : {})

  //Label transform when textfield has prefix, prepend
  const prefixRef = ref(null)
  const prefixWidth = computed(() => prefixRef.value ? prefixRef.value.offsetWidth : 0)
  const labelStyles = computed(() => ({
    ...isLabelActive && { 'transform': `translateY(-18px) translateX(${-prefixWidth.value}px)  scale(0.75)` },
    ...!isValidInput.value && inValidStyle
  }))

  return { labelClasses, labelStyles ,isDirty, isLabelActive, prefixRef}
}

export function getValidate(props, isFocused, internalValue, isValidInput, customAlert) {
  //Validation
  function validate(value) {
    const errorBucket = []
    if (props.rules && isFocused.value) {
      for (let i = 0; i < props.rules.length; i++) {
        const rule = props.rules[i]
        const validatedValue = typeof rule === 'function' ? rule(value) : rule
        if (typeof validatedValue == 'string') {
          errorBucket.push(validatedValue)
        } else if (typeof validatedValue !== 'boolean') {
          (customAlert || alert)('Something wrong with rules! Check it out!')
        }
      }
      errorMessages.value = errorBucket && `${errorBucket.slice(0, props.errorCount).join(' ')}.`
      errorBucket.length ? isValidInput.value = false : isValidInput.value = true
    }
  }

  const errorMessages = ref('')
  watch(internalValue, () => !props.validateOnBlur && validate(internalValue.value), { lazy: true })

  return { errorMessages };
}

export function getSlotEventListeners(context) {
  //slot events
  return {
    onClickPrependOuter: () => context.emit('click :prepend-outer'),
    onClickPrependInner: () => context.emit('click :prepend-inner'),
    onClickAppendOuter: () => context.emit('click :append-outer'),
    onClickAppendInner: () => context.emit('click :append-inner'),
  }
}

export function getEvents(props, context, internalValue, isFocused, isValidInput) {
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
    props.validateOnBlur ? validate(internalValue.value) : {}
    isFocused.value = false;
  }

  function onClearIconClick(event) {
    internalValue.value = ''
    context.emit('clear', event)
    isValidInput.value = true;
  }

  function onChange(event) {
    context.emit('change', event)
  }

  const state = {
    hasMouseDown: false,
  }

  function onKeyDown(event) {
    if (event.keyCode === keyCodes.enter && props.isDirty()) {
      context.emit('change', internalValue.value);
    }
    context.emit('keydown', event)
  }

  function onMouseUp(event) {
    if (state.hasMouseDown) {
      state.hasMouseDown = false
      context.emit('mouseup', event)
    }
    onFocus();
  }

  function onMouseDown(event) {
    state.hasMouseDown = true
    context.emit('mousedown', event)
    if (event.target !== context.refs.input) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  return { onClick, onFocus, onBlur, onClearIconClick , onMouseDown, onMouseUp, onChange, onKeyDown}
}

export function getInternalValue(context) {
  // text field internalValue
  const lazyValue = ref('');
  const internalValue = computed({
    get: () => {
      return lazyValue.value
    },
    set: (value) => {
      lazyValue.value = value;
      context.emit('input', lazyValue.value)
    }
  })
  return internalValue;
}
