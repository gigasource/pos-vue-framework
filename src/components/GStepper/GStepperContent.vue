<script>
  import { computed, inject } from '@vue/composition-api'
  import { GExpandTransition } from '../transition/transition';

  export default {
    name: 'GStepperContent',
    components: { GExpandTransition },
    props: {
      step: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => {
        return model.value === props.step
      });

      function genDefaultSlot() {
        return context.slots.default && context.slots.default()
      }

      function genContent() {
        return <transition name="g-stepper-transition">
          <div className="g-stepper-content" vShow={show.value}>
            {genDefaultSlot()}
          </div>
        </transition>
      }

      return {
        genContent
      }
    },
    render() {
      return this.genContent()
    }
  }
</script>

<style scoped>

</style>
