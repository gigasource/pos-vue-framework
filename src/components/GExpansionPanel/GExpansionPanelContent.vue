<template>
	<div v-show="show">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'GExpansionPanelContent',
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