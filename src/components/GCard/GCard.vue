<template>
	<div :class="classes" :style="styles">
		<div class="g-card-content">
			<slot name="default"></slot>
			<slot name="progress"></slot>
		</div>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: 'GCard',
    props: {
      disabled: Boolean,
      isClickable: Boolean,
      loading: Boolean,
      backgroundColor: String,
      flat: Boolean,
      hover: Boolean,
      color: String,
      minWidth: String,
      maxWidth: String,
      minHeight: String,
      maxHeight: String,
      width: String,
      height: String,
      img: String,
      link: Boolean,
      loaderHeight: {
        type: [Number, String],
        default: 4,
      },
      outlined: Boolean,
      raised: Boolean,
    }, setup(props, context) {

      let classes = computed(() => ({
        'g-card': true,
        'g-card-flat': props.flat,
        'g-card-hover': props.hover,
        'g-card-link': props.isClickable,
        'g-card-loading': props.loading,
        'g-card-disabled': props.loading || props.disabled,
        'g-card-outlined': props.outlined,
        'g-card-raised': props.raised,
      }));

      let styles = computed(() => {
        let style = {};

        if (props.img) {
          Object.assign(style, { 'background-image': `url("${props.img}"` });
        }

        if (props.backgroundColor) {
          Object.assign(style, { 'background-color': props.backgroundColor });
        }

        if (props.color) {
          Object.assign(style, { 'color': props.color });
        }

        if (props.minWidth) {
          Object.assign(style, { 'min-width': props.minWidth });
        }

        if (props.minHeight) {
          Object.assign(style, { 'min-height': props.minHeight });
        }

        if (props.maxWidth) {
          Object.assign(style, { 'max-width': props.maxWidth });
        }

        if (props.maxHeight) {
          Object.assign(style, { 'max-height': props.maxHeight });
        }
        return style;
      });

      return {
        styles,
        classes
      }
    }
  }
</script>

<style scoped></style>
