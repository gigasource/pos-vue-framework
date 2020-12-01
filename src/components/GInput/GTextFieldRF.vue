<script>
  import { withModifiers } from 'vue';
  import GIcon from '../GIcon/GIcon';
  import { getEvents, getLabel, getSlotEventListeners, getValidate, inputEvents } from './GInputFactory';
  import {getInternalValue} from '../../mixins/getVModel';
  import _ from 'lodash'
  
  export default {
    name: 'GTextFieldRF',
    components: {GIcon},
    props: {
      ...{//display props
        label: String,
        placeholder: String,
        appendIcon: {
          type: String,
          default: ''
        },
        prependIcon: {
          type: String,
          default: ''
        },
        prependInnerIcon: {
          type: String,
          default: ''
        },
        appendInnerIcon: {
          type: String,
          default: ''
        },
        clearIcon: {
          type: String,
          default: 'clear'
        },
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
      ...{
        rules: Array,
        hint: String,
        errorCount: {
          type: Number,
          default: 1
        },
        persistent: Boolean,
        counter: [Number, Boolean, String],
        validateOnBlur: Boolean,
        error: Boolean
      },

      //styles
      ...{
        filled: Boolean,
        outlined: Boolean,
        solo: Boolean,
        shaped: Boolean,
        rounded: Boolean,
        flat: Boolean
      },

      // basic props
      modelValue: [String, Number],
      type: {
        type: String,
        default: 'text',
      },

    },
    emits: _.union(inputEvents, []),
    setup: function (props, context) {
      const internalValue = getInternalValue(props, context);
      const isValidInput = ref(true)
      const isFocused = ref(false);
      const {
        onClick, onFocus, onBlur, onClearIconClick,
        onMouseDown, onMouseUp, onChange, onKeyDown
      } = getEvents(props, context, internalValue, isFocused, isValidInput, validate);
      const {labelClasses, labelStyles, isDirty, isLabelActive, prefixRef} = getLabel(props, internalValue, isValidInput, isFocused, 'g-tf--label__active');
      const {errorMessages, validate} = getValidate(props, isFocused, internalValue, isValidInput);
      const genMessage = () => {
        const hintClasses = computed(() => (props.persistent || (isFocused.value && isValidInput.value)) ? {'g-tf--hint__active': true} : {})
        if (isValidInput.value) {
          return <div class="g-tf--hint" class={hintClasses}>{props.hint}</div>
        }
        return <div class="g-tf--error">{errorMessages}</div>

      }
      const genClearIcon = () => {
        if (props.clearable && isDirty.value) {
          return <div onClick={withModifiers(onClearIconClick, ['stop'])}>
            <g-icon>{props.clearIcon}</g-icon>
          </div>
        }
      }

      function genLabel(props) {
        return <label for="input" class={["g-tf--label", labelClasses]} style={labelStyles}>
          <slot name="label">{props.label}</slot>
        </label>
      }

      const genInputGroup = () => {
        const inputErrStyles = computed(() => isValidInput.value ? {} : {'color': 'red'})
        return <div class="input-group">
          <input id="input"
                 type={props.type}
                 class="g-tf--input"
                 style={inputErrStyles}
                 label={props.label}
                 onInput={e => internalValue.value = e}
                 value={internalValue.value}
                 placeholder={props.placeholder}
                 readonly={props.readOnly}
                 ref='input'
                 onChange={onChange}
                 onFocus={onFocus}
                 onBlur={onBlur}
                 onKeydown={onKeyDown}/>
          {genLabel()}
        </div>
      }

      function genAffix(props, name) {
        if (props.name) {
          return <div class="g-tf--affix" ref={name + 'Ref'}>{name}</div>
        }
      }

      function genIconSlot(name) {
        return <slot name={name}>
          <g-icon color={isLabelActive ? 'blue' : null}>{name}</g-icon>
        </slot>
      }

      const genInput = () => {
        const tfErrClasses = computed(() => isValidInput.value ? {} : {'g-tf__error': true})
        return <div class={['g-tf', tfErrClasses]}>
          <div class="g-tf--prepend__inner" onClick={onClickPrependInner}>
            {genIconSlot('prepend-inner')}
          </div>
          {genAffix(props, 'prefix')}
          {genInputGroup()}
          {genAffix(props, 'suffix')}
          <div class="g-tf--append__inner" onClick={onClickAppendInner}>
            {genClearIcon()}
          </div>
          {genIconSlot('append-inner')}
          {genMessage()}
          <div v-show="counter" class={{
            'g-tf--counter': true,
            'g-tf--counter__error': !isValidInput.value
          }}>{internalValue.length} / {props.counter}</div>
        </div>

      }
      const {onClickPrependOuter, onClickPrependInner, onClickAppendOuter, onClickAppendInner,} = getSlotEventListeners(context);
      const genTextField = () => {
        const tfWrapperClasses = computed(() => (props.disabled ? {'g-tf--wrapper-disabled': true} : {
          'g-tf__filled': props.filled,
          'g-tf__outlined': props.outlined,
          'g-tf__solo': props.solo,
          'g-tf__rounded': props.rounded,
          'g-tf__shaped': props.shaped,
          'g-tf__flat': props.flat,
        }))
        const tfErrWrapperClass = computed(() => ({'g-tf--wrapper__error': !isValidInput.value}));
        const legendStyles = computed(() => {
          if (!props.solo && props.label && (isFocused.value || internalValue.value || props.placeholder)) {
            return {
              'width': 'auto',
              'padding': '1px',
            }
          }
          return {}
        });
        return <div class={["g-tf--wrapper", tfWrapperClasses, tfErrWrapperClass]} onClick="onClick"
                    onMouseup="onMouseUp" onMousedown="onMouseDown">
          <div class="g-tf--prepend__outer" ref="prependRef" onClick={onClickPrependOuter}>
            {genIconSlot('prepend-outer')}
          </div>
          <fieldset>
            <legend style={legendStyles}>{props.label}</legend>
          </fieldset>
          {genInput()}
          <div class="g-tf--append__outer" onClick={onClickAppendOuter} ref="append-outer">
            {genIconSlot("append-outer")}
          </div>
        </div>
      }
      return {
        genTextField,
        isValidInput,
        isDirty,
        isLabelActive,
        internalValue,

      }
    },
    render() {
      return this.genTextField()
    },
  }
</script>
<style scoped>
</style>
