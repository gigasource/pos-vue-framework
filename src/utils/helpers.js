import Vue from 'vue'
import {computed, ref, watch} from "@vue/composition-api";

export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
});

export function addOnceEventListener(el, eventName, cb, options) {
  const once = (event) => {
    cb(event);
    el.removeEventListener(eventName, once, options);
  };

  el.addEventListener(eventName, once, options);
}

export function getZIndex(el) {
  const index = window.getComputedStyle(el).getPropertyValue('z-index');
  if (!index) {
    return getZIndex(el.parentNode);
  }
  return index
}

export function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str)) {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

export function convertToGradient(colorArr, angle = '45deg') {
  if (!colorArr) {
    return
  }

  if (!!Number(+angle)) {
    angle = !angle.includes('deg') ? `${Number(angle)}deg` : `${Number(angle)}`;
  }

  return colorArr.length > 0 && colorArr.reduce((acc, curVal, index, arr) => {
    if (index === arr.length - 1) {
      curVal = `${curVal})`;
    }
    return `${acc}, ${curVal}`;
  }, `linear-gradient(${angle}`);
}

let passiveSupported = false;
try {
  if (typeof window !== 'undefined') {
    const testListenerOpts = Object.defineProperty({}, 'passive', {
      get: () => {
        passiveSupported = true
      },
    });

    window.addEventListener('testListener', testListenerOpts, testListenerOpts)
    window.removeEventListener('testListener', testListenerOpts, testListenerOpts)
  }
} catch (e) {
  console.warn(e)
}

export { passiveSupported }

export function upperFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function colorHandler() {

  function getColorType(color) {
    if (color && (color.indexOf('rgb') === 0 || color.indexOf('hsl') === 0 || color.indexOf('#') === 0) || color === 'transparent') {
      return 'style';
    } else if (color) {
      return 'class';
    }
  }


  function convertColorClass(color, option) {
    if (color) {
      if (option === 'background') {
        color = 'bg ' + color;
      }
      return color.split(' ').join('-');
    }
  }

  return {
    getColorType,
    convertColorClass
  }
};

export function createSimpleFunctional (c, el = 'div', name) {
  return Vue.extend({
    name: name || c.replace(/__/g, '-'),
    functional: true,
    render (h, { data, children }) {
      data.staticClass = (`${c} ${data.staticClass || ''}`).trim();
      return h(el, data, children);
    },
  })
}
export function getInternalValue(props, context) {
  // text field internalValue
  const rawInternalValue = ref(props.value || '');

  watch(() => props.value, () => rawInternalValue.value = props.value, { lazy: true });

  const internalValue = computed({
    get: () => rawInternalValue.value,
    set: (value) => {
      rawInternalValue.value = value;
      context.emit('input', rawInternalValue.value)
    }
  });

  return internalValue;
}

// Return transition duration of an element in millisecond
export function getTransitionDuration(el) {
  const duration =  window.getComputedStyle(el).getPropertyValue('transition-duration');
  return Math.round(parseFloat(duration)*1000);
}