<template>
  <div :class="datePickerHeaderClasses">
    <div :class="datePickerHeaderValueClasses">
      <transition :name="headerTransitionName">
        <div :key="value" :class="headerData.class" :style="headerData.style">
          <button type="button" v-on:click="onHeader">
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
    <button :disabled="prevBtnDisabled" class="g-date-picker-header__prev-button" v-on:click="onPrev"></button>
    <button :disabled="nextBtnDisabled" class="g-date-picker-header__next-button" v-on:click="onNext"></button>
  </div>
</template>

<script>
  import { computed, reactive, watch } from '@vue/composition-api'
  import { TRANSITION_NAMES } from '../utils'
  import { setTextColor } from '../../../mixins/colorable'
  import { getHeaderEvents, getHeaderFormatter, getNextBtnDisabledState, getPrevBtnDisabledState } from './GDatePickerHeaderUtil';

  // clss
  const DATE_PICKER_HEADER_CLS = {
    HEADER: 'g-date-picker-header',
    HEADER_DISABLED: 'g-date-picker-header--disabled',
    HEADER_VALUE: 'g-date-picker-header__value',
    HEADER_VALUE_DISABLED: 'g-date-picker-header__value--disabled'
  }

  export default {
    name: 'GDatePickerHeader',
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

      // header content
      const headerFormatter = getHeaderFormatter(props)
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


      // navigation
      const prevBtnDisabled = getPrevBtnDisabledState(props)
      const nextBtnDisabled = getNextBtnDisabledState(props)
      const { onPrev, onNext, onHeader } = getHeaderEvents(props, context)

      return {
        datePickerHeaderClasses,
        datePickerHeaderValueClasses,
        headerData,
        headerTransitionName,
        defaultSlotIsAvailable,
        onHeader,
        headerFormatter,
        //
        prevBtnDisabled,
        onPrev,
        //
        nextBtnDisabled,
        onNext,
      }
    }
  }
</script>
<style scoped>
</style>
