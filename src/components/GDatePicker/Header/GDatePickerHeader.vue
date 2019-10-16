<template>
  <div :class="datePickerHeaderClasses">
    <div :class="datePickerHeaderValueClasses">
      <transition :name="headerTransitionName">
        <div :key="value" :class="headerData.class" :style="headerData.style">
          <button type="button" @click="onHeader">
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
    <button :disabled="!canGoPrev" class="g-date-picker-header__prev-button" @click="onPrev"></button>
    <button :disabled="!canGoNext" class="g-date-picker-header__next-button" @click="onNext"></button>
  </div>
</template>

<script>
  import { computed, reactive, watch } from '@vue/composition-api'
  import { TRANSITION_NAMES } from '../utils'
  import { setTextColor } from '../../../mixins/colorable'
  import { getHeaderEvents, getHeaderFormatter, getNavigationState  } from './GDatePickerHeaderUtil';

  // css class
  const CSS_CLS = {
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
          [CSS_CLS.HEADER]: true,
          [CSS_CLS.HEADER_DISABLED]: props.disabled
        }
      })
      const datePickerHeaderValueClasses = computed(() => {
        return {
          [CSS_CLS.HEADER_VALUE]: true,
          [CSS_CLS.HEADER_VALUE_DISABLED]: props.disabled
        }
      })
      const headerData = computed(() => setTextColor(props.color, {}))
      const defaultSlotIsAvailable = context.slots.default !== undefined


      // navigation
      const { canGoPrev, canGoNext } = getNavigationState(props)
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
        canGoPrev,
        onPrev,
        //
        canGoNext,
        onNext,
      }
    }
  }
</script>
<style scoped>
</style>
