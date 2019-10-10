import {computed, ref, watch} from "@vue/composition-api";
import _ from "lodash";


export default function getGInputField(props, context) {

  //compute class for text field
  const tfWrapperClasses = computed(() => (props.disabled ? {'tf-wrapper-disabled' : true} : {
    'tf__filled' : props.filled,
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
  const labelClasses = computed(() => isLabelActive.value ? {'tf-label__active': true}:{})

  //Label positioning according to prefix, prepend
  const prefixRef = ref(null)
  const prependRef = ref(null)
  const prefixWidth = computed(() => prefixRef.value ? prefixRef.value.offsetWidth : 0)
  const prependWidth = computed(() => prependRef.value ? prependRef.value.offsetWidth : 0)
  const labelStyles = computed(() =>{
    let style = {}
    if(isLabelActive.value){
      Object.assign(style,{'transform': 'translateY(-18px) translateX('+ -(prefixWidth.value+prependWidth.value) + 'px)  scale(0.75)'} )
  }
    //Has prefix or prepend
    if (props.prefix || prependRef.value ){
      Object.assign(style,{'left': prefixWidth.value+prependWidth.value+8 +'px'})
    }
    //Error occur
    if(!isValidInput.value){
      Object.assign(style,{'color': 'red'})
    }
    return style

  })

  //Label with Icon (indent label)
  const hasIcon = computed(() => props.prependIcon )
  const prependClasses = computed(() => hasIcon.value
      ?{
    "tf-prepend__inner": true,
    'tf-icon__active': true,
      }
      :{'tf-prepend__inner': true}

  )


  //Activate non persistent hint
  const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'tf-hint__active' : true} : {})

  //Value counter
  const counterValue = computed(() => {
    return (internalValue.value).toString().length
  })

  //Validation
  const isValidInput = ref(true);

  function validate(value){
    const errorBucket = []
    value = value || internalValue.value
    for (let i = 0 ; i < props.rules.length; i++ ){
      const rule = props.rules[i]
      const validatedValue = typeof rule === 'function' ? rule(value) : rule
      if( typeof validatedValue == 'string'){
        errorBucket.push(validatedValue)
      }
      else if(typeof validatedValue !== 'boolean'){
        alert('Something wrong with rules! Check it out!')
      }
      return errorBucket

    }
  }
  // watch(() => validate(internalValue.value))
  watch(() => internalValue.value,
      _.debounce(function()  {
    if (props.rules && typeof props.rules === 'function') {
      isValidInput.value = props.rules(internalValue.value);
    }
  }, 500))

  //Error state display
    //change input color
  const inputStyles = computed(() => isValidInput.value ?{} : {'color': 'red'} )
    //change input border color
  const tfClasses = computed(() => isValidInput.value ? {} :{'tf__error': true})

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

  return {
    tfClasses,
    hintClasses,
    labelClasses,
    tfWrapperClasses,
    inputStyles,
    labelStyles,
    prefixRef,
    prependRef,
    prependClasses,
    internalValue,
    counterValue,
    onClearIconClick,
    isDirty,
    isLabelActive,
    isValidInput,
    isFocused,
    hasIcon,
    onClick,
    onFocus,
    onBlur
  }


}
