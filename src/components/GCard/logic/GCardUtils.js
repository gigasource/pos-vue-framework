import { computed } from '@vue/composition-api'
import { convertToUnit } from '../../../utils/helpers';

export default (props, context) => {
  const classes = computed(() => {
    const elevationClassName = props.elevation ? `g-card__elevation-${props.elevation}` : null;
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
      [props.activeClass]: props.active
    };
    if (elevationClassName) {
      _classes[elevationClassName] = true;
    }
    return _classes;
  });

  const styles = computed(() => {
    return {
      ...props.img && { backgroundImage: `url("${props.img}"` },
      ...props.backgroundColor && { backgroundColor: convertToUnit(props.backgroundColor) },
      ...props.color && { color: props.color },
      ...props.tile && { borderRadius: '0px' },
      ...props.borderRadius && { borderRadius: props.borderRadius },
      ...props.width && { width: convertToUnit(props.width) },
      ...props.height && { height: convertToUnit(props.height) },
      ...props.minWidth && { minWidth: convertToUnit(props.minWidth) },
      ...props.minHeight && { minHeight: convertToUnit(props.minHeight) },
      ...props.maxWidth && { maxWidth: convertToUnit(props.maxWidth) },
      ...props.maxHeight && { maxHeight: convertToUnit(props.maxHeight) },
    };
  });
  return {
    classes,
    styles
  }
}
