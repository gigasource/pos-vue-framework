<script>
  import { computed, inject } from 'vue'
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
          <div class="g-stepper-content" vShow={show.value}>
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

<style scoped lang="scss">
	.g-stepper-transition {
	&-enter {
		 transform: translateX(100%);
	 }

	&-enter-active {
		 transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		 transition-duration: 0.3s;
	 }

	&-leave {
		 opacity: 1;
	 }

	&-leave-to {
		 opacity: 0;
		 transform: translateX(-100%);
	 }

	&-leave-active {
		 transition-timing-function: ease-in;
		 transition-duration: 0.3s;
		 position: absolute;
	 }
	}
</style>
