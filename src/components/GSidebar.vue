<template>
	<div :class="classes" :style="[sidebarWidthStyle]">
		<slot></slot>
	</div>
</template>

<script>
	import { computed } from '@vue/composition-api';

  export default {
    name: 'GSidebar',
    props: {
			right: {
			  type: Boolean,
				default: false
      },
			width: String,
		},
		setup({ right, width }){
			const classes = computed(() => {
				const defaultClass = {
				  'side-bar': true
				}
				return {
				  ...defaultClass,
					'left': !right,
					'right': right
				}
			});
			const sidebarWidthStyle = computed(() => {
				if(width) {
				  return {
				    width
          };
				}
			});
			return {
			  classes,
				sidebarWidthStyle
			}
    }
  }
</script>

<style scoped>

</style>