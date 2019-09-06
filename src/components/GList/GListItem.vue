<template>
	<div :class="classes" :style="[itemHeightStyle]">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GListItem',
    props: {
			height: String,
		},
		setup({ height }) {
      const classes = computed(() => {
        const defaultClasses = {
          'list-item': true,
				};
        return {
          ...defaultClasses
				}
			});
      const itemHeightStyle = computed(() => {
        if(height) {
          return {
            height
					}
				}
			});
      return {
        classes,
				itemHeightStyle
			}
		}
  }
</script>

<style scoped>

</style>