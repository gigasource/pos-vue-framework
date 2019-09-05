<template>
	<div class="row-flex align-items-center pa-2">
		<slot></slot>
		<slot name="append-icon"></slot>
	</div>
</template>

<script>
  export default {
    name: 'GExpansionPanelHeader',
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>