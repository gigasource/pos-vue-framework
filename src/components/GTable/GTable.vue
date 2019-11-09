<template>
	<table :class="tableClass">
		<slot name="header">
			<tr>
				<th v-for="(header, i) in headers" :key="i">{{header}}</th>
			</tr>
		</slot>
			<slot name="body">
				<tr v-for="(item, i) in items" :key="i">
					<td v-for="(value) in item">{{value}}</td>
				</tr>
			</slot>
	</table>
</template>

<script>
  export default {
    name: 'GTable',
    props: {
      bordered: Boolean,
      striped: Boolean,
      headers: Array,
      items: Array,
    },
    computed: {
      tableClass() {
        return {
          'table-bordered': this.bordered,
          'table-striped': this.striped
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	@import "GTable";
</style>