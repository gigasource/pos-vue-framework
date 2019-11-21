<script>
  import { computed, inject } from '@vue/composition-api'

  export default {
    name: 'GTabItemVueAnimation',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (model.value === props.item));
      const transitionDirection = inject('transition');

      function onBeforeEnter(el) {
        console.log('onBeforeEnter');
        el.style.width = '100%';
        if(transitionDirection.value.includes('reverse')){
          console.log('reverse');
          el.style.transform = 'translateX(-101%)';
        } else {
          el.style.transform = 'translateX(101%)';
        }
      }

      function onEnter(el, done) {
        console.log('onEnter');
        if(transitionDirection.value.includes('reverse')) {
          console.log('reverse');
          el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
          el.style.transitionDuration = '0.3s';
          setTimeout(() => {
            el.style.transform = 'translateX(0)';
            done();
          }, 300);
        } else {
          el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
          el.style.transitionDuration = '0.3s';
          setTimeout(() => {
            el.style.transform = 'translateX(0)';
            done();
          }, 300);
        }
      }

      function onBeforeLeave(el) {
        console.log('onBeforeLeave');
        el.style.transform = 'translateX(0)';
      }

      function onLeave(el, done) {
        console.log('onLeave');
        el.style.width = '100%';
        if(transitionDirection.value.includes('reverse')) {
          console.log('reverse');
          el.style.transform = 'translateX(100%)';

        } else {
          el.style.transform = 'translateX(-100%)';
        }
        el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDuration = '0.3s';
        // setTimeout(() => {
        done();
        // }, 300);
      }

      function renderContent() {
        if(show.value) {
          return (
            <div class="g-tab-item">
              {context.slots.default()}
            </div>
          )
        }
      }

      return () => (
          <transition
            vOn:before-enter={onBeforeEnter}
            vOn:enter={onEnter}
            vOn:before-leave={onBeforeLeave}
            vOn:leave={onLeave}
          >
            {renderContent()}
          </transition>
      )
    }
  }
</script>

<style scoped lang="scss">

</style>