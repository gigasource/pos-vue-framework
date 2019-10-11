<template>
	<div :class="classes" :style="styles" :draggable="attrs.draggable" @click="onClick">
		<span class="g-icon g-icon__left" v-if="renderState === 'RENDER_FILTER_ONLY'">
			<i class="material-icons g-icon" v-if="filter === true && stateData.isActive">{{filterIcon}}</i>
		</span>

		<div class="g-avatar g-avatar__left" v-if="renderState === 'RENDER_AVATAR_FILTER'">
			<slot name="prependItem"></slot>
			<div class="g-overlay" v-if="filter && stateData.isActive">
				<i class="material-icons g-icon">{{filterIcon}}</i>
			</div>
		</div>

		<div class="g-avatar g-avatar__left" v-if="renderState === 'RENDER_AVATAR_ONLY'">
			<slot name="prependItem"></slot>
		</div>

		<slot></slot>

		<span class="g-icon g-icon__right" @click.stop="onClose" v-if="close">
			<i class="material-icons g-icon">{{closeIcon}}</i>
		</span>

	</div>

</template>

<script>
  import { computed, reactive } from '@vue/composition-api';
  import { convertToGradient } from '../../utils/helpers';
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable';
  import GExpansionPanel from '../GExpansionPanel/GExpansionPanel';

  export default {
    name: 'GChip',
    props: {
      active: Boolean,
      append: Boolean,
      close: Boolean,
      closeIcon: { type: String, default: `close` },
      color: String,
      disabled: Boolean,
      filter: Boolean,
      filterIcon: { type: String, default: `done` },
      href: [String, Object],
      inputValue: null,
      label: Boolean,
      link: Boolean,
      outlined: Boolean,
      pill: Boolean,
      replace: Boolean,
      ripple: Boolean,
      target: String,
      textColor: String,
      backgroundColor: { type: String, default: '#e0e0e0' },
      gradient: String,
      value: null,
      //style
      draggable: Boolean,
      small: Boolean,
      large: Boolean,
      xSmall: Boolean,
      xLarge: Boolean
    },
    setup(props, context) {
      //Prepend Icon Rendering States
      const RENDER_FILTER_ONLY = 'RENDER_FILTER_ONLY';
      const RENDER_AVATAR_ONLY = 'RENDER_AVATAR_ONLY';
      const RENDER_AVATAR_FILTER = 'RENDER_AVATAR_FILTER';

      let stateData = reactive({
        isActive: false
      });

      //Check prepend slot available
      let prependSlot = () => {
        return !!context.slots.prependItem;
      };

      //Rendering state of prependItem
      let renderState = computed(() => {
        if (prependSlot() === true && props.filter === true) {
          return RENDER_AVATAR_FILTER;
        } else if (prependSlot() === true && props.filter === false) {
          return RENDER_AVATAR_ONLY;
        } else if (prependSlot() === false && props.filter === true) {
          return RENDER_FILTER_ONLY;
        }
      });

      let toggle = () => (stateData.isActive = !stateData.isActive);

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
          'g-chip__active': props.active,
          ...backgroundColorOutput && backgroundColorOutput.value && backgroundColorOutput.value.class,
          ...textColorOutput && textColorOutput.value && textColorOutput.value.class
        };

        let size = '';

        if (props.large) {
          size = 'g-size__large';
        } else if (props.small) {
          size = 'g-size__small';
        } else if (props.xSmall) {
          size = 'g-size__x-small';
        } else if (props.xLarge) {
          size = 'g-size__x-large';
        } else {
          size = 'g-size__default';
        }
        if (size) {
          _classes[size] = true;
        }

        return _classes;
      });

      let styles = computed(() => {
        let _styles = {
          ...backgroundColorOutput && backgroundColorOutput.value && backgroundColorOutput.value.style,
          ...textColorOutput && textColorOutput.value && textColorOutput.value.style,
          ...props.textColor && { color: props.textColor.replace('-', '') },
          ...props.outlined && { color: `${props.color}`, border: `thin solid currentColor`, backgroundColor: 'transparent' },
        };

        // Params: linear-gradient(45deg, yellow, green)
        if (props.gradient && !props.gradient.toString().includes('-')) {
          _styles['background-image'] = convertToGradient(props.gradient.toString().split(','), props.gradientAngle);
        }

        return _styles;
      });

      let attrs = computed(() => {
        return {
          ...props.draggable && { draggable: props.draggable }
        };
      });

      let onClick = (event) => {
        context.emit('click', event);
        toggle();
      };

      let onClose = (event) => {
        context.emit('click:close');
        context.emit('update:active', false);
      };

      return {
        classes,
        styles,
        attrs,
        stateData,
        renderState,
        onClick,
        onClose
      }
    }
  }
</script>

<style scoped>

</style>
