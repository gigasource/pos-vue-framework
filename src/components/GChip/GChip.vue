<template>
	<div :class="classes" :style="styles" :draggable="draggable" @click="onClick">
		<span class="g-icon g-icon__left" v-if="renderState === 'RENDER_FILTER_ONLY'">
			<i class="material-icons g-icon" v-if="filter">{{filterIcon}}</i>
		</span>

		<div class="g-avatar g-avatar__left" v-else-if="renderState === 'RENDER_AVATAR_FILTER'">
			<slot name="prependItem"></slot>
			<div class="g-overlay" v-if="filter">
				<i class="material-icons g-icon">{{filterIcon}}</i>
			</div>
		</div>

		<div class="g-avatar g-avatar__left" v-else-if="renderState === 'RENDER_AVATAR_ONLY'">
			<slot name="prependItem"></slot>
		</div>

		<slot></slot>

		<span class="g-icon g-icon__right" @click.stop="onClose" v-if="close">
			<i class="material-icons g-icon">{{closeIcon}}</i>
		</span>

	</div>

</template>

<script>
  import { computed } from '@vue/composition-api';
  import { convertToGradient } from '../../utils/helpers';
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable';

  export default {
    name: 'GChip',
    props: {
      //classes
      active: Boolean,
      append: Boolean,
      close: Boolean,
      closeIcon: { type: String, default: `close` },
      disabled: Boolean,
      filter: Boolean,
      filterIcon: { type: String, default: `done` },
      //href: [String, Object],
      //inputValue: null,    //Not used yet
      //link: Boolean,      //Not used yet
      outlined: Boolean,
      pill: Boolean,
      //replace: Boolean,    //Not used yet
      //target: String,  //Not used yet
      value: null,
      label: Boolean,
      small: Boolean,
      large: Boolean,
      xSmall: Boolean,
      xLarge: Boolean,
      draggable: Boolean,
      //style
      color: String,
      ripple: Boolean,
      textColor: String,
      backgroundColor: { type: String, default: '#e0e0e0' },
      gradient: String,
			activeClass: {
        type: String,
				default: 'g-chip__active'
			}
    },
    setup(props, context) {
      //Prepend Icon Rendering States
      const RENDER_FILTER_ONLY = 'RENDER_FILTER_ONLY';
      const RENDER_AVATAR_ONLY = 'RENDER_AVATAR_ONLY';
      const RENDER_AVATAR_FILTER = 'RENDER_AVATAR_FILTER';

      //Check prepend slot available
      let prependSlotExists = () => {
        return !!context.slots.prependItem;
      };

      //Rendering state of prependItem
      let renderState = computed(() => {
        if (prependSlotExists() && props.filter) {
          return RENDER_AVATAR_FILTER;
        } else if (prependSlotExists() && !props.filter) {
          return RENDER_AVATAR_ONLY;
        } else if (!prependSlotExists() && props.filter) {
          return RENDER_FILTER_ONLY;
        }
      });

      let backgroundColorOutput = computed(() => {
        return props.color ? setBackgroundColor(props.color, {}) : setBackgroundColor('#e0e0e0', {});
      });

      let textColorOutput = computed(() => {
        return setTextColor(props.textColor, {})
      });

      let classes = computed(() => {
        let _classes = {
          'g-chip': true,
          'waves-effect': props.ripple,
          'g-chip__outlined': props.outlined,
          'g-chip__close': props.close,
          'g-chip__disabled': props.disabled,
          'g-chip__filter': props.filter,
          'g-chip__draggable': props.draggable,
          'g-chip__pill': props.pill,
          'g-chip__label': props.label,
          [props.activeClass]: props.active,
          ...backgroundColorOutput.value && backgroundColorOutput.value.class,
          ...textColorOutput.value && textColorOutput.value.class
        };

        let size = '';
        let avatarSize = '';

        if (props.large) {
          size = 'g-size__large';
          avatarSize = 'g-avatar-size__large';
        } else if (props.small) {
          size = 'g-size__small';
          avatarSize = 'g-avatar-size__small';
        } else if (props.xSmall) {
          size = 'g-size__x-small';
          avatarSize = 'g-avatar-size__x-small';
        } else if (props.xLarge) {
          size = 'g-size__x-large';
          avatarSize = 'g-avatar-size__x-large';
        }
        _classes[size] = true;
        _classes[avatarSize] = true;

        return _classes;
      });

      let styles = computed(() => {
        let _styles = {
          ...backgroundColorOutput.value && backgroundColorOutput.value.style,
          ...textColorOutput.value && textColorOutput.value.style,
          ...props.textColor && { color: props.textColor.replace('-', '') },
          ...props.outlined && { color: `${props.color}`, border: `thin solid currentColor`, backgroundColor: 'transparent' },
        };

        // Params: linear-gradient(45deg, yellow, green)
        //includes('-'): check if grandient is gradient-45deg-yellow-green or array of colors
        if (props.gradient && !props.gradient.toString().includes('-')) {
          _styles['background-image'] = convertToGradient(props.gradient.toString().split(','), props.gradientAngle);
        }

        return _styles;
      });

      const { value } = props;
      let onClick = () => {
        context.emit('click', value);
      };

      let onClose = () => {
        context.emit('click:close', value);
        context.emit('update:active');
      };

      return {
        classes,
        styles,
        renderState,
        onClick,
        onClose
      }
    }
  }
</script>

<style scoped>

</style>
