<template>
  <span class="g-tooltip" ref="el">
    <transition :name="transitionName">
      <div class="g-tooltip__content"
           :class="tooltipContentClasses"
           :style="tooltipContentStyle"
           v-show="state.isActive"
           ref="content">
        <!-- showSpeechBubble, speechBubbleClass, speechBubbleStyle exposed by tooltipSpeechBubble plugin -->
        <div v-if="showSpeechBubble"
             :class="speechBubbleClass"
             :style="speechBubbleStyle">
          <slot></slot>
        </div>
        <slot v-else></slot>
      </div>
    </transition>
    <div class="g-tooltip__activator" ref="activator">
      <slot name="activator" v-bind:on="activatorListeners"></slot>
    </div>
  </span>
</template>

<script>
  import { computed, onMounted, reactive, onBeforeUnmount } from '@vue/composition-api'
  import { setBackgroundColor } from '../../mixins/colorable';
  import { calcTop, calcLeft } from './TopLeftCalculate';
  import { convertToUnit } from '../../utils/helpers';
  import menuable from '../../mixins/menuable';
  import delayable from '../../mixins/delayable';
  import tooltipSpeechBubble from './GTooltipSpeechBubble';

  // constants
  export const TRANSITION_DEFAULT_ACTIVE = 'scale-transition'
  export const TRANSITION_DEFAULT_DEACTIVE = 'fade-transition'

  export default {
    name: 'GToolTip',
    props: {
      /*position w window*/
      ...{
        // Indicate whether tooltip should be shown with absolute position
        absolute: Boolean,
        // absolute left when absolute props is exist
        absoluteX: [Number, String],
        // absolute top when absolute props is exist
        absoluteY: [Number, String],
      },
      /*position w activator*/
      ...{
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
      /*position w overflow*/
      ...{
        allowOverflow: Boolean,
        offsetOverflow: Boolean,
      },
      /*position w attached el*/
      ...{
        attach: [Boolean, String, Object],
        offsetY: Boolean,
        offsetX: Boolean,
      },
      /*maxWidth, minWidth*/
      ...{
        maxWidth: {
          type: [Number, String],
          default: 'auto',
        },
        minWidth: [Number, String],
      },
      /*behavior*/
      ...{
        // By default, the tooltip will be shown if user click to activator
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
      /*look & feel*/
      ...{
        transition: String,
        // background color of tooltip
        color: {
          type: String,
          default: '#616161'
        },
        // boolean value indicate whether tooltip should be shown in speech bubble style
        speechBubble: Boolean,
        zIndex: {
          type: [Number, String],
          default: 999999
        }
      },
    },
    setup(props, context) {
      // tooltip state
      const state = reactive({ isActive: false })
      const { runDelay } = delayable(props, state)
      const { updateDimensions, dimensions, calcXOverflow, calcYOverFlow, menuableState } = menuable(props, context)
      const { showSpeechBubble, speechBubbleClass, speechBubbleStyle } = tooltipSpeechBubble(props, context)

      //// TOOLTIP CONTENT ////
      let colorOutput = computed(() => {
        return setBackgroundColor(props.color, {})
      })
      const tooltipContentClasses = computed(() => {
        return colorOutput.value.class
      })
      const tooltipContentStyle = computed(() => {
        return {
          ...colorOutput.value.style,
          top: calcTop(props, dimensions, menuableState, calcYOverFlow),
          left: calcLeft(props, dimensions, calcXOverflow),
          maxWidth: convertToUnit(props.maxWidth),
          minWidth: convertToUnit(props.minWidth),
          zIndex: props.zIndex,
        }
      })

      //// ACTIVATOR ////
      const activatorListeners = computed(() => {
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

        //behaviour like click-outside
        listeners.blur = () => runDelay('close')

        return listeners
      })

      //// TRANSITION ////
      const transitionName = computed(() => {
        if (props.transition) {
          return props.transition
        }
        return state.isActive ? TRANSITION_DEFAULT_ACTIVE : TRANSITION_DEFAULT_DEACTIVE
      })

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

      //remove tooltip when unmount
      onBeforeUnmount(() => context.root.$el.removeChild(context.refs.content))

      // template data
      return {
        state,
        tooltipContentClasses,
        tooltipContentStyle,
        transitionName,
        activatorListeners,
        showSpeechBubble,
        speechBubbleClass,
        speechBubbleStyle
      }
    }
  }
</script>
