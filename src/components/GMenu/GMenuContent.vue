<script>
  import {computed, onBeforeUnmount, onMounted, ref, watch} from '@vue/composition-api';
  import menuable from '../../mixins/menuable';
  import getVModel from '../../mixins/getVModel';
  import {convertToUnit} from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import Resize from '../../directives/resize/resize';
  import stackable from '../../mixins/stackable';
  import dependent from '../../mixins/dependent';

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
        value: Boolean,
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
          default: true
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
      ... {
        contentClass: String
      }
    },
    setup(props, context) {
      const isActive = getVModel(props, context);
      const {attachToRoot, detach} = detachable(props, context);
      const {
        updateDimensions, dimensions, computedTop, computedLeft, calcXOverflow, calcYOverFlow
      } = menuable(props, context);
      const {getMaxZIndex} = stackable(props, context)


      function getResizeObserver() {
        let activatorResizeObserver = undefined

        const init = () => {
          activatorResizeObserver = new ResizeObserver(() => {
            context.root.$nextTick(() => {
              updateDimensions(props.activator.value)
            })
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

      // init resize observer when activator is mounted to parent
      watch(props.activator, () => {
        if (!resizeObserver.observer) resizeObserver.init()
      })

      // update dimensions when toggled on
      watch(() => props.value, newVal => {
        if (newVal) {
          context.root.$nextTick(() => {
            updateDimensions(props.activator.value)
          })
        }
      }, {lazy: true})

      let rootEl
      const getOpenDependentElements = ref(null)

      onMounted(function () {
        rootEl = attachToRoot()
        getOpenDependentElements.value = dependent(this)
      })

      onBeforeUnmount(() => {
        resizeObserver.destroy();
        if (rootEl) rootEl.removeChild(context.refs.content) // menu content is mounted to root element
      })

      const calculatedLeft = computed(() => {
        const menuWidth = Math.max(dimensions.content.width, parseFloat(calculatedMinWidth.value))
        return convertToUnit(calcXOverflow(computedLeft.value, menuWidth)) || '0'
      })
      const calculatedTop = computed(() => {
        return convertToUnit(calcYOverFlow(computedTop.value)) || '0'
      })
      const calculatedMaxWidth = computed(() => {
        return convertToUnit(props.maxWidth) || '0'
      })
      const calculatedMinWidth = computed(() => {
        if (props.contentFillWidth) return convertToUnit(Math.max(dimensions.activator.width, dimensions.content.width))
        if (props.minWidth) return convertToUnit(props.minWidth) || '0'

        const minWidth = Math.min(dimensions.content.width, state.pageWidth);
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
        ...props.closeOnContentClick && {
          click() {
            if (isActive.value) isActive.value = false
          }
        },
        ...props.openOnHover && {
          mouseleave() {
            if (isActive.value) isActive.value = false
          }
        }
      }

      const genDirectives = () => {
        //callback to close menu when clicked outside
        const closeConditional = (e) => {
          const target = e.target;
          return isActive.value && context.refs.content && !context.refs.content.contains(target)
        }
        const clickOutsideDirective = {
          name: 'click-outside',
          value: () => {
            isActive.value = false
          },
          arg: {
            closeConditional: closeConditional,
            include: () => {
              return [context.parent.$el, ...getOpenDependentElements.value()];
            }
          },
        }
        //equates to v-show="value" in template
        const vShowDirective = {
          name: 'show',
          value: props.value
        }
        const resizeDirective = {
          name: 'resize',
          value: () => updateDimensions(props.activator.value)
        }

        const directives = [vShowDirective, resizeDirective]
        if (!props.openOnHover && props.closeOnClick) directives.push(clickOutsideDirective)
        return directives;
      }

      const contentClasses = computed(() => ({
        'g-menu--content': true,
        [props.contentClass]: !!props.contentClass
      }))

      const genMenuContent = () => <div style={contentStyles.value}
                                        class={contentClasses.value}
                                        ref="content"
                                        {...{directives: genDirectives(), on: contentListeners}}>
        {context.slots.default && context.slots.default()}
      </div>;

      return {
        isActive,
        getOpenDependentElements,
        genMenuContent
      }
    },
    render() {
      return this.genMenuContent()
    }
  }
</script>

<style scoped>

</style>
