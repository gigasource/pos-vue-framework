<template>
	<g-layout>
		<slot :isActive="isActiveItem">
			<!-- todo: insert default tab item content -->
		</slot>
	</g-layout>
</template>

<script>
  import GWindow from '../GWindow/GWindow';
  import GTabItem from '@/components/GTabs/GTabItem';
  import vModel from '@/components/common/vModel';
  import GLayout from '@/components/GLayout';
  import { computed } from '@vue/composition-api';
  import _ from 'lodash';
  export default {
    name: 'GTabItems',
    components: { GLayout, GTabItem, GWindow },
    props: {
      items: Array,
			value: null
		},
		setup(props, context) {
      const { model } = vModel(props, context);
			const isActiveItem = (item) => model.value === item;
			return {
			  isActiveItem,
			}
		}
  }
</script>

<style scoped>

</style>