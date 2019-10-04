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
        raised: { type: Boolean, default: false },
        depressed: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        rounded: { type: Boolean, default: false },
        text: String,
        flat: { type: Boolean, default: false },
        fab: { type: Boolean, default: false },
        tile: { type: Boolean, default: false },
        icon: { type: Boolean, default: false },
        outlined: { type: Boolean, default: false },
        dashed: { type: Boolean, default: false }
      },
      //style
      ...{
        elevation: { type: [String, Number], default: 4 },
        absolute: { type: Boolean, default: false },
        fixed: { type: Boolean, default: false },
        top: { type: Boolean, default: false },
        bottom: { type: Boolean, default: false },
        left: { type: Boolean, default: false },
        right: { type: Boolean, default: false },
        large: { type: Boolean, default: false },
        small: { type: Boolean, default: false },
        xLarge: { type: Boolean, default: false },
        xSmall: { type: Boolean, default: false },
        maxHeight: [String, Number],
        maxWidth: [String, Number],
        minHeight: [String, Number],
        minWidth: [String, Number],

        block: { type: Boolean, default: false },
        width: [String, Number],
        height: [String, Number],
        color: String,
        backgroundColor: String
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
          'g-btn-top': props.top,
          'g-btn-fixed': props.fixed,
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
        if (props.large) {
          size = `g-size__large`;
        } else if (props.small) {
          size = `g-size__small`;
        } else if (props.xSmall) {
          size = `g-size__x-small`;
        } else if (props.xLarge) {
          size = `g-size__x-large`;
        } else {
          size = 'g-size__default';
        }
        classes[size] = true;

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
          ...props.color ? { 'background-color': props.color.replace('-', ''), 'color': 'white' } : null,
          ...props.outlined ? { 'color': `${props.color}`, 'border': `thin solid ${props.color}`, 'background-color': 'transparent' } : null,
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
