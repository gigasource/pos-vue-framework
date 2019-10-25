<template>
	<div class="g-expansion-panel2" :class="expandClasses" @click="toggle">
		<slot :toggle="toggle">
			<g-expansion-panel-header2></g-expansion-panel-header2>
			<g-expansion-panel-content2></g-expansion-panel-content2>
		</slot>
	</div>
</template>

<script>
  import GExpansionPanelHeader2 from './GExpansionPanelHeader2';
  import GExpansionPanelContent2 from './GExpansionPanelContent2';
  import { computed, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api';

  export default {
    name: 'GExpansionPanel2',
    components: { GExpansionPanelContent2, GExpansionPanelHeader2 },
    props: {
      item: null,
			isActive: {
        type: Boolean,
				default: false,
      }
		},
		setup(props, context) {
      const toggle = () => {
        context.emit('toggle', props.item);
			};

      const expandClasses = computed(() => ({
        'g-expansion-panel2__active': props.isActive
			}))

			return {
        toggle,
				expandClasses
			}
		}
  }
</script>

<style scoped>

</style>