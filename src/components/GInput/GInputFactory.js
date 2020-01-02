export function getLabel(context, props, internalValue, isValidInput, isFocused,
                         [labelActiveClass] = 'g-tf-label__active') {
  const tfType = computed(() => {
    if (context.slots['prepend-outer'] || props.prependIcon || props.outlined) return 'full'
    return 'lite'
  })
  //Activate label
  const isDirty = computed(() => !!internalValue.value || internalValue.value === 0)
  const isLabelActive = computed(() => {
    const datetimeInputTypes = ['date', 'datetime', 'datetime-local', 'month', 'time', 'week']

    return isDirty.value || isFocused.value || !!props.placeholder || datetimeInputTypes.includes(props.type);
  })
  const labelClasses = computed(() => {
      return {
        'g-tf-label__disabled': props.disabled,
        'g-tf-label__readOnly': props.readOnly,
        'g-tf-label__active': isLabelActive.value,
        'g-tf-label__error': !isValidInput.value,
        'g-tf-label__focused': isFocused.value,
      }
    }
  )
  //Label transform when textfield has prefix, prepend
  const prefixRef = ref(null)
  const prefixWidth = reactive({
    value: 0
  })
  const prependRef = ref(null)
  const prependWidth = ref(0)
  // const prependWidth = computed(() => {
  //   let i = props.filled
  //   console.log(prependRef.value && prependRef.value.offsetWidth)
  //   return prependRef.value && prependRef.value.offsetWidth
  // })
  watch([() => prependRef.value, () => props.filled], () => {
    context.root.$nextTick(() => {
      prependWidth.value = prependRef.value && prependRef.value.offsetWidth
    })
  })


  watch(() => props.prefix, () => {
    context.root.$nextTick(() => {
      prefixWidth.value = prefixRef.value && prefixRef.value.offsetWidth
    })
  })

  const labelStyles = computed(() => {
    if (tfType.value === 'full') {
      if (isLabelActive.value && prefixWidth.value) {
        if (props.outlined) {
          if (props.filled) {
            if (props.rounded) return { 'transform': `translateY(-28px) translateX(${-prefixWidth.value}px)  scale(0.75)` }
            return { 'transform': `translateY(-${props.dense ? 26 : 28}px) translateX(${-prefixWidth.value - 6}px)  scale(0.75)` }
          } else {
            return { 'transform': `translateY(-${props.dense ? 22 : 26}px) translateX(${-prefixWidth.value + 6}px)  scale(0.75)` }
          }
        } else if (props.filled) {
          return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${-prefixWidth.value - 6}px)  scale(0.75)` }
        } else {
          return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${-prefixWidth.value + 6}px)  scale(0.75)` }
        }
      }
    } else {
      if (!isLabelActive.value && (prependWidth.value || prefixWidth.value)) {
        if(props.filled) {
          if(props.rounded || props.shaped ) return { 'padding-left': `${prependWidth.value + prefixWidth.value -17}px` }
          return  { 'padding-left': `${prependWidth.value + prefixWidth.value - 12}px` }}
        return { 'padding-left': `${prependWidth.value + prefixWidth.value}px` }
      }
      if (isLabelActive.value && (prependWidth.value || prefixWidth.value)) {
        if (!prefixWidth.value) return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value}px)  scale(0.75)` }
        else {
          if (props.filled) {
            if (props.rounded) return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value - 4}px)  scale(0.75)` }
            if (props.shaped) return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value - 10}px)  scale(0.75)` }
            return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value -6}px)  scale(0.75)` }
          }
          return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value + 6}px)  scale(0.75)` }
        }
      }

    }
  })

  return { labelClasses, labelStyles, isDirty, isLabelActive, prefixRef, prependRef }
}

import { computed, reactive, ref, watch } from '@vue/composition-api';


import { convertToUnit, keyCodes } from '../../utils/helpers';

export function getValidate(props, isFocused, internalValue, isValidInput, customAlert) {
  //Validation

  function validate(value) {
    const errorBucket = []
    if (props.rules || props.required) {
      let rules = props.rules || []
      props.required ? rules.push(function (value) {
        return !!value || ' '
      }) : rules
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        const validatedValue = typeof rule === 'function' ? rule(value) : rule
        if (typeof validatedValue == 'string') {
          errorBucket.push(validatedValue)
        } else if (typeof validatedValue !== 'boolean') {
          (customAlert || alert)('Something wrong with rules! Check it out!')
        }
      }

      errorMessages.value = errorBucket && `${errorBucket.slice(0, props.errorCount).join(' ')}`
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

  }, !props.value ? { lazy: true } : null)

  return { errorMessages, validate };
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
    internalValue.value = ''
    isValidInput.value = true;
    context.emit('click:clearIcon', event)
  }

  function onChange(event) {
    context.emit('change', event)
  }

  const state = {
    hasMouseDown: false,
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      return context.emit('enter', internalValue.value);
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      return context.emit('delete')
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

  return { onClick, onFocus, onBlur, onClearIconClick, onMouseDown, onMouseUp, onChange, onKeyDown }
}

export function getInternalValue(props, context) {
  // text field internalValue
  const rawInternalValue = ref((props.value || props.value === 0) ? props.value : '');

  watch(() => props.value, () => rawInternalValue.value = props.value, { lazy: true });

  const internalValue = computed({

    get: () => rawInternalValue.value,
    set: (value) => {
      rawInternalValue.value = value;
      context.emit('input', rawInternalValue.value)
    }
  });

  return { internalValue, rawInternalValue };
}
