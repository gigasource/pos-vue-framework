<template>
	<div class="col-flex align-items-center overflow-y" :style="listStyle">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'GList',
    props: {
			height: String,
			width: String,
		},
		computed: {
			listStyle() {
			  let style = {};
			  if(this.height){
			    Object.assign(style, {'height': this.height});
				}
        if(this.width){
          Object.assign(style, {'width': this.width});
        }
        return style;
			}
		}
  }
</script>

<style scoped>

</style>