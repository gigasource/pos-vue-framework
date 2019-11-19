<script>
  import { watch, computed, inject } from '@vue/composition-api'

  export default {
    name: 'GTabItemAnimation',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (model.value === props.item));
      const _transition = inject('transition');

      watch(
          () => model.value,
          () => {
            animation();
          },
          { lazy: true}
      );

      function animation() {
        context.root.$nextTick(() => {
          if(_transition.value.includes('reverse')) {
            context.refs.itemRef && context.refs.itemRef.animate(
                [
                  {
                    opacity: 0,
                    transform: 'translateX(-100%)'
                  },
                  {
                    opacity: 1,
                    transform: 'translateX(0)'
                  }
                ],
                {
                  duration: 300,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            );
          } else {
            context.refs.itemRef && context.refs.itemRef.animate(
                [
                  {
                    opacity: 0,
                    transform: 'translateX(100%)'
                  },
                  {
                    opacity: 1,
                    transform: 'translateX(0)'
                  }
                ],
                {
                  duration: 300,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            );
          }
        })
      }

      const renderContent = () => {
        if (show.value) {
          return (
              <div ref="itemRef" class="g-tab-item-animation">
                {context.slots.default()}
              </div>
          )
        }
      };

      return () => renderContent()
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