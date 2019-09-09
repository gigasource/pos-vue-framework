<template>
	<div class="row-flex align-items-center pa-2" :class="classes">
		<slot></slot>
		<slot name="append-icon"></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GExpansionPanelHeader',
		props: {
      isActive: Boolean,
			activeClass: {
        type: String,
				default: 'expansion-panel-header__active'
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