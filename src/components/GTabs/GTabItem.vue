<template>
	<transition :name="transition">
		<div v-if="show" class="g-tab-item">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
  import GLayout from '../GLayout/GLayout';
  import { inject, computed, ref, watch } from '@vue/composition-api'

  export default {
    name: 'GTabItem',
    components: { GLayout },
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (model.value === props.item));

      const reverse = inject('reverse');
      const transition = ref(null);

      watch(() => reverse.value, (newVal) => {
        if(newVal) {
          transition.value = 'g-tab-transition-reverse';
				} else {
          transition.value = 'g-tab-transition';
				}
			}, {flush: 'pre'});

      return {
        show,
				transition,
      }
    }
  }
</script>

<style scoped>

</style>