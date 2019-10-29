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

	<div style="background-color: #e6e9ec; height: 100%">
<!--		<g-expansion-panel-group3 v-model="activeItem">-->
<!--			<template v-slot:default="{ toggle, isActive }">-->
<!--				<g-expansion-panel3 v-for="(item, index) in items" :item="item" :is-active="isActive(item)" @toggle="toggle" :key="index">-->
<!--					<template v-slot:prepend>-->
<!--						<g-icon small>fas fa-caret-right</g-icon>-->
<!--					</template>-->
<!--					<template v-slot:header>{{ item.name }}</template>-->
<!--					{{ item.message }}-->
<!--				</g-expansion-panel3>-->
<!--			</template>-->
<!--		</g-expansion-panel-group3>-->

<!--		<g-expansion-panel-group3 v-model="activeItem2">-->
<!--			<template v-slot:default="{ toggle, isActive }">-->
<!--				<g-expansion-panel3 v-for="(item, index) in items" :item="item" :is-active="isActive(item)" @toggle="toggle" :key="index">-->
<!--					<template v-slot:header>{{ item.name }}</template>-->
<!--					<template v-slot:append>-->
<!--						<g-btn small flat width="30" height="30" min-width="30"><g-icon small>far fa-copy</g-icon></g-btn>-->
<!--						<g-btn small flat width="30" height="30" min-width="30"><g-icon small>fas fa-times</g-icon></g-btn>-->
<!--					</template>-->
<!--					{{ item.message }}-->
<!--				</g-expansion-panel3>-->
<!--			</template>-->
<!--		</g-expansion-panel-group3>-->

		<g-expansion-panel4 v-model="activeItem" :items="items" item-header="name" item-content="message">
		</g-expansion-panel4>

	</div>
</template>
<script>
  import GExpansionPanelGroup2 from '../components/GExpansionPanel/GExpansionPanelGroup2';
  import GExpansionPanel2 from '../components/GExpansionPanel/GExpansionPanel2';
  import GExpansionPanelHeader2 from '../components/GExpansionPanel/GExpansionPanelHeader2';
  import GExpansionPanelContent2 from '../components/GExpansionPanel/GExpansionPanelContent2';
  import GExpansionPanelGroup3 from '../components/GExpansionPanel/GExpansionPanelGroup3';
  import GExpansionPanel3 from '../components/GExpansionPanel/GExpansionPanel3';
  import GIcon from '../components/GIcon/GIcon';
  import GBtn from '../components/GBtn/GBtn';
  import GExpansionPanel4 from '../components/GExpansionPanel/GExpansionPanel4';
  export default {
    name: 'ExpansionPanel',
    components: { GExpansionPanel4, GExpansionPanel3, GExpansionPanelGroup3, GExpansionPanelContent2, GExpansionPanelHeader2, GExpansionPanel2, GExpansionPanelGroup2, GIcon, GBtn },
    props: {},
    data: function () {
      return {
        activeItem: null,
				activeItem2: null,
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
    methods: {

		}
  }
</script>
<style scoped>
</style>