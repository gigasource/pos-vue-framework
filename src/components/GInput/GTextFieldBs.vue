<template>
  <div class="bs-tf-wrapper" :class="wrapperClasses" @click="onClick" @mouseup="onMouseUp" @mousedown="onMouseDown">
    <label v-if="label || labelIcon" class="bs-tf-label">
      <slot name="label">
        <g-icon :size="iconSize" v-if="labelIcon" class="mr-1">{{labelIcon}}</g-icon>
        <template v-if="required && label">
          {{label}}
          <span style="color: red">*</span>
        </template>
        <template v-else>{{label}}</template>
      </slot>
    </label>
    <div class="bs-tf-input-group" :style="inputGroupStyles">
      <div class="bs-tf-input-prepend" @click="onClickPrependOuter"
           v-if="$scopedSlots['prepend-outer'] || prefix || prependIcon">
        <slot name="prepend-outer">
            <span class="bs-tf-input-text">
              <g-icon v-if="prependIcon" :color="iconColor">{{prependIcon}}</g-icon>
              <template v-if="prefix">{{prefix}}</template>
				    </span>
        </slot>
      </div>
      <div :class="[!isValidInput && 'input-error', 'bs-tf-inner-input-group', {'bs-tf-inner-input-group__active': isFocused},
                    ($scopedSlots['prepend-outer'] || prefix || prependIcon) && 'bs-tf-input-has-prepend', ($scopedSlots['append-outer'] || suffix || appendIcon) && 'bs-tf-input-has-append']">
        <slot name="prepend-inner" :on-click="onClickPrependInner">
          <g-icon class="mr-2" :color="iconColor" v-if="prependInnerIcon">{{prependInnerIcon}}</g-icon>
        </slot>
        <component :is="$scopedSlots['append-inner'] || clearable ? 'div' : 'pass-through'" class="input">
          <slot name="input-slot"/>
          <input class="bs-tf-input"
                 style="user-select: text !important; -webkit-user-select: text !important;"
                 :type="state.internalType"
                 ref="input"
                 :placeholder="placeholder"
                 v-model="internalValue"
                 @change="onChange"
                 @focus="onFocus"
                 @blur="onBlur"
                 @keydown="onKeyDown">
        </component>
        <div class="bs-tf-append-inner"
             v-if="$scopedSlots['append-inner'] || (isDirty && clearable) || appendInnerIcon">
          <slot name="clearable-slot">
            <g-icon v-if="isDirty && clearable" :color="iconColor" @click.stop="onClearIconClick">{{clearIcon}}</g-icon>
          </slot>
          <slot name="append-inner" :on-click="onClickAppendInner">
            <g-icon v-if="appendInnerIcon" :color="iconColor">{{appendInnerIcon}}</g-icon>
          </slot>
        </div>
        <template v-if="type === 'password'">
          <g-icon class="mr-2" :size="iconSize" v-if="state.internalType === 'password'" @click="toggleType">
            visibility
          </g-icon>
          <g-icon class="mr-2" :size="iconSize" v-if="state.internalType === 'text'" @click="toggleType">
            visibility_off
          </g-icon>
        </template>
      </div>
      <div class="bs-tf-input-append" @click="onClickAppendOuter"
           v-if="$scopedSlots['append-outer'] || suffix || appendIcon">
        <slot name="append-outer">
          <span class="bs-tf-input-text">
            <template v-if="suffix">{{suffix}}</template>
            <g-icon v-if="appendIcon" :color="iconColor">{{appendIcon}}</g-icon>
				  </span>
        </slot>
      </div>
    </div>
    <div class="bs-tf-error-message" v-if="!isValidInput && errorMessages">{{errorMessages}}</div>
    <div class="bs-tf-message" v-else-if="hint">{{hint}}</div>
  </div>
</template>

