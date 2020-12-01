<script>
  import { computed, getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
  import menuable from '../../mixins/menuable';
  import getVModel from '../../mixins/getVModel';
  import { convertToUnit } from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import Resize from '../../directives/resize/resize';
  import stackable from '../../mixins/stackable';
  import dependent from '../../mixins/dependent';
  import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

  export default {
    name: 'GMenuContent',
    directives: {
      ClickOutside,
      Resize
    },
    props: {
      activator: null, //ref HTMLElement
      // basic
      ...{
        modelValue: Boolean,
      },
      // positioning
      ...{
        auto: Boolean,
        top: Boolean,
        bottom: Boolean,
        left: Boolean,
        right: Boolean,
        offsetX: {
          type: Boolean,
        },
        offsetY: {
          type: Boolean,
          default: true
        },
        nudgeLeft: {
          type: [Number, String],
          default: 0
        },
        nudgeRight: {
          type: [Number, String],
          default: 0
        },
        nudgeTop: {
          type: [Number, String],
          default: 0
        },
        nudgeBottom: {
          type: [Number, String],
          default: 0
        },
        positionX: [Number, String],
        positionY: [Number, String],
        allowOverflow: Boolean,
        offsetOverflow: Boolean,
        absolute: Boolean,
        clientX: [Number, String],
        clientY: [Number, String],
      },
      // toggling
      ...{
        openOnHover: Boolean,
        closeOnClick: {
          type: Boolean,
          default: true
        },
        closeOnContentClick: Boolean
      },
      // sizing
      ...{
        maxWidth: {
          type: [Number, String],
          default: '100%'
        },
        minWidth: [Number, String],
        maxHeight: {
          type: [Number, String],
          default: 'auto'
        },
        minHeight: [Number, String],
        contentFillWidth: {
          type: Boolean,
        }
      },
      // delay
      ...{
        openDelay: {
          type: [Number, String],
          default: 0
        },
        closeDelay: {
          type: [Number, String],
          default: 0
        }
      },
      // dependent mixin
      ...{
        closeDependents: {
          type: Boolean,
          default: true,
        },
        isDependent: {
          type: Boolean,
          default: true,
        },
      },
      //styling content
      ...{
        contentClass: String
      }
    },
    setup(props, context) {
      const isActive = getVModel(props, context);
      const { attachToRoot } = detachable(props, context, { activator: props.activator });
      const {
        updateDimensions, dimensions, computedTop, computedLeft, calcXOverflow, calcYOverFlow, menuableState: state
      } = menuable(props, context);
      const { getMaxZIndex } = stackable(props, context)
      const contentRef = ref(null)
      const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill
      const instance = getCurrentInstance()

      function toggleValue() {
        isActive.value = false
      }

      function getResizeObserver() {
        let activatorResizeObserver = undefined

        const init = () => {
          activatorResizeObserver = new ResizeObserver(() => {
            nextTick(() => updateDimensions(props.activator.value, contentRef))
          })
          props.activator.value && activatorResizeObserver.observe(props.activator.value)
        }

        const destroy = () => {
          if (activatorResizeObserver) {
            activatorResizeObserver.disconnect()
            activatorResizeObserver = undefined
          }
        }

        return {
          observer: activatorResizeObserver, init, destroy
        }
      }

      const resizeObserver = getResizeObserver(props)

      // update dimensions when toggled on
      watch(() => props.modelValue, newVal => {
        if (newVal) {
          nextTick(() => updateDimensions(props.activator.value, contentRef))
        }
      }, { immediate: true })

      let rootEl
      const getOpenDependentElements = ref(null)
      const addDependency = inject('addDependentInstance', () => null)
      const removeDependency = inject('removeDependentInstance', () => null)

      const { getOpenDependentElements: getOpenDependentElementsFn, addDependentInstance,
        removeDependentInstance, dependents } = dependent(instance, isActive, addDependency, removeDependency)
      getOpenDependentElements.value = getOpenDependentElementsFn

      if (props.isDependent) {
        addDependency(instance, dependents.value)
      }

      if (props.closeDependents) {
        provide('addDependentInstance', addDependentInstance)
        provide('removeDependentInstance', removeDependentInstance)
      }

      onMounted(function () {
        nextTick(() => {
          rootEl = attachToRoot(contentRef.value)
          updateDimensions(props.activator.value, contentRef)
          if (!resizeObserver.observer) resizeObserver.init()
        })
      })

      onBeforeUnmount(() => {
        resizeObserver.destroy();
        if (rootEl) rootEl.removeChild(contentRef.value) // menu content is mounted to root element
      })

      const calculatedLeft = computed(() => {
        const menuWidth = Math.max(dimensions.content.width, parseFloat(calculatedMinWidth.value))
        return convertToUnit(calcXOverflow(computedLeft.value, menuWidth)) || '0'
      })
      const calculatedTop = computed(() => {
        return convertToUnit(calcYOverFlow(computedTop.value)) || '0'
      })
      const calculatedMaxWidth = computed(() => {
        if (props.contentFillWidth) {
          return convertToUnit(dimensions.activator.width)
        }
        return convertToUnit(props.maxWidth) || '0'
      })
      const calculatedMinWidth = computed(() => {
        if (props.contentFillWidth) {
          return convertToUnit(dimensions.activator.width)
        }
        if (props.minWidth) return convertToUnit(props.minWidth) || '0'

        let minWidth = Math.max(dimensions.content.width, dimensions.activator.width)
        minWidth = Math.min(minWidth, state.pageWidth);
        const _calculatedMaxWidth = isNaN(calculatedMaxWidth.value) ? minWidth : parseInt(calculatedMaxWidth.value)
        return convertToUnit(Math.min(_calculatedMaxWidth, minWidth)) || 0;
      })
      const calculatedMaxHeight = computed(() => {
        return convertToUnit(props.maxHeight) || '0';
      })

      const contentStyles = computed(() => ({
        top: calculatedTop.value,
        left: calculatedLeft.value,
        maxHeight: calculatedMaxHeight.value,
        minWidth: calculatedMinWidth.value,
        maxWidth: calculatedMaxWidth.value,
        zIndex: isActive.value ? getMaxZIndex() + 2 : 6
      }))

      const contentListeners = {
        click() {
          if (props.closeOnContentClick) {
            if (isActive.value) isActive.value = false
          }
        },
        mouseleave() {
          if (props.openOnHover) {
            if (isActive.value) isActive.value = false
          }
        }
      }

      //callback to close menu when clicked outside
      const closeConditional = (e) => {
        const target = e.target;
        return isActive.value && contentRef.value && !contentRef.value.contains(target)
      }
      const clickOutsideDirective = {
        name: 'click-outside',
        value: () => {
          isActive.value = false
        },
        arg: {
          closeConditional,
          include: () => {
            return [instance.parent.ctx.$el, ...getOpenDependentElements.value()];
          }
        },
      }
      const resizeDirective = {
        name: 'resize',
        value: () => updateDimensions(props.activator.value, contentRef)
      }

      const contentClasses = computed(() => ({
        'g-menu--content': true,
        [props.contentClass]: !!props.contentClass
      }))

      return {
        isActive,
        content: contentRef,
        contentClasses,
        contentStyles,
        contentListeners,
        clickOutsideDirective,
        resizeDirective,
        dependents,
        toggleValue
      }
    },
  }
</script>

<template>
  <div :style="contentStyles" :class="contentClasses" ref="content"
       v-on="contentListeners"
       v-show="modelValue"
       v-click-outside:[clickOutsideDirective.arg]="clickOutsideDirective.value"
       v-resize="resizeDirective.value"
  >
    <slot/>
  </div>
</template>

<style scoped>

</style>
