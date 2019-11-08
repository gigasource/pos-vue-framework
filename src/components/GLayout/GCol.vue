<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
	import { computed } from '@vue/composition-api'

  export default {
    name: 'GCol',
    props: {
      alignSelf: String,
      justifySelf: String,
      cols: [Number, String],
      sm: [Number, String],
      md: [Number, String],
      lg: [Number, String],
      xl: [Number, String],
      offset: [Number, String],
      order: [Number, String],
    },
    setup(props) {
      const classes = computed(() => ({
        'g-col': true,
        ['col-' + props.cols]: props.cols,
        ['col-sm-' + props.sm]: props.sm,
        ['col-md-' + props.md]: props.md,
        ['col-lg-' + props.lg]: props.lg,
        ['col-xl-' + props.xl]: props.xl,
        ['offset-' + props.offset]: props.offset,
      }));

      const styles = computed(() => ({
        ...props.justifySelf && { 'justify-self': props.justifySelf },
        ...props.alignSelf && { 'align-self': props.alignSelf },
        ...props.order && { 'order': props.order }
      }));

      return {
        classes,
        styles
      }
    }
  }
</script>

<style scoped lang="scss">
	.g-col:not([class*=col-]) {
		flex-basis: 0;
		flex-grow: 1;
		width: 100%;
	}
</style>