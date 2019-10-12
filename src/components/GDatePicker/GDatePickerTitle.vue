<template>
  <div :class="titleClasses">
    <div :class="titleYearClasses" v-on:click.stop="onYearButtonClicked">
      {{ year }}
    </div>
    <div :class="titleDateClasses">
      <transition :name="transitionName">
        <div :key="date" v-html="date"></div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { computed } from '@vue/composition-api'
  import { TRANSITION_NAMES } from './utils';

  // class
  const PICKER_TITLE = 'g-date-picker-title'
  const PICKER_TITLE_DISABLED = 'g-date-picker-title--disabled'
  const PICKER_TITLE_BTN = 'g-picker__title__btn'
  const PICKER_TITLE_BTN_READONLY = 'g-picker__title__btn--readonly'
  const PICKER_TITLE_BTN_ACTIVE = 'g-picker__title__btn--active'
  const PICKER_TITLE_YEAR = 'g-date-picker-title__year'
  const PICKER_TITLE_DATE = 'g-date-picker-title__date'


  // exposed events
  export const EVENT_NAMES = {
    UPDATE_SELECTING_YEAR: 'update:selecting-year'
  }

  export default {
    name: 'GDatePickerTitle',
    props: {
      year: {
        type: [Number, String],
        default: ''
      }, // 1st line -> year
      date: {
        type: String,
        default: ''
      },// 2nd line, maybe contain html code -> render as raw html
      disabled: Boolean,      // Boolean value indicate that this component is disabled or not
      readonly: Boolean,      // Boolean value indicate that this component is readonly or not
      selectingYear: Boolean, // Boolean value indicate that whether Years is showing or not
    },
    setup(props, context) {
      let titleClasses = computed((() => {
        return {
          [PICKER_TITLE]: true,
          [PICKER_TITLE_DISABLED]: props.disabled
        }
      }))

      // Year info
      let titleYearClasses = computed((() => {
        return {
          [PICKER_TITLE_BTN]: true,
          [PICKER_TITLE_BTN_READONLY]: props.readonly,
          [PICKER_TITLE_BTN_ACTIVE]: true,
          [PICKER_TITLE_YEAR]: true
        }
      }))
      function onYearButtonClicked() {
        if (props.selectingYear || props.readonly)
          return
        context.emit(EVENT_NAMES.UPDATE_SELECTING_YEAR, true)
      }

      // Date/selected items state
      let titleDateClasses = computed(() => {
        return {
          [PICKER_TITLE_BTN]: true,
          [PICKER_TITLE_BTN_READONLY]: props.readonly,
          [PICKER_TITLE_DATE]: true
        }
      })

      return {
        titleClasses: titleClasses,
        //
        titleYearClasses: titleYearClasses,
        onYearButtonClicked,
        //
        titleDateClasses: titleDateClasses,
        //
        transitionName: TRANSITION_NAMES.PICKER
      }
    }
  }
</script>
