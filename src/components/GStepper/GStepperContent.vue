<template>
	<transition name="g-stepper-transition">
		<div class="g-stepper-content" v-if="show">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
  import { computed, inject } from '@vue/composition-api'
  import GLayout from '../GLayout/GLayout';

  export default {
    name: 'GStepperContent',
    components: { GLayout },
    props: {
      step: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => {
        return model.value === props.step
      });

      return {
        show
      }
    }
  }
</script>

<style scoped>

</style>
