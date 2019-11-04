<template>
  <span class="g-tooltip" ref="el">
    <g-tool-tip-content
        v-if="state.isActive || state.tooltipContentCreated"
        :show="state.isActive"
        :activator="activator"
        v-bind="props">
      <slot></slot>
    </g-tool-tip-content>
    <div class="g-tooltip__activator" ref="activator">
      <slot name="activator" v-bind:on="activatorListeners"></slot>
    </div>
  </span>
</template>

<script>
  import { computed, onMounted, reactive, ref } from '@vue/composition-api'
  import delayable from '../../mixins/delayable';
  import tooltipSpeechBubble from './GTooltipSpeechBubble';
  import detachable from '../../mixins/detachable';
  import GToolTipContent from './GToolTipContent';

  // constants
  export const TRANSITION_DEFAULT_ACTIVE = 'scale-transition'
  export const TRANSITION_DEFAULT_DEACTIVE = 'fade-transition'

  export default {
    name: 'GToolTip',
    components: { GToolTipContent },
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
      const state = reactive({ isActive: false, tooltipContentCreated: false })
      const { runDelay } = delayable(props, state)
      const { attachToParent } = detachable(props, context)
      const { showSpeechBubble, speechBubbleClass, speechBubbleStyle } = tooltipSpeechBubble(props, context)

      //// ACTIVATOR
      // This variable will be used by Tooltip content to calculate position
      const activator = ref(null)
      const activatorListeners = computed(() => {
        let listeners = {}

        if (props.openOnHover) {
          listeners.mouseenter = () => {
            if (!state.tooltipContentCreated)
              state.tooltipContentCreated = true
            runDelay('open')
          }
          listeners.mouseleave = () => {
            runDelay('close')
          }
        } else {
          listeners.click = () => {
            if (!state.tooltipContentCreated)
              state.tooltipContentCreated = true
            state.isActive = !state.isActive
          }
        }

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

      onMounted(() => {
        context.root.$nextTick(() => {
          attachToParent(context.refs.activator)
          // store activator reference
          activator.value = context.refs.activator
        })
      })

      // template data
      return {
        props,
        state,
        activator,
        transitionName,
        activatorListeners,
        showSpeechBubble,
        speechBubbleClass,
        speechBubbleStyle
      }
    }
  }
</script>
