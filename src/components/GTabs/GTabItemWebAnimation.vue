<script>
  import { watch, computed, inject } from '@vue/composition-api'

  export default {
    name: 'GTabItemWebAnimation',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const transitionDirection = inject('transition');
      const show = computed(() => (model.value === props.item));

      watch(
          () => model.value,
          () => {
            animate();
          },
          { lazy: true}
      );

      function animate() {
        context.root.$nextTick(() => {
          if(transitionDirection.value.includes('reverse')) {
            context.refs.itemRef && context.refs.itemRef.animate(
                [
                  {
                    transform: 'translateX(-100%)',
                  },
                  {
                    transform: 'translateX(0)',
                  }
                ],
                {
                  duration: 300,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }
            );
          } else {
            context.refs.itemRef && context.refs.itemRef.animate(
                [
                  {
                    transform: 'translateX(100%)'
                  },
                  {
                    transform: 'translateX(0)'
                  }
                ],
                {
                  duration: 300,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }
            );
          }
        })
      }

      const renderContent = () => {
          return (
            show.value && <div ref="itemRef" class="g-tab-item">
                            {context.slots.default()}
                          </div>
          )
      };

      return {
        renderContent
      }
    },
    render(h) {
      return this.renderContent()
    }
  }
</script>