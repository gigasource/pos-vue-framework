<script>
  import GIcon from "../GIcon/GIcon";
  import GChip from "../GChip/GChip";
  import {ref, computed, watch, getCurrentInstance} from 'vue';
  import {getEvents, getLabel, getValidate, inputEvents} from '../GInput/GInputFactory';
  import _ from 'lodash';

  export default {
    name: "GFileInputJSX",
    components: {GChip, GIcon},
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      //display props
      ...{
        label: String,
				svgIcon: Boolean,
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
        clearable: {
          type: Boolean,
          default: true
        },
        hint: String,
        placeholder: String,
        persistent: Boolean,
        counter: [Number, Boolean, String],
      },
      //validator
      rules: Array,
      errorCount: {
        type: Number,
        default: 1
      },
      validateOnBlur: Boolean,
      error: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      //style
      filled: Boolean,
      outlined: Boolean,
      solo: Boolean,
      rounded: Boolean,
      shaped: Boolean,
      flat: Boolean,
      //file input logic
      multiple: Boolean,
      accept: String,
      showSize: Boolean,
      chips: Boolean,
      smallChips: Boolean,
      truncateLength: {
        type: [String, Number],
        default: 22,
      },
      modelValue: {
        default: () => [],
        validator: val => {
          return typeof val === 'object' || Array.isArray(val) || typeof val === 'string'
        },
      },
      type: {
        type: String,
        default: 'file',
      },
    },
    emits: _.union(inputEvents, [ 'change', 'clear' ]),
    setup(props, context) {
      const currentInstance = getCurrentInstance()
      const lazyValue = ref(props.modelValue)
      const internalValue = computed({
        get: () => lazyValue.value,
        set: (val) => {
          lazyValue.value = val
          context.emit('change', lazyValue.value)
        }
      })

      watch(() => props.modelValue, (v) => {
        lazyValue.value = v
      }, {lazy: true})

      const isDirty = computed(() => Array.isArray(internalValue.value) ? internalValue.value.length > 0 : !!internalValue.value)
      const isFocused = ref(false)
      const isValidInput = ref(true)
      const {
        onClick, onFocus, onBlur, onMouseDown, onMouseUp,
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);
      const onInput = function (e) {
        const files = [...e.target.files || []]
        internalValue.value = props.multiple ? files : files[0]
      }
      const onClearIconClick = function (e) {
        e.stopPropagation()
        internalValue.value = props.multiple ? [] : null
        currentInstance.refs['input'].value = ''
        context.emit('clear')
      }
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput)

      //file input logic
      const files = computed(() => {
        return isDirty.value ? currentInstance.refs['input'].files : []
      })

      function convertFileSize(fileSize) {
        let size = fileSize
        let level = 0
        let units = ['B', 'KB', 'MB', 'GB']
        while (size > 1024) {
          size = size / 1024
          level++
        }
        let unit = units[level]
        return Math.round(size * 1000) / 1000 + unit
      }

      const totalFileSize = computed(() => {
        if (!isDirty.value) return convertFileSize(0)
        let size = 0
        for (let file of files.value)
          size = size + file.size
        return convertFileSize(size)
      })

      function formattedFileName(fileName) {
        return fileName.length > props.truncateLength
            ? fileName.slice(0, Math.floor(props.truncateLength / 2 - 1)) + '...' + fileName.slice(-Math.floor((props.truncateLength - 1) / 2 - 1))
            : fileName
      }

      const fileContent = computed(() => {
        if (files.value.length === 0) return ''
        if (files.value.length === 1) return formattedFileName(files.value[0].name)
        if (files.value.length > 1) return files.value.length + ' files'
      })
      const filesName = computed(() => {
        let filesName = []
        for (let file of files.value)
          filesName.push(formattedFileName(file.name))
        return filesName
      })
      const fileAmount = computed(() => {
        if (files.value.length <= 1) return files.value.length + ' file'
        if (files.value.length > 1) return files.value.length + ' files'
      })

      //genFileInputGroup
      const {
        labelClasses, labelStyles, isLabelActive, prefixRef
      } = getLabel(context, props, internalValue, isValidInput, isFocused, 'g-tf-label__active', {'color': 'red'})

      function genFilesOrText() {
        return (props.chips || props.smallChips) ?
            Array.from(files.value).map((file, index) => (
                <g-chip small={props.smallChips} ref={'chip' + index}>
                  {filesName.value[index]}
                  {props.showSize ? ` (${convertFileSize(file.size)})` : ''}
                </g-chip>))
            : (<div>{fileContent.value}{props.showSize ? ` (${totalFileSize.value})` : ''}</div>)
      }

      function genSelectionSlot() {
        return Array.from(files.value).map((file, index, files) => {
          if (!context.slots.selection) return

          let text = props.showSize ? filesName.value[index] + ` (${convertFileSize(file.size)})` : filesName.value[index]
          return context.slots.selection({
            text: text,
            file,
            index,
            amount: files.length
          })
        })
      }

      function genFileInput() {
        return <div class="g-file-input--text">
          {isDirty.value && context.slots.selection && genSelectionSlot()}
          {isDirty.value && !context.slots.selection && genFilesOrText()}
          {!isDirty.value && (<p style="opacity: 0.5">{props.placeholder}</p>)}
        </div>
      }

      function genInputGroup() {
        return <div class="inputGroup">
          <label vShow={!(props.chips || props.smallChips)} class={['g-tf-label', labelClasses.value]}
                 style={labelStyles.value} for="input">{props.label}</label>
          {genFileInput()}
          <input id="input" ref="input"
                 class="g-tf-input"
                 type={props.type}
                 multiple={props.multiple}
                 accept={props.accept}
                 onChange={onInput}
                 onFocus={onFocus}
                 onBlur={onBlur}/>
        </div>
      }

      //genFieldSet
      const legendStyle = computed(() => {
        if (!props.solo && props.label && isLabelActive.value && !(props.chips || props.smallChips)) {
          return {
            'width': 'auto',
            'padding': '1px',
            'margin-left': props.rounded ? '18px' : '4px',
          }
        } else
          return {}
      })
      const fileInputClasses = computed(() => ({
        'g-tf': true,
        'g-tf__error': !isValidInput.value,
      }))

      function genPrependInner() {
        return <div class="g-tf-prepend__inner">
          <g-icon svg={props.svgIcon}>{props.prependInnerIcon}</g-icon>
        </div>
      }

      function genPrefix() {
        return <div class="g-tf-affix" ref={prefixRef}>{props.prefix}</div>
      }

      function genSuffix() {
        return <div class="g-tf-affix">{props.suffix}</div>
      }

      function genAppendInner() {
        return <div class="g-tf-append__inner">
          {(isDirty.value && props.clearable) && (
              <div>
                <g-icon onClick={onClearIconClick} style="cursor: pointer">mdi-close</g-icon>
              </div>
          )}
          <g-icon svg={props.svgIcon}>{props.appendIcon}</g-icon>
        </div>
      } // todo remake icon div after g-icon is fixed

      function genErrorMessages() {
        return <div class="g-tf-error" style="">{errorMessages.value}</div>
      }

      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf-hint__active': true} : {})

      function genHint() {
        return <div class={['g-tf-hint', hintClasses.value]}>{props.hint}</div>
      }

      function genCounter() {
        return <div class={['g-tf-counter', {'g-tf-counter__error': !isValidInput.value}]}
                    vShow={props.counter}>
          {`${fileAmount.value} (${totalFileSize.value} in total)`}
        </div>
      }

      function genFileInputWrapper() {
        return <fieldset>
          <legend style={legendStyle.value}>{props.label}</legend>
          <div class={fileInputClasses.value}>
            {genPrependInner()}
            {props.prefix && genPrefix()}
            {genInputGroup()}
            {props.suffix && genSuffix()}
            {genAppendInner()}
            {!isValidInput.value ? genErrorMessages() : genHint()}
            {genCounter()}
          </div>
        </fieldset>
      }

      //genFileInputComponent
      const wrapperClasses = computed(() => {
        const isDisabled = {
          'g-tf-wrapper__disabled': props.disabled,
          'g-tf__filled': props.filled,
          'g-tf__outlined': props.outlined,
          'g-tf__solo': props.solo,
          'g-tf__rounded': props.rounded,
          'g-tf__shaped': props.shaped,
          'g-tf__flat': props.flat,
        }
        return {
          'g-tf-wrapper': true,
          'g-tf-wrapper__error': !isValidInput.value,
          'g-file-input': true,
          ...isDisabled,
        }
      })

      function genPrependOuter() {
        return <div class="g-tf-prepend__outer" ref="prependRef">
          <g-icon>{props.prependIcon}</g-icon>
        </div>
      }

      function genAppendOuter() {
        return <div class="g-tf-append__outer" ref="append-outer">
          <g-icon>{props.appendOuterIcon}</g-icon>
        </div>
      }

      function onClickWrapper(e) {
        onClick(e)
        // currentInstance.refs['input'].click()
        // for some reason, it show twice,
        // does this behavior also happen before migrate??
      }

      function genFileInputComponent() {
        return <div class={wrapperClasses.value}
                    onClick={onClickWrapper}
                    onMouseup={onMouseUp}
                    onMousedown={onMouseDown}>
          {genPrependOuter()}
          {genFileInputWrapper()}
          {genAppendOuter()}
        </div>
      }

      return {
        genFileInputComponent
      }
    },

    render() {
      return this.genFileInputComponent()
    }
  }
</script>

<style scoped lang="scss">
  @import "_GFileInput.scss";
</style>
