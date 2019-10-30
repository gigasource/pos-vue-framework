<template>
	<transition :name="transition">
		<div v-show="show" class="g-tab-item">
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

			const transition = inject('transition');

      return {
        show,
				transition,
      }
    }
  }
</script>

<style scoped>

</style>