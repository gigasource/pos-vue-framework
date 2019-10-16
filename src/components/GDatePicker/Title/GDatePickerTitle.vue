<template>
  <div :class="titleClasses">
    <div :class="titleYearClasses" @click.stop="onYearButtonClicked">
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
  import { TRANSITION_NAMES } from '../utils';
  import { getYearButtonClickHandler } from './GDatePickerTitleUtil'

  // class
  const PICKER_TITLE = 'g-date-picker-title'
  const PICKER_TITLE_DISABLED = 'g-date-picker-title--disabled'
  const PICKER_TITLE_BTN = 'g-picker__title__btn'
  const PICKER_TITLE_BTN_READONLY = 'g-picker__title__btn--readonly'
  const PICKER_TITLE_BTN_ACTIVE = 'g-picker__title__btn--active'
  const PICKER_TITLE_YEAR = 'g-date-picker-title__year'
  const PICKER_TITLE_DATE = 'g-date-picker-title__date'

  export default {
    name: 'GDatePickerTitle',
    props: {
      // 1st line -> year
      year: {
        type: [Number, String],
        default: ''
      },
      // 2nd line, maybe contain html code -> render as raw html
      date: {
        type: String,
        default: ''
      },
      // Boolean value indicate that this component is disabled or not
      disabled: Boolean,
      // Boolean value indicate that this component is readonly or not
      readonly: Boolean,
      // Boolean value indicate that whether Years is showing or not
      selectingYear: Boolean,
    },
    setup(props, context) {
      const titleClasses = computed((() => {
        return {
          [PICKER_TITLE]: true,
          [PICKER_TITLE_DISABLED]: props.disabled
        }
      }))

      // Year info
      const titleYearClasses = computed((() => {
        return {
          [PICKER_TITLE_BTN]: true,
          [PICKER_TITLE_BTN_READONLY]: props.readonly,
          [PICKER_TITLE_BTN_ACTIVE]: true,
          [PICKER_TITLE_YEAR]: true
        }
      }))

      const onYearButtonClicked = getYearButtonClickHandler(props, context)

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
