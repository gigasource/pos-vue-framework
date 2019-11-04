import { computed } from '@vue/composition-api'
import { convertToGradient, convertToUnit } from '../../../utils/helpers';
import { setBackgroundColor, setTextColor } from '../../../mixins/colorable';
import { linearGradient } from '../../../utils/colors';

export default (props, context) => {
  let classes = computed(() => {
    let _classes = {
      'g-btn': true,
      'g-btn__raised': props.raised,
      'g-btn__flat': isFlat.value,
      'g-btn__tile': props.tile,
      'g-btn__fab': props.fab,
      'g-btn__icon': props.icon,
      'g-btn__text': props.text,
      'g-btn__top': props.top,
      'g-btn__fixed': isFixed.value,
      'g-btn__absolute': props.absolute,
      'g-btn__bottom': props.bottom,
      'g-btn__left': props.left,
      'g-btn__right': props.right,
      'g-btn__block': props.block,
      'g-btn__depressed': props.depressed || props.outlined,
      'g-btn__disabled': props.disabled,
      'g-btn__rounded': props.rounded,
      'g-btn__outlined': props.outlined,
      'g-btn__round': isRound.value,
      'g-btn__contained': contained.value,
      [props.activeClass]: props.active,
      ...elevationClasses.value,
      ...backgroundColorOutput.value && backgroundColorOutput.value.class,
      ...textColorOutput.value && textColorOutput.value.class
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

    if (props.gradient) {
      if (props.gradient.toString().includes('-')) {
        _classes[props.gradient] = true;
      }
    }

    let elevationClassName = props.elevation ? `g-btn__elevation-${props.elevation}` : null;
    if (elevationClassName) {
      _classes[elevationClassName] = true;
    }

    return _classes;
  });

  const elevationClasses = computed(() => {
    const elevation = props.elevation;
    if (!!elevation) {
      return {};
    }

    if (isNaN(parseInt(elevation))) {
      return {};
    }

    return { [`g-btn__elevation-${props.elevation}`]: true }
  });

  const isRound = computed(() => {
    return props.icon || props.fab;
  });

  const isFlat = computed(() => {
    return props.text || props.icon || props.outlined || props.flat;
  });

  const contained = computed(() => {
    return !isFlat.value && !props.depressed && !props.elevation;
  });

  const isFixed = computed(()=> {
    return props.fixed || props.fab;
  });

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
      ...props.width && { width: convertToUnit(props.width) },
      ...props.height && { height: convertToUnit(props.height) },
      ...props.maxWidth && { maxWidth: convertToUnit(props.maxWidth) },
      ...props.maxHeight && { maxHeight: convertToUnit(props.maxHeight) },
      ...props.minWidth && { minWidth: convertToUnit(props.minWidth) },
      ...props.minHeight && { minHeight: convertToUnit(props.minHeight) },
      ...backgroundColorOutput.value && backgroundColorOutput.value.style,
      ...textColorOutput.value && textColorOutput.value.style,
    };

    _styles['background-image'] = linearGradient(props.gradient && props.gradient.split(','), props.gradientAngle);

    return _styles;
  });

  return {
    classes,
    styles
  }
}
