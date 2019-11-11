<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
  import { computed, reactive, watch } from '@vue/composition-api'

  export default {
    name: 'GCol',
    props: {
      alignSelf: String,
      justifySelf: String,
      cols: [Number, String],
      xs: [Number, String],
      sm: [Number, String],
      md: [Number, String],
      lg: [Number, String],
      xl: [Number, String],
      offset: [Number, String],
      order: [Number, String],
    },
    setup(props, context) {
      const attrs = Object.keys(context.attrs);
      const breakpoints = reactive({
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0,
      });

      for (const attr of attrs) {
        if (!attr || attr.length < 3 || attr.length > 4) {
          continue
        }
        const bp = attr.substr(0, 2);
        breakpoints[bp] = attr.length === 3 ? attr.substr(2, 1) : attr.substr(2, 2);
      }

      watch(() => [props.xs, props.sm, props.md, props.lg, props.xl], () => {
        if (props.xs) breakpoints.xs = props.xs;
        if (props.sm) breakpoints.sm = props.sm;
        if (props.md) breakpoints.md = props.md;
        if (props.lg) breakpoints.lg = props.lg;
        if (props.xl) breakpoints.xl = props.xl;
      })

      const classes = computed(() => ({
        'g-col': true,
        ['col-' + props.cols]: props.cols,
        ['col-xs-' + breakpoints.xs]: breakpoints.xs,
        ['col-sm-' + breakpoints.sm]: breakpoints.sm,
        ['col-md-' + breakpoints.md]: breakpoints.md,
        ['col-lg-' + breakpoints.lg]: breakpoints.lg,
        ['col-xl-' + breakpoints.xl]: breakpoints.xl,
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