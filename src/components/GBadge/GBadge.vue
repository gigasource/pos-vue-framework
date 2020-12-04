<template>
  <div :class="wrapperClasses">
    <slot></slot>
    <div :class="classes" :style="styles" ref="badge" v-if="modelValue">
      <slot name="badge"></slot>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { isCssColor } from '../../mixins/colorable';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GBadge',
    props: {
      overlay: Boolean,
      left: Boolean,
      bottom: Boolean,
      badgeSize: {
        type: [String, Number],
        default: 22
      },
      borderRadius: {
        type: [String, Number],
        default: 9999
      },
      color: {
        type: String,
        default: 'blue'
      },
      nudgeTop: [String, Number],
      nudgeBottom: [String, Number],
      nudgeLeft: [String, Number],
      nudgeRight: [String, Number],
      showOnHover: Boolean,
      inline: Boolean,
      modelValue: {
        type: Boolean,
        default: true
      },
    },
    setup(props) {
      const wrapperClasses = computed(() => ({
        'g-badge-wrapper': true,
        'g-badge__hover': props.showOnHover,
        'g-badge__inline': props.inline,
      }));

      const classes = computed(() => ({
        'g-badge': true,
        'g-badge__left': props.left,
        'g-badge__bottom': props.bottom,
        ['bg-' + props.color.split(' ').join('-')]: props.color && !isCssColor(props.color),
      }));

      const transform = computed(() => {
        const disparity = props.overlay ? '50%' : '80%';
        return 'translate(' + (props.left ? '-' : '') + disparity + ',' + (props.bottom ? '' : '-') + disparity + ')';
      });

      const computedNudge = computed(() => {
        let nudge = {};

        if (props.nudgeTop) {
          nudge.top = convertToUnit(-parseInt(props.nudgeTop))
          nudge.bottom = 'unset';
        }
        if (props.nudgeBottom) {
          nudge.bottom = convertToUnit(-parseInt(props.nudgeBottom));
          nudge.top = 'unset';
        }
        if (props.nudgeLeft) {
          nudge.left = convertToUnit(-parseInt(props.nudgeLeft));
          nudge.right = 'unset';
        }
        if (props.nudgeRight) {
          nudge.right = convertToUnit(-parseInt(props.nudgeRight));
          nudge.left = 'unset';
        }

        return nudge;
      })

      const styles = computed(() => ({
        ...!props.inline && { transform: transform.value },
        ...props.badgeSize && {
          //width: convertToUnit(props.badgeSize),
          height: convertToUnit(props.badgeSize),
          minWidth: convertToUnit(props.badgeSize),
          borderRadius: convertToUnit(props.borderRadius)
        },
        ...computedNudge.value,
        ...isCssColor(props.color) && { 'background-color': props.color },
      }));

      return {
        wrapperClasses,
        classes,
        styles,
        computedNudge
      }
    }
  }
</script>

<style lang="scss">
  @import '_GBadge.scss';
</style>
