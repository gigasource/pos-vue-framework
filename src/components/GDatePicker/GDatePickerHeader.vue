<script>
  import { computed, createElement as h, reactive, watch } from '@vue/composition-api';
  import { monthChange, createNativeLocaleFormatter } from './util';
  import { setTextColor } from '../../mixins/colorable';
  import GButton from '../GButton/GButton';

  export default {
    name: 'GDatePickerHeader',
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
      })

      // methods
      function genBtn (change/*: number*/) {
        const disabled = props.disabled ||
            (change < 0 && props.min && calculateChange(change) < props.min) ||
            (change > 0 && props.max && calculateChange(change) > props.max)

        return h(GButton, {
          props: {
            // dark: this.dark,
            // light: this.light,
            disabled,
            icon: true,
          },
          nativeOn: {
            click: (e/*: Event*/) => {
              e.stopPropagation()
              context.emit('input', calculateChange(change))
            },
          },
        }, [
            change < 0 ? '<' : '>'
          // h(VIcon, ((change < 0) === true /*!this.$vuetify.rtl*/) ? props.prevIcon : props.nextIcon),
        ])
      }

      function calculateChange(sign/*: number*/) {
        const [year, month] = String(props.value).split('-').map(Number)
        if (month == null) {
          return `${year + sign}`
        } else {
          return monthChange(props.value, sign)
        }
      }

      function genHeader () {
        const color = !props.disabled && (props.color || 'accent')
        const header = h('div', setTextColor(color, {
          key: String(props.value),
        }), [h('button', {
          attrs: {
            type: 'button',
          },
          on: {
            click: () => context.emit('toggle'),
          },
        }, [(context.slots.default && context.slots.default()) || formatter.value(String(props.value))])])

        const transition = h('transition', {
          props: {
            name: (state.isReversing === true /*!this.$vuetify.rtl*/) ? 'tab-reverse-transition' : 'tab-transition', // Currently doesn't support rtl
          },
        }, [header])

        return h('div', {
          staticClass: 'g-date-picker-header__value',
          class: {
            'g-date-picker-header__value--disabled': props.disabled,
          },
        }, [transition])
      }

      // render
      return () => {
        return h('div', {
          staticClass: 'g-date-picker-header',
          class: {
            'g-date-picker-header--disabled': props.disabled,
            // ...this.themeClasses,
          },
        }, [
          genBtn(-1),
          genHeader(),
          genBtn(+1),
        ])
      }
    }
  }
</script>
<style scoped>
</style>
