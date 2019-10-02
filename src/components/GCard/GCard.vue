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
      //classes
      ...{
        disabled: Boolean,
        isClickable: Boolean,
        loading: Boolean,
        backgroundColor: String,
        flat: Boolean,
        hover: Boolean,
        color: String,
        tile: Boolean,
      },
      //styles
      ...{
        ripple: Boolean,
        minWidth: String,
        maxWidth: String,
        minHeight: String,
        maxHeight: String,
        width: String,
        elevation: Number,
        height: String,
        img: String,
        link: Boolean,
        loaderHeight: {
          type: [Number, String],
          default: 4,
        },
        outlined: Boolean,
        raised: Boolean,
      }
    }, setup(props, context) {

      let classes = computed(() => {
        let elevationClassName = props.elevation ? `g-card-elevation-${props.elevation}` : `elevation-2`;
				let classes = {
          'g-card': true,
          'g-card-flat': props.flat,
          'g-card-hover': props.hover,
          'g-card-link': props.isClickable,
          'g-card-loading': props.loading,
          'g-card-disabled': props.loading || props.disabled,
          'g-card-outlined': props.outlined,
          'g-card-raised': props.raised,
          'g-card-ripple': props.ripple,
        };
				classes[elevationClassName] = true;
        return classes;
      });

      let styles = computed(() => {
        return {
          ...props.img ? { 'background-image': `url("${props.img}"` } : null,
          ...props.backgroundColor ? { 'background-color': props.backgroundColor } : null,
          ...props.color ? { 'color': props.color } : null,
          ...props.tile ? { 'border': 'none' } : null,
          ...props.minWidth ? { 'min-width': props.minWidth } : null,
          ...props.minHeight ? { 'min-height': props.minHeight } : null,
          ...props.maxWidth ? { 'max-width': props.maxWidth } : null,
          ...props.maxHeight ? { 'max-height': props.maxHeight } : null,
        };
      });

      return {
        styles,
        classes
      }
    }
  }
</script>

<style scoped></style>
