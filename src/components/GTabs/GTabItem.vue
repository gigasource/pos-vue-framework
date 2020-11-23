<script>
  import { computed, inject } from 'vue'

  export default {
    name: 'GTabItem',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (model.value === props.item));
      const _transition = inject('transition');

      return () =>
        <transition name={_transition.value}>
          <div vShow={show.value} class="g-tab-item">
            {context.slots.default && context.slots.default()}
          </div>
        </transition>
    }
  }
</script>

<style scoped lang="scss">
  .g-tab-transition {
    &-enter {
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

    &-leave {
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
    &-enter {
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

    &-leave {
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
