<template>
  <div :class="datePickerHeaderClasses">
    <g-button :disabled="prevBtnDisabled" icon v-on:click.native.stop="prevClick">&lt;</g-button>
    <div :class="datePickerHeaderValueClasses">
      <transition :name="headerTransitionName">
        <div :key="value" :class="headerData.class" :style="headerData.style">
          <button type="button" v-on:click="onHeaderClicked">
            <template v-if="defaultSlotIsAvailable">
              <slot></slot>
            </template>
            <template v-else>
              {{ formatter(value) }}
            </template>
          </button>
        </div>
      </transition>
    </div>
    <g-button :disabled="nextBtnDisabled" icon v-on:click.native.stop="nextClick">&gt;</g-button>
  </div>
</template>

<script>
  import { computed, createElement as h, reactive, watch } from '@vue/composition-api';
  import { monthChange, createNativeLocaleFormatter } from './util';
  import { setTextColor } from '../../mixins/colorable';
  import GButton from '../GButton/GButton';

  export default {
    name: 'GDatePickerHeader',
    components: { GButton },
    props: {
      disabled: Boolean,
      format: Function,
      min: String,
      max: String,
      nextIcon: {
        type: String,
        default: '$next',
      },
      prevIcon: {
        type: String,
        default: '$prev',
      },
      readonly: Boolean,
      value: {
        type: [Number, String],
        required: true,
      },
    },
    setup(props, context) {
      // data
      const state = reactive({ isReversing: false })

      // computed
      const formatter = computed(() => {
        if (props.format) {
          return props.format
        } else if (String(props.value).split('-')[1]) {
          return createNativeLocaleFormatter(undefined/*this.currentLocale*/, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 })
        } else {
          return createNativeLocaleFormatter(undefined/*this.currentLocale*/, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
        }
      })

      // watch
      watch(() => props.value, (newVal, oldVal) => {
        state.isReversing = newVal < oldVal
      }, { lazy: true })


      function calculateChange(sign/*: number*/) {
        const [year, month] = String(props.value).split('-').map(Number)
        if (month == null) {
          return `${year + sign}`
        } else {
          return monthChange(props.value, sign)
        }
      }

      // Prev button
      const prevBtnDisabled = computed(() => props.disabled || (props.min && calculateChange(-1) < props.min))
      const prevClick = () => context.emit('input', calculateChange(-1))

      // Header value
      const datePickerHeaderClasses = computed(() => {
        return {
          'g-date-picker-header': true,
          'g-date-picker-header--disabled': props.disabled
        }
      })
      const datePickerHeaderValueClasses = computed(() => {
        return {
          'g-date-picker-header__value': true,
          'g-date-picker-header__value--disabled': props.disabled
        }
      })
      const headerData = computed(() => setTextColor(props.color, {}))
      const defaultSlotIsAvailable = context.slots.default !== undefined
      const headerTransitionName = computed(() => (state.isReversing === true /*!this.$vuetify.rtl*/) ? 'tab-reverse-transition' : 'tab-transition')
      const onHeaderClicked = () => context.emit('toggle')

      // Next button
      const nextBtnDisabled = computed(() => props.disabled || (props.max && calculateChange(1) < props.max))
      const nextClick = () => context.emit('input', calculateChange(1))

      return {
        prevBtnDisabled,
        prevClick,

        datePickerHeaderClasses,
        datePickerHeaderValueClasses,
        headerData,
        headerTransitionName,
        defaultSlotIsAvailable: defaultSlotIsAvailable,
        onHeaderClicked,

        nextBtnDisabled,
        nextClick,

        formatter
      }
    }
  }
</script>
<style scoped>
</style>
