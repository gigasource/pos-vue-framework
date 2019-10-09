import {computed, ref, watch} from "@vue/composition-api";
import _ from "lodash";


export default function getGInputField(props, context) {
  //compute class for text field
  const tfClasses = computed(() => (props.disabled ? {'tf-wrapper-disabled' : true} : {
    'tf__filled' : props.filled,
    'tf__outlined': props.outlined,
    'tf__solo': props.solo,
    'tf__rounded': props.rounded,
    'tf__shaped': props.shaped,
    'tf__flat': props.flat,
    'tf-wrapper-readonly': props.readOnly,
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

  //watcher for validation
  const isValidInput = ref(true);
  watch(() => internalValue.value,
      _.debounce(function () {
        if (props.rules && typeof props.rules == 'function') {
          isValidInput.value = props.rules(internalValue.value);
        }
      }, 300))

  //Activate label
  const isDirty = computed(() => internalValue.value && internalValue.value.toString().length > 0)
  const isLabelActive = computed(() => isDirty.value || isFocused.value)
  const labelClasses = computed(() => isLabelActive.value ? {'tf-label__active': true}:{})

  //Label positioning
  const prefixRef = ref(null)
  const prefixWidth = computed(() => prefixRef.value ? prefixRef.value.offsetWidth : 0)
  const labelStyles = computed(() =>{
    if(isLabelActive.value){
    return{'transform': 'translateY(-18px)  scale(0.75)'}
  }
    if (props.prefix  ){
      return{'left': prefixWidth.value+'px'}
    }

  })

  //Label with Icon
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
    labelStyles,
    prefixRef,
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
