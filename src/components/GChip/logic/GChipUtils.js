import { computed } from '@vue/composition-api'
import { convertToUnit } from '../../../utils/helpers';
import { convertToGradient } from '../../../utils/helpers';
import { setBackgroundColor, setTextColor } from '../../../mixins/colorable';
export default (props, context) => {
  const classes = computed(() => ({
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

  const backgroundColorOutput = computed(() => {
    if (props.backgroundColor) {
      return props.backgroundColor && setBackgroundColor(props.backgroundColor, {})
    }
  });

  const textColorOutput = computed(() => {
    return props.textColor && setTextColor(props.textColor, {})
  });

  const styles = computed(() => {
    let _styles = {
      ...backgroundColorOutput.value && backgroundColorOutput.value.bgStyle,
      ...textColorOutput.value && textColorOutput.value.bgStyle,
    };

    // Params: linear-gradient(45deg, yellow, green)
    //includes('-'): check if grandient is gradient-45deg-yellow-green or array of colors
    if (props.gradient && !props.gradient.toString().includes('-')) {
      _styles['background-image'] = convertToGradient(props.gradient.toString().split(','), props.gradientAngle);
    }

    return _styles;
  });

  return {
    classes,
    styles,
    getSizeClass
  }
}
