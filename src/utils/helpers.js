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

export function addOnceEventListener (el, eventName, cb, options){
  const once = (event) => {
    cb(event);
    el.removeEventListener(eventName, once, options);
  };

  el.addEventListener(eventName, once, options);
}

export function getZIndex(el) {
  const index = window.getComputedStyle(el).getPropertyValue('z-index');
  if (!index) return getZIndex(el.parentNode);
  return index
}

export function convertToUnit (str, unit = 'px') {
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

export function upperFirst (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}