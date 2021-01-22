import { h, Transition, TransitionGroup } from 'vue';


function mergeTransitions (transitions, array) {
  if (Array.isArray(transitions))
    return transitions.concat(array);
  if (transitions)
    array.push(transitions);
  return array;
}

export function createSimpleTransition (name, origin = 'top center 0', mode) {
  const transition = (props, context) => {
      const tag = props.group ? TransitionGroup : Transition;
      context.attrs.name = name;
      context.attrs.mode = props.mode;

      const ourBeforeEnter = [];
      const ourLeave = [];
      const absolute = el => (el.style.position = 'absolute');

      ourBeforeEnter.push((el) => {
        el.style.transformOrigin = props.origin
        el.style.webkitTransformOrigin = props.origin
      });

      if (props.leaveAbsolute)
        ourLeave.push(absolute);
      if (props.hideOnLeave)
        ourLeave.push(el => (el.style.display = 'none'));

      const { onBeforeEnter, onLeave } = context.attrs;

      context.attrs.onBeforeEnter = () => mergeTransitions(onBeforeEnter, ourBeforeEnter);
      context.attrs.onLeave = () => mergeTransitions(onLeave, ourLeave);

      return h(tag, context.attrs, context.slots);
  }

  transition.props =  {
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
  }

  return transition
}

export function createJavaScriptTransition (name, functions, mode = 'in-out') {
  const transition = (props, context) => {
    const data = {
      name,
      mode: props.mode,
      ...functions,
    };

    return h(Transition, data, context.slots);
  }

  transition.props = {
    mode: {
      type: String,
      default: mode,
    },
  }
  return transition
}

import { upperFirst } from '../../utils/helpers';

export  function ExpandTransitionGenerator (expandedParentClass = '', x = false) {
  const sizeProperty = x ? 'width' : 'height' ;
  const offsetProperty = `offset${upperFirst(sizeProperty)}`;

  return {
    onBeforeEnter (el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        visibility: el.style.visibility,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      };
    },

    onEnter (el) {
      const initialStyle = el._initialStyle;
      const offset = `${el[offsetProperty]}px`;

      el.style.setProperty('transition', 'none', 'important');
      el.style.visibility = 'hidden';
      el.style.visibility = initialStyle.visibility;
      el.style.overflow = 'hidden';
      el.style[sizeProperty] = '0';

      void el.offsetHeight; // force reflow

      el.style.transition = initialStyle.transition;

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }

      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset
      });
    },

    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,

    onLeave (el) {
      el._initialStyle = {
        transition: '',
        visibility: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      };

      el.style.overflow = 'hidden';
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight // force reflow

      requestAnimationFrame(() => (el.style[sizeProperty] = '0'));
    },

    onAfterLeave: afterLeave,
    onLeaveCancelled: afterLeave,
  }

  function afterLeave (el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el)
  }

  function resetStyles (el) {
    if (el._initialStyle) {
      const size = el._initialStyle[sizeProperty];
      el.style.overflow = el._initialStyle.overflow;
      if (size != null) el.style[sizeProperty] = size;
      delete el._initialStyle;
    }
  }
}
