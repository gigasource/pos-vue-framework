<template>
  <div class="tf-wrapper" :class="[tfWrapperClasses, tfErrWrapperClass]" @click="onClick" @mouseup="onMouseUp"
       @mousedown="onMouseDown">
    <div class="tf-prepend__outer" ref="prependRef" @click="onClickPrependOuter">
      <slot name="prepend-outer">
        <g-icon>{{prependIcon}}</g-icon>
      </slot>
    </div>
    <fieldset>
      <legend :style="legendStyles">{{label}}</legend>
      <div class='tf' :class="tfErrClasses">
        <div class="tf-prepend__inner" @click="onClickPrependInner">
          <slot name="prepend-inner">
            <g-icon>{{prependInnerIcon}}</g-icon>
          </slot>
        </div>
        <div v-if="prefix" class="tf-affix" ref="prefixRef">{{prefix}}</div>
        <div class="inputGroup">
          <textarea id="tear" ref="input"
                    class="tf-input"
                    :style="tearStyles"
                    :label="label"
                    v-model="internalValue"
                    :placeholder="placeholder"
                    :rows="rows"
                    :cols="cols"
                    @input="onInput"
                    @change="onChange"
                    @focus="onFocus"
                    @blur="onBlur"
                    @keydown="onKeyDown">
          </textarea>
          <label for="tear" class="tf-label" :style="labelStyles">
            <slot name="label">{{label}}</slot>
          </label>
        </div>
        <div v-if="suffix" class="tf-affix">{{suffix}}</div>
        <div class="tf-append__inner" @click="onClickAppendInner">
          <div v-if="isDirty && clearable" @click="onClearIconClick">
            <g-icon class="g-icon__link">cancel</g-icon>
          </div>
          <slot name="append-inner">
            <g-icon>{{appendIcon}}</g-icon>
          </slot>
        </div>
        <div class="tf-error" v-if="!isValidInput">{{errorMessages}}</div>
        <div class="tf-hint" v-else :class="hintClasses">{{hint}}</div>
        <div v-show="counter" :class="{'tf-counter': true, 'tf-counter__error': !isValidInput}">{{internalValue.length}}
          / {{counter}}
        </div>
      </div>
    </fieldset>
    <div class="tf-append__outer" @click="onClickAppendOuter" ref="appendOuter">
      <slot name="append-outer">
        <g-icon>{{appendOuterIcon}}</g-icon>
      </slot>
    </div>
  </div>
</template>

