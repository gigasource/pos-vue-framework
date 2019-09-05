<template>
	<div :class="toolbarClass" :style="toolbarStyle">
		<slot name="content"></slot>
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
				  'bg-lgray-5': true,
					'pa-2': true,
				}
			}
    },
		computed: {
      toolbarClass() {
        let actualClass = this.defaultClass;
				if(this.tile) {
				  Object.assign(actualClass, {'btrr-3': true, 'btlr-3': true});
				}
				return actualClass;
			},
			toolbarStyle() {
        let style = {position: 'absolute', bottom: 0, width: '100%'};
        if(this.dark) {
          Object.assign(style, {'background-color': 'rgba(0, 0, 0, 0.92)'});
				}
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