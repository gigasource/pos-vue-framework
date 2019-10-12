<template>
	<div class="tf-wrapper" :class="[tfWrapperClasses, tfErrWrapperClass]" @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
		<div class="tf-prepend__outer" ref="prependRef" @click="onClickPrependOuter">
			<slot name="prepend-outer"></slot>
		</div>
		<fieldset>
			<legend></legend>
			<div class='tf' :class="tfErrClasses">
				<div class="tf-prepend__inner" @click="onClickPrependInner">
					<slot name="prepend-inner"></slot>
				</div>
				<div class="tf-affix" ref="prefixRef">{{prefix}}</div>
				<div class="inputGroup">
					<input id="input" type="text"
								 class="tf-input"
								 :style="inputErrStyles"
								 :type="type"
								 :label="label"
								 v-model="internalValue"
								 :placeholder="placeholder"
								 ref="input"
								 @change="onChange"
								 @focus="onFocus"
								 @blur="onBlur"
								 @keydown="onKeyDown">
					<label for="input" class="tf-label" :style="labelStyles">
						<slot name="label">{{label}}</slot>
					</label>
				</div>
				<div class="tf-affix">{{suffix}}</div>
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
		<div v-show="counter" class="tf-counter">{{internalValue.length}} / {{counter}}</div>
	</div>
</template>

<script>
  import { ref, computed } from '@vue/composition-api';
  import { getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate } from './GInputField';

  export default {
    name: 'GTextFieldFunctional',
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
			value: [String, Number],
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

      const { labelClasses, labelStyles, isDirty, isLabelActive, prefixRef } = getLabel(internalValue, isValidInput, isFocused, 'tf-label__active', { 'color': 'red' });

      //Activate non persistent hint
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? { 'tf-hint__active': true } : {})

      //event handler function
      const { errorMessages } = getValidate(props, isFocused, internalValue, isValidInput);

      const inputErrStyles = computed(() => isValidInput.value ? {} : { 'color': 'red' })
      //change input border color
      const tfErrClasses = computed(() => isValidInput.value ? {} : { 'tf__error': true })

      const tfErrWrapperClass = computed(() => ({ 'tf-wrapper__error': !isValidInput.value }));

      const { onClickPrependOuter, onClickPrependInner, onClickAppendOuter, onClickAppendInner, } = getSlotEventListeners(context);

      const { onClick, onFocus, onBlur, onClearIconClick, onMouseDown, onMouseUp, onChange, onKeyDown } = getEvents(props, context, internalValue, isFocused, isValidInput);

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
        tfErrWrapperClass
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
      'tf-wrapper-readonly': props.readOnly
    }))
  }

</script>

<style scoped>
	@import "_GInputField.scss";
</style>
