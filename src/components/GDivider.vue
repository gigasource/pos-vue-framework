<template>
	<div :class="dividerClass" :style="dividerStyle"></div>
</template>

<script>
  export default {
    name: 'GDivider',
    props: {
      dashed: Boolean,
			dotted: Boolean,
			solid: Boolean,
			inset: Boolean,
			color: String,
		},
		computed: {
      //TODO modify dashed
      dividerClass() {
        return {
          'w-90': this.inset,
					'b-dashed': this.dashed,
					'b-dotted': this.dotted,
				}
			},
			dividerStyle() {
        let style = {
          height: '1px',
					'border-width': '0.5px',
				};
        if(!this.inset){
          Object.assign(style, {width: '100%'});
				} else {
          Object.assign(style, {'margin': '0.5rem 5%'});
				}
        if((!this.dashed && !this.dotted) || this.solid){
          Object.assign(style, {'border-style': 'solid'});
				}
        if(this.color) {
          Object.assign(style, {'border-color': this.color});
				} else {
          Object.assign(style, {'border-color': 'black'});
				}
        return style;
			}
		}
  }
</script>

<style scoped>

</style>