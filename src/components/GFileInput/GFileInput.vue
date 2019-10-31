<template>
  <div class="tf-wrapper g-file-input" :class="[tfWrapperClasses, tfErrWrapperClass]"
       @click="onClickWrapper"
       @mouseup="onMouseUp"
       @mousedown="onMouseDown">
    <div class="tf-prepend__outer" ref="prependRef"><g-icon>{{prependIcon}}</g-icon></div>
    <fieldset>
      <legend :style="legendStyles">{{label}}</legend>
      <div class='tf' :class="tfErrClasses">
        <div class="tf-prepend__inner"><g-icon>{{prependInnerIcon}}</g-icon></div>
        <div v-if="prefix" class="tf-affix" ref="prefixRef">{{prefix}}</div>
        <div class="inputGroup">
          <label for="input" class="tf-label" :class="labelClasses" :style="labelStyles">{{label}}</label>
          <div class="g-file-input--text">
            <slot v-if="isDirty" name="selection">
              <div v-if="chips || smallChips">
                <g-chip v-for="file in files" :small="smallChips">{{file.name}}{{showSize?' ('+fileSize+')':''}}
                </g-chip>
              </div>
              <div v-else>{{fileName}}{{showSize?' ('+fileSize+')':''}}</div>
            </slot>
            <slot v-else>{{placeholder}}</slot>
          </div>
          <input id="input" ref="input"
                 class="tf-input"
                 :type="type"
                 :multiple="multiple"
                 :accept="accept"
                 @focus="onFocus"
                 @blur="onBlur"
                 v-model="internalValue">
        </div>
        <div v-if="suffix" class="tf-affix">{{suffix}}</div>
        <div class="tf-append__inner">
          <div v-if="isDirty && clearable" @click="onClearIconClick"><g-icon style="cursor: pointer">mdi-close</g-icon></div>
          <g-icon>{{appendIcon}}</g-icon>
        </div>
        <div v-if="!isValidInput" class="tf-error" >{{errorMessages}}</div>
        <div v-else class="tf-hint" :class="hintClasses">{{hint}}</div>
        <div v-show="counter" :class="{'tf-counter': true, 'tf-counter__error': !isValidInput}">
          {{fileNumber + ' (' + fileSize + ' in total)'}}
        </div>
      </div>
    </fieldset>
    <div class="tf-append__outer" ref="appendOuter"><g-icon>{{appendOuterIcon}}</g-icon></div>
  </div>
</template>

<script>
  import {ref, computed} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getValidate} from '../GInput/GInputField';
  import GIcon from '../GIcon/GIcon';
  import GChip from "../GChip/GChip";

  export default {
    name: 'GFileInput',
    components: {GIcon, GChip},
    props: {
      ...{//display props
        label: String,
        placeholder: String,
        prependIcon: String,
        prependInnerIcon: {
          type: String,
          default: 'mdi-paperclip'
        },
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
        clearable: {
          type: Boolean,
          default: true
        },
        disabled: Boolean,
        readonly: Boolean,
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
      value: String,
      type: {
        type: String,
        default: 'file',
      },
      //file input logic
      multiple: Boolean,
      accept: String,
      showSize: Boolean,
      chips: Boolean,
      smallChips: Boolean,
    },
    setup(props, context) {
      const tfWrapperClasses = getTfWrapperClasses(props)

      const internalValue = getInternalValue(props, context)
      const isDirty = computed(() => internalValue.value.length > 0)
      const isValidInput = ref(true)
      const isFocused = ref(false)

      const {labelClasses, labelStyles, isLabelActive, prefixRef} = getLabel(props, internalValue, isValidInput, isFocused, 'tf-label__active', {'color': 'red'})

      //Activate non persistent hint
      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'tf-hint__active': true} : {})

      //event handler function
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput)

      const inputErrStyles = computed(() => isValidInput.value ? {} : {'color': 'red'})
      //change input border color
      const tfErrClasses = computed(() => isValidInput.value ? {} : {'tf__error': true})

      const tfErrWrapperClass = computed(() => ({'tf-wrapper__error': !isValidInput.value}))

      const {
        onClick, onFocus, onBlur, onClearIconClick, onMouseDown, onMouseUp,
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);
      //set legend width for label in outlined textfield
      const legendStyles = computed(() => {
        if (!props.solo && props.label && (isFocused.value || internalValue.value)) {
          return {
            'width': 'auto',
            'padding': '1px',
          }
        } else
          return {}
      })

      //file input logic
      function onClickWrapper() {
        onClick()
        triggerFileInput()
      }

      function triggerFileInput() {
        context.refs.input.click()
      }

      const files = computed(() => isDirty.value ? context.refs.input.files : [])

      function totalFileSize(files) {
        if (!isDirty.value) return 0

        let size = 0
        for (let file of files)
          size = size + file.size
        return size
      }

      const fileSize = computed(() => {
        let size = totalFileSize(files.value)
        let level = 0
        let units = ['B', 'KB', 'MB', 'GB']
        while (size > 1024) {
          size = size / 1024
          level++
        }
        let unit = units[level]
        return Math.round(size * 1000) / 1000 + unit
      })

      const fileName = computed(() => {
        if (files.value.length === 0) return ''
        if (files.value.length === 1) return files.value[0].name
        if (files.value.length > 1) return files.value.length + ' files'
      })

      const fileNumber = computed(() => {
        if (files.value.length <= 1) return files.value.length + ' file'
        if (files.value.length > 1) return files.value.length + ' files'
      })

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
        onFocus,
        onBlur,
        onMouseUp,
        onMouseDown,
        onClickWrapper,
        onClearIconClick,
        //ref
        prefixRef,
        tfErrWrapperClass,
        legendStyles,
        //fileInput
        files,
        fileSize,
        fileName,
        fileNumber
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
    }))
  }

</script>
