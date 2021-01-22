import { defineComponent } from 'vue'
import { computed, ref, watch, getCurrentInstance, withScopeId, h } from 'vue';

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
    if (color && (color.indexOf('rgb') === 0 || color.indexOf('hsl') === 0 || color.indexOf('#') === 0) || color === 'transparent' || color === 'currentColor') {
      return 'style';
    } else if (color) {
      return 'class';
    }
  }


  function convertColorClass(color, option) {
    if (color) {
      if (option === 'background') {
        color = 'bg ' + color;
      } else {
        color = 'text ' + color;
      }
      return color.split(' ').join('-');
    }
  }

  return {
    getColorType,
    convertColorClass
  }
};

export function createSimpleFunctional(c, el = 'div', name) {
  // negligible performance gain using functional components over stateful components in Vue 3
  return defineComponent({
    name: name || c.replace(/__/g, '-'),
    render() {
      return getScopeIdRender()(() =>
        h(el, { class: [c] }, this.$slots.default())
      )();
    },
  })
}

export function getInternalValue(props, context) {
  // text field internalValue
  const rawInternalValue = ref(props.modelValue);

  watch(() => props.modelValue, () => rawInternalValue.value = props.modelValue, { lazy: true });

  const internalValue = computed({
    get: () => rawInternalValue.value,
    set: (value) => {
      rawInternalValue.value = value;
      context.emit('update:modelValue', rawInternalValue.value)
    }
  });

  return internalValue;
}


export function createRange(length, mapFn) {
  const range = [...Array(length).keys()]
  if (mapFn) return range.map(mapFn)
  else return range
}

export function kebabCase(str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// Return transition duration of an element in millisecond
export function getTransitionDuration(el) {
  const duration = window.getComputedStyle(el).getPropertyValue('transition-duration');
  return Math.round(parseFloat(duration) * 1000);
}

export function openFile(options = { multiple: false, mimeType: '*/*' }, onFileOpened) {
  const input = document.createElement('input')
  input.type='file'
  input.accept = options.mimeType
  input.multiple = options.multiple
  input.addEventListener('change', e => {
    onFileOpened && onFileOpened(e.target.files)
  })
  input.click()
}

/**
 * Saving file
 * @param fileName
 * @param content
 * @param type
 */
export function saveFile(fileName, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click()
}

// Return rendered element position
export function getElementPosition(el) {
  const rect = el.getBoundingClientRect(),
    offsetX = window.scrollX || document.documentElement.scrollLeft,
    offsetY = window.scrollY || document.documentElement.scrollTop;
  return {
    top: rect.top + offsetY,
    left: rect.left + offsetX,
    bottom: rect.bottom + offsetY,
    right: rect.right + offsetX
  }
}
export function padEnd (str, length, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length))
}

export function chunk (str, size = 1) {
  const chunked = []
  let index = 0
  while (index < str.length) {
    chunked.push(str.substr(index, size))
    index += size
  }
  return chunked
}

export function getScopeIdRender() {
  const instance = getCurrentInstance();
  if (!instance) return withScopeId('');

  const { type } = instance;
  return withScopeId(type.__scopeId)
}
