<script>
  import GIcon from "../GIcon/GIcon";
  import GChip from "../GChip/GChip";
  import {ref, computed, watch} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getValidate} from '../GInput/GInputField';
  import {isEqual} from 'lodash';

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
        persistent: Boolean,
        counter: [Number, Boolean, String],
      },
      //todo check rules and validation props
      rules: Array,
      errorCount: {
        type: Number,
        default: 1
      },
      validateOnBlur: Boolean,
      error: Boolean,
      //basic props
      value: {
        default: () => [],
        validator: val => {
          return typeof val === 'object' || Array.isArray(val)
        },
      },
      type: {
        type: String,
        default: 'file',
      },
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
      }
    },
    setup(props, context) {
      const internalValue = getInternalValue(props, context)
      const isDirty = computed(() => internalValue.value.length > 0)
      const isFocused = ref(false)
      const isValidInput = ref(true)
      const {
        onClick, onFocus, onBlur, onClearIconClick, onMouseDown, onMouseUp,
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput)

      //file input logic
      const files = computed(() => isDirty.value ? context.refs.input.files : [])

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

      function configFileName(fileName) {
        return fileName.length > props.truncateLength
            ? fileName.slice(0, Math.floor(props.truncateLength / 2 - 1)) + '...' + fileName.slice(-Math.floor((props.truncateLength - 1) / 2 - 1))
            : fileName
      }

      const fileName = computed(() => {
        if (!(props.chips || props.smallChips)) {
          if (files.value.length === 0) return ''
          if (files.value.length === 1) return configFileName(files.value[0].name)
          if (files.value.length > 1) return files.value.length + ' files'
        } else {
          let filesName = []
          for (let file of files.value)
            filesName.push(configFileName(file.name))
          return filesName
        }
      })

      const fileNumber = computed(() => {
        if (files.value.length <= 1) return files.value.length + ' file'
        if (files.value.length > 1) return files.value.length + ' files'
      })

      //genFileInputGroup
      const {
        labelClasses, labelStyles, isLabelActive, prefixRef
      } = getLabel(props, internalValue, isValidInput, isFocused, 'g-tf--label__active', {'color': 'red'})

      function genFiles() {
        return (props.chips || props.smallChips) ?
            Array.from(files.value).map((file, index) => (
                <g-chip small={props.smallChips}>
                  {fileName.value[index]}
                  {props.showSize ? ` (${convertFileSize(file.size)})` : ''}
                  <g-icon xSmall vOn:click={() => selfDelete()}>mdi-close</g-icon>
                </g-chip>))
            : (<div>{fileName.value}{props.showSize ? ` (${totalFileSize.value})` : ''}</div>)
      }

      function genSelection() {
        // return Array.from(files.value).forEach()
        return files.value.forEach((file, index) => {
          return context.slots['selection'](fileName.value[index])
        })
      }

      function genFileInput() {
        return <div class="g-file-input--text">
          {isDirty.value && genFiles()}
          {!isDirty.value && (<slot>{props.placeholder}</slot>)}
        </div>
      }

      function genInputGroup() {
        return <div class="inputGroup">
          <label class={['g-tf--label', labelClasses.value]} style={labelStyles.value} for="input">{props.label}</label>
          {genFileInput()}
          <input id="input" ref="input"
                 class="g-tf--input"
                 type={props.type}
                 multiple={props.multiple}
                 accept={props.accept}
                 vModel={internalValue.value}
                 vOn:focus={(e) => onFocus(e)}
                 vOn:blur={(e) => onBlur(e)}
          />
        </div>
      }

      //genFieldSet
      const legendStyle = computed(() => {
        if (!props.solo && props.label && (isFocused.value || internalValue.value)) {
          return {
            'width': 'auto',
            'padding': '1px',
          }
        } else
          return {}
      })
      const fileInputClasses = computed(() => ({
        'g-tf': true,
        'g-tf__error': !isValidInput.value,
      }))

      function genPrependInner() {
        return <div class="g-tf--prepend__inner">
          <g-icon>{props.prependInnerIcon}</g-icon>
        </div>
      }

      function genPrefix() {
        return <div class="g-tf--affix" ref={prefixRef}>{props.prefix}</div>
      }

      function genSuffix() {
        return <div class="g-tf--affix">{props.suffix}</div>
      }

      function genAppendInner() {
        return <div class="g-tf--append__inner">
          {(isDirty.value && props.clearable) && (
              <div vOn:click_stop={(e) => onClearIconClick(e)}>
                <g-icon style="cursor: pointer">mdi-close</g-icon>
              </div>
          )}
          <g-icon>{props.appendIcon}</g-icon>
        </div>
      } // todo remake icon div after g-icon is fixed

      function genErrorMessages() {
        return <div class="g-tf__error">{errorMessages.value}</div>
      }

      const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf--hint__active': true} : {})

      function genHint() {
        return <div class={['g-tf--hint', hintClasses.value]}>{props.hint}</div>
      }

      function genCounter() {
        return <div class={['g-tf--counter', {'g-tf--counter__error': !isValidInput.value}]}
                    style={!props.counter ? {'display': "none"} : null}>
          {`${fileNumber.value} (${totalFileSize.value} in total)`}
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
        const isDisabled = props.disabled ? {'g-tf--wrapper__disabled': true} : {
          'g-tf__filled': props.filled,
          'g-tf__outlined': props.outlined,
          'g-tf__solo': props.solo,
          'g-tf__rounded': props.rounded,
          'g-tf__shaped': props.shaped,
          'g-tf__flat': props.flat,
        }
        return {
          'g-tf--wrapper': true,
          'g-tf--wrapper__error': !isValidInput.value,
          'g-file-input': true,
          ...isDisabled,
        }
      })

      function genPrependOuter() {
        return <div class="g-tf--prepend__outer" ref="prependRef">
          <g-icon>{props.prependIcon}</g-icon>
        </div>
      }

      function genAppendOuter() {
        return <div class="g-tf--append__outer" ref="appendOuter">
          <g-icon>{props.appendOuterIcon}</g-icon>
        </div>
      }

      function onClickWrapper(e) {
        onClick(e)
        context.refs.input.click()
      }

      function genFileInputComponent() {
        return <div class={wrapperClasses.value}
                    vOn:click={(e) => onClickWrapper(e)}
                    vOn:mouseup={(e) => onMouseUp(e)}
                    vOn:mousedown={(e) => onMouseDown(e)}>
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