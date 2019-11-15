<template>
  <div :class="wrapperClasses">
    <slot></slot>
    <div :class="classes" :style="styles" ref="badge" v-if="value">
      <slot name="badge"></slot>
    </div>
  </div>
</template>

<script>
  import { computed, onMounted, reactive } from '@vue/composition-api'
  import { isCssColor } from '../../mixins/colorable';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GBadge',
    props: {
      overlay: Boolean,
      left: Boolean,
      bottom: Boolean,
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
      value: {
        type: Boolean,
        default: true
      },
    },
    setup(props, context) {
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
        let computedObject = {};

        if (props.nudgeTop) {
          computedObject.top = convertToUnit(-parseInt(props.nudgeTop))
          computedObject.bottom = 'unset';
        }
        if (props.nudgeBottom) {
          computedObject.bottom = convertToUnit(-parseInt(props.nudgeBottom));
          computedObject.top = 'unset';
        }
        if (props.nudgeLeft) {
          computedObject.left = convertToUnit(-parseInt(props.nudgeLeft));
          computedObject.right = 'unset';
        }
        if (props.nudgeRight) {
          computedObject.right = convertToUnit(-parseInt(props.nudgeRight));
          computedObject.left = 'unset';
        }

        return computedObject;
      })

      const styles = computed(() => ({
        ...!props.inline && { transform: transform.value },
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
