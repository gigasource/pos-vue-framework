<template>
  <!--  <div class="tf-wrapper" @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">-->
  <!--    <div class="tf-prepend__outer"></div>-->
  <!--    <div class="tf">-->
  <!--      <div class="tf-prepend__inner">-->
  <!--        <slot></slot>-->
  <!--      </div>-->
  <!--      <input id="input" type="text"-->
  <!--             class="textfield br-2 bg-lgray-5 fw-700"-->
  <!--             :class="classes"-->
  <!--             :style="styles"-->
  <!--             :value="lazyValue"-->
  <!--             :placeholder="placeholder"-->
  <!--             ref="input"-->
  <!--             @input="onInput"-->
  <!--             @change="onChange"-->
  <!--             @focus="onFocus"-->
  <!--             @blur="onBlur"-->
  <!--             @keydown="onKeyDown">-->
  <!--      <label for="input" class="tf-label">-->
  <!--        <slot name="label">{{label}}</slot>-->
  <!--      </label>-->
  <!--      <div class="tf-append__inner">-->
  <!--        <slot></slot>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="tf-append__outer">-->
  <!--      <slot></slot>-->
  <!--    </div>-->
  <!--    <div class="tf-hint">-->
  <!--      <slot></slot>-->
  <!--    </div>-->
  <!--  </div>-->
  <div @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
    <label :class="labelStyles" >
      <slot name="label">{{label}}</slot>
    </label>
    <div class="r mt-1">
      <input type="text"
             class="textfield br-2 bg-lgray-5 fw-700"
             :class="classes"
             :style="styles"
             v-model="internalValue"
             :placeholder="placeholder"
             ref="input"
             @change="onChange"
             @focus="onFocus"
             @blur="onBlur"
             @keydown="onKeyDown"
      />
      <span class="textfield-icon">
				<slot name="append"></slot>
				<img v-if="isDirty && clearable" src="../../assets/delivery/cancel.svg" @click="onClearIconClick">
			</span>
      <span class="textfield-after">
				<slot name="after" :isValidInput="isValidInput"></slot>
			</span>
    </div>
    <p v-show="isValidInput === false" class="textfield-error">{{errorMessage}}</p>
  </div>
</template>

<script>
  import {computed, onUpdated, ref} from '@vue/composition-api';
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
      },
      required: Boolean,
      placeholder: String,
      clearable: Boolean,
      rules: Function,
      errorMessage: String,

      // display
      large: Boolean,
      textColor: {
        type: String,
        default: '#00acc1'
      },
      bordered: Boolean,
      centered: Boolean,
      active: Boolean,

      // basic props
      value: [String, Number],
    },
    setup(props, context) {
      const {listeners, isDisabled, hasLabel} = getGInput(props, context)
      const {counterValue, isDirty, isLabelActive, isFocused, onClick, onFocus, onBlur, internalValue, isValidInput}
          = getGInputField(props, context)

      // template refs
      const input = ref(null)

      // fixme: move to field input mixins: done
      const {classes, styles, labelStyles} = getGInputField(props, context)

      // event listeners
      const {onChange} = listeners
      // const isFocused = ref(false);
      // function onClick(event) {
      //   if (props.disabled || isFocused.value) {
      //     return;
      //   }
      //   context.refs.input.focus();
      //   isFocused.value = true;
      // }
      // function onFocus(event) {
      //   if (!context.refs.input) {
      //     return;
      //   }
      //   if (document.activeElement !== context.refs.input) {
      //     context.refs.input.focus();
      //   }
      //   if (!isFocused.value) {
      //     context.emit('focus', event);
      //     isFocused.value = true;
      //   }
      // }
      // function onBlur(event) {
      //   context.emit('blur', event);
      //   isFocused.value = false;
      // }
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

      const {onClearIconClick} = getGInputField(props, context)

      onUpdated(() => {
        console.log(`internalValue: ${internalValue.value}`)
      })

      return {
        classes,
        styles,
        labelStyles,
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
      }
    }
  }
</script>

<style scoped>
  @import "GInputField.scss";
</style>
