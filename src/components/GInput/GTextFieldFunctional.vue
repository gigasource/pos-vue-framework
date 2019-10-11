<template>
  <div class="tf-wrapper" :class="tfWrapperClasses" @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
    <div class="tf-prepend__outer" ref="prependRef" @click="onClickPrependOuter">
      <slot name="prepend-outer"></slot>
    </div>
    <fieldset>
      <legend></legend>
      <div class='tf' :class="tfClasses">
        <div class="tf-prepend__inner" @click="onClickPrependInner">
          <slot name="prepend-inner"></slot>
        </div>
        <div class="tf-affix" ref="prefixRef">{{prefix}}</div>
        <div class="inputGroup">
          <input id="input" type="text"
                 class="tf-input"
                 :style="inputStyles"
                 :type="type"
                 :label="label"
                 v-model="internalValue"
                 :placeholder="placeholder"
                 ref="input"
                 @change="onChange"
                 @focus="onFocus"
                 @blur="onBlur"
                 @keydown="onKeyDown">
          <label for="input" class="tf-label" :style="labelStyles" >
            <slot name="label">{{label}}</slot>
          </label>
        </div>

        <div class="tf-append__inner" @click="onClickAppendInner">
          <slot name="append-inner"></slot>
        </div>
      </div>
    </fieldset>
    <div class="tf-append__outer" @click="onClickAppendOuter">
      <img v-if="isDirty && clearable" src="../../assets/delivery/cancel.svg" @click="onClearIconClick">
      <slot name="append-outer"></slot>

    </div>
    <div class="tf-error" v-if="!isValidInput">{{errorMessages}}</div>
    <div class="tf-hint" v-else :class="hintClasses">{{hint}}</div>
    <div v-show="counter" class="tf-counter">{{counterValue}} / {{counter}}</div>
  </div>
</template>

<script>
  import { ref } from '@vue/composition-api';
  import getGInput from "./GInput";
  import getGInputField from "./GInputField";
  import {keyCodes} from '../../utils/helpers';

  export default {
    name: "GTextFieldFunctional",
    props: {
      ...{
        label: String,
        placeholder: String,
        clearable: Boolean,
        disabled: Boolean,
        readOnly: Boolean,
        appendIcon: String,
        prependIcon: String,
        prefix: {
          type: String,
          default: ''
        },
        suffix: {
          type: String,
          default: ''
        },
      },
      //rules and validate

      rules: Array,
      hint: String,

      messages: {
        type: [String, Array],
        default: () => [],
      },
      errorCount: {
        type: Number,
        default: 1
      },
      persistent: Boolean,
      counter: [Number, Boolean, String],
      validateOnBlur: Boolean,
      error: Boolean,

      // display
      large: Boolean,
      textColor: {
        type: String,
        default: '#00acc1'
      },
      bordered: Boolean,
      centered: Boolean,
      active: Boolean,

      //styles
      filled: Boolean,
      outlined: Boolean,
      solo: Boolean,
      shaped: Boolean,
      rounded: Boolean,
      flat: Boolean,

      // basic props
      value: [String, Number],
      type: {
        type: String,
        default: 'text',
      },

    },
    setup(props, context) {
      const {listeners} = getGInput(props, context)
      const {
        counterValue,
        isDirty,
        isLabelActive,
        isFocused,
        onClick,
        onFocus,
        onBlur,
        slotEventListener,
        internalValue,
        isValidInput,
        onClearIconClick,
        tfWrapperClasses,
        hintClasses,
        labelStyles,
        labelClasses,
        tfClasses,
        inputStyles,
        errorMessages,
          prependRef,
          prefixRef,
      } = getGInputField(props, context)

      // template refs
      const input = ref(null)


      // event listeners
      const {onChange} = listeners
      const {onClickPrependOuter, onClickPrependInner, onClickAppendOuter, onClickAppendInner,} = slotEventListener

      function onKeyDown(event) {
        if (event.keyCode === keyCodes.enter && props.isDirty()) {
          context.emit('change', internalValue.value);
        }
        context.emit('keydown', event)
      }

      function onMouseUp(event) {
        listeners.onMouseUp(event);
        onFocus();
      }

      function onMouseDown(event) {
        listeners.onMouseDown(event);
        if (event.target !== context.refs.input) {
          event.preventDefault();
          event.stopPropagation();
        }
      }

      return {
        labelClasses,
        labelStyles,
        tfClasses,
        tfWrapperClasses,
        hintClasses,
        internalValue,
        counterValue,
        isLabelActive,
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
        isFocused,
        isDirty,
        isValidInput,
        inputStyles,
        errorMessages,
        prependRef,
        prefixRef,
      }
    }
  }
</script>

<style scoped>
  @import "_GInputField.scss";
</style>
