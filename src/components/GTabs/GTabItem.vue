<script>
  import { computed, inject, onUpdated } from '@vue/composition-api'

  export default {
    name: 'GTabItem',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (model.value === props.item));
      const _transition = inject('transition');

      onUpdated(() => {
        animation();
      });

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
              <div ref="itemRef" class="g-tab-item-with-waapi">
                {context.slots.default()}
              </div>
          )
        }
      };

      // return () =>
      //     <transition name={_transition.value}>
      //       <div vShow={show.value} className="g-tab-item">
      //         {context.slots.default()}
      //       </div>
      //     </transition>
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