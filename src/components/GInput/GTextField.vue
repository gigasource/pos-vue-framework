<template>
  <div v-if="tfType === 'full'" :class="[tfWrapperClasses, tfErrWrapperClass]" @click="onClick" @mouseup="onMouseUp"
       @mousedown="onMouseDown">
    <div v-if="$slots['prepend-outer'] || prependIcon" class="g-tf-prepend__outer">
      <slot name="prepend-outer">
        <g-icon :color=iconColor @click="onClickPrependOuter">{{prependIcon}}</g-icon>
      </slot>
    </div>
    <fieldset>
      <legend :style="legendStyles">{{label}}</legend>
      <div class='g-tf' :class="tfErrClasses">
        <div v-if="$slots['prepend-inner'] || prependInnerIcon" class="g-tf-prepend__inner" ref="prependRef">
          <slot name="prepend-inner">
            <g-icon :color=iconColor @click="onClickPrependInner">{{prependInnerIcon}}</g-icon>
          </slot>
        </div>
        <div v-if="prefix" class="g-tf-affix" ref="prefixRef">{{prefix}}</div>
        <div class="inputGroup">
          <div class="input">
            <slot name="input-slot" :inputErrStyles="inputErrStyles"/>
            <input :autocomplete="autocomplete"
                   :autofocus="autofocus"
                   class="g-tf-input"
                   :style="inputErrStyles"
                   :type="type"
                   :label="label"
                   v-model="internalValue"
                   :placeholder="placeholder"
                   :readonly="readOnly || virtualEvent"
                   ref="input"
                   @change="onChange"
                   @focus="onFocus"
                   @blur="onBlur"
                   @keydown="onKeyDown"
                   v-bind="attrs"
            >
            <div v-if="virtualEvent" ref="caret" class="g-tf-input g-tf-input--fake-caret">
              <span></span>
              <template v-for="(letter, i) in tfLetters">
                <span v-if="letter !== ' '" @click.stop.prevent="e => selectLetter(e, i)">{{ letter }}</span>
                <span v-else @click.stop.prevent="e => selectLetter(e, i)">i</span> <!-- use i letter because width ~ space -->
              </template>
            </div>
          </div>
          <slot name="label">
            <label v-if="label" class="g-tf-label" :class="labelClasses" :style="labelStyles">
              {{label}}
              <span v-if="required" style="color: red">*</span>
            </label>
          </slot>
        </div>
        <div v-if="suffix" class="g-tf-affix">{{suffix}}</div>
        <div v-if="$slots['append-inner'] || appendInnerIcon || (isDirty && clearable)" class="g-tf-append__inner"
             @click="onClickAppendInner">
          <slot name="clearable-slot" :iconColor="iconColor">
            <g-icon v-if="isDirty && clearable" @click.stop="onClearIconClick" :color=iconColor>{{clearIcon}}</g-icon>
          </slot>

          <slot name="append-inner" :iconColor="iconColor">
            <g-icon v-if="appendInnerIcon" :color=iconColor>{{appendInnerIcon}}</g-icon>
          </slot>
        </div>
        <slot name="input-message" :isValid="isValidInput" :errorMess="errorMessages">
          <div class="g-tf-error" v-if="!isValidInput && errorMessages">{{errorMessages}}</div>
          <div class="g-tf-hint" v-else-if="isValidInput && hint || $slots['hint']" :class="hintClasses">
            <slot name="hint">{{hint}}</slot>
          </div>
          <div v-if="counter" :class="{'g-tf-counter': true, 'g-tf-counter__error': !isValidInput}">
            {{internalValue.toString().length}} / {{counter}}
          </div>
        </slot>
      </div>
    </fieldset>

    <div v-if="appendIcon|| $slots['append-outer']" class="g-tf-append__outer" @click="onClickAppendOuter">
      <slot name="append-outer">
        <g-icon :color=iconColor>{{appendIcon}}</g-icon>
      </slot>
    </div>

  </div>
  <div v-else :class="['g-tf-wrapper',tfWrapperClasses, tfErrWrapperClass, 'r']" :style="tfWrapperStyles" @click="onClick"
       @mouseup="onMouseUp"
       @mousedown="onMouseDown">
    <div v-if="$slots['prepend-inner'] || prependInnerIcon" class="g-tf-prepend__inner"
         @click="onClickPrependInner" ref="prependRef">
      <slot name="prepend-inner" :iconColor="iconColor">
        <g-icon :color=iconColor>{{prependInnerIcon}}</g-icon>
      </slot>
    </div>
    <span v-if="prefix" class="g-tf-affix" :style="affixStyles" ref="prefixRef">{{prefix}} </span>

    <component :is="$slots['append-inner'] || appendInnerIcon || clearable ? 'div' : 'pass-through'"
               class="input">
      <slot name="input-slot"/>
      <input :autocomplete="autocomplete"
             :autofocus="autofocus"
             class="g-tf-input"
             :style="[inputErrStyles]"
             :type="type"
             :label="label"
             v-model="internalValue"
             :placeholder="placeholder"
             :readonly="readOnly || virtualEvent"
             ref="input"
             @change="onChange"
             @focus="onFocus"
             @blur="onBlur"
             @keydown="onKeyDown"
             v-bind="attrs"
      >
      <div v-if="virtualEvent" ref="caret" class="g-tf-input g-tf-input--fake-caret">
        <span></span>
        <template v-for="(letter, i) in tfLetters">
          <span v-if="letter !== ' '" @click.stop.prevent="e => selectLetter(e, i)">{{ letter }}</span>
          <span v-else @click.stop.prevent="e => selectLetter(e, i)">i</span> <!-- use i letter because width ~ space -->
        </template>
      </div>
    </component>
    <slot name="label">
      <label v-if="!solo && label" class="g-tf-label" :class="labelClasses" :style="labelStyles">
        {{label}}
        <span v-if="required" style="color: red">*</span>
      </label>
    </slot>
    <span v-if="suffix" class="g-tf-affix" :style="affixStyles">{{suffix}} </span>

    <div v-if="$slots['append-inner'] || appendInnerIcon || (isDirty && clearable)" class="g-tf-append__inner"
         @click="onClickAppendInner">
      <slot name="clearable-slot" :iconColor="iconColor">
        <g-icon v-if="isDirty && clearable" @click.stop="onClearIconClick" :color=iconColor>{{clearIcon}}</g-icon>
      </slot>
      <slot name="append-inner" :iconColor="iconColor">
        <g-icon v-if="appendInnerIcon" :color=iconColor>{{appendInnerIcon}}</g-icon>
      </slot>
    </div>

    <slot name="input-message" :isValid="isValidInput" :errorMess="errorMessages">
			<span class="g-tf-error" v-if="!isValidInput && errorMessages">
				<slot name="errorMessage" :isValidInput="isValidInput">
					{{errorMessages}}
				</slot>
			</span>
      <span class="g-tf-hint" v-else-if="isValidInput && hint || $slots['hint']" :class="hintClasses">
				<slot name="hint">{{hint}}</slot>
			</span>
      <span v-if="counter" :class="{'g-tf-counter': true, 'g-tf-counter__error': !isValidInput}">
				{{internalValue.toString().length}} / {{counter}}
			</span>
    </slot>
  </div>
