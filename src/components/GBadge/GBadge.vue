<template>
	<div :class="wrapperClasses">
		<slot></slot>
		<div v-if="value" :class="classes" :style="styles">
			<slot name="badge"></slot>
		</div>
	</div>
</template>

<script>
	import { computed } from '@vue/composition-api'
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

      const styles = computed(() => ({
        ...!props.inline && { transform: transform.value },
        ...props.nudgeTop && { top: convertToUnit(props.nudgeTop) },
        ...props.nudgeBottom && { bottom: convertToUnit(props.nudgeBottom) },
        ...props.nudgeLeft && { left: convertToUnit(props.nudgeLeft) },
        ...props.nudgeRight && { right: convertToUnit(props.nudgeRight) },
        ...isCssColor(props.color) && { 'background-color': props.color },
      }));

			return {
        wrapperClasses,
			  classes,
				styles
			}
		}
  }
</script>

<style lang="scss">
	@import '_GBadge.scss';
</style>
