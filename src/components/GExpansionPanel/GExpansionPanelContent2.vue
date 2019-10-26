<template>
	<g-expand-transition>
		<div class="g-expansion-panel2-content" v-show="show">
			<div class="g-expansion-panel2-content-wrapper">
				<slot></slot>
			</div>
		</div>
	</g-expand-transition>
</template>

<script>
	import { GExpandTransition } from '../transition/transition';

  export default {
    name: 'GExpansionPanelContent2',
		components: { GExpandTransition },
    props:{
      show:{
        type: Boolean,
				default: false,
      }
		}
  }
</script>

<style scoped>

</style>