<template>
	<div :class="classes" :style="listStyle">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GList',
    props: {
			height: String,
			width: String,
		},
		setup({ height, width }) {
      const classes = computed(() => {
        const defaultClasses = {
          'list': true,
        };
        return {
          ...defaultClasses
        }
      });
      const listStyle = computed(() => {
        let style = {};
        if(height){
          Object.assign(style, {'height': height});
        }
        if(width){
          Object.assign(style, {'width': width});
        }
        return style;
			});
			return {
			  classes,
				listStyle
			}
		}
  }
</script>

<style scoped>

</style>