<script>
  import {ref, computed, watch, onMounted, onUpdated} from 'vue';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: "GTextareaJSX",
    components:  {GIcon},
    props: {
      ...{//display props
        label: String,
        placeholder: String,
        prependIcon: String,
        prependInnerIcon: String,
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

      //textarea
      autoGrow: Boolean,
      noResize: Boolean,
      rowHeight: {
        type: [Number, String],
        default: 24,
        validator: (v) => !isNaN(parseFloat(v)),
      },
      rows: {
        type: [Number, String],
        default: 5,
        validator: (v) => !isNaN(parseInt(v, 10)),
      },
      cols: {
        type: [Number, String],
        default: 1,
        validator: (v) => !isNaN(parseInt(v, 10)),
      },
    },
    emits: [],
    setup(props,context) {
      //gen textarea component
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
          'g-textarea': true,
          'g-textarea__auto-grow': props.autoGrow,
          'g-textarea__no-resize': props.noResize || props.autoGrow,
          ...isDisabled,
        }
      })

        //todo add slot
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

      function genTextareaComponent() {
        return <div class={wrapperClasses.value}
                    onClick={onClick}
                    onMouseup={onMouseUp}
                    onMousedown={onMouseDown}>
          {genPrependOuter()}
          {genTextareaWrapper()}
          {genAppendOuter()}
        </div>
      }

      return {
        genTextareaComponent
      }
    },

    render() {
      return this.genTextareaComponent()
    }
  }
</script>
