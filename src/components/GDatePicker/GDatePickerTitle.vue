<template>
  <div class="g-date-picker-title"
    :class="{ 'g-date-picker-title--disabled': disabled }">
    <div class="g-picker__title__btn g-date-picker-title__year"
         :class="{ 'g-picker__title__btn--readonly': readonly, 'g-picker__title__btn--active': selectingYear === value }"
         v-on:click.stop="onYearButtonClicked">
        {{ year }} &nbsp;
      <span class="g-date-picker-title__year__icon"></span>
    </div>
    <div class="g-picker__title__btn g-date-picker-title__date"
         :class="{ 'g-picker__title__btn--readonly': readonly, 'g-picker__title__btn--active': selectingYear === value }"
         v-on:click.stop="onTitleButtonClicked">
      <transition :name="computedTransition">
        <div :key="value" v-html="date">
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { computed, createElement as h, reactive, watch } from '@vue/composition-api';
  import { kebabCase } from '../../utils/helpers';

  export default {
    name: 'GDatePickerTitle',
    props: {
      date: {
        type: String,
        default: '',
      },
      disabled: Boolean,
      readonly: Boolean,
      selectingYear: Boolean,
      value: {
        type: String
      },
      year: {
        type: [Number, String],
        default: '',
      },
      yearIcon: {
        type: String,
      },
    },
    setup(props, context) {

      // data
      const state = reactive({isReversing: false})
      // computed
      let computedTransition = computed(() => {
        return state.isReversing ? 'picker-reverse-transition' : 'picker-transition'
      })

      // watch
      watch(() => props.value, (val, prev) => {
        state.isReversing = val < prev
      }, { lazy: true })

      function onYearButtonClicked(e) {
        if (props.selectingYear === props.value || props.readonly)
          return
        context.emit(`update:${kebabCase('selectingYear')}`, true)
      }

      function onTitleButtonClicked(e) {
        if (props.selectingYear === props.value || props.readonly)
          return
        context.emit(`update:${kebabCase('selectingYear')}`, false)
      }

      return {
        onYearButtonClicked,
        onTitleButtonClicked,
        computedTransition
      }
    }
  }
</script>
