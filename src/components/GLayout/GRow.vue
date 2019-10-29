<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api'

  export default {
    name: 'GRow',
		props: {
      alignItems: String,
			alignContent: String,
      justifyContent: String,
      nowrap: Boolean,
      reverse: Boolean,
      noGutters: Boolean,
			dense: Boolean,
		},
    setup(props) {
      const classes = computed(() => ({
        'g-row': true,
				'g-row__dense': props.dense,
        'no-gutters': props.noGutters,
      }));

      const styles = computed(() => ({
        ... props.alignItems && {'align-items': props.alignItems},
        ... props.alignContent && {'align-content': props.alignContent},
				... props.justifyContent && {'justify-content': props.justifyContent},
        ... props.nowrap && {'flex-wrap': 'nowrap'},
        ... !props.nowrap && props.reverse && {'flex-wrap': 'wrap-reverse'},
        ... props.reverse && {'flex-direction': 'row-reverse'},
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