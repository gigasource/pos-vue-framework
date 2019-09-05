<template>
	<div :class="layoutClass">
	</div>
</template>

<script>
  export default {
    name: 'GLayout',
    props: {
      row: {
        type: Boolean,
				default: true,
			},
			column: Boolean,
		},
		computed: {
      layoutClass() {
        return {
          'row-flex': !this.column,
					'col-flex': this.column
				}
			}
		}
  }
</script>

<style scoped>

</style>