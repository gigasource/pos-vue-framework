<template>
	<div class="expansion-panel" @click="toggle">
		<slot :toggle="toggle"></slot>
	</div>
</template>

<script>
  export default {
    name: 'GExpansionPanel',
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