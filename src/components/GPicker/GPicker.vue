<script>
  import { setBackgroundColor } from '../../mixins/colorable'
  import { computed, createElement as h } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers'

  export default {
    name: 'GPicker',
    props: {
      // Colorable's props
      color: String,

      // GPicker's props
      fullWidth: Boolean,
      landscape: Boolean,
      noTitle: Boolean,
      transition: {
        type: String,
        default: 'fade-transition',
      },
      width: {
        type: [Number, String],
        default: 290,
      },
    },
    setup(props, context) {
      // mixins
      // data
      // computed
      const computedTitleColor = computed(()/*: string | false*/ => {
        const defaultTitleColor =  (props.color || 'primary') /*TODO: Themeable - this.isDark ? false : (props.color || 'primary') */
        return props.color || defaultTitleColor
      })

      // methods
      function genTitle () {
        return h('div', setBackgroundColor(computedTitleColor.value, {
          staticClass: 'g-picker__title',
          class: {
            'g-picker__title--landscape': props.landscape,
          },
        }), context.slots.title())
      }

      function genBodyTransition () {
        return h('transition', {
          props: {
            name: props.transition,
          },
        }, context.slots.default())
      }

      function genBody () {
        return h('div', {
          staticClass: 'g-picker__body',
          class: {
            'g-picker__body--no-title': props.noTitle,
            // ...this.themeClasses, // TODO: Themeable
          },
          style: props.fullWidth ? undefined : {
            width: convertToUnit(props.width),
          },
        }, [
          genBodyTransition(),
        ])
      }

      function genActions () {
        return h('div', {
          staticClass: 'g-picker__actions g-card__actions',
          class: {
            'g-picker__actions--no-title': props.noTitle,
          },
        }, context.slots.actions())
      }

      return () => {
        return h('div', {
          staticClass: 'g-picker g-card',
          class: {
            'g-picker--landscape': props.landscape,
            'g-picker--full-width': props.fullWidth,
            // ...this.themeClasses,
          },
        }, [
          context.slots.title ? genTitle() : null,
          genBody(),
          context.slots.actions ? genActions() : null,
        ])
      }
    }
  }
</script>