</template>

<script>
  import {computed, ref, onMounted, nextTick, h, getCurrentInstance} from 'vue';
  import {
    getEvents,
    getInternalValue,
    getLabel,
    getSlotEventListeners,
    getValidate,
    getVirtualCaret,
    inputEvents
  } from './GInputFactory';
  import GIcon from '../GIcon/GIcon';
  import '../GKeyboard/jsCaret.js';
  import PassThrough from './PassThrough';
  import _ from 'lodash'

  export default {
    name: 'GTextField',
    components: {
      GIcon, PassThrough
    },
    emits: _.union(inputEvents, [ 'blur' ]),
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
        clearIconColor: String,
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
        error: String,

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
      // value use for validation when input doesn't have value itself
      prependValue: {
        type: String,
        default: '',
      },
      modelValue: [String, Number, Array, Object],
      type: {
        type: String,
        default: 'text',
      },
      autofocus: Boolean,
      autocomplete: {
        type: String,
        default: 'off'
      },
      virtualEvent: Boolean,
    },
    setup(props, context) {
      const currentInstance = getCurrentInstance()
      const tfType = computed(() => {
        if (context.slots['prepend-outer'] || context.slots['append-outer']
            || props.prependIcon || props.outlined || props.appendIcon )
          return 'full'
        return 'lite'
      })

      const tfWrapperClasses = computed(() => {
        return {
          'g-tf-wrapper': tfType.value === 'full',
          'g-tf': tfType.value === 'lite',
          'g-tf-wrapper__disabled': props.disabled,
          'g-tf__filled': props.filled,
          'g-tf__outlined': props.outlined,
          'g-tf__solo': props.solo,
          'g-tf__rounded': props.rounded,
          'g-tf__shaped': props.shaped,
          'g-tf__flat': props.flat,
          'g-tf__dense': props.dense,
          'g-tf__focused': isFocused.value
        }
      })
      const tfWrapperStyles = computed(() => tfType.value === 'no-wrapper' ? {'margin': '16px 0 24px 0'} : null)

      const {internalValue, rawInternalValue} = getInternalValue(props, context);
      const tfValue = computed(() => props.prependValue + internalValue.value)
      const isValidInput = ref(true)
      const isFocused = ref(false);

      const {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef, prependRef} = getLabel(context, props, tfValue, isValidInput, isFocused, 'g-tf-label__active');

      //Activate non persistent hint
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})

      //event handler function
      const {errorMessages, validate} = getValidate(props, isFocused, tfValue, isValidInput);

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
        if (!props.solo && props.label && (isFocused.value || internalValue.value || props.placeholder || isLabelActive.value)) {
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

      const attrs = computed(() => context.attrs)
      const affixStyles = computed(() => {
        if (props.filled) {
          if (props.dense) return {
            'padding-top':
                '14px'
          }
          return {
            'padding-top':
                '16px'
          }
        }
      })

      onMounted(() => {
        nextTick(() => {
          if(props.virtualEvent && !props.readOnly) {
            document.addEventListener('click', (e) => {
              const input = currentInstance.refs['input']
              if(e.target === input || e.target === currentInstance.refs['caret'] ||
                  ((e.target.classList.contains('key') || (e.target.parentElement && e.target.parentElement.classList.contains('key'))) && document.caretElement && document.caretElement.element === input)) {
                isFocused.value = true
                const { start } = document.caretElement ? document.caretElement.get() : { start: 0 }
                if(e.target === input || e.target === currentInstance.refs['caret']) {}
                document.caretElement = new Caret(input)
                if(start) document.caretElement.set(start)
                if(e.target.classList.contains('key') || e.target.parentElement.classList.contains('key')) { //keyboard press
                  const caret = currentInstance.refs['caret']
                  if(caret) {
                    for(const child of caret.children) {
                      child.classList.remove('animated-caret')
                    }
                    const caretChild = caret.children[start]
                    if(caretChild) {
                      caretChild.classList.add('animated-caret')
                      //scroll if overflow
                      const { width } = caret.getBoundingClientRect()
                      if(caretChild.offsetLeft + caretChild.offsetWidth - caret.scrollLeft >= width) { //caret size
                        input.scrollLeft = caretChild.offsetLeft + caretChild.offsetWidth - width
                        caret.scrollLeft = caretChild.offsetLeft + caretChild.offsetWidth - width
                      }
                    }
                  }
                }
              } else {
                context.emit('blur', e);
                if (props.validateOnBlur) {
                  isValidInput.value = validate(internalValue.value).value
                }
                isFocused.value = false
                const caret = currentInstance.refs['caret']
                if(caret) {
                  for(const child of caret.children) {
                    child.classList.remove('animated-caret')
                  }
                }
              }
            })
            const caret = currentInstance.refs['caret']
            if(caret) {
              caret.addEventListener('scroll', (e) => {
                const input = currentInstance.refs['input']
                if(caret.scrollLeft !== input.scrollLeft) { //caret size
                  setTimeout(() => {
                    input.scrollLeft = caret.scrollLeft
                  }, 0)
                }
              })
              let touchOffsetX = 0
              caret.addEventListener('touchstart', (e) => {
                touchOffsetX = e.touches[0].clientX
              })

              caret.addEventListener('touchmove', (e) => {
                const diff = e.touches[0].clientX - touchOffsetX
                touchOffsetX = e.touches[0].clientX
                caret.scrollLeft -= diff
              })
            }
          }
        })
      })

      const { tfLetters, selectLetter } = getVirtualCaret(props, context, internalValue, isFocused)

      return {
        attrs,
        //calculated styles and classes
        tfType,
        labelClasses,
        labelStyles,
        tfErrClasses,
        tfWrapperClasses,
        hintClasses,
        inputErrStyles,
        iconColor,
        tfWrapperStyles,
        affixStyles,
        //value
        internalValue,
        rawInternalValue,
        tfLetters,
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
        selectLetter,
        //ref
        prefixRef,
        prependRef,
        tfErrWrapperClass,
        legendStyles,
      }
    }
  }

</script>

<style lang="scss">
  @import "_GInputField.scss";

  .animated-caret {
    animation: caret 1s steps(2) infinite;
    -webkit-animation: caret 1s steps(2) infinite;
    border-right: 1px solid black;
  }

  @keyframes caret {
    0% { border-right: 1px solid transparent }
    100% { border-right: 1px solid black }
  }

  @-webkit-keyframes caret {
    0% { border-right: 1px solid transparent }
    100% { border-right: 1px solid black }
  }
</style>
