import { computed } from 'vue'
import { convertToUnit } from '../../../utils/helpers';
import { setBackgroundColor, setTextColor } from '../../../mixins/colorable';

export default (props, context) => {
  const classes = computed(() => {

    const _classes = {
      'g-card': true,
      'waves-effect': props.ripple,
      'g-card__flat': props.flat,
      'g-card__hover': props.hover,
      'g-card__link': props.isClickable,
      'g-card__loading': props.loading,
      'g-card__disabled': props.loading || props.disabled,
      'g-card__outlined': props.outlined,
      'g-card__raised': props.raised,
      'g-card__shaped': props.shaped,
      [props.activeClass]: props.active,
      ...backgroundColorOutput.value && backgroundColorOutput.value.class,
      ...textColorOutput.value && textColorOutput.value.class
    };

    if(props.elevation && !props.outlined) {
      _classes[`elevation-${props.elevation}`] = true ;
    }

    return _classes;
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
    return {
      ...props.img && { backgroundImage: `url("${props.img}"` },
      ...props.backgroundColor && { backgroundColor: setBackgroundColor(props.backgroundColor, {}) },
      ...props.tile && { borderRadius: '0px' },
      ...props.borderRadius && { borderRadius: props.borderRadius },
      ...props.width && { width: convertToUnit(props.width) },
      ...props.height && { height: convertToUnit(props.height) },
      ...props.minWidth && { minWidth: convertToUnit(props.minWidth) },
      ...props.minHeight && { minHeight: convertToUnit(props.minHeight) },
      ...props.maxWidth && { maxWidth: convertToUnit(props.maxWidth) },
      ...props.maxHeight && { maxHeight: convertToUnit(props.maxHeight) },
      ...backgroundColorOutput.value && backgroundColorOutput.value.style,
      ...textColorOutput.value && textColorOutput.value.style,
    };
  });
  return {
    classes,
    styles
  }
}
