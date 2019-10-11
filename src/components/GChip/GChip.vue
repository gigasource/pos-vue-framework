<template>
	<div :class="classes" :style="styles" :draggable="attrs.draggable" @click="onClick">
		<span class="g-icon g-icon__left" v-if="renderState == 3">
			<i class="material-icons g-icon" v-if="filter === true && stateData.isActive">{{filterIcon}}</i>
		</span>

		<div class="g-avatar g-avatar__left" v-if="renderState == 1">
			<slot name="prependItem"></slot>
			<div class="g-overlay" v-if="filter && stateData.isActive">
				<i class="material-icons g-icon">{{filterIcon}}</i>
			</div>
		</div>

		<div class="g-avatar g-avatar__left" v-if="renderState == 2">
			<slot name="prependItem"></slot>
		</div>

		<slot></slot>

		<span class="g-icon g-icon__right" @click.stop="onClose">
			<slot name="close" v-if="close">
				<i class="material-icons g-icon">{{closeIcon}}</i>
			</slot>
		</span>
	</div>
</template>

<script>
  import { computed, reactive } from '@vue/composition-api';
  import { convertToGradient } from '../../utils/helpers';
  import { setBackgroundColor } from '../../mixins/colorable';

  export default {
    name: 'GChip',
    props: {
      active: { type: Boolean, default: true },
      append: Boolean,
      close: Boolean,
      closeIcon: { type: String, default: `remove_circle` },
      color: String,				//done
      disabled: Boolean,   //done
      filter: Boolean,		//done
      filterIcon: { type: String, default: `done` },	//done //icons import?
      href: [String, Object],
      inputValue: null,
      label: Boolean,
      link: Boolean,
      outlined: Boolean,  //re-style border color
      pill: Boolean,
      replace: Boolean,
      ripple: Boolean,					//done
      target: String,
      textColor: String,				//done
      backgroundColor: String,	//done
      gradient: String,			//done
      value: null,
      //style
      draggable: Boolean, //done
      small: Boolean, //done
      large: Boolean, //done
      xSmall: Boolean, //done
      xLarge: Boolean //done
    },
    setup(props, context) {
      //Prepend Icon Rendering States
      const RENDER_FILTER_ONLY = 1;
      const RENDER_AVATAR_ONLY = 2;
      const RENDER_AVATAR_FILTER = 3;

      let stateData = reactive({
        isActive: false
      });

      let prependSlot = () => {
        return !!context.slots.prependItem;
      };

      let renderState = computed(() => {
        console.log(prependSlot());
        if (prependSlot() === true && props.filter === true) {
          return RENDER_FILTER_ONLY;
        } else if (prependSlot() === true && props.filter === false) {
          return RENDER_AVATAR_ONLY;
        } else if (prependSlot() === false && props.filter === true) {
          return RENDER_AVATAR_FILTER;
        }
      });

      let toggle = () => (stateData.isActive = !stateData.isActive);

      let colorOutput = computed(() => {
        return setBackgroundColor(props.color, {})
      });

      const chipClasses = computed(() => {
        return colorOutput.value.class
      });

      console.log(chipClasses)

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
        };

        let size = '';
        //let iconSize = '';

        if (props.large) {
          size = 'g-size__large';
          // iconSize = props.fab ? 'g-icon-size__large' : null;
        } else if (props.small) {
          size = 'g-size__small';
          // iconSize = props.fab ? 'g-icon-size__small' : null;
        } else if (props.xSmall) {
          size = 'g-size__x-small';
          // iconSize = props.fab ? 'g-icon-size__x-small' : null;
        } else if (props.xLarge) {
          size = 'g-size__x-large';
          // iconSize = props.fab ? 'g-icon-size__x-large' : null;
        } else {
          size = 'g-size__default';
          // iconSize = props.fab ? 'g-icon-size__default' : null;
        }
        if (size) {
          _classes[size] = true;
        }

        // if (iconSize) {
        //   _classes[iconSize] = true;
        // }


        return _classes;
      });

      let styles = computed(() => {
        let _styles = {
          ...colorOutput.value.style,
          ...props.textColor && { color: props.textColor.replace('-', '') },
          ...props.backgroundColor && { backgroundColor: props.backgroundColor.replace('-', '') },
          ...props.color && { backgroundColor: props.color.replace('-', ''), color: '#fff' },
          ...props.outlined && { color: `${props.color}`, border: `thin solid currentColor`, backgroundColor: 'transparent' },
        };

        // Params: linear-gradient(45deg, yellow, green)
        if (props.gradient && !props.gradient.toString().includes('-')) {
          _styles['background-image'] = convertToGradient(props.gradient.toString().split(','), props.gradientAngle);
        }

        return _styles;
      });

      let attrs = computed(() => {
        let _attrs = {
          ...props.draggable && { draggable: props.draggable }
        };
        return _attrs;
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
