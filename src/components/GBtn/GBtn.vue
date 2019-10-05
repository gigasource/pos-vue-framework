<template>
	<button :class="classes" :style="styles" @click="onClick">
		<slot name="default">{{text}}</slot>
		<slot name="loader"></slot>
	</button>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import { convertToUnit } from '../../utils/helpers';

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
        dashed: Boolean
      },
      //style
      ...{
        elevation: { type: [String, Number], default: 4 },
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
        color: String,
        backgroundColor: String,
				gradient: String,
      }
    },
    setup(props, context) {
      let classes = computed(() => {
        let classes = {
          'g-btn': true,
          'waves-effect': true,
          'g-btn__raised': props.raised,
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

        classes[size] = true;
        classes[iconSize] = true;

        if (props.gradient) {
          classes[props.gradient] = true;
        }

        let elevationClassName = props.elevation ? `g-btn__elevation-${props.elevation}` : null;
        if (elevationClassName) {
          classes[elevationClassName] = true;
        }

        let waveColor = props.color ? `waves-${props.color}` : null;
        if (waveColor) {
          classes[waveColor] = true;
        }
        return classes;
      });
      let styles = computed(() => {
        return {
          ...props.color ? { 'background-color': props.color.replace('-', ''), 'color': '#fff' } : null,
          ...props.outlined ? { 'color': `${props.color}`, 'border': `thin solid currentColor`, 'background-color': 'transparent' } : null,
          ...props.width ? { 'width': convertToUnit(props.width) } : null,
          ...props.height ? { 'height': convertToUnit(props.height) } : null,
          ...props.maxWidth ? { 'width': convertToUnit(props.maxWidth) } : null,
          ...props.maxHeight ? { 'height': convertToUnit(props.maxHeight) } : null,
          ...props.minWidth ? { 'width': convertToUnit(props.minWidth) } : null,
          ...props.minHeight ? { 'height': convertToUnit(props.minHeight) } : null,
          ...props.fab ? { 'min-height': 0, 'min-width': 0 } : null,
          ...props.tile ? { 'border-radius': 0 } : null,
          ...props.flat ? {
            'border-color': 'transparent',
            'background-color': 'transparent',
            'color': props.color ? props.color : 'black'
          } : null,
        }
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
