<template>
	<div class="g-expansion-panel3" :class="expansionPanelClasses">
		<div class="g-expansion-panel3-header" :class="headerClasses" @click="toggle">
			<slot name="prepend-icon"></slot>
			<slot name="header">

			</slot>
			<slot name="append-icon"></slot>
		</div>
		<g-expand-transition>
			<div class="g-expansion-panel3-content" :class="contentClasses" v-show="isActive">
				<div class="g-expansion-panel3-content-wrapper">
					<slot>

					</slot>
				</div>
			</div>
		</g-expand-transition>
	</div>
</template>
<script>
  import { GExpandTransition } from '../transition/transition';
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GExpansionPanel3',
		components: { GExpandTransition },
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