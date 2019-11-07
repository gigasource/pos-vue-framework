<script>
  import {ref, computed, watch, onMounted, onUpdated} from '@vue/composition-api';
  import {getEvents, getInternalValue, getLabel, getSlotEventListeners, getValidate,} from '../GInput/GInputFactory';
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

    setup(props,context) {

    },

    render() {
    }
  }
</script>

<style scoped>

</style>