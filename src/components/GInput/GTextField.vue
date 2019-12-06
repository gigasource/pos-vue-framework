<template>
  <div class="g-tf-wrapper" :class="[tfWrapperClasses, tfErrWrapperClass]" @click="onClick" @mouseup="onMouseUp"
       @mousedown="onMouseDown">
    <div v-if="prependIcon" class="g-tf-prepend__outer" ref="prependRef" @click="onClickPrependOuter">
      <slot name="prepend-outer">
        <g-icon :color=iconColor>{{prependIcon}}</g-icon>
      </slot>
    </div>
    <fieldset>
      <legend :style="legendStyles">{{label}}</legend>
      <div class='g-tf' :class="tfErrClasses">
        <div v-if="prependInnerIcon" class="g-tf-prepend__inner" @click="onClickPrependInner">
          <slot name="prepend-inner">
            <g-icon :color=iconColor>{{prependInnerIcon}}</g-icon>
          </slot>
        </div>
        <div v-if="prefix" class="g-tf-affix" ref="prefixRef">{{prefix}}</div>
        <div class="inputGroup">
          <div class="input">
            <slot name="input-slot" :inputErrStyles="inputErrStyles"></slot>
            <input autocomplete="off"
                   :autofocus="autofocus"
                   class="g-tf-input"
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
                   @keydown="onKeyDown">
          </div>
          <slot name="label">
            <label class="g-tf-label" :class="labelClasses" :style="labelStyles">
              {{label}}
              <span v-if="required" style="color: red">*</span>
            </label>
          </slot>

        </div>
        <div v-if="suffix" class="g-tf-affix">{{suffix}}</div>
        <div class="g-tf-append__inner" @click="onClickAppendInner">
          <slot name="clearable-slot" :iconColor="iconColor">
            <g-icon v-if="isDirty && clearable" @click.stop="onClearIconClick" :color=iconColor>{{clearIcon}}</g-icon>
          </slot>

          <slot name="append-inner" :iconColor="iconColor">
            <g-icon :color=iconColor>{{appendInnerIcon}}</g-icon>
          </slot>
        </div>
        <slot name="input-message">
          <div class="g-tf-error" v-if="!isValidInput && errorMessages">{{errorMessages}}</div>
          <div class="g-tf-hint" v-else-if="isValidInput && hint" :class="hintClasses">
            <slot name="hint">{{hint}}</slot>
          </div>
          <div v-show="counter" :class="{'g-tf-counter': true, 'g-tf-counter__error': !isValidInput}">
            {{internalValue.length}} / {{counter}}
          </div>
        </slot>
      </div>
    </fieldset>

    <slot name="append-outer">
      <div v-if="appendIcon" class="g-tf-append__outer" @click="onClickAppendOuter">
        <g-icon :color=iconColor>{{appendIcon}}</g-icon>
      </div>
    </slot>


  </div>
</template>

<script>
  import {ref, computed} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate} from './GInputFactory';
  import VueTheMask from 'vue-the-mask'
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GTextField',
    components: {GIcon},
    props: {
      ...{//display props
        label: String,
        placeholder: String,
        appendIcon: String,
        prependIcon: String,
        prependInnerIcon: String,
        appendInnerIcon: String,
        clearIcon: {
          type: String,
          default: 'clear'
        },
        prefix: String,
        suffix: String,
        //input states
        clearable: Boolean,
        disabled: Boolean,
        readOnly: Boolean,
      },
      //rules and validation props
      ...{
        required: Boolean,
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

      },

      //styles
      ...{
        filled: Boolean,
        outlined: Boolean,
        solo: Boolean,
        shaped: Boolean,
        rounded: Boolean,
        flat: Boolean,
        dense: Boolean
      },

      // basic props
      value: [String, Number, Array, Object],
      type: {
        type: String,
        default: 'text',
      },
      autofocus: Boolean,

    },
    setup(props, context) {

      const tfWrapperClasses = getTfWrapperClasses(props);

      const {internalValue, rawInternalValue} = getInternalValue(props, context);
      const isValidInput = ref(true)
      const isFocused = ref(false);

      const {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef} = getLabel(context, props, internalValue, isValidInput, isFocused, 'g-tf-label__active');

      //Activate non persistent hint
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})

      //event handler function
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput);

      const inputErrStyles = computed(() => isValidInput.value ? {} : {'color': 'red'})
      //change input border color
      const tfErrClasses = computed(() => isValidInput.value ? {} : {'g-tf__error': true})

      const tfErrWrapperClass = computed(() => ({'g-tf-wrapper__error': !isValidInput.value}));

      const {onClickPrependOuter, onClickPrependInner, onClickAppendOuter, onClickAppendInner,} = getSlotEventListeners(context);

      const {
        onClick, onFocus, onBlur, onClearIconClick,
        onMouseDown, onMouseUp, onChange, onKeyDown
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);
      //set legend width for label in outlined textfield
      const legendStyles = computed(() => {
        if (!props.solo && props.label && (isFocused.value || internalValue.value || props.placeholder)) {
          const margin = props.rounded ? (props.filled ? '24px' : '16px') : (props.shaped ? '12px' : '5px');
          return {
            'width': 'auto',
            'padding': '0 2px',
            'margin-left': margin,
          }
        }
      });
      const iconColor = computed(() => {
        if (isFocused.value) {
          if (!isValidInput.value) return 'red'
          return 'rgb(24, 103, 192)'
        }
      })


      return {
        //calculated styles and classes
        labelClasses,
        labelStyles,
        tfErrClasses,
        tfWrapperClasses,
        hintClasses,
        inputErrStyles,
        iconColor,
        //value
        internalValue,
        rawInternalValue,
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
    return computed(() => {
      return {
        'g-tf-wrapper__disabled': props.disabled,
        'g-tf__filled': props.filled,
        'g-tf__outlined': props.outlined,
        'g-tf__solo': props.solo,
        'g-tf__rounded': props.rounded,
        'g-tf__shaped': props.shaped,
        'g-tf__flat': props.flat,
        'g-tf__dense': props.dense,
      }
    })
  }

</script>

<style lang="scss">
  @import "_GInputField.scss";
</style>
