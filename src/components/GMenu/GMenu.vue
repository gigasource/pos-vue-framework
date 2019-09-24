<script>
  import getVModel from '../../mixins/getVModel';
  import { computed, createElement as h, onMounted, reactive, ref, watch } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import menuable from '../../mixins/menuable';
  import { convertToUnit } from '../../utils/helpers';
  import detachable from '../../mixins/detachable';
  import delayable from '../../mixins/delayable';

  export default {
    name: 'GMenu',
    directives: {
      ClickOutside
    },
    props: {
      // basic
      ...{
        value: Boolean,
        lazy: Boolean
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
        offsetOverflow: Boolean
      },
      // toggling
      ...{
        openOnHover: Boolean,
        closeOnClick: {
          type: Boolean,
          default: true
        }
      },
      // sizing
      ...{
        maxWidth: {
         type: [Number, String],
					default: '80%'
				},
        minWidth: [Number, String],
        maxHeight: {
          type: [Number, String],
          default: 'auto'
        },
        minHeight: [Number, String],
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
			}
    },
    setup(props, context) {
      const { model: isActive } = getVModel(props, context);
      const {
        updateDimensions, dimensions, computedTop, computedLeft, calcXOverflow, calcYOverFlow,
        menuableState
      } = menuable(props, context);
      const { attachToRoot } = detachable(props, context);
      const { runDelay } = delayable(props)

      const content = ref(null);
      const el = ref(null);
      const activator = ref(null);
      const state = reactive({
        top: 0,
				hasJustFocused: false,
        ...menuableState
      });

      function initContent() {
        updateDimensions();
        attachToRoot();
      }

      onMounted(() => {
        if (props.lazy) return
        initContent();
      });

			watch(() => state.hasJustFocused, (newVal) => {
        console.log(newVal)
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
        maxWidth: calculatedMaxWidth.value ,
      }))

      function toggleContent(event) {
        if (props.lazy) initContent();
        const activator = event.target || event.currentTarget;
        if (!activator) return

        isActive.value = !isActive.value;
        updateDimensions();
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
            include: () => [context.refs.el]
          },
        }
        //equates to v-show="value" in template
        const vShowDirective = {
          name: 'show',
          value: props.value
        }

        const directives = [vShowDirective]
        if (!props.openOnHover && props.closeOnClick) directives.push(clickOutsideDirective)
        return directives;
      }

      const genContent = () => {
        const defaultSlotContent = context.slots.default && context.slots.default() || 'fallback text';
        const options = {
          style: contentStyles.value,
          staticClass: 'menu-content',
          ref: 'content',
          directives: genDirectives(),
					on: {}
        }
        if (props.openOnHover && !props.disabled) {
          options.on.mouseenter = mouseEnterHandler
          options.on.mouseleave = mouseLeaveHandler
        }
        return h('div',
          options,
          [defaultSlotContent]
        )
      }

      const genActivator = () => {
        return h('div',
          { ref: 'activator' },
          context.slots.activator({
            toggleContent
          }))
      }

      const mouseEnterHandler = (event) => {
        runDelay('open', () => {
          if (state.hasJustFocused || isActive.value) return
          toggleContent(event);
          state.hasJustFocused = true;
        })
      }
      const mouseLeaveHandler = (event) => {
				runDelay('close', () => {
          if (context.refs.content && context.refs.content.contains(event.relatedTarget)) return
          isActive.value = false
					state.hasJustFocused = false
        })
      }

      function getElOptions() {
        const options = {
          staticClass: 'menu',
          ref: 'el',
					on: {}
        }
        if (props.openOnHover && !props.disabled) {
          options.on.mouseenter = mouseEnterHandler
          options.on.mouseleave = mouseLeaveHandler
        }
        return options
      }

      return () => h(
        'div',
        getElOptions(),
        [genActivator(), genContent()]
      )
    }
  }
</script>

<style scoped>

</style>