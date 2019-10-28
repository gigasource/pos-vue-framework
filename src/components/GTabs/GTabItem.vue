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

      // const reverse = inject('reverse');
      // const transition = ref(null);

			const transition = inject('transition');

      // watch(() => model.value, (newVal, oldVal) => {
      //   const newIndex = props.items.findIndex(item => item === newVal);
      //   const oldIndex = props.items.findIndex(item => item === oldVal);
      //   const index = props.items.findIndex(item => item === props.item);
      //   if (newIndex > index) {
      //     transition.value = 'g-tab-transition-reverse';
			// 	} else {
      //     transition.value = 'g-tab-transition';
			// 	}
      //   if (oldIndex === index) {
      //     if (newIndex > oldIndex ) {
      //       transition.value = 'g-tab-transition';
      //     } else {
      //       transition.value = 'g-tab-transition-reverse';
      //     }
			// 	}
      //   console.log(transition.value);
			// });

			// const transition = computed(() => {
      //   const newIndex = props.items.findIndex(item => item === model.value);
      //   const index = props.items.findIndex(item => item === props.item);
      //   if (newIndex > index) {
      //     return 'g-tab-transition-reverse';
      //   } else {
      //     return 'g-tab-transition';
      //   }
			// });

      return {
        show,
				transition,
      }
    }
  }
</script>

<style scoped>

</style>