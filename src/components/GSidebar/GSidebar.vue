<template>
  <div class="g-sidebar-wrapper">
    <div :class="classes" :style="styles">
      <div class="g-sidebar-header">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </div>
    <g-overlay v-if="overlay" z-index="997" :opacity="overlayOpacity" :color="overlayColor" value="true"></g-overlay>
  </div>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import GOverlay from '../GOverlay/GOverlay';
  import colorHandler, { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GSidebar',
    components: { GOverlay },
    props: {
      absolute: Boolean,
      bottom: Boolean,
      right: Boolean,
      clipped: Boolean,
      collapsed: Boolean,
      color: {
        type: String,
        default: 'white'
      },
      src: String,
      overlay: Boolean,
      overlayColor: String,
      overlayOpacity: [Number, String],
      width: [Number, String],
    },
    setup(props) {
      const { getColorType, convertColorClass } = colorHandler();

      const classes = computed(() => ({
        'g-sidebar': true,
        'g-sidebar__absolute': props.absolute,
        'g-sidebar__collapsed': props.collapsed,
        [convertColorClass(props.color, 'background')]: props.color && getColorType(props.color) === 'class'
      }));

      const styles = computed(() => ({
        ...props.color && getColorType(props.color) === 'bgStyle' && { 'background-color': props.color },
        ...props.src && {
          'background-image': 'url("' + props.src + '")',
          'background-position': 'center center',
          'background-size': 'cover',
        },
        ...props.width && { width: convertToUnit(props.width) }
      }));

      return {
        classes,
        styles
      }
    }
  }
</script>

<style scoped>

</style>
