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
        if(transitionDirection.value.includes('reverse')){
          console.log('reverse');
          el.style.transform = 'translateX(-300px)';
        } else {
          el.style.transform = 'translateX(300px)';
        }
      }

      function onEnter(el, done) {
        console.log('onEnter');
        el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDuration = '0.3s';
        setTimeout(() => {
          el.style.transform = 'translateX(0)';
          done();
        }, 300);
      }

      function onAfterEnter(el) {
        console.log('onAfterEnter');
      }

      function onEnterCancelled(el) {
        console.log('onEnterCancelled')
      }

      function onBeforeLeave(el) {
        console.log('onBeforeLeave');
        if(transitionDirection.value.includes('reverse')) {
          console.log('reverse');
          el.style.transform = 'translateX(0)';
        } else {
          el.style.transform = 'translateX(0)';
        }
      }

      function onLeave(el, done) {
        console.log('onLeave');
        if(transitionDirection.value.includes('reverse')) {
          console.log('reverse');
          el.style.transform = 'translateX(300px)';
        } else {
          el.style.transform = 'translateX(-300px)';
        }
        el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDuration = '0.3s';
        setTimeout(() => {
          done();
        }, 300);        
      }

      function onAfterLeave(el) {
        console.log('onAfterLeave');
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
            vOn:after-enter={onAfterEnter}
            vOn:enter-cancelled={onEnterCancelled}
            vOn:before-leave={onBeforeLeave}
            vOn:leave={onLeave}
            vOn:after-leave={onAfterLeave}
          >
            {renderContent()}
          </transition>
      )
    }
  }
</script>

<style scoped lang="scss">

</style>