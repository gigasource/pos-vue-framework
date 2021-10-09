<script>
  import { h, computed, onMounted, ref, reactive, inject, onBeforeUnmount, Transition, getCurrentInstance, nextTick } from 'vue';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GWindowItem',
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
    data() {
      return {
        value: null
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
      const instance = getCurrentInstance()
      onMounted(() => {
        if(instance) {
          register(instance);
          window.value = instance.parent;
        }
      });

      onBeforeUnmount(function () {
        unregister(instance)
      });

      const data = reactive({
        isActive: false,
        inTransition: false,
      });

      const show = computed(function () {
        return internalValue.value === instance.data.value;
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
          nextTick(() => {
            windowData.transitionHeight = convertToUnit(window.value.vnode.el.clientHeight);
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

        nextTick(() => {
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
          class: 'g-window-item'
        };

        return <div {...nodeData} vShow={show.value}>{context.slots.default()}</div>
      }

      return {
        data,
        computedTransition,
        genWindowItem,
        onBeforeTransition,
        onAfterTransition,
        onTransitionCancelled,
        onEnter
      }
    },
    render() {
      return h(Transition, {
        name: this.computedTransition,
        // Handlers for enter windows.
        onBeforeEnter: this.onBeforeTransition,
        onAfterEnter: this.onAfterTransition,
        onEnterCancelled: this.onTransitionCancelled,
        // Handlers for leave windows.
        onBeforeLeave: this.onBeforeTransition,
        onAfterLeave: this.onAfterTransition,
        onLeaveCancelled: this.onTransitionCancelled,
        // Enter handler for height transition.
        onEnter: this.onEnter,
      }, {
        default: () => this.genWindowItem()
      })
    }
  }
</script>
