<template>
	<div :class="classes" :style="styles">
		<slot name="default"></slot>
		<slot name="progress"></slot>
	</div>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';

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
        minWidth: [String, Number],
        maxWidth: [String, Number],
        minHeight: [String, Number],
        maxHeight: [String, Number],
        width: [String, Number],
				borderRadius: [String, Number],
        elevation: [String, Number],
        height: [String, Number],
        img: String,
        outlined: Boolean,
        raised: Boolean,
      }
    }, setup(props, context) {

      let classes = computed(() => {
        let elevationClassName = props.elevation ? `g-card__elevation-${props.elevation}` : null;
        let classes = {
          'g-card': true,
          'g-card__flat': props.flat,
          'g-card__hover': props.hover,
          'g-card__link': props.isClickable,
          'g-card__loading': props.loading,
          'g-card__disabled': props.loading || props.disabled,
          'g-card__outlined': props.outlined,
          'g-card__raised': props.raised,
        };
        if (elevationClassName) {
          classes[elevationClassName] = true;
        }
        return classes;
      });

      let styles = computed(() => {
        return {
          ...props.img ? { 'background-image': `url("${props.img}"` } : null,
          ...props.backgroundColor ? { 'background-color': convertToUnit(props.backgroundColor) } : null,
          ...props.color ? { 'color': props.color } : null,
          ...props.tile ? { 'border': 'none' } : null,
          ...props.borderRadius ? { 'border-radius': props.borderRadius } : null,
          ...props.minWidth ? { 'min-width': convertToUnit(props.minWidth) } : null,
          ...props.minHeight ? { 'min-height': convertToUnit(props.minHeight) } : null,
          ...props.maxWidth ? { 'max-width': convertToUnit(props.maxWidth) } : null,
          ...props.maxHeight ? { 'max-height': convertToUnit(props.maxHeight) } : null,
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
