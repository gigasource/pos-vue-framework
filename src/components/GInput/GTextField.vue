<template>
	<div class="tf-wrapper" :class="[tfWrapperClasses, tfErrWrapperClass]" @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
		<div class="tf-prepend__outer" ref="prependRef" @click.stop="onClickPrependOuter">
			<slot name="prepend-outer"></slot>
		</div>
		<fieldset>
			<legend :style="legendStyles">{{label}}</legend>
			<div class='tf' :class="tfErrClasses">
				<div class="tf-prepend__inner" @click="onClickPrependInner">
					<slot name="prependInner">
						<g-icon>{{prependIcon}}</g-icon>
					</slot>
				</div>
				<div v-if="prefix" class="tf-affix" ref="prefixRef">{{prefix}}</div>
				<div class="inputGroup">
					<div class="input">
						<slot name="inputSlot"></slot>
						<input id="input" type="text"
									 class="tf-input"
									 :style="inputErrStyles"
									 :type="type"
									 :label="label"
									 v-model="internalValue"
									 :placeholder="placeholder"
									 :readonly="readOnly"
									 ref="input"
									 @change="onChange"
									 @focus="onFocus"
									 @blur="onBlur"
									 @keydown="onKeyDown"/>
					</div>
					<slot name="label">
						<label for="input" class="tf-label" :class="labelClasses" :style="labelStyles">{{label}}</label>
					</slot>
				</div>
				<div v-if="suffix" class="tf-affix">{{suffix}}</div>
				<div class="tf-append__inner" @click="onClickAppendInner">
					<img v-if="isDirty && clearable" src="../../assets/delivery/cancel.svg" @click.stop="onClearIconClick" alt="clearIcon">
					<slot name="append-inner" :isFocused="isFocused" :isValidInput="isValidInput">
						<g-icon>{{appendIcon}}</g-icon>
					</slot>
				</div>
				<div class="tf-error" v-if="!isValidInput">{{errorMessages}}</div>
				<div class="tf-hint" v-else :class="hintClasses" >{{hint}}</div>
				<div v-show="counter" :class="{'tf-counter': true, 'tf-counter__error': !isValidInput}">{{internalValue.length}} / {{counter}}</div>
			</div>
		</fieldset>
		<div class="tf-append__outer" @click="onClickAppendOuter" ref="appendOuter">

			<slot name="append-outer"></slot>
		</div>

	</div>
</template>

<script>
  import { ref, computed } from '@vue/composition-api';
  import { getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate } from './GInputField';import VueTheMask from 'vue-the-mask'
	import GIcon from "../GIcon/GIcon";

  export default {
    name: 'GTextField',
		components: {GIcon},
		props: {
      ...{//display props
        label: String,
        placeholder: String,
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
      value: [String, Number, Array],
      type: {
        type: String,
        default: 'text',
      },

    },
    setup(props, context) {
      const tfWrapperClasses = getTfWrapperClasses(props);

      const internalValue = getInternalValue(props, context);
      const isValidInput = ref(true)
      const isFocused = ref(false);

      const { labelClasses, labelStyles, isDirty, isLabelActive, prefixRef } = getLabel(props, internalValue, isValidInput, isFocused, 'tf-label__active');

      //Activate non persistent hint
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? { 'tf-hint__active': true } : {})

      //event handler function
      const { errorMessages, validate } = getValidate(props, isFocused, internalValue, isValidInput);

      const inputErrStyles = computed(() => isValidInput.value ? {} : { 'color': 'red' })
      //change input border color
      const tfErrClasses = computed(() => isValidInput.value ? {} : { 'tf__error': true })

      const tfErrWrapperClass = computed(() => ({ 'tf-wrapper__error': !isValidInput.value }));

      const { onClickPrependOuter, onClickPrependInner, onClickAppendOuter, onClickAppendInner, } = getSlotEventListeners(context);

      const { onClick, onFocus, onBlur, onClearIconClick,
				onMouseDown, onMouseUp, onChange, onKeyDown } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);
			//set legend width for label in outlined textfield
			const legendStyles = computed(() => {
			  if(isFocused.value || internalValue.value) {
			    return {
			      'width': 'auto',
						'padding': '1px',
					}
				} else
				  return {}
			});


      return {
				//calculated styles and classes
				labelClasses,
				labelStyles,
				tfErrClasses,
				tfWrapperClasses,
				hintClasses,
				inputErrStyles,
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
    return computed(() => (props.disabled ? { 'tf-wrapper-disabled': true } : {
      'tf__filled': props.filled,
      'tf__outlined': props.outlined,
      'tf__solo': props.solo,
      'tf__rounded': props.rounded,
      'tf__shaped': props.shaped,
      'tf__flat': props.flat,
    }))
  }

</script>

<style lang="scss">
	@import "_GInputField.scss";
</style>
