<template>
	<div class="row-flex align-items-center" :style="itemStyle">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'GListItem',
    props: {
			height: String,
		},
		computed: {
			itemStyle() {
			  let style = {};
			  if(this.height) {
			    Object.assign(style, {'height': this.height});
				}
			  return style;
			}
		}
  }
</script>

<style scoped>

</style>