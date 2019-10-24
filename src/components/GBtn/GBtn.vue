<template>
	<button :class="classes" :style="styles" @click="onClick">
		<slot name="default">{{text}}</slot>
		<slot name="loader"></slot>
	</button>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import { convertToGradient, convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GBtn',
    props: {
      //classes
      ...{
        raised: Boolean,
        depressed: Boolean,
        disabled: Boolean,
        rounded: Boolean,
        text: String,
        flat: Boolean,
        fab: Boolean,
        tile: Boolean,
        icon: Boolean,
        outlined: Boolean,
        dashed: Boolean,
				active: Boolean
      },
      //style
      ...{
        elevation: { type: [String, Number], default: 4 },
        gradientAngle: { type: String, default: '45deg' },
        absolute: Boolean,
        fixed: Boolean,
        top: Boolean,
        bottom: Boolean,
        left: Boolean,
        right: Boolean,
        large: Boolean,
        small: Boolean,
        xLarge: Boolean,
        xSmall: Boolean,
        maxHeight: [String, Number],
        maxWidth: [String, Number],
        minHeight: [String, Number],
        minWidth: [String, Number],
        block: Boolean,
        width: [String, Number],
        height: [String, Number],
        textColor: String,
        color: String,
        backgroundColor: String,
        gradient: String,
      }
    },
    setup(props, context) {
      let classes = computed(() => {
        let _classes = {
          'g-btn': true,
          'waves-effect': true,
          'g-btn__raised': props.raised,
          'g-btn__active': props.active,
          'g-btn__flat': props.flat,
          'g-btn__tile': props.tile,
          'g-btn-fab': props.fab,
          'g-btn-icon': props.icon,
          'g-btn__top': props.top,
          'g-btn__fixed': props.fixed,
          'g-btn__absolute': props.absolute,
          'g-btn__bottom': props.bottom,
          'g-btn__left': props.left,
          'g-btn__right': props.right,
          'g-btn__block': props.block,
          'g-btn__depressed': props.depressed,
          'g-btn__disabled': props.disabled,
          'g-btn__rounded': props.rounded,
          'g-btn__outlined': props.outlined,
        };

        let size = '';
        let iconSize = '';
        if (props.large) {
          size = 'g-size__large';
          iconSize = props.fab ? 'g-icon-size__large' : null;
        } else if (props.small) {
          size = 'g-size__small';
          iconSize = props.fab ? 'g-icon-size__small' : null;
        } else if (props.xSmall) {
          size = 'g-size__x-small';
          iconSize = props.fab ? 'g-icon-size__x-small' : null;
        } else if (props.xLarge) {
          size = 'g-size__x-large';
          iconSize = props.fab ? 'g-icon-size__x-large' : null;
        } else {
          size = 'g-size__default';
          iconSize = props.fab ? 'g-icon-size__default' : null;
        }
        if (size) {
          _classes[size] = true;
        }

        if (iconSize) {
          _classes[iconSize] = true;
        }

        if (props.gradient) {
          if (props.gradient.toString().includes('-')) {
            _classes[props.gradient] = true;
          }
        }

        let elevationClassName = props.elevation ? `g-btn__elevation-${props.elevation}` : null;
        if (elevationClassName) {
          _classes[elevationClassName] = true;
        }

        let waveColor = props.color ? `waves-${props.color}` : null;
        if (waveColor) {
          _classes[waveColor] = true;
        }

        return _classes;
      });

      let styles = computed(() => {
        let _styles = {
          ...props.textColor && { color: props.textColor.replace('-', '') },
          ...props.backgroundColor && { backgroundColor: props.backgroundColor.replace('-', '') },
          ...props.color && { backgroundColor: props.color.replace('-', ''), color: '#fff' },
          ...props.outlined && { color: `${props.color}`, border: `thin solid currentColor`, backgroundColor: 'transparent' },
          ...props.width && { width: convertToUnit(props.width) },
          ...props.height && { height: convertToUnit(props.height) },
          ...props.maxWidth && { maxWidth: convertToUnit(props.maxWidth) },
          ...props.maxHeight && { maxHeight: convertToUnit(props.maxHeight) },
          ...props.minWidth && { minWidth: convertToUnit(props.minWidth) },
          ...props.minHeight && { minHeight: convertToUnit(props.minHeight) },
          ...props.fab && { minHeight: 0, minWidth: 0 },
          ...props.tile && { borderRadius: 0 },
          ...props.flat && {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: props.color ? props.color : 'black'
          },
        };

        // Params: linear-gradient(45deg, yellow, green)
        if (props.gradient && !props.gradient.toString().includes('-')) {
          _styles['background-image'] = convertToGradient(props.gradient.toString().split(','), props.gradientAngle);
        }

        return _styles;
      });

      let onClick = (event) => {
        context.emit('click', event);
      };

      return {
        classes,
        styles,
        onClick
      }
    }
  }
</script>

<style scoped>

</style>