<script>
  import {ref, computed, reactive, onMounted} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate} from './GInputFactory';
  import GIcon from '../GIcon/GIcon';
  import {getCssColor} from "../../utils/colors";

  export default {
    name: 'GTextFieldBs',
    components: {
      GIcon, PassThrough: {
        functional: true,
        render(h, context) {
          return context.children
        }
      }
    },
    props: {
      ...{//display props
        label: String,
        placeholder: String,
        borderColor: String,
        iconColor: String,
        //input states
        disabled: Boolean,
        readonly: Boolean,
        clearable: Boolean,
        solo: Boolean,
        rounded: Boolean,
        filled: Boolean,
        filledBlur: Boolean,
      },
      //icon
      clearIcon: {
        type: String,
        default: 'clear'
      },
      labelIcon: String,
      prependIcon: String,
      prependInnerIcon: String,
      appendIcon: String,
      appendInnerIcon: String,
      iconSize: {
        type: [String, Number],
        default: 16
      },
      prefix: String,
      suffix: String,
      //rules and validation props
      required: Boolean,
      rules: Array,
      hint: String,
      validateOnBlur: Boolean,

      // value use for validation when input doesn't have value itself
      prependValue: {
        type: String,
        default: '',
      },
      // basic props
      value: [String, Number],
      type: {
        type: String,
        default: 'text',
      },
      small: Boolean,
      large: Boolean,
      virtualEvent: Boolean,
    },
    setup: function (props, context) {
      const {internalValue} = getInternalValue(props, context);
      const tfValue = computed(() => props.prependValue + internalValue.value)
      const isValidInput = ref(true)
      const isFocused = ref(false);
      const {isDirty} = getLabel(context, props, tfValue, isValidInput, isFocused, 'g-tf-label__active')

      const {onClickPrependOuter, onClickPrependInner, onClickAppendOuter, onClickAppendInner,} = getSlotEventListeners(context);

      //event handler function
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput);

      const {
        onClick, onFocus, onBlur, onClearIconClick,
        onMouseDown, onMouseUp, onChange, onKeyDown
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);

      const wrapperClasses = computed(() => ({
        'bs-tf__small': props.small,
        'bs-tf__large': props.large,
        'bs-tf-wrapper--disabled': props.disabled,
        'bs-tf-wrapper--readonly': props.readonly,
        'bs-tf__solo': props.solo,
        'bs-tf__rounded': props.rounded,
        'bs-tf__filled': props.filled,
        'bs-tf__filled--blur': props.filledBlur,
      }));

      const state = reactive({
        internalType: props.type
      })

      const toggleType = () => {
        if (state.internalType === 'password') {
          state.internalType = 'text'
        } else if (state.internalType === 'text') {
          state.internalType = 'password'
        }
      }

      const inputGroupStyles = computed(() => {
        const color = getCssColor(props.borderColor)
        return {
          ...color && {'border-color': color}
        }
      })

      onMounted(() => {
        context.root.$nextTick(() => {
          if(props.virtualEvent) {
            document.addEventListener('click', (e) => {
              if(!context.refs) return
              if(e.target === context.refs.input || (e.target.classList.contains('key') && document.caretElement === context.refs.input)) {
                isFocused.value = true
                document.caretElement = context.refs.input
              } else {
                context.emit('blur', e);
                if (props.validateOnBlur) {
                  isValidInput.value = validate(internalValue.value).value
                }
                isFocused.value = false
              }
            })
          }
        })
      })

      return {
        internalValue,
        isValidInput,
        isFocused,
        isDirty,
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
        wrapperClasses,
        state,
        toggleType,
        inputGroupStyles
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

    &--disabled,
    &--readonly {
      pointer-events: none;
    }

    &--disabled {
      opacity: 0.4;
    }
  }

  .bs-tf-label {
    margin-bottom: 4px;
  }

  .bs-tf-label,
  .bs-tf-input-group,
  .bs-tf-inner-input-group,
  .bs-tf-input-prepend,
  .bs-tf-input-append {
    display: flex;
    align-items: center;
  }

  .bs-tf-input-group {
    border-color: #ced4da;
  }

  .bs-tf-inner-input-group {
    flex: 1;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: 4px;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    padding-left: 12px;
    padding-right: 12px;

    &__active {
      outline: 0;
      border-color: #80bdff !important;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      z-index: 2;
    }
  }

  .bs-tf-input-prepend,
  .bs-tf-input-append {
    border-color: inherit;
  }

  .bs-tf-input-prepend {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .bs-tf-input-prepend > *:first-child {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  .bs-tf-input-prepend > * {
    border-right: none !important;
  }

  .bs-tf-input-append > * {
    border-left: none !important;
  }

  .bs-tf-input-append {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .bs-tf-input-append > *:last-child {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  .bs-tf-append-inner {
    margin-left: auto;
  }

  .bs-tf-input-text {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    color: #495057;
    background-color: #e9ecef;
    white-space: nowrap;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
  }

  .bs-tf-input {
    flex: 1 1 auto;
    padding: 6px 0;
    line-height: 24px;
    font-size: 16px;
    background-clip: padding-box;
    color: #495057;
    border-radius: inherit;
    width: 100%;

    &::placeholder {
      font-size: 16px;
      letter-spacing: normal;
    }
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
    box-shadow: 0 0 0 3px rgba(255, 68, 82, 0.25) !important;
  }

  .bs-tf-error-message {
    @extend .bs-tf-message;
    color: red;
  }

  .bs-tf__solo {
    .bs-tf-inner-input-group,
    .bs-tf-input-text {
      border: none;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.19);
    }
  }

  .bs-tf__rounded {
    .bs-tf-inner-input-group {
      border-radius: 9999px;

      &.bs-tf-input-has-prepend {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      &.bs-tf-input-has-append {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    .bs-tf-input-prepend {
      border-top-left-radius: 9999px;
      border-bottom-left-radius: 9999px;
    }

    .bs-tf-input-append {
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
    }
  }

  .bs-tf__filled,
  .bs-tf__filled--blur {
    padding: 12px 24px;
    margin: 0 8px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;

    .bs-tf-label {
      color: #bdbdbd;
      text-transform: uppercase;
      font-size: 12px;
      margin-bottom: 0;
    }

    .bs-tf-inner-input-group {
      border: none;
      box-shadow: none;
    }

    .bs-tf-input {
      padding-left: 8px;
    }

    & ~ & {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }

    &:last-of-type {
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
    }
  }

  .bs-tf__filled {
    background: white;
    box-shadow: -1px 1px 6px rgba(0, 0, 0, 0.19);

    &:not(:first-of-type).bs-tf__filled {
      border-top: 0.5px solid #d9d9d9;
    }

    &--blur {
      background: #FFF3;
      backdrop-filter: blur(3px);
      box-shadow: none;

      .g-icon,
      .bs-tf-input,
      .bs-tf-input::placeholder {
        color: white;
        background-color: transparent;
      }

      &:not(:first-of-type) {
        border-top: 0.5px solid #eee;
      }
    }
  }

  .bs-tf__pos {
    .bs-tf-inner-input-group {
      background-color: #F0F0F0;

      .bs-tf-input {
        background-color: #F0F0F0;
      }

      &__active {
        border-color: #1471FF !important;
        box-shadow: 0 0 0 1px #1471FF;
      }
    }
  }

  .bs-tf__border-hover {
    .bs-tf-inner-input-group {
      border-color: transparent;

      &:focus-within {
        border-color: rgb(24, 103, 192);
      }

      &:hover {
        border-color: #bdbdbd;

        &:focus-within {
          border-color: rgb(24, 103, 192);
        }
      }

      &__active {
        border-color: rgb(24, 103, 192) !important;
        box-shadow: none;
      }
    }

    &.bs-tf-wrapper--disabled {
      .bs-tf-inner-input-group {
        border-color: #bdbdbd;
      }
    }
  }

  .bs-tf__small {
    .bs-tf-input {
      font-size: 14px;
      line-height: 20px;
      padding: 4px 0;
    }

    .bs-tf-label {
      font-size: 14px;
    }
  }

  .bs-tf__large {
    .bs-tf-input {
      font-size: 18px;
      line-height: 32px;
      padding: 8px 0;
    }

    .bs-tf-label {
      font-size: 18px;
    }
  }
</style>

