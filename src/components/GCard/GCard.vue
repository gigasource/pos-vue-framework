<template>
	<div :class="classes" :style="styles" @click="onClick">
		<slot></slot>
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
        active: Boolean,
        activeClass: {
          type: String,
          default: 'g-card__active'
        },
				shaped: Boolean,
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
        ripple: Boolean,
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
        let _classes = {
          'g-card': true,
          'waves-effect': props.ripple,
          'g-card__flat': props.flat,
          'g-card__hover': props.hover,
          'g-card__link': props.isClickable,
          'g-card__loading': props.loading,
          'g-card__disabled': props.loading || props.disabled,
          'g-card__outlined': props.outlined,
          'g-card__raised': props.raised,
					'g-card__shaped': props.shaped,
          [props.activeClass]: props.active
        };
        if (elevationClassName) {
          _classes[elevationClassName] = true;
        }
        return _classes;
      });

      let styles = computed(() => {
        return {
          ...props.img && { backgroundImage: `url("${props.img}"` },
          ...props.backgroundColor && { backgroundColor: convertToUnit(props.backgroundColor) },
          ...props.color && { color: props.color },
          ...props.tile && { borderRadius: '0px' },
          ...props.borderRadius && { borderRadius: props.borderRadius },
          ...props.width && { width: convertToUnit(props.width) },
          ...props.height && { height: convertToUnit(props.height) },
          ...props.minWidth && { minWidth: convertToUnit(props.minWidth) },
          ...props.minHeight && { minHeight: convertToUnit(props.minHeight) },
          ...props.maxWidth && { maxWidth: convertToUnit(props.maxWidth) },
          ...props.maxHeight && { maxHeight: convertToUnit(props.maxHeight) },
        };
      });

      let onClick = (event) => {
        context.emit('click', event);
      };

      return {
        styles,
        classes,
        onClick
      }
    }
  }
</script>

<style scoped></style>
