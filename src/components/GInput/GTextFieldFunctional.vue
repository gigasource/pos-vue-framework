<template>
  <div class="tf-wrapper" :class="tfClasses" @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
    <div class="tf-prepend__outer"></div>
    <fieldset>
      <div class="tf">
        <div class="tf-prepend__inner">
          <slot></slot>
        </div>
        <span ref="prefixRef" class="tf-affix">{{prefix}}</span>
        <input id="input" type="text"
               class="tf-input"
               :type="type"
               :label="label"
               v-model="internalValue"
               :placeholder="placeholder"
               ref="input"
               @change="onChange"
               @focus="onFocus"
               @blur="onBlur"
               @keydown="onKeyDown">
        <label for="input" class="tf-label" :class="labelClasses" :style="labelStyles">
          <slot name="label">{{label}}</slot>
        </label>
        <span class="tf-affix">{{suffix}}</span>
        <div class="tf-append__inner">
          <slot></slot>
        </div>
      </div>
    </fieldset>
    <div class="tf-append__outer" @click="onClearIconClick">
      <slot></slot>
      <img v-if="isDirty && clearable" src="../../assets/delivery/cancel.svg">
    </div>
    <div class="tf-error" v-if="!isValidInput">{{errorMessage}}</div>
    <div class="tf-hint" v-else-if="!solo" :class="hintClasses">{{hint}}</div>
    <div v-show="counter" class="tf-counter">{{counterValue}} / {{maxlength}}</div>
  </div>
</template>

<script>
  import {computed, ref, onMounted} from '@vue/composition-api';
  import getGInput from "./GInput";
  import getGInputField from "./GInputField";
  import {keyCodes} from '../../utils/helpers';

  export default {
    name: "GTextFieldFunctional",
    props: {
      ...{
        label: String,
        disabled: Boolean,
        readOnly: Boolean,
        appendIcon: String,
        prependIcon: String,
        prefix: String,
        suffix: String,
      },
      required: Boolean,
      placeholder: String,
      clearable: Boolean,
      rules: Function,
      hint: String,
      persistent: Boolean,
      errorMessage: String,
      counter: Boolean,
      maxlength: String,

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
        hasIcon,
        onClick,
        onFocus,
        onBlur,
        internalValue,
        isValidInput,
        onClearIconClick,
        prependClasses,
        tfClasses,
        hintClasses,
        labelStyles,
        labelClasses,
        prefixRef,
      } = getGInputField(props, context)

      // template refs
      const input = ref(null)


      // event listeners
      const {onChange} = listeners

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
        prefixRef,
        labelClasses,
        labelStyles,
        prependClasses,
        tfClasses,
        hintClasses,
        internalValue,
        counterValue,
        isLabelActive,
        onClick,
        onChange,
        onFocus,
        onBlur,
        isFocused,
        onKeyDown,
        onMouseUp,
        onMouseDown,
        onClearIconClick,
        isDirty,
        isValidInput,
        hasIcon,
      }
    }
  }
</script>

<style scoped>
  @import "_GInputField.scss";
</style>
