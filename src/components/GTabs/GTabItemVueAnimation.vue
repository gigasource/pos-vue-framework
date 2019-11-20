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
      const _transition = inject('transition');

      function onBeforeEnter(el) {
        console.log('onBeforeEnter');
      }

      function onEnter(el, done) {
        console.log('onEnter');
        console.log(model.value);
      }

      function onAfterEnter(el) {
        console.log('onAfterEnter');
      }

      function onEnterCancelled(el) {
        console.log('onEnterCancelled')
      }

      function onBeforeLeave(el) {
        console.log('onBeforeLeave');
      }

      function onLeave(el, done) {
        console.log('onLeave');
      }

      function onAfterLeave(el) {
        console.log('onAfterLeave');
        console.log(model.value)

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
            // vOn:before-enter={onBeforeEnter}
            // vOn:enter={onEnter}
            // vOn:after-enter={onAfterEnter}
            // vOn:enter-cancelled={onEnterCancelled}
            // vOn:before-leave={onBeforeLeave}
            // vOn:leave={onLeave}
            // vOn:after-leave={onAfterLeave}
          >
            {renderContent()}
          </transition>
      )
    }
  }
</script>

<style scoped lang="scss">

</style>