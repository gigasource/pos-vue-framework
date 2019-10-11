<script>
  import PickerButton from '../../mixins/picker-button';
  import { computed, createElement as h, reactive, watch } from '@vue/composition-api';

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
      // mixins
      const { genPickerButton } = PickerButton(props, context)

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

      // methods
      function genYearIcon ()/*: VNode */{
        return h('div' /*TODO: VIcon*/, {
          props: {
            // dark: true,
          },
        }, props.yearIcon)
      }
      function getYearBtn ()/*: VNode*/ {
        return genPickerButton('selectingYear', true, [
          String(props.year),
          props.yearIcon ? genYearIcon() : null,
        ], false, 'g-date-picker-title__year')
      }
      function genTitleText ()/*: VNode */{
        return h('transition', {
          props: {
            name: computedTransition.value,
          },
        }, [
          h('div', {
            domProps: { innerHTML: props.date || '&nbsp;' },
            // key: props.value,
          }),
        ])
      }
      function genTitleDate ()/*: VNode*/ {
        return genPickerButton('selectingYear', false, [genTitleText()], false, 'g-date-picker-title__date')
      }

      return () => {
        return h('div', {
          staticClass: 'g-date-picker-title',
          class: {
            'g-date-picker-title--disabled': props.disabled,
          },
        }, [
          getYearBtn(),
          genTitleDate(),
        ])
      }
    }
  }
</script>
<style scoped>
</style>
