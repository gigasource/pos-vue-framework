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
				default: '#000000'
      },
		},
		setup({ dashed, dotted, solid, inset, color}){
			const classes = computed(() => {
			  const defaultClass = {
			    'divider': true
				}
			  return {
					...defaultClass,
					'w-100': !inset,
					'divider__inset': inset,
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