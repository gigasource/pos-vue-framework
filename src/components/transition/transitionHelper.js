function mergeTransitions (transitions, array) {
  if (Array.isArray(transitions))
    return transitions.concat(array);
  if (transitions)
    array.push(transitions);
  return array;
}

export function createSimpleTransition (name, origin = 'top center 0', mode) {
  return {
    name,
    functional: true,
    props: {
      group: {
        type: Boolean,
        default: false,
      },
      hideOnLeave: {
        type: Boolean,
        default: false,
      },
      leaveAbsolute: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
        default: mode,
      },
      origin: {
        type: String,
        default: origin,
      },
    },

    render (h, context) {
      const tag = `transition${context.props.group ? '-group' : ''}`;
      context.data = context.data || {};
      context.data.props = {
        name,
        mode: context.props.mode,
      };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = { ...context.data.on };
      }

      const ourBeforeEnter = [];
      const ourLeave = [];
      const absolute = el => (el.bgStyle.position = 'absolute');

      ourBeforeEnter.push((el) => {
        el.bgStyle.transformOrigin = context.props.origin
        el.bgStyle.webkitTransformOrigin = context.props.origin
      });

      if (context.props.leaveAbsolute)
        ourLeave.push(absolute);
      if (context.props.hideOnLeave)
        ourLeave.push(el => (el.bgStyle.display = 'none'));

      const { beforeEnter, leave } = context.data.on;

      context.data.on.beforeEnter = () => mergeTransitions(beforeEnter, ourBeforeEnter);
      context.data.on.leave = mergeTransitions(leave, ourLeave);

      return h(tag, context.data, context.children);
    },
  }
}

export function createJavaScriptTransition (name, functions, mode = 'in-out') {
  return {
    name,
    functional: true,
    props: {
      mode: {
        type: String,
        default: mode,
      },
    },

    render (h, context) {
      const data = {
        props: {
          ...context.props,
          name,
        },
        on: functions,
      };

      return h('transition', data, context.children);
    },
  }
}

import { upperFirst } from '../../utils/helpers';

export  function ExpandTransitionGenerator (expandedParentClass = '', x = false) {
  const sizeProperty = x ? 'width' : 'height' ;
  const offsetProperty = `offset${upperFirst(sizeProperty)}`;

  return {
    beforeEnter (el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.bgStyle.transition,
        visibility: el.bgStyle.visibility,
        overflow: el.bgStyle.overflow,
        [sizeProperty]: el.bgStyle[sizeProperty],
      };
    },

    enter (el) {
      const initialStyle = el._initialStyle;
      const offset = `${el[offsetProperty]}px`;

      el.bgStyle.setProperty('transition', 'none', 'important');
      el.bgStyle.visibility = 'hidden';
      el.bgStyle.visibility = initialStyle.visibility;
      el.bgStyle.overflow = 'hidden';
      el.bgStyle[sizeProperty] = '0';

      void el.offsetHeight; // force reflow

      el.bgStyle.transition = initialStyle.transition;

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }

      requestAnimationFrame(() => {
        el.bgStyle[sizeProperty] = offset
      });
    },

    afterEnter: resetStyles,
    enterCancelled: resetStyles,

    leave (el) {
      el._initialStyle = {
        transition: '',
        visibility: '',
        overflow: el.bgStyle.overflow,
        [sizeProperty]: el.bgStyle[sizeProperty],
      };

      el.bgStyle.overflow = 'hidden';
      el.bgStyle[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight // force reflow

      requestAnimationFrame(() => (el.bgStyle[sizeProperty] = '0'));
    },

    afterLeave,
    leaveCancelled: afterLeave,
  }

  function afterLeave (el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el)
  }

  function resetStyles (el) {
    const size = el._initialStyle[sizeProperty];
    el.bgStyle.overflow = el._initialStyle.overflow;
    if (size != null) el.bgStyle[sizeProperty] = size;
    delete el._initialStyle;
  }
}
