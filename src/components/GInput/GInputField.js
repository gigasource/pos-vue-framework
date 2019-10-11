import {computed, ref, watch} from "@vue/composition-api";
import _ from "lodash";


export default function getGInputField(props, context) {

  //compute class for text field
  const tfWrapperClasses = computed(() => (props.disabled ? {'tf-wrapper-disabled': true} : {
    'tf__filled': props.filled,
    'tf__outlined': props.outlined,
    'tf__solo': props.solo,
    'tf__rounded': props.rounded,
    'tf__shaped': props.shaped,
    'tf__flat': props.flat,
    'tf-wrapper-readonly': props.readOnly,
    'tf-wrapper__error': !isValidInput.value,
  }))

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

  //Activate label
  const isDirty = computed(() => internalValue.value && internalValue.value.toString().length > 0)
  const isLabelActive = computed(() => isDirty.value || isFocused.value)
  const labelClasses = computed(() => isLabelActive.value ? {'tf-label__active': true} : {})

  //Label positioning according to prefix, prepend
  const labelStyles = computed(() => !isValidInput.value ? {'color': 'red'}: {})


  //Activate non persistent hint
  const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'tf-hint__active': true} : {})

  //Value counter
  const counterValue = computed(() => {
    return (internalValue.value).toString().length
  })

  //Validation
  const isValidInput = ref(true);

  const errorMessages = ref('')
  watch(internalValue,
      _.debounce(function () {
        const errorBucket = []
        if (props.rules) {
          for (let i = 0; i < props.rules.length; i++) {
            console.log('validating')
            const rule = props.rules[i]
            const validatedValue = typeof rule === 'function' ? rule(internalValue.value) : rule
            if (typeof validatedValue == 'string') {
              errorBucket.push(validatedValue)
            } else if (typeof validatedValue !== 'boolean') {
              alert('Something wrong with rules! Check it out!')
            }
          }
          // props.errorMessage = errorBucket
          errorMessages.value = errorBucket && `${errorBucket.join('. ')}.`
          errorBucket.length ? isValidInput.value = false : isValidInput.value = true
        }
      }, 300)
  )

  //Error state display
  //change input color
  const inputStyles = computed(() => isValidInput.value ? {} : {'color': 'red'})
  //change input border color
  const tfClasses = computed(() => isValidInput.value ? {} : {'tf__error': true})

  //event handler function
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

  function onClearIconClick(event) {
    lazyValue.value = ''
    context.root.$forceUpdate()
    context.emit('clear', event)
  }

  //slot events
  function onClickPrependOuter(event){
    context.emit('click :prepend-outer')
  }
  function onClickPrependInner(event){
    context.emit('click :prepend-inner')
  }
  function onClickAppendOuter(event){
    context.emit('click :append-outer')
  }
  function onClickAppendInner(event){
    context.emit('click :append-inner')
  }
  const slotEventListener ={
    onClickPrependOuter,
    onClickPrependInner,
    onClickAppendOuter,
    onClickAppendInner,
  }


  return {
    tfClasses,
    hintClasses,
    labelClasses,
    tfWrapperClasses,
    inputStyles,
    labelStyles,
    internalValue,
    counterValue,
    onClearIconClick,
    isDirty,
    isLabelActive,
    isValidInput,
    isFocused,
    onClick,
    onFocus,
    onBlur,
    slotEventListener,
    // calculated error message
    errorMessages,
  }


}
