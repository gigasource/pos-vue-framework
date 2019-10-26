<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
	import { computed } from '@vue/composition-api'

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

<style scoped>

</style>