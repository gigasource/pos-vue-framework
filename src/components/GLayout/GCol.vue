<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
  import { computed, reactive, watch } from 'vue'

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
      offsetXs: [Number, String],
      offsetSm: [Number, String],
      offsetMd: [Number, String],
      offsetLg: [Number, String],
      offsetXl: [Number, String],
      order: [Number, String],
    },
    setup(props, context) {
      const attrs = Object.keys(context.attrs);
      const bps = ['xs', 'sm', 'md', 'lg', 'xl'];
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
        if (bps.includes(bp)) {
          breakpoints[bp] = attr.length === 3 ? attr.substr(2, 1) : attr.substr(2, 2);
        }
      }

      watch(() => [props.xs, props.sm, props.md, props.lg, props.xl], () => {
        if (props.xs) {
          breakpoints.xs = props.xs;
        }
        if (props.sm) {
          breakpoints.sm = props.sm;
        }
        if (props.md) {
          breakpoints.md = props.md;
        }
        if (props.lg) {
          breakpoints.lg = props.lg;
        }
        if (props.xl) {
          breakpoints.xl = props.xl;
        }
      }, { immediate: true })

      const classes = computed(() => ({
        'g-col': true,
        ['col-' + props.cols]: props.cols,
        ['col-xs-' + breakpoints.xs]: breakpoints.xs,
        ['col-sm-' + breakpoints.sm]: breakpoints.sm,
        ['col-md-' + breakpoints.md]: breakpoints.md,
        ['col-lg-' + breakpoints.lg]: breakpoints.lg,
        ['col-xl-' + breakpoints.xl]: breakpoints.xl,
        ['offset-' + props.offset]: props.offset,
        ['offset-xs-' + props.offsetXs]: props.offsetXs,
        ['offset-sm-' + props.offsetSm]: props.offsetSm,
        ['offset-md-' + props.offsetMd]: props.offsetMd,
        ['offset-lg-' + props.offsetLg]: props.offsetLg,
        ['offset-xl-' + props.offsetXl]: props.offsetXl,
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
	.g-col:not([class*=col-]):not([class*=xs]):not([class*=sm]):not([class*=md]):not([class*=lg]):not([class*=xl]) {
		flex-grow: 1;
	}
</style>
