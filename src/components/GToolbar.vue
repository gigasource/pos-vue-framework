<template>
	<div :class="toolbarClass" :style="toolbarStyle">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'GToolbar',
		props: {
      top: {
        type: Boolean,
				default: false
			},
			tile: Boolean,
			height: String,
			dark: Boolean,
		},
    data() {
      return {
				defaultClass: {
				  'row-flex': true,
					'pa-2': true,
					'abs': true,
					'w-100': true,
				}
			}
    },
		computed: {
      toolbarClass() {
        let actualClass = this.defaultClass;
				return {
				  ...actualClass,
					top: this.top,
					bottom: !this.top,
					'bg-black': this.dark,
					'bg-lgray-5': !this.dark,
					'btrr-3': this.tile,
					'btlr-3': this.tile,
        }
			},
			toolbarStyle() {
        let style = {};
        if(this.height) {
          Object.assign(style, {height: this.height});
				}
        return style;
			}
		}
  }
</script>

<style scoped>

</style>