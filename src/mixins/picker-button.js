import { computed, createElement as h, reactive, watch } from '@vue/composition-api';
import { kebabCase } from '../utils/helpers';

export default (props, context) => {
  return {
    genPickerButton(prop, value, content, readonly = false, staticClass = '') {
      const active = props[prop] === value // TODO: verify props[prop]
      const click = (e) => {
        e.stopPropagation();
        context.emit(`update:${kebabCase(prop)}`, value)
      }
      return h('div', {
        staticClass: `g-picker__title__btn ${staticClass}`.trim(),
        class: {
          'g-picker__title__btn--active': active,
          'g-picker__title__btn--readonly': readonly,
        },
        on: (active || readonly) ? undefined : { click },
      }, Array.isArray(content) ? content : [content])
    }
  }
}
