<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'List',
    props: {
      height: String,
      width: String,
      disabled: Boolean,
      twoLine: Boolean,
      threeLine: Boolean,
      rounded: Boolean,
      shaped: Boolean,
      elevation: {
        type: [Number, String],
        default: 2,
      },
      dense: Boolean,
      nav: Boolean,
    },
    setup(props) {
      const classes = computed(() => {
        const defaultClasses = {
          'g-list': true,
        };
        return {
          ...defaultClasses,
          'g-list__disabled': props.disabled,
          'g-list__two-line': props.twoLine,
          'g-list__three-line': props.threeLine,
          'g-list__rounded': props.rounded,
          'g-list__shaped': props.shaped,
          ['elevation-'+ props.elevation]: true,
          'g-list__dense': props.dense,
          'g-list__nav': props.nav,
        }
      });
      const styles = computed(() => {
        let styles = {};
        if(props.height){
          Object.assign(styles, {'height': props.height});
        }
        if(props.width){
          Object.assign(styles, {'width': props.width});
        }
        return styles;
      });
      return {
        classes,
        styles
      }
    }
  }
</script>
