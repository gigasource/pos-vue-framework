import {computed, ref, watch} from '@vue/composition-api';
import {keyCodes} from '../../utils/helpers';


export function getLabel(props, internalValue, isValidInput, isFocused,
                         labelActiveClass = 'tf-label__active',
                         inValidStyle = {'color': 'red'}) {
  //Activate label
  const isDirty = computed(() => !!internalValue.value)
  const isLabelActive = computed(() => {
    return isDirty.value || isFocused.value || !!props.placeholder;
  })
  const labelClasses = computed(() => isLabelActive.value ? {'tf-label__active': true} : {})
  //Label transform when textfield has prefix, prepend
  const prefixRef = ref(null)
  const prefixWidth = computed(() => prefixRef.value ? prefixRef.value.offsetWidth : 0)
  const labelStyles = computed(() =>
      // ({...isLabelActive.value && { 'transform': `translateY(-26px) translateX(${-prefixWidth.value -4}px)  scale(0.75)` },
      // ...!isValidInput.value && inValidStyle}))
  {

    if (isLabelActive.value && prefixWidth.value) {
      if (props.outlined) {
        if (props.filled) {
          return {'transform': `translateY(-32px) translateX(${-prefixWidth.value - 11}px)  scale(0.75)`}
        } else {
          return {'transform': `translateY(-26px) translateX(${-prefixWidth.value - 4}px)  scale(0.75)`}
        }
      } else if (props.filled) {
        return {'transform': `translateY(-16px) translateX(${-prefixWidth.value}px)  scale(0.75)`}
      } else {
        return {'transform': `translateY(-16px) translateX(${-prefixWidth.value + 7}px)  scale(0.75)`}
      }
    }
    !isValidInput.value && inValidStyle
  })

  return {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef}
}

export function getValidate(props, isFocused, internalValue, isValidInput, customAlert) {
  //Validation
  function validate(value) {
    const errorBucket = []
    if (props.rules) {
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
      errorBucket.length ? isValid.value = false : isValid.value = true
      return isValid
    } else {
      isValid.value = true
    }
  }

  const errorMessages = ref('')
  const isValid = ref(false)
  watch(internalValue, () => {
    validate(internalValue.value)
    if (!props.validateOnBlur) {
      isValidInput.value = isValid.value
    } else if (isValid.value) {
      isValidInput.value = true
    }

  }, !props.value ? {lazy: true} : null)

  return {errorMessages, validate};
}

export function getSlotEventListeners(context) {
  //slot events
  return {
    onClickPrependOuter: () => context.emit('click:prepend-outer'),
    onClickPrependInner: () => context.emit('click:prepend-inner'),
    onClickAppendOuter: () => context.emit('click:append-outer'),
    onClickAppendInner: () => context.emit('click:append-inner'),
  }
}

export function getSlotBsEventListeners(context) {
  //slot events
  return {
    onClickPrepend: () => context.emit('click:prepend-outer'),
    onClickAppend: () => context.emit('click:append-outer'),
  }
}

export function getEvents(props, context, internalValue, isFocused, isValidInput, validate) {
  function onClick(event) {
    if (props.disabled) return;
    if (!isFocused.value) context.refs.input.focus();
    isFocused.value = true;
    context.emit('click', event);
  }

  function onFocus(event) {
    console.log('focus')
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
    if (props.validateOnBlur) {
      isValidInput.value = validate(internalValue.value).value
    }
    isFocused.value = false
  }

  function onClearIconClick(event) {
    console.log('clearIconClick')
    internalValue.value = ''
    isValidInput.value = true;
    context.emit('click:clearIcon', event)
  }

  function onChange(event) {
    console.log('change')
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

  return {onClick, onFocus, onBlur, onClearIconClick, onMouseDown, onMouseUp, onChange, onKeyDown}
}

export function getInternalValue(props, context) {
  // text field internalValue
  const rawInternalValue = ref(props.value || '');

  watch(() => props.value, () => rawInternalValue.value = props.value, {lazy: true});

  const internalValue = computed({
    get: () => rawInternalValue.value,
    set: (value) => {
      rawInternalValue.value = value;
      context.emit('input', rawInternalValue.value)
    }
  });

  return internalValue;
}
