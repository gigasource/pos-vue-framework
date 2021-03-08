<script>
  import { h, withDirectives, getCurrentInstance, inject, onBeforeUnmount, onMounted, reactive } from 'vue';
  import Intersect from '../../directives/intersect/intersect';
  import {getScopeIdRender} from "../../utils/helpers";

  export default {
    name: 'GScrollWindowItem',
    emits: ['update:modelValue'],
    directives: {
      Intersect
    },
    data() {
      return {
        value: null
      }
    },
    setup(props, context) {
      const register = inject('register');
      const unregister = inject('unregister');
      const instance = getCurrentInstance()

      onMounted(function () {
        register(instance);
      });

      onBeforeUnmount(function () {
        unregister(instance)
      });


      const intersectCb = () => {
        context.emit('update:modelValue', instance.data.value)
      }

      function genWindowItem() {
        const nodeData = {
          class: 'g-scroll-window-item',
        };
        return withDirectives(h('div', nodeData, context.slots),
            [[Intersect, intersectCb, { root: undefined, threshold: 0.6 }]]
        )
      }

      return {
        genWindowItem,
        intersectCb
      }
    },
    render() {
      const genScopeId = getScopeIdRender()
      return genScopeId(this.genWindowItem)()
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
