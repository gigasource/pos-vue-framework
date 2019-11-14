<script>
  import { createElement as h, computed, onMounted, ref, reactive, inject, onBeforeUnmount } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';
  import Intersect from '../../directives/intersect/intersect';

  export default {
    name: 'GScrollWindowItem',
    directives: {
      Intersect
    },
    props: {
      disabled: Boolean,
      reverseTransition: {
        type: [Boolean, String],
        default: undefined,
      },
      transition: {
        type: [Boolean, String],
        default: undefined,
      }
    },
    setup(props, context) {
      const register = inject('register');
      const unregister = inject('unregister');
      const internalValue = inject('internalValue');
      const windowData = inject('windowData');
      const internalReverse = inject('internalReverse');
      const windowComputedTransition = inject('windowComputedTransition');
      const window = ref({});
      onMounted(function () {
        register(this);
        window.value = this.$parent;
      });

      onBeforeUnmount(function () {
        unregister(this)
      });

      const data = reactive({
        isActive: false,
        inTransition: false,
        value: null
      });

      const show = computed(function () {
        return internalValue.value === data.value;
      });

      const computedTransition = computed(() => {
          if (!internalReverse.value) {
            return props.transition ? props.transition || '' : windowComputedTransition.value
          }

          return props.reverseTransition ? props.reverseTransition || '' : windowComputedTransition.value
        }
      );

      function onAfterTransition() {

        if (!data.inTransition) {
          return
        }

        // Finalize transition state.
        data.inTransition = false;
        if (windowData.transitionCount > 0) {
          windowData.transitionCount--;

          // Remove container height if we are out of transition.
          if (windowData.transitionCount === 0) {
            windowData.transitionHeight = undefined
          }
        }
      }

      function onBeforeTransition() {
        if (data.inTransition) {
          return;
        }

        // Initialize transition state here.
        data.inTransition = true;

        if (windowData.transitionCount === 0) {
          // Set initial height for height transition.
          context.root.$nextTick(() => {
            windowData.transitionHeight = convertToUnit(window.value.$el.clientHeight);
          })
        }
        windowData.transitionCount++;
      }

      function onTransitionCancelled() {
        onAfterTransition() // This should have the same path as normal transition end.
      }

      function onEnter(el) {

        if (!data.inTransition) {
          return
        }

        context.root.$nextTick(() => {
          // Do not set height if no transition or cancelled.
          if (!computedTransition.value || !data.inTransition) {
            return;
          }

          // Set transition target height.
          windowData.transitionHeight = convertToUnit(el.clientHeight);
        })
      }

      function genWindowItem() {
        const nodeData = {
          class: 'g-scroll-window-item',
          directives: [
            {
              name: 'intersect',
              arg: {
                root: context.parent.$el,
                threshold: 1.0
              },
              value: () => {
                internalValue.value = data.value
              }
            }
          ]
        };

        return <div {...nodeData}> {context.slots.default && context.slots.default()}</div>
      }

      function gen() {
        return h('transition', {
          props: {
            name: this.computedTransition,
          },
          on: {
            // Handlers for enter windows.
            beforeEnter: this.onBeforeTransition,
            afterEnter: this.onAfterTransition,
            enterCancelled: this.onTransitionCancelled,

            // Handlers for leave windows.
            beforeLeave: this.onBeforeTransition,
            afterLeave: this.onAfterTransition,
            leaveCancelled: this.onTransitionCancelled,

            // Enter handler for height transition.
            enter: this.onEnter,
          },
        }, [this.genWindowItem()])
      }

      return {
        data,
        computedTransition,
        genWindowItem,
        onBeforeTransition,
        onAfterTransition,
        onTransitionCancelled,
        onEnter,
        gen
      }
    },
    render() {
      return this.gen()
    }
  }
</script>

<style lang="scss" scoped>
  .g-scroll-window-item {
    width: 100%;
    scroll-snap-align: start;
    flex-shrink: 0;
    height: 300px;
    border-radius: 10px;
    background: #eee;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }
</style>
