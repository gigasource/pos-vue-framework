import { nextTick, getCurrentInstance } from 'vue'

// impact: next tick
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
  watch([() => prependRef.value, () => props.filled], () => {
    nextTick(() => {
      prependWidth.value = prependRef.value && prependRef.value.offsetWidth
    })
  })


  watch(() => props.prefix, () => {
    nextTick(() => {
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
          if(props.rounded || props.shaped ) return { 'padding-left': `${prependWidth.value + prefixWidth.value -5}px` }
          return  { 'padding-left': `${prependWidth.value + prefixWidth.value}px` }}
        return { 'padding-left': `${prependWidth.value + prefixWidth.value -1}px` }
      }
      if (isLabelActive.value && (prependWidth.value || prefixWidth.value)) {
        if (!prefixWidth.value) {
          if(props.filled) {
            if(props.rounded||props.shaped)return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value-2}px)  scale(0.75)` }
            return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value}px)  scale(0.75)` }}
          return { 'transform': `translateY(-${props.dense ? 12 : 16}px) translateX(${prependWidth.value}px)  scale(0.75)` }
        }
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

import { computed, reactive, ref, watch } from 'vue';

export function getValidate(props, isFocused, internalValue, isValidInput, customAlert) {
  //Validation

  function validate(value) {
    const errorBucket = []
    if(props.error) {
      isValid.value = false
      errorMessages.value = props.error
      return isValid
    }
    if (props.rules || props.required) {
      let rules = props.rules ? _.cloneDeep(props.rules) : []
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
  watch(() => [internalValue.value, props.rules, props.error], () => {
    validate(internalValue.value)
    if (!props.validateOnBlur) {
      isValidInput.value = isValid.value
    } else if (isValid.value) {
      isValidInput.value = true
    }

  }, !props.modelValue ? { lazy: true } : {})

  return { errorMessages, validate };
}

// impact: emit event name -- double check if event name contain : is allowed
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

// todo: impact context.refs <-> domRefs
export function getEvents(props, context, internalValue, isFocused, isValidInput, validate) {
  const currentInstance = getCurrentInstance()

  function onClick(event) {
    if (props.disabled) return;

    if (!props.readonly && !props.readOnly) {
      if (!isFocused.value) currentInstance.refs['input'] && currentInstance.refs['input'].focus();

      isFocused.value = true;
      document.caretElement = new Caret(currentInstance.refs['input'])
      const caret = currentInstance.refs['caret']
      if (caret) {
        document.caretElement.set(caret.children.length + 1)
        for (const child of caret.children) {
          child.classList.remove('animated-caret')
        }
        caret.lastElementChild && (caret.lastElementChild.classList.add('animated-caret'))
      }
    }

    context.emit('click', event);
  }

  function onFocus(event) {
    if (!currentInstance.refs['input']) return;
    if (document.activeElement !== currentInstance.refs['input']) {
      currentInstance.refs['input'].focus();
    }
    if (!isFocused.value) {
      context.emit('focus', event);
      isFocused.value = true;
    }
  }

  function onBlur(event) {
    if(props.virtualEvent) return
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
      return context.emit('enter', event);
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
    if (event.target !== currentInstance.refs['input']) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  return { onClick, onFocus, onBlur, onClearIconClick, onMouseDown, onMouseUp, onChange, onKeyDown }
}

export function getInternalValue(props, context) {
  // text field internalValue
  const rawInternalValue = ref((props.modelValue || props.modelValue === 0) ? props.modelValue : '');

  watch(() => props.modelValue, () => rawInternalValue.value = props.modelValue)

  const internalValue = computed({
    get: () => rawInternalValue.value,
    set: (value) => {
      rawInternalValue.value = value;
      context.emit('update:modelValue', rawInternalValue.value)
    }
  });

  return { internalValue, rawInternalValue };
}

// todo: impact: context.refs <-> domRefs
export function getVirtualCaret(props, context, internalValue, isFocused) {
  const currentInstance = getCurrentInstance()
  const tfLetters = computed(() => internalValue.value ? internalValue.value.toString().split('') : [])
  const selectLetter = (event, index) => {
    currentInstance.refs['input'].click()
    const target = event.target
    let parent = target.parentElement
    for(const child of parent.children) {
      child.classList.remove('animated-caret')
    }
    const {width, x} = target.getBoundingClientRect()
    const offset = event.clientX - x
    document.caretElement = new Caret(currentInstance.refs['input'])
    if(offset > width/2) {
      target.classList.add('animated-caret')
      document.caretElement.set(index + 1)
    } else {
      target.previousSibling.classList && target.previousSibling.classList.add('animated-caret')
      document.caretElement.set(index)
    }
  }

  return { tfLetters, selectLetter}
}

export const inputEvents = [
  'blur',
  'change',
  'click',
  'click:clearIcon',
  'click:append-inner',
  'click:append-outer',
  'click:prepend-inner',
  'click:prepend-outer',
  'delete',
  'enter',
  'focus',
  'keydown',
  'mouseup',
  'mousedown',
  'update:modelValue'
]
