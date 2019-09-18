<script>
  import getVModel from '../common/getVModel';
  import { computed, reactive, ref, createElement as h } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';

  export default {
    name: 'GMenuFunctional',
    directives: {
      ClickOutside
    },
    props: {
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
      const content = ref(null);
      const el = ref(null);
      const state = reactive({
        top: 0,
        absoluteX: 0,
        absoluteY: 0,
				compileText: ''
      });
      const { model } = getVModel(props, context);
      const styles = computed(() => ({
        top: state.top + 'px',
        left: '0',
        zIndex: '10',
        position: 'absolute',
        display: 'inline-block',
        'max-width': '80%',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
        'contain': 'content'
      }));

			function activate(event) {
        const activator = event.target || event.currentTarget;
        state.absoluteX = event.clientX;
        state.absoluteY = event.clientY;
        if (!activator) {
          return;
        }
        const activatorDimensions = measure(activator);
        activatorDimensions.offsetLeft = activator.offsetLeft;
        activatorDimensions.offsetTop = 0;
        state.top = activatorDimensions.height;
        model.value = !model.value;
      }

      function measure(el) {
        const rect = getRoundedBoundedClientRect(el);
        const style = window.getComputedStyle(el);
        rect.left = parseInt(style.marginLeft);
        rect.top = parseInt(style.marginTop);

        return rect
      }

      function getRoundedBoundedClientRect(el) {
        const rect = el.getBoundingClientRect();
        return {
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          bottom: Math.round(rect.bottom),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
      }

      const clickOutsideDirective = computed(() => {
        return {
          name: 'click-outside',
          value: () => {
            model.value = false
          },
          arg: {
            closeConditional: closeConditional,
            include: () => {
							return [context.refs.el]
						},
          },
        }
      })

      function closeConditional(e) {
        const target = e.target;

        //return false
        return model.value && !content.value.contains(target)
      }

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
            style: styles.value,
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
          context.slots.activator({
            activate,
          }))
      }

      return () => h(
        'div',
        {
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