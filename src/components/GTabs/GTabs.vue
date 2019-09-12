<template>
	<g-layout column>
		<slot name="tabs" :toggle="toggleItem" :isActive="isActiveItem">
			<template v-for="item in items">
				<g-tab>
					<!-- todo: replace with default tab UI -->
					<g-button>{{item}}</g-button>
				</g-tab>
			</template>
		</slot>

		<g-tab-items :items="items" v-model="model">
			<template v-slot:default="{isActive}">
				<slot :isActive="isActive"></slot>
			</template>
		</g-tab-items>

	</g-layout>
</template>

<script>
  import GItemGroup from '../GItemGroup/GItemGroup';
  import GWindow from '../GWindow/GWindow';
  import GTabItems from '../GTabs/GTabItems';
  import vModel from '../common/vModel';
  import GTab from '../GTabs/GTab';
  import GButton from '../GButton/GButton';
  import groupable from '../GItemGroup/groupable';
  import GLayout from '../GLayout/GLayout';

  export default {
    name: 'GTabs',
    components: { GLayout, GButton, GTab, GTabItems, GWindow, GItemGroup },
    props: {
      items: Array,
      value: null
    },
    setup(props, context) {
      const { model } = vModel(props, context);
      const { toggleItem, isActiveItem } = groupable({ mandatory: true, multiple: false }, model);

      return {
        model,
        toggleItem,
        isActiveItem
      }
    }
  }
</script>

<style scoped>

</style>