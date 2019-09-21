<script>
  import getVModel from '../../mixins/getVModel';
  import { computed, createElement as h, onMounted, reactive, ref } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import menuable from '../../mixins/menuable';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GMenuFunctional',
    directives: {
      ClickOutside
    },
    props: {
      // basic
			...{
        value: Boolean
			},
      // positioning
      ...{
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
        positionX: [Number, String],
        positionY: [Number, String],
				allowOverflow: Boolean,
				offsetOverflow: Boolean
      },
			// hover-able
      ...{
        openOnHover: Boolean,
      },
			// sizing
			...{
			  maxWidth: [Number, String],
			  minWidth: [Number, String],
				maxHeight: {
			    type: [Number, String],
					default: 'auto'
				},
			  minHeight: [Number, String],
			}
    },
    props1: {
      top: Boolean,
      bottom: Boolean,
      left: Boolean,
      right: Boolean,
      openOnHover: Boolean,
      positionX: [Number, String],
      positionY: [Number, String],
      offsetX: {
        type: Boolean
      },
      offsetY: {
        type: Boolean,
        default: true
      },
      value: Boolean
    },
    setup(props, context) {
      const { model: isActive } = getVModel(props, context);
      const { updateDimensions, dimensions, computedTop, computedLeft, calcXOverflow, calcYOverFlow,
				menuableState } = menuable(props, context);

      const content = ref(null);
      const el = ref(null);
      const activator = ref(null);
      const state = reactive({
        top: 0,
        absoluteX: 0,
        absoluteY: 0,
				...menuableState
      });

      onMounted(() => {
        updateDimensions();
        attachToRoot();
      });

      function attachToRoot() {
        const content = context.refs.content
        if (!content) return

        const target = document.querySelector('[data-app]')
        if (!target) console.warn('Unable to locate root element')

        target.insertBefore(content, target.firstChild)
      }

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
			  if (props.minWidth) {
			    return convertToUnit(props.minWidth) || '0'
				}

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
        zIndex: '10',
        position: 'absolute',
        display: 'inline-block',
        'max-width': '80%',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
        'contain': 'content'
      }))

      function activate(event) {
        const activator = event.target || event.currentTarget;
        state.absoluteX = event.clientX;
        state.absoluteY = event.clientY;
        if (!activator) {
          return;
        }
        state.top = dimensions.activator.height;
        isActive.value = !isActive.value;
        context.refs.content.scrollTop = context.refs.content.scrollHeight
        updateDimensions();
      }

      const clickOutsideDirective = computed(() => {
        //callback to close menu when clicked outside
				const closeConditional = (e) => {
          const target = e.target;

          //return false
          return isActive.value && !content.value.contains(target)
        }

        return {
          name: 'click-outside',
          value: () => {
            isActive.value = false
          },
          arg: {
            closeConditional: closeConditional,
            include: () => {
              return [context.refs.el]
            },
          },
        }
      })

      //equates v-show="value" in template
      const vShowDirective = computed(() => {
        return {
          name: 'show',
          value: props.value
        }
      })

      const genContent = () => {
        const defaultSlotContent = context.slots.default && context.slots.default() || 'fallback text';
        return h('div',
          {
            style: contentStyles.value,
            ref: 'content',
            directives: [
              vShowDirective.value, clickOutsideDirective.value
            ]
          },
          [defaultSlotContent]
        )
      }

      const genActivator = () => {
        return h('div',
          { ref: 'activator' },
          context.slots.activator({
            activate
          }))
      }

      return () => h(
        'div',
        {
          style: {
            display: 'inline'
					},
          staticClass: 'r',
          ref: 'el'
        },
        [genActivator(), genContent()]
      )
    }
  }
</script>

<style scoped>

</style>