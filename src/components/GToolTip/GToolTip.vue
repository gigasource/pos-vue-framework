<script>
  import { onBeforeMount, computed, createElement as h, onMounted, reactive } from '@vue/composition-api'
  import menuable from '../../mixins/menuable';
  import delayable from '../../mixins/delayable';
  import colorable from '../../mixins/colorable';
  import { convertToUnit } from '../../utils/helpers';

  // constants
  const TOOLTIP_STATIC_CLASS = 'g-tooltip'
  const TOOLTIP_ACTIVATOR_STATIC_CLASS = 'g-tooltip__activator'
  const TOOLTIP_CONTENT_STATIC_CLASS = 'g-tooltip__content'
  const TOOLTIP_CONTENT_SPEECH_BUBBLE_STATIC_CLASS = 'g-tooltip__content__speech-bubble'
  const TRANSITION_DEFAULT_ACTIVE = 'scale-transition'
  const TRANSITION_DEFAULT_DEACTIVE = 'fade-transition'

  export default {
    name: 'GToolTip',
    props: {
      /*position w window*/     ...{
        // Indicate whether tooltip should be shown with absolute position
        absolute: Boolean,
        // absolute left when absolute props is exist
        absoluteX: [Number, String],
        // absolute top when absolute props is exist
        absoluteY: [Number, String],
      },
      /*position w activator*/  ...{
        // relative position of tooltip content with tooltip activator
        // automatically compute position, centering tooltip content
        // NOTE THAT: this value will be enabled if absolute props is not provided

        // tooltip shown below activator
        bottom: Boolean,
        // tooltip shown on the left of activator
        left: Boolean,
        // tooltip show on the right of activator
        right: Boolean,
        // tooltip show above of activator
        top: Boolean,


        // offset tooltip content with tooltip activator

        // NOTE THAT: the result will be computed:
        //  - if absolute props is not provided
        //  - after automatically position (bottom | left | right | top)
        nudgeBottom: {
          type: [Number, String],
          default: 0,
        },
        nudgeLeft: {
          type: [Number, String],
          default: 0,
        },
        nudgeRight: {
          type: [Number, String],
          default: 0,
        },
        nudgeTop: {
          type: [Number, String],
          default: 0,
        },
        nudgeWidth: {
          type: [Number, String],
          default: 0,
        },
      },
      /*position w overflow*/   ...{
        allowOverflow: Boolean,
        offsetOverflow: Boolean,
      },
      /*position w attached el*/...{
        attach: [Boolean, String, Object],
        offsetY: Boolean,
        offsetX: Boolean,
      },
      /*maxWidth, minWidth*/    ...{
        maxWidth: {
          type: [Number, String],
          default: 'auto',
        },
        minWidth: [Number, String],
      },
      /*behavior*/              ...{
        // By default, the tooltip will be shown if user click to activator
        // This behavior can be change by providing open-on-hover property
        // If open-on-hover property provided, the tooltip will be shown/hide by hovering/leaving
        openOnHover: {
          type: Boolean,
          default: false,
        },
        // delay
        closeDelay: {
          type: [Number, String],
          default: 0,
        },
        openDelay: {
          type: [Number, String],
          default: 0,
        },
      },
      /*look & feel*/           ...{
        // transition name
        transition: String,
        // background color of tooltip
        color: {
          type: String,
          default: '#616161'
        },
        // boolean value indicate whether tooltip should be shown in speech bubble style
        speechBubble: Boolean,
      }
    },
    setup(props, context) {
      // tooltip state
      const state = reactive({ isActive: false })
      const { runDelay } = delayable(props, state)
      const {
        updateDimensions,
        dimensions,
        calcXOverflow,
        calcYOverFlow,
        menuableState,
      } = menuable(props, context)

      //// TOOLTIP CONTENT ////
      // generate tooltip content component
      const computedTooltipContent = computed(() => {
        if (!context.slots.default || typeof context.slots.default !== 'function')
          return []
        return props.speechBubble ? [speechBubble.value] : [context.slots.default()]
      })
      // generate tooltip style
      const tooltipContentStyles = computed(() => {
        return {
          left: calculatedLeft.value,
          maxWidth: convertToUnit(props.maxWidth),
          minWidth: convertToUnit(props.minWidth),
          opacity: state.isActive ? 1 : 0,
          top: calculatedTop.value,
          zIndex: props.zIndex || 999 // Old value: Stackable.activeZIndex
        }
      })
      const CONTENT_PADDING = 10;
      // Calculate x position for tooltip content
      const calculatedLeft = computed(() => {
        // absolute positioning
        if (props.absolute)
          return (props.absoluteX || 0) + 'px'

        // calculate base on activator and content
        const unknown = !props.bottom && !props.left && !props.top && !props.right
        const activatorLeft = props.attach !== false ? dimensions.activator.offsetLeft : dimensions.activator.left
        let left = 0
        if (props.top || props.bottom || unknown) {
          left = (
              activatorLeft +
              (dimensions.activator.width / 2) - (dimensions.content.width / 2)
          )
        } else if (props.left || props.right) {
          left = (
              activatorLeft +
              (props.right ? dimensions.activator.width : -dimensions.content.width) +
              (props.right ? CONTENT_PADDING : -CONTENT_PADDING)
          )
        }
        if (props.nudgeLeft) left -= parseInt(props.nudgeLeft)
        if (props.nudgeRight) left += parseInt(props.nudgeRight)
        return `${calcXOverflow(left, dimensions.content.width)}px`
      })
      // Calculate y position for tooltip content
      const calculatedTop = computed(() => {
        // absolute positioning
        if (props.absolute)
          return (props.absoluteY || 0) + 'px'

        // calculate position base on activator and content
        const activatorTop = props.attach !== false ? dimensions.activator.offsetTop : dimensions.activator.top
        let top = 0
        if (props.top || props.bottom) {
          top = (
              activatorTop +
              (props.bottom ? dimensions.activator.height : -dimensions.content.height) +
              (props.bottom ? CONTENT_PADDING : -CONTENT_PADDING)
          )
        } else if (props.left || props.right) {
          top = (
              activatorTop +
              (dimensions.activator.height / 2) - (dimensions.content.height / 2)
          )
        } else {
          top = (
              activatorTop - dimensions.content.height - CONTENT_PADDING)
        }
        if (props.nudgeTop) top -= parseInt(props.nudgeTop)
        if (props.nudgeBottom) top += parseInt(props.nudgeBottom)
        return `${calcYOverFlow(top + menuableState.pageYOffset)}px`
      })
      // SPEECH BUBBLE
      // generate speech bubble content
      const speechBubble = computed(() => {
        return h('div', {
          staticClass: getSpeechBubbleStaticClassName.value,
          style: {
            [getBubbleBorderColorProp.value]: props.color
          }
        }, context.slots.default())
      })
      const getSpeechBubbleStaticClassName = computed(() => {
        return `${TOOLTIP_CONTENT_SPEECH_BUBBLE_STATIC_CLASS} ${TOOLTIP_CONTENT_SPEECH_BUBBLE_STATIC_CLASS}--${getBubbleArrowPosition.value}`
      })
      const getBubbleArrowPosition = computed(() => {
        if (props.top) return 'bottom'
        if (props.left) return 'right'
        if (props.right) return 'left'
        if (props.bottom) return 'top'
        return ''
      })
      const getBubbleBorderColorProp = computed(() => {
        let direction = 'top'
        if (props.top) direction = 'top'
        else if (props.left) direction = 'left'
        else if (props.right) direction = 'right'
        else if (props.bottom) direction = 'bottom'
        return `border-${direction}-color`
      })

      //// ACTIVATOR ////
      // generate activator listener
      const genActivatorListeners = () => {
        let listeners = {}

        if (props.openOnHover) {
          listeners.mouseenter = (e/*: MouseEvent*/) => {
            updateDimensions()
            runDelay('open')
          }
          listeners.mouseleave = (e/*: MouseEvent*/) => {
            updateDimensions()
            runDelay('close')
          }
        } else {
          // default behavior - open on click
          listeners.click = (e/*: MouseEvent*/) => {
            updateDimensions()
            state.isActive = !state.isActive
          }
        }
        return listeners
      }
      // generate activator component
      const genActivator = () => {
        return h('div',
            { ref: 'activator', staticClass: TOOLTIP_ACTIVATOR_STATIC_CLASS },
            context.slots.activator ? context.slots.activator({
              on: genActivatorListeners()
            }) : undefined)
      }

      //// LIFECYCLE HOOK ////
      onMounted(() => {
        context.root.$nextTick(() => {
          // attach content to app element
          context.root.$el.insertBefore(context.refs.content, context.root.$el.firstChild)
          // moving activator out of g-tooltip element
          context.refs.el.parentNode.insertBefore(context.refs.activator, context.refs.el)
          updateDimensions()
        })
      })


      //// TRANSITION ////
      const computedTransition = computed(() => {
        if (props.transition) return props.transition
        return state.isActive ? TRANSITION_DEFAULT_ACTIVE : TRANSITION_DEFAULT_DEACTIVE
      })

      //// RENDER FUNCTION ////
      return () => {
        // tooltip content
        const tooltip = h('div', colorable.setBackgroundColor(props.color, {
          staticClass: TOOLTIP_CONTENT_STATIC_CLASS,
          style: tooltipContentStyles.value,
          directives: [{
            name: 'show',
            value: state.isActive,
          }],
          ref: 'content',
        }), computedTooltipContent.value);

        // tooltip
        return h('span', {
          staticClass: TOOLTIP_STATIC_CLASS,
          ref: 'el'
        }, [
          h('transition', {
            props: {
              name: computedTransition.value,
            },
          }, [tooltip]),
          genActivator(),
        ])
      }
    }
  }
</script>
