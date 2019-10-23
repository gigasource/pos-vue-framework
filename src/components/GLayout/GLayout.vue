<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
	import { computed } from '@vue/composition-api';

  export default {
    name: 'GLayout',
    props: {
      vertical: {
        type: Boolean,
				default: true,
			},
			col: [Number, String],
			horizontal: Boolean,
			row: [Number, String],
			alignItems: String,
			justifyContent: String,
			alignSelf: String,
			wrap: Boolean,
			reverse: Boolean,
		},
		setup(props) {
      const classes = computed(() => ({
				'g-layout': true,
				'g-layout__vertical': props.vertical || !props.horizontal,
				'g-layout__horizontal': props.horizontal,
				['col-' + props.col]: props.col,
				['row-' + props.row]: props.row,
			}));

      const styles = computed(() => ({
				... props.alignItems && {'align-items': props.alignItems},
				... props.justifyContent && {'justify-content': props.justifyContent},
				... props.alignSelf && {'align-self': props.alignSelf},
				... props.wrap && {'flex-wrap': 'wrap'},
				... props.wrap && props.reverse && {'flex-wrap': 'wrap-reverse'},
				... props.reverse && !props.horizontal && {'flex-direction': 'row-reverse'},
				... props.reverse && props.horizontal && {'flex-direction': 'column-reverse'},
			}));

      return {
        classes,
				styles
			}
		},
  }
</script>

<style scoped>

</style>