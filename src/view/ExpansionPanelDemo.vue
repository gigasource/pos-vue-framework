<template>
<!-- <g-expansion-panel-group2 v-model="activeItem">-->
<!--	 <template v-slot:default="{ toggle, isActive }">-->
<!--		 <g-expansion-panel2 v-for="(item, i) in items" :is-active="isActive(item)" :key="i">-->
<!--			 <g-expansion-panel-header2 :is-active="isActive(item)" @click.native="toggle(item)">{{ item.name }}</g-expansion-panel-header2>-->
<!--			 <g-expansion-panel-content2 :show="isActive(item)">-->
<!--				 {{ item.message }}-->
<!--			 </g-expansion-panel-content2>-->
<!--		 </g-expansion-panel2>-->
<!--	 </template>-->
<!-- </g-expansion-panel-group2>-->

	<g-expansion-panel-group3 v-model="activeItem">
		<template v-slot:default="{ toggle, isActive }">
			<g-expansion-panel3 v-for="(item, index) in items" :item="item" :is-active="isActive(item)" @toggle="toggle" :key="index">
				<template v-slot:header>{{ item.name }}</template>
				{{ item.message }}
			</g-expansion-panel3>
		</template>
	</g-expansion-panel-group3>
</template>
<script>
  import GExpansionPanelGroup2 from '../components/GExpansionPanel/GExpansionPanelGroup2';
  import GExpansionPanel2 from '../components/GExpansionPanel/GExpansionPanel2';
  import GExpansionPanelHeader2 from '../components/GExpansionPanel/GExpansionPanelHeader2';
  import GExpansionPanelContent2 from '../components/GExpansionPanel/GExpansionPanelContent2';
  import GExpansionPanelGroup3 from '../components/GExpansionPanel/GExpansionPanelGroup3';
  import GExpansionPanel3 from '../components/GExpansionPanel/GExpansionPanel3';
  export default {
    name: 'ExpansionPanel',
    components: { GExpansionPanel3, GExpansionPanelGroup3, GExpansionPanelContent2, GExpansionPanelHeader2, GExpansionPanel2, GExpansionPanelGroup2 },
    props: {},
    data: function () {
      return {
        activeItem: null,
        items : [
          {
            name: 'Item1',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item2',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item3',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item4',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            name: 'Item5',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }
        ]
			}
    },
    computed: {},
    methods: {}
  }
</script>
<style scoped>
</style>