<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
	import { computed } from 'vue';

  export default {
    name: 'GLayout',
    props: {
      horizontal: {
        type: Boolean,
				default: true,
			},
			col: [Number, String],
			vertical: Boolean,
			row: [Number, String],
			alignItems: String,
			justifyContent: String,
			alignSelf: String,
			wrap: Boolean,
			reverse: Boolean,
			noGutters: Boolean,
			order: Number,
		},
		setup(props) {
      const classes = computed(() => ({
				'g-layout': true,
				'g-layout__vertical': props.vertical,
				'g-layout__horizontal': props.horizontal && !props.vertical,
				['col-' + props.col]: props.col,
				['row-' + props.row]: props.row,
				'no-gutters': props.noGutters,
			}));

      const styles = computed(() => ({
				... props.alignItems && {'align-items': props.alignItems},
				... props.justifyContent && {'justify-content': props.justifyContent},
				... props.alignSelf && {'align-self': props.alignSelf},
				... props.wrap && {'flex-wrap': 'wrap'},
				... props.wrap && props.reverse && {'flex-wrap': 'wrap-reverse'},
				... props.reverse && props.horizontal && {'flex-direction': 'row-reverse'},
				... props.reverse && !props.horizontal && {'flex-direction': 'column-reverse'},
				... props.order && {'order': props.order}
			}));

      return {
        classes,
				styles
			}
		},
  }
</script>

<style scoped lang="scss">
	@import "GLayout";
</style>
