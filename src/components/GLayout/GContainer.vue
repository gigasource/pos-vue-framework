<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
	import { computed } from 'vue'

  export default {
    name: 'GContainer',
    props: {
      fluid: Boolean,
		},
    setup(props) {
      const classes = computed(() => ({
				'g-container': true,
				'g-container__fluid': props.fluid
			}));

      return {
        classes
			}
    }
  }
</script>

<style scoped lang="scss">
	.g-container {
		width: 100%;
		margin: 0 auto;
		padding: 12px;

		&__fluid {
			max-width: 100%;
			max-height: 100%;
		}

		::v-deep .g-row {
			flex: 1 1 100%;
			margin: 0 -12px;

			&__dense{
				margin: 0 -4px;
			}
		}
	}
</style>
