<template>
  <transition :name="transitionName">
    <div v-show="show"
         class="g-tooltip__content"
         :class="tooltipContentClasses"
         :style="tooltipContentStyle"
         ref="content">
      <div v-if="showSpeechBubble"
           :class="speechBubbleClass"
           :style="speechBubbleStyle">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </div>
  </transition>
</template>

<script>
  import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { setBackgroundColor } from '../../mixins/colorable';
  import { calcTop, calcLeft } from './TopLeftCalculate';
  import { convertToUnit } from '../../utils/helpers';
  import menuable from '../../mixins/menuable';
  import tooltipSpeechBubble from './GTooltipSpeechBubble';
  import detachable from '../../mixins/detachable';

  export default {
    name: 'GTooltipContent',
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
      // a tooltip activator
      activator: [Object],
      show: Boolean,
    },
    setup(props, context) {
      const content = ref(null)

      const { attachToRoot, detach } = detachable(props, context, { activator: props.activator, content })
      const { updateDimensions, dimensions, calcXOverflow, calcYOverFlow, menuableState } = menuable(props, context)
      const { showSpeechBubble, speechBubbleClass, speechBubbleStyle } = tooltipSpeechBubble(props, context)

      //// TOOLTIP CONTENT ////
      let colorOutput = computed(() => setBackgroundColor(props.color, {}))
      const tooltipContentClasses = computed(() => colorOutput.value.class)
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

      //// TRANSITION ////
      const transitionName = computed(() => {
        if (props.transition) {
          return props.transition
        }
        return props.show ? 'scale-transition' : 'fade-transition'
      })

      onMounted(() => {
        nextTick(() => {
          attachToRoot()
          updateDimensions(props.activator, content)
        })
      })

      onBeforeUnmount(() => {
        detach()
      })

      // template data
      return {
        tooltipContentClasses,
        tooltipContentStyle,
        transitionName,
        showSpeechBubble,
        speechBubbleClass,
        speechBubbleStyle,
        content,
      }
    }
  }
</script>
