<script>
  import { computed, inject, Transition} from 'vue'
  import {getScopeIdRender} from '../../utils/helpers';
  import {isEqual} from 'lodash'
  export default {
    name: 'GTabItem',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (isEqual(model.value, props.item)));
      const _transition = inject('transition');

      const genTabItem = () =>
        <Transition name={_transition.value}>
          <div v-show={show.value} class="g-tab-item">
            {context.slots.default && context.slots.default()}
          </div>
        </Transition>
      return {
        genTabItem
      }
    },
    render() {
      const scopeIdRender = getScopeIdRender();
      return scopeIdRender(this.genTabItem)();
    }
  }
</script>

<style scoped lang="scss">
  .g-tab-transition {
    &-enter-from {
      transform: translateX(100%);
      width: 100%;
    }

    &-enter-to {
      width: 100%;
    }

    &-enter-active {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.3s;
    }

    &-leave-from {
      width: 100%;
    }

    &-leave-to {
      transform: translateX(-100%);
      width: 100%;
    }

    &-leave-active {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.3s;
      position: absolute;
    }
  }

  .g-tab-transition-reverse {
    &-enter-from {
      transform: translateX(-100%);
      width: 100%;
    }

    &-enter-to {
      width: 100%;
    }

    &-enter-active {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.3s;
      position: absolute;
    }

    &-leave-from {
      width: 100%;
    }

    &-leave-to {
      transform: translateX(100%);
    }

    &-leave-active {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.3s;
    }
  }
</style>
