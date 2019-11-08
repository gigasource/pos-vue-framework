<script>
  import getVModel from '../../mixins/getVModel';
  import { onBeforeUnmount, onMounted, reactive, ref } from '@vue/composition-api';
  import ClickOutside from '../../directives/click-outside/click-outside';
  import menuable from '../../mixins/menuable';
  import detachable from '../../mixins/detachable';
  import delayable from '../../mixins/delayable';
  import GMenuContent from './GMenuContent';

  export default {
    name: 'GMenu',
    components: { GMenuContent },
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
      const { detach, attachToParent } = detachable(props, context);
      const { runDelay } = delayable(props)

      //template refs
      const el = ref(null);
      const activator = ref(null);

      const state = reactive({
        top: 0,
        hasJustFocused: false,
        isFirstRender: true,
      });

      onMounted(() => {
        context.root.$nextTick(() => {
          attachToParent(context.refs.activator)
          activator.value = context.refs.activator
        })
      })

      onBeforeUnmount(() => {
        if (el.value) detach(el.value)
      })

      function toggleContent(event) {
        if (props.lazy && state.isFirstRender) state.isFirstRender = false
        const activator = event.target || event.currentTarget;
        if (!activator) {
          return
        }
        isActive.value = !isActive.value;
      }

      const genContent = () => {
        const contentOptions = {
          props: {
            ...props,
            activator,
            hasJustFocused: state.hasJustFocused,
          },
          on: {
            input: (e) => {
              isActive.value = e
              state.hasJustFocused = false
            }
          },
          ref: 'content'
        }
        return <g-menu-content {...contentOptions} ref="content">
          {context.slots.default()}
        </g-menu-content>
      }

      const activatorData = {
        on: {
          ...(props.openOnHover && !props.disabled) && {
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
          }
        },
        staticClass: 'g-menu--activator',
        ref: 'activator'
      }

      return () =>
        <div ref="el" class="g-menu">
          <div {...activatorData}>{context.slots.activator({ toggleContent })}</div>
          {props.lazy ? (!state.isFirstRender && genContent()) : genContent()}
        </div>
    }
  }
</script>

<style scoped>

</style>