<script>
  import {ref, computed, watch, onMounted, onUpdated} from '@vue/composition-api';
  import {
    getEvents,
    getInternalValue,
    getLabel,
    getSlotEventListeners,
    getValidate,
  } from '../GInput/GInputField';
  import GIcon from "../GIcon/GIcon";

  export default {
    name: 'GTextarea',
    components: {GIcon},
    props: {
      ...{//display props
        label: String,
        placeholder: String,
        prependIcon: String,
        prependInnerIcon: String,
        appendIcon: String,
        appendOuterIcon: String,
        prefix: {
          type: String,
          default: ''
        },
        suffix: {
          type: String,
          default: ''
        },
        //input states
        clearable: Boolean,
        disabled: Boolean,
        readOnly: Boolean,
      },
      //rules and validation props
      rules: Array,
      hint: String,
      errorCount: {
        type: Number,
        default: 1
      },
      persistent: Boolean,
      counter: [Number, Boolean, String],
      validateOnBlur: Boolean,
      error: Boolean,

      //styles
      filled: Boolean,
      outlined: Boolean,
      solo: Boolean,
      shaped: Boolean,
      rounded: Boolean,
      flat: Boolean,

      // basic props
      value: [String, Number],

      //todo textarea
      autoGrow: Boolean,
      noResize: Boolean,
      rowHeight: {
        type: [Number, String],
        default: 24,
        validator: (v) => !isNaN(parseFloat(v)),
      },
      rows: {
        type: [Number, String],
        default: 5,
        validator: (v) => !isNaN(parseInt(v, 10)),
      },
      cols: {
        type: [Number, String],
        default: 1,
        validator: (v) => !isNaN(parseInt(v, 10)),
      },
    },
    setup(props, context) {
      const tfWrapperClasses = getTfWrapperClasses(props);

      const internalValue = getInternalValue(props, context);
      const isValidInput = ref(true)
      const isFocused = ref(false);

      const {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef} = getLabel(props, internalValue, isValidInput, isFocused, 'tf-label__active', {'color': 'red'});

      //Activate non persistent hint
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'tf-hint__active': true} : {})

      //event handler function
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput);

      const inputErrStyles = computed(() => isValidInput.value ? {} : {'color': 'red'})
      const tearStyles = computed(() => {
        return {
          ...inputErrStyles,
          'line-height': props.rowHeight + 'px',
        }
      })
      //change input border color
      const tfErrClasses = computed(() => isValidInput.value ? {} : {'tf__error': true})

      const tfErrWrapperClass = computed(() => ({'tf-wrapper__error': !isValidInput.value}));

      const {onClickPrependOuter, onClickPrependInner, onClickAppendOuter, onClickAppendInner,} = getSlotEventListeners(context);

      const {
        onClick, onFocus, onBlur, onClearIconClick,
        onMouseDown, onMouseUp, onChange, onKeyDown
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);
      //set legend width for label in outlined textfield
      const legendStyles = computed(() => {
        if (isFocused.value || internalValue.value) {
          return {
            'width': 'auto',
            'padding': '1px',
          }
        } else
          return {}
      });

      //todo add textarea logic
      function onInput() {
        props.autoGrow && calculateInputHeight()
      }

      function calculateInputHeight() {
        const input = context.refs.input
        if (!input) return

        input.style.height = '0'
        const height = input.scrollHeight
        const minHeight = (parseInt(props.rows, 10) + 1) * parseFloat(props.rowHeight)
        input.style.height = Math.max(minHeight, height) - 10 + 'px'
      }

      onMounted(() => {
        setTimeout(() => {
          //props.autoGrow && calculateInputHeight(props,context)
          calculateInputHeight()
        }, 0)
      })

      onUpdated(() => {
        setTimeout(() => {
          props.autoGrow && calculateInputHeight()
          //calculateInputHeight(props, context)
        }, 0)
      })

      watch(internalValue, newVal => {
        !newVal && calculateInputHeight()
        props.autoGrow && calculateInputHeight()
      })

      return {
        //calculated styles and classes
        labelClasses,
        labelStyles,
        tfErrClasses,
        tfWrapperClasses,
        hintClasses,
        tearStyles,

        //value
        internalValue,

        //calculated state
        isLabelActive,
        isFocused,
        isDirty,
        isValidInput,

        //calculated error
        errorMessages,

        //event listeners
        onInput,
        onClick,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onMouseUp,
        onMouseDown,
        onClickPrependOuter,
        onClickPrependInner,
        onClickAppendOuter,
        onClickAppendInner,
        onClearIconClick,

        //ref
        prefixRef,
        tfErrWrapperClass,
        legendStyles,
      }
    }
  }

  function getTfWrapperClasses(props) {
    return computed(() => (props.disabled ? {'tf-wrapper-disabled': true} : {
      'tf__filled': props.filled,
      'tf__outlined': props.outlined,
      'tf__solo': props.solo,
      'tf__rounded': props.rounded,
      'tf__shaped': props.shaped,
      'tf__flat': props.flat,
      'tf-wrapper-readonly': props.readOnly,
      //textarea
      'g-textarea': true,
      'g-textarea__auto-grow': props.autoGrow,
      'g-textarea__no-resize': props.noResize || props.autoGrow,
    }))
  }


</script>




