<template>
	<div :class="classes" :style="dividerColorStyle"></div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GDivider',
    props: {
      dashed: Boolean,
			dotted: Boolean,
			solid: {
        type: Boolean,
				default: true
      },
			inset: Boolean,
			color: {
        type: String,
				default: 'rgba(0, 0, 0, 0.12)'
      },
			vertical:  Boolean,
		},
		setup({ dashed, dotted, solid, inset, color, vertical}){
			const classes = computed(() => {
			  const defaultClass = {
			    'g-divider': true
				};
			  return {
					...defaultClass,
					'w-100': !inset && !vertical,
					'h-100': !inset && vertical,
					'g-divider__inset': inset && !vertical,
					'g-divider__inset-vertical': inset && vertical,
					'b-dashed': dashed,
					'b-dotted': dotted,
					'b-solid': solid && !dashed && !dotted
				}
			});
			const dividerColorStyle = computed(() => {
			  return {
			    'border-color': color
				}
			});
			return {
			  classes,
				dividerColorStyle
			}
		}
  }
</script>

<style scoped>

</style>