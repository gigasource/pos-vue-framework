<template>
  <div :class="classes" :style="dividerStyle"></div>
</template>

<script>
import {computed} from 'vue';

export default {
  name: 'GDivider',
  props: {
    dashed: Boolean,
    dotted: Boolean,
    solid: {
      type: Boolean,
      default: true
    },
    thickness: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    inset: Boolean,
    color: {
      type: String,
      default: 'rgba(0, 0, 0, 1)'
    },
    vertical: Boolean,
  },
  setup(props) {
    const classes = computed(() => {
      const defaultClass = {
        'g-divider': true,
      };
      return {
        ...defaultClass,
      }
    });
    const dividerStyle = computed(() => {

        return {
          'border-top-width': `${props.thickness}px`,
          'border-top-style': props.dotted ? 'dotted' : (props.dashed ? 'dashed' : 'solid'),
          ...props.color && {'border-top-color': props.color},
          ...!props.vertical && {height: '0 !important', width: props.inset ? 'calc(100%-16px)' : props.width},
          ...props.vertical && {width: '0 !important', height: props.inset ? 'calc(100%-16px)' : props.height},
        }
      })
    return {
      classes,
      dividerStyle
    }
  }
}
</script>

<style scoped lang="scss">
.g-divider {
  align-self: center;
}
</style>
