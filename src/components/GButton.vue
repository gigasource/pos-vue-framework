<template>
	<button :class="buttonClass" :style="buttonStyle">
		<slot name="content">Submit</slot>
	</button>
</template>

<script>
  export default {
    name: 'GButton',
		props: {
      raised: Boolean,
			depressed: Boolean,
			disabled: Boolean,
			icon: Boolean,
			outline: Boolean,
			dashed: Boolean,
			width: String,
			height: String,
			color: String,
		},
    computed: {
      buttonClass() {
				return {
				  'btn-raised': this.raised,
					'bs-0': this.depressed,
					'disabled': this.disabled,
					'br-100': this.icon,
					'btn-outline': this.outline,
					'b-dashed': this.dashed
				}
      },
      buttonStyle() {
        let style = {};
        if(this.height) {
          Object.assign(style, {height: this.height});
				}
        if(this.width) {
          Object.assign(style, {width: this.width});
				}
				if(this.outline){
				  Object.assign(style, {'border-color': this.color, color: this.color});
				} else if(this.color) {
				  Object.assign(style, {'background-color': this.color});
				}
        return style;
			}
    }
  }
</script>

<style scoped>

</style>