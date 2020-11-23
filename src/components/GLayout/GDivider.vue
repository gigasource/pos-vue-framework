<template>
	<div :class="classes" :style="dividerColorStyle"></div>
</template>

<script>
  import { computed } from 'vue';

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
			const dividerColorStyle = computed(() => ({
			    ... color && { 'border-color': color },
				... !vertical && { height: '0 !important'},
				... vertical && { width: '0 !important'},
			}));
			return {
			  classes,
				dividerColorStyle
			}
		}
  }
</script>

<style scoped lang="scss">
	.g-divider {
		border-width: 0.5px;
		align-self: center;

	&__inset {
		 width: calc(100% - 16px);
		 margin: 0 0.5rem;
	 }

	&__inset-vertical {
		 height: calc(100% - 16px);
		 margin: 0.5rem 0;
	 }
	}
</style>
