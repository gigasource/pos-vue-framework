<template>
	<div class="g-expansion-panel2-header" :class="classes">
		<slot></slot>
		<slot name="expand-icon"></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GExpansionPanelHeader2',
		props: {
      isActive: Boolean,
			activeClass: {
        type: String,
				default: 'expansion-panel2-header__active'
			}
		},
		computed: {
      classes () {
        return {
          [this.activeClass]: this.isActive
				}
			}
		}
  }
</script>

<style scoped>

</style>