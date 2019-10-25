<template>
	<g-layout>
		<slot :isActive="isActiveItem">
			<!-- todo: insert default tab item content -->
		</slot>
	</g-layout>
</template>

<script>
  import GWindow from '../GWindow/GWindow';
  import GTabItem from './GTabItem';
  import getVModel from '../../mixins/getVModel';
  import GLayout from '../GLayout/GLayout';

  export default {
    name: 'GTabItems',
    components: { GLayout, GTabItem, GWindow },
    props: {
      items: Array,
			value: null
		},
		setup(props, context) {
      const { model } = getVModel(props, context);
			const isActiveItem = (item) => model.value === item;
			return {
			  isActiveItem,
			}
		}
  }
</script>

<style scoped>

</style>