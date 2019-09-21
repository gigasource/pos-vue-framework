<template>
	<div class="expansion-panel" @click="toggle">
		<slot :toggle="toggle">
			<g-expansion-panel-header></g-expansion-panel-header>
			<g-expansion-panel-content></g-expansion-panel-content>
		</slot>
	</div>
</template>

<script>
  import GExpansionPanelHeader from './GExpansionPanelHeader';
  import GExpansionPanelContent from './GExpansionPanelContent';
  export default {
    name: 'GExpansionPanel',
    components: { GExpansionPanelContent, GExpansionPanelHeader },
    props: {
      item: null
		},
		setup({ item }, { emit }) {
      const toggle = () => {
        emit('toggle', item);
			};

			return {
        toggle
			}
		}
  }
</script>

<style scoped>

</style>