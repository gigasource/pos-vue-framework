<script>
  import { inject, onBeforeUnmount, onMounted, reactive } from '@vue/composition-api';
  import Intersect from '../../directives/intersect/intersect';

  export default {
    name: 'GScrollWindowItem',
    directives: {
      Intersect
    },
    setup(props, context) {
      const register = inject('register');
      const unregister = inject('unregister');

      onMounted(function () {
        register(this);
      });

      onBeforeUnmount(function () {
        unregister(this)
      });

      const data = reactive({
        value: null
      });

      const intersectCb = () => {
        context.emit('input', data.value)
      }

      function genWindowItem() {
        const nodeData = {
          class: 'g-scroll-window-item',
          directives: [
            {
              name: 'intersect',
              arg: {
                root: undefined,
                threshold: 0.999
              },
              value: intersectCb
            }
          ]
        };
        return <div {...nodeData}> {this.$slots.default}</div>
      }

      return {
        data,
        genWindowItem,
        intersectCb
      }
    },
    render() {
      return this.genWindowItem.bind(this)()
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
  }
</style>
