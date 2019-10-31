<script>
  import { computed } from '@vue/composition-api';
  import GIcon from '../GIcon/GIcon';
  import Ripple from '../../directives/ripple/ripple';
  import { convertToGradient } from '../../utils/helpers';
  import { setBackgroundColor, setTextColor } from '../../mixins/colorable';
  import GBtn from '../GBtn/GBtn';

  export default {
    name: 'GChipNew',
    components: { GBtn, GIcon },
    props: {
      //classes
      active: Boolean,
      append: Boolean,
      close: Boolean,
      closeIcon: { type: String, default: `mdi-close-circle` },
      disabled: Boolean,
      filter: Boolean,
      filterIcon: { type: String, default: `mdi-check` },
      outlined: Boolean,
      pill: Boolean,
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
      backgroundColor: String,
      gradient: String,
      activeClass: {
        type: String,
        default: 'g-chip__active'
      }
    }, directives: {
      Ripple
    }, setup(props, context) {

      const chipClasses = computed(() => ({
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
      }));

      function getSizeClass() {
        if (props.xSmall) {
          return 'g-size__x-small';
        } else if (props.small) {
          return 'g-size__small';
        } else if (props.large) {
          return 'g-size__large';
        } else if (props.xLarge) {
          return 'g-size__x-large';
        }
        return 'g-size__default';
      }

      let backgroundColorOutput = computed(() => {
        if (props.backgroundColor) {
          return props.backgroundColor && setBackgroundColor(props.backgroundColor, {})
        }
      });

      let textColorOutput = computed(() => {
        return props.textColor && setTextColor(props.textColor, {})
      });

      let styles = computed(() => {
        let _styles = {
          ...backgroundColorOutput.value && backgroundColorOutput.value.style,
          ...textColorOutput.value && textColorOutput.value.style,
        };

        // Params: linear-gradient(45deg, yellow, green)
        //includes('-'): check if grandient is gradient-45deg-yellow-green or array of colors
        if (props.gradient && !props.gradient.toString().includes('-')) {
          _styles['background-image'] = convertToGradient(props.gradient.toString().split(','), props.gradientAngle);
        }

        return _styles;
      });


      function genPrepend() {
        if (props.filter) {
          return <g-icon class={'g-icon__left'} size="18px">{props.filterIcon}</g-icon>
        }
      }

      function genAppend() {
        if (props.close) {
          return <g-icon vOn:click={(e) => {
            e.stopPropagation();
            context.emit('close', e);
          }} class={'g-icon__right'} size="18px">{props.closeIcon}</g-icon>
        }
      }

      function genContent() {
        return <span class={'g-chip__content'}>
          {genPrepend()}
          {context.slots.default()}
          {genAppend()}
        </span>

      }

      function genChip() {
        if (props.ripple) {
          return <span v-ripple draggable={props.draggable} style={styles} vOn:click={(e) => context.emit('click', e)} class={['g-chip', chipClasses.value, getSizeClass()]}>
            {genContent()}
          </span>
        }
        return <span draggable={props.draggable} style={styles} vOn:click={(e) => context.emit('click', e)} class={['g-chip', chipClasses.value, getSizeClass()]}>
          {genContent()}
        </span>
      }

      return {
        genChip
      }
    }, render(createElement, context) {
      return this.genChip();
    }
  }
</script>

<style scoped>

</style>
