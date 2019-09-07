<template>
	<div class="col-flex" @click="show = !show">
		<slot :show="show"></slot>
	</div>
</template>

<script>
  export default {
    name: 'GExpansionPanel',
    data() {
      return {
        show: false,
			}
    }
  }
</script>

<style scoped>

</style>