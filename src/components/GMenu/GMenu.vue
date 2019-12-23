<script>
  import getVModel from '../../mixins/getVModel';
  import { onBeforeUnmount, reactive, ref, onUnmounted, computed, onMounted, watch } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import detachable from '../../mixins/detachable';
  import delayable from '../../mixins/delayable';
  import GMenuContent from './GMenuContent';
  import { Fragment } from 'vue-fragment'

  export default {
    name: 'GMenu',
    components: { GMenuContent, Fragment },
    directives: {
      ClickOutside
    },
    props: {
      // basic
      ...{
        value: Boolean,
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
        offsetOverflow: Boolean
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
      }
    },
    setup(props, context) {
      const isActive = getVModel(props, context);
      const { runDelay } = delayable(props)
      let activatorEl = ref(null);
      let activatorVNode

      const state = reactive({
        top: 0,
        hasJustFocused: false,
        isFirstRender: true,
      });

      onMounted(function () {
        activatorEl.value = activatorVNode && activatorVNode[0] && activatorVNode[0].elm
      })

      onBeforeUnmount(() => isActive.value = false)

      function toggleContent(event) {
        const activator = event.target || event.currentTarget;
        if (!activator) {
          return
        }
        isActive.value = !isActive.value;
      }

      watch(isActive, val => {
        if (val && !props.eager && state.isFirstRender) state.isFirstRender = false;
      }, { lazy: true })

      const genContent = () => {
        const contentOptions = {
          props: {
            ...props,
            activator: activatorEl,
            hasJustFocused: state.hasJustFocused,
          },
          on: {
            input: (e) => {
              isActive.value = e
              state.hasJustFocused = e
            }
          },
          ref: 'content'
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
              const content = context.refs.content
              if (content && content.$el.contains(event.relatedTarget)) {
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

        return <fragment>
          {_activatorVNode}
          {props.eager ? genContent() : (!state.isFirstRender && genContent())}
        </fragment>;
      }

      return {
        state,
        isActive,
        genWrapper,
        activatorEl
      }
    },
    render() {
      return this.genWrapper.bind(this)()
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
