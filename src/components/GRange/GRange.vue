<script>
  import {computed, reactive, watch, onBeforeMount, onMounted, onUpdated} from '@vue/composition-api';
  import {getEventHandler, helperFunctions} from "../GSliderRemake/GSlider";
  import {convertToUnit} from "../../utils/helpers";
  import {isEqual} from "lodash";

  export default {
    name: "GRange",
    props: {
      value: {
        type: Array,
        default: () => ([0, 0]),
      },
      min: {
        type: [Number, String],
        default: 0,
      },
      max: {
        type: [Number, String],
        default: 100,
      },
      vertical: Boolean,
      readonly: Boolean,
      disabled: Boolean,
      inverseLabel: Boolean,
      //step
      step: {
        type: [Number, String],
        default: 1,
      },
      ticks: {
        type: [Boolean, String],
        default: false,
        validator: v => typeof v === 'boolean' || v === 'always',
      },
      tickSize: {
        type: [Number, String],
        default: 2,
      },
      tickLabels: {
        type: Array,
        default: () => ([]),
      },
      //track
      trackFillColor: String,
      trackBgrColor: String,
      //thumb
      thumbColor: String,
      thumbSize: {
        type: [Number, String],
        default: 32,
      },
      thumbLabel: {
        type: [Boolean, String],
        default: null,
        validator: v => typeof v === 'boolean' || v === 'always',
      },
    },
    setup(props, context) {
      const minValue = computed(() => parseFloat(props.min))
      const maxValue = computed(() => parseFloat(props.max))
      const step = computed(() => props.step > 0 ? parseFloat(props.step) : 0)
      const {roundValue, setLazyValue} = helperFunctions(props, minValue, maxValue)

      const state = reactive({
        app: null,
        lazyValue: props.value,
        activeThumb: 0,
        oldValue: 0,
        keyPressed: 0,
        isFocused: false,
        isActive: false,
        noClick: false,
      })

      const internalValue = computed({
        get: () => state.lazyValue,
        set: (val) => {
          let value = val.map(v => roundValue(Math.min(Math.max(v, minValue.value), maxValue.value)))

          if (value[0] > value[1] || value[1] < value[0]) {
            if (state.activeThumb !== null) {
              const toFocus = state.activeThumb === 1 ? 0 : 1
              const el = context.refs[`thumb_${toFocus}`]
              el.focus()
            }
            value = [value[1], value[0]]
          }

          state.lazyValue = value
          if (!isEqual(value, props.value)) context.emit('input', value)
          //todo validate
        }
      })

      watch(() => minValue.value, () => {
        minValue.value > internalValue.value && context.emit('input', minValue.value)
      })
      watch(() => maxValue.value, () => {
        maxValue.value < internalValue.value && context.emit('input', maxValue.value)
      })
      watch(() => props.value, (val) => internalValue.value = val)

      const inputWidth = computed(() => internalValue.value.map((v) => (roundValue(v) - minValue.value) / (maxValue.value - minValue.value) * 100))

      //todo genInput
      //todo genTrack
      //todo genThumb
      //todo genRange
      function genRange() {

      }

      return {genRange}
    },
    render() {
      return this.genRange()
    }
  }


</script>

<style scoped lang="scss">
  @import "_GRange.scss";
  @import "../GSliderRemake/_GSlider.scss";
</style>