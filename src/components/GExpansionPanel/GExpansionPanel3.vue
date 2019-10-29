<template>
	<div class="g-expansion-panel3" :class="expansionPanelClasses">
		<div class="g-expansion-panel3-header" :class="headerClasses" @click="toggle">
			<div class="g-expansion-panel3-header-prepend">
				<slot name="prepend"></slot>
			</div>
			<slot name="header">

			</slot>
			<g-spacer></g-spacer>
			<div class="g-expansion-panel3-header-append">
				<slot name="append"></slot>
			</div>
		</div>
		<div class="g-expansion-panel3-content" :class="contentClasses" v-show="isActive">
			<div class="g-expansion-panel3-content-wrapper">
				<slot>

				</slot>
			</div>
		</div>
	</div>
</template>
<script>
  import { GExpandTransition } from '../transition/transition';
  import { computed } from '@vue/composition-api';
  import GSpacer from '../GLayout/GSpacer';

  export default {
    name: 'GExpansionPanel3',
		components: { GSpacer, GExpandTransition },
    props: {
			item: null,
			isActive: Boolean
		},
		setup(props, context) {

      const expansionPanelClasses= computed(() => ({
				'g-expansion-panel3__active': props.isActive
			}))

			const headerClasses = computed(() => ({
        'g-expansion-panel3-header__active': props.isActive
      }))

      const contentClasses = computed(() => ({
        'g-expansion-panel3-content__active': props.isActive
      }))

			function toggle() {
			  context.emit('toggle', props.item)
			}

			return {
			  toggle,
				expansionPanelClasses,
				headerClasses,
				contentClasses
			}
		}
  }
</script>
<style scoped>
</style>