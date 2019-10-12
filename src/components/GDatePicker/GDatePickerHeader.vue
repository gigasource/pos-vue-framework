<template>
  <div :class="datePickerHeaderClasses">
    <div :class="datePickerHeaderValueClasses">
      <transition :name="headerTransitionName">
        <div :key="value" :class="headerData.class" :style="headerData.style">
          <button type="button" v-on:click="onHeaderClicked">
            <template v-if="defaultSlotIsAvailable">
              <slot></slot>
            </template>
            <template v-else>
              {{ headerFormatter(value) }}
            </template>
          </button>
        </div>
      </transition>
    </div>
    <button :disabled="prevBtnDisabled" class="g-date-picker-header__prev-button" v-on:click="prevClick">
<!--      <i class="material-icons">mdi-chevron-left</i>-->
    </button>
    <button :disabled="nextBtnDisabled" class="g-date-picker-header__next-button" v-on:click="nextClick">
<!--      <i class="material-icons">mdi-chevron-right</i>-->
    </button>
  </div>
</template>

<script>
  import { computed, reactive, watch } from '@vue/composition-api'
  import { monthChange, createNativeLocaleFormatter, TRANSITION_NAMES } from './utils'
  import { setTextColor } from '../../mixins/colorable'
  import GButton from '../GButton/GButton'

  // clss
  const DATE_PICKER_HEADER_CLS = {
    HEADER: 'g-date-picker-header',
    HEADER_DISABLED: 'g-date-picker-header--disabled',
    HEADER_VALUE: 'g-date-picker-header__value',
    HEADER_VALUE_DISABLED: 'g-date-picker-header__value--disabled'
  }

  const NAV = {
    PREV: -1,
    NEXT: 1
  }

  export const EVENT_NAMES = {
    TOGGLE: 'toggle',
    INPUT: 'input'
  }

  export default {
    name: 'GDatePickerHeader',
    components: { GButton },
    props: {
      disabled: Boolean,
      readonly: Boolean,
      min: String,
      max: String,
      value: {
        type: [Number, String],
        required: true,
      },
      format: Function,
    },
    setup(props, context) {
      // header transition
      const state = reactive({ isReversing: false })
      const headerTransitionName = computed(() => (state.isReversing) ? TRANSITION_NAMES.REVERSE_TAB : TRANSITION_NAMES.TAB)
      watch(() => props.value, (newVal, oldVal) => state.isReversing = newVal < oldVal, { lazy: true, flush: 'pre' })
      // header value
      const headerFormatter = computed(() => {
        if (props.format) {
          return props.format
        } else if (String(props.value).split('-')[1]) {
          return createNativeLocaleFormatter(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 })
        } else {
          return createNativeLocaleFormatter(undefined, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
        }
      })
      const datePickerHeaderClasses = computed(() => {
        return {
          [DATE_PICKER_HEADER_CLS.HEADER]: true,
          [DATE_PICKER_HEADER_CLS.HEADER_DISABLED]: props.disabled
        }
      })
      const datePickerHeaderValueClasses = computed(() => {
        return {
          [DATE_PICKER_HEADER_CLS.HEADER_VALUE]: true,
          [DATE_PICKER_HEADER_CLS.HEADER_VALUE_DISABLED]: props.disabled
        }
      })
      const headerData = computed(() => setTextColor(props.color, {}))
      const defaultSlotIsAvailable = context.slots.default !== undefined
      // header event handler
      const onHeaderClicked = () => context.emit(EVENT_NAMES.TOGGLE)


      // Prev button
      const prevBtnDisabled = computed(() => props.disabled || (props.min && calculateChange(NAV.PREV) < props.min))
      const prevClick = () => context.emit(EVENT_NAMES.INPUT, calculateChange(NAV.PREV))

      // Next button
      const nextBtnDisabled = computed(() => props.disabled || (props.max && calculateChange(NAV.NEXT) < props.max))
      const nextClick = () => context.emit(EVENT_NAMES.INPUT, calculateChange(NAV.NEXT))

      //
      function calculateChange(sign/*: number*/) {
        const [year, month] = String(props.value).split('-').map(Number)
        if (month == null) {
          return `${year + sign}`
        } else {
          return monthChange(props.value, sign)
        }
      }


      return {
        datePickerHeaderClasses,
        datePickerHeaderValueClasses,
        headerData,
        headerTransitionName,
        defaultSlotIsAvailable,
        onHeaderClicked,
        headerFormatter,
        //
        prevBtnDisabled,
        prevClick,
        //
        nextBtnDisabled,
        nextClick,

      }
    }
  }
</script>
<style scoped>
</style>
