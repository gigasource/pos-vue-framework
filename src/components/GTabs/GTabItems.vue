<template>
	<div class="g-tab-items">
		<slot></slot>
	</div>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import { provide, ref, watch } from '@vue/composition-api'

  export default {
    name: 'GTabItems',
    props: {
      items: Array,
      value: null
    },
    setup(props, context) {
      const { model } = getVModel(props, context);
      provide('model', model);

			const reverse = ref(false);
			provide('reverse', reverse);

			// TODO: reverse transition
			watch(() => model.value, (newVal, oldVal) => {
			  const newIndex = props.items.findIndex(item => item === newVal);
			  const oldIndex = props.items.findIndex(item => item === oldVal);
			  reverse.value = (newIndex < oldIndex);
			}, {flush: 'pre'})
    }
  }
</script>

<style scoped>

</style>