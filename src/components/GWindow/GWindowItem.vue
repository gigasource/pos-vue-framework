<script>
  import { createElement as h, computed, onMounted, ref, reactive, inject, onBeforeUnmount } from '@vue/composition-api';
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
    setup(props, context) {

      let register = inject('register');
      let unregister = inject('unregister');
      let internalValue = inject('internalValue');
      let windowData = inject('windowData');
      let internalReverse = inject('internalReverse');
      let windowComputedTransition = inject('windowComputedTransition');
      let window = ref({});
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
          class: 'g-window-item'
        };

        return <div {...nodeData} vShow={show.value}> {context.slots.default && context.slots.default()}</div>
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
  }
</script>

<style scoped>

</style>
