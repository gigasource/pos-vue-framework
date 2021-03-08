<script>
  import {getInternalValue} from '../../mixins/getVModel';
  import { onBeforeUnmount, onMounted, reactive, ref, watch, Teleport } from 'vue';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import delayable from '../../mixins/delayable';
  import GMenuContent from './GMenuContent';
  import { getScopeIdRender } from '../../utils/helpers';

  export default {
    name: 'GMenu',
    components: { GMenuContent, Teleport },
    emits: ['update:modelValue'],
    directives: {
      ClickOutside
    },
    props: {
      // basic
      ...{
        modelValue: Boolean,
        eager: Boolean,
        activator: null,
      },
      // positioning
      ...{
        //TODO: prop for menu to appear in center
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
        contentFillWidth: Boolean
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
      //styling content
      ...{
        contentClass: String,
      }
    },
    setup(props, context) {
      const isActive = getInternalValue(props, context);
      const { runDelay } = delayable(props)
      const content = ref(null)
      const activatorEl = ref(null);
      let activatorVNode

      const state = reactive({
        top: 0,
        hasJustFocused: false,
        isFirstRender: true,
        clientX: 0,
        clientY: 0,
      });

      onMounted(function () {
        activatorEl.value = activatorVNode && activatorVNode[0] && activatorVNode[0].el
      })

      onBeforeUnmount(() => isActive.value = false)

      function toggleContent(event) {
        const activator = event.target || event.currentTarget;
        if (!activator) {
          return
        }
        if(props.absolute) {
          state.clientX = event.clientX
          state.clientY = event.clientY
        }
        isActive.value = !isActive.value;
      }

      watch(isActive, val => {
        if (val && !props.eager && state.isFirstRender) state.isFirstRender = false;
      }, { lazy: true })

      const genContent = () => {
        const contentOptions = {
          ...{
            // props
            ..._.omit(props, ['eager']),
            modelValue: isActive.value,
            activator: activatorEl,
            clientX: state.clientX,
            clientY: state.clientY
          },
          'onUpdate:modelValue': (e) => {
              isActive.value = e
              state.hasJustFocused = e
          },
          ref: content
        }
        return <g-menu-content {...contentOptions}>
          {context.slots.default()}
        </g-menu-content>
      }

      const on = !props.disabled && {
        ...props.openOnHover && {
          mouseenter(event) {
            runDelay('open', () => {
              if (state.hasJustFocused || isActive.value) {
                return
              }
              toggleContent(event);
              state.hasJustFocused = true;
            })
          },
          mouseleave(event) {
            runDelay('close', () => {
              if (content.value && content.value.$el.contains(event.relatedTarget)) {
                return
              }
              isActive.value = false
              state.hasJustFocused = false
            })
          }
        },
        click(event) {
          toggleContent(event)
        }
      }

      const genWrapper = function () {
        const _activatorVNode = context.slots.activator && context.slots.activator({ toggleContent, on });
        activatorVNode = _activatorVNode

        const target = document.getElementById('root') ? 'body': 'div[data-app]';
        return <>
          {_activatorVNode}
          <teleport to={target}>
            {props.eager ? genContent() : (!state.isFirstRender && genContent())}
          </teleport>
        </>;
      }

      return {
        state,
        isActive,
        genWrapper,
        activatorEl
      }
    },
    render() {
      return getScopeIdRender()(this.genWrapper.bind(this))()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/elevation";

  .g-menu--content {
    position: absolute;
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    contain: content;
    @include elevation(2);
  }
</style>
