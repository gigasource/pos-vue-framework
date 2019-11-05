<template>
  <div class="bs-tf-wrapper" @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown"
       :class="{'g-tf--wrapper-disabled': disabled, 'g-tf--wrapper-readonly': readOnly}">
    <label class="bs-tf-label">
      <slot name="label">{{label}}</slot>
    </label>
    <div class="bs-tf-input-group">
      <div class="bs-tf-input-prepend" @click="onClickPrepend" v-if="$slots.prependContent">
				<span class="bs-tf-input-text">
					<slot name="prependContent"></slot>
				</span>
      </div>
      <slot name="prepend" :on-click="onClickPrepend"></slot>
      <input class="bs-tf-input"
             type="text"
             ref="input"
             :placeholder="placeholder"
             :class="{'input-error': !isValidInput,
                      'bs-tf-input-has-prepend': ($slots.prependContent || $slots.prepend),
                      'bs-tf-input-has-append': ($slots.appendContent || $slots.append)}"
             v-model="internalValue"
             @change="onChange"
             @focus="onFocus"
             @blur="onBlur"
             @keydown="onKeyDown">
      <div class="bs-tf-input-append" @click="onClickAppend" v-if="$slots.appendContent">
        <span class="bs-tf-input-text">
					<slot name="appendContent"></slot>
				</span>
      </div>
      <slot name="append" :on-click="onClickAppend"></slot>
    </div>
    <div class="bs-tf-error-message" v-if="!isValidInput">{{errorMessages}}</div>
    <div class="bs-tf-message" v-else>{{hint}}</div>
  </div>
</template>

<script>
  import {ref, computed, onMounted} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate} from './GInputField';

  export default {
    name: 'GTextFieldBs',
    props: {
      ...{//display props
        label: String,
        placeholder: String,
        //input states
        disabled: Boolean,
        readOnly: Boolean,
      },
      //rules and validation props
      rules: Array,
      hint: String,
      validateOnBlur: Boolean,

      // basic props
      value: [String, Number],
      type: {
        type: String,
        default: 'text',
      },
    },
    setup: function (props, context) {
      const internalValue = getInternalValue(props, context);
      const isValidInput = ref(true)
      const isFocused = ref(false);

      //event handler function
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput);

      const {
        onClick, onFocus, onBlur, onClearIconClick,
        onMouseDown, onMouseUp, onChange, onKeyDown
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);

      const onClickPrepend = () => context.emit('click :prepend');
      const onClickAppend = () => context.emit('click :append');

      return {
        internalValue,
        isValidInput,
        //calculated error
        errorMessages,
        //event listeners
        onClick,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onMouseUp,
        onMouseDown,
        onClickPrepend,
        onClickAppend,
        onClearIconClick,
      }
    }
  }

</script>

<style scoped lang="scss">
  .bs-tf-wrapper {
    display: block;
    cursor: text;
    width: calc(100% - 10px);
    margin: 4px 5px 8px;
  }

  .bs-tf-label {
    display: inline-block;
    margin-bottom: 4px;
    font-weight: 400;
  }

  .bs-tf-input-group,
  .bs-tf-input-prepend,
  .bs-tf-input-append {
    display: flex;
  }

  .bs-tf-input-prepend,
  .bs-tf-input-prepend > *:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .bs-tf-input-prepend > * {
    border-right: none !important;
  }

  .bs-tf-input-append > * {
    border-left: none !important;
    z-index: -1; /*display under input box shadow*/
  }

  .bs-tf-input-append,
  .bs-tf-input-append > *:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .bs-tf-input-text {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 400;
    color: #495057;
    background-color: #e9ecef;
    white-space: nowrap;
    text-align: center;
    border: 1px solid #ced4da;
  }

  .bs-tf-input {
    display: block;
    flex: 1 1 auto;
    padding: 6px 12px;
    line-height: 1.5;
    font-size: 16px;
    border: 1px solid #ced4da !important;
    background-color: #fff;
    background-clip: padding-box;
    color: #495057;
    border-radius: 4px;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .bs-tf-input:focus {
    outline: 0;
    border-color: #80bdff !important;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  .bs-tf-input-has-prepend {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .bs-tf-input-has-append {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .bs-tf-message {
    display: block;
    font-size: 80%;
    font-weight: 400;
    margin-top: 2px;
    color: #6c757d;
  }

  .input-error {
    border-color: red !important;
  }

  .bs-tf-error-message {
    @extend .bs-tf-message;
    color: red;
  }
</style>
