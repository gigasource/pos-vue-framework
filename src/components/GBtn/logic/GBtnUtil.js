import { computed } from '@vue/composition-api'
import { convertToGradient, convertToUnit } from '../../../utils/helpers';

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
      'g-btn__fixed': props.fixed,
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
      ...elevationClasses.value
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

  let elevationClasses = computed(() => {
    const elevation = props.elevation;
    if (!!elevation) {
      return {};
    }

    if (isNaN(parseInt(elevation))) {
      return {};
    }

    return { [`g-btn__elevation-${props.elevation}`]: true }
  });

  let isRound = computed(() => {
    return props.icon || props.fab;
  });

  let isFlat = computed(() => {
    return props.text || props.icon || props.outlined;
  });

  let contained = computed(() => {
    return !isFlat.value && !props.depressed && !props.elevation;
  });

  let styles = computed(() => {
    let _styles = {
      ...props.textColor && { color: props.textColor.replace('-', '') },
      ...props.backgroundColor && { backgroundColor: props.backgroundColor.replace('-', '') },
      ...props.width && { width: convertToUnit(props.width) },
      ...props.height && { height: convertToUnit(props.height) },
      ...props.maxWidth && { maxWidth: convertToUnit(props.maxWidth) },
      ...props.maxHeight && { maxHeight: convertToUnit(props.maxHeight) },
      ...props.minWidth && { minWidth: convertToUnit(props.minWidth) },
      ...props.minHeight && { minHeight: convertToUnit(props.minHeight) },
    };

    // Params: linear-gradient(45deg, yellow, green)
    if (props.gradient && !props.gradient.toString().includes('-')) {
      _styles['background-image'] = convertToGradient(props.gradient.toString().split(','), props.gradientAngle);
    }

    return _styles;
  });

  return {
    classes,
    styles
  }
}
