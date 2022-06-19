<template>
  <span class="g-tooltip" ref="el">
    <g-tooltip-content
      v-if="props.removeContentOnClose ? (state.lazy && renderContent) : state.lazy"
      :show="state.isActive"
      :activator="activator"
      v-bind="props">
      <slot></slot>
    </g-tooltip-content>
    <div class="g-tooltip__activator" ref="activatorWrapper">
      <slot name="activator" :on="activatorListeners"></slot>
    </div>
  </span>
</template>

<script>
  import { computed, onMounted, reactive, ref, nextTick } from 'vue';
  import delayable from '../../mixins/delayable';
  import detachable from '../../mixins/detachable';
  import GTooltipContent from './GTooltipContent';
  import _ from 'lodash';

  export default {
    name: 'GTooltip',
    components: { GTooltipContent },
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
          default: true,
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
        removeContentOnClose: Boolean,
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
        },
      },
    },
    setup(props, context) {
      const el = ref(null)
      const activator = ref(null)
      const activatorWrapper = ref(null)
      const renderContent = ref(false)
      // tooltip state
      const state = reactive({
        // Boolean value indicate that whether tooltip content will be shown or not
        // NOTICE: Do not change this prop name because this props has been used a lot places
        isActive: false,
        // Boolean value indicate that whether tooltip content will be rendered or not
        lazy: false
      })

      const { runDelay } = delayable(props, state)
      const { attachToParent } = detachable(props, context, { activator: activatorWrapper, el });

      //// ACTIVATOR
      // This variable will be used by Tooltip content to calculate position
      const activatorListeners = computed(() => {
        let listeners = {}

        listeners.mouseenter = () => {}
        listeners.mouseleave = () => {}
        listeners.click = () => {}

        if (props.openOnHover) {
          listeners.mouseenter = () => {
            if (!state.lazy) state.lazy = true

            runDelay('open', () => {
              state.isActive = true
              renderContent.value = true
            })
          }
          listeners.mouseleave = () => {

            runDelay('close', () => {
              state.isActive = false
              renderContent.value = false
            })
          }
        } else {
          listeners.click = () => {
            if (!state.lazy) state.lazy = true

            state.isActive = !state.isActive
            renderContent.value = !renderContent.value
          }
        }

        listeners.blur = () => runDelay('close')

        return listeners
      })

      onMounted(() => {
        nextTick(() => {
          if (activatorWrapper.value) {
            if (_.isEmpty(activatorWrapper.value.children)) {
              // fallback
              activator.value = activatorWrapper.value
            } else {
              activator.value = activatorWrapper.value.children[0];
            }
            attachToParent(activatorWrapper.value)
          }
        })
      })

      // template data
      return {
        props,
        state,
        activator,
        activatorWrapper,
        activatorListeners,
        renderContent,
        el,
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "GTooltip";
</style>
