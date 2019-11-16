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

      const computedTransition = computed(() => {
          if (!internalReverse.value) {
            return props.transition ? props.transition || '' : windowComputedTransition.value
          }

          return props.reverseTransition ? props.reverseTransition || '' : windowComputedTransition.value
        }
      );

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

      function genScrollWindowItem() {
        return h('transition', {
          props: {
            name: this.computedTransition,
          }
        }, [this.genWindowItem()])
      }

      return {
        data,
        computedTransition,
        genWindowItem,
        genScrollWindowItem
      }
    },
    render() {
      return this.genScrollWindowItem()
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
