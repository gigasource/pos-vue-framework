import colorList from '../style/_colors.scss';
import {isCssColor} from '../mixins/colorable';
import _ from 'lodash'
import {chunk, padEnd} from './helpers'
import {toXYZ} from './transformSRGB'

export const colors = Object.freeze(_.pickBy(colorList, (val, key) => !key.startsWith('gradient-')));
export const gradientColors = Object.freeze(_.pickBy(colorList, (val, key) => key.startsWith('gradient-')));

export function linearGradient(colorArr, angle = 45) {
  if (!colorArr) {
    return
  }

  if (typeof colorArr === 'string') {
    colorArr = colorArr.split(',')
  }

  if (!!Number(+angle)) {
    angle = `${Number(angle)}deg`
  }

  return colorArr.length > 0 && colorArr.reduce((acc, curVal, index, arr) => {
    curVal = curVal.trim()

    if (!isCssColor(curVal)) {
      curVal = colors[curVal.trim().split(' ').join('-')];
    }
    if (index === arr.length - 1) {
      curVal = `${curVal})`;
    }
    return `${acc}, ${curVal}`;
  }, `linear-gradient(${angle}`);
}

export function getCssColor(color) {
  if (!color || isCssColor(color)) {
    return color
  }
  const materialColor =  colors[color.trim().split(' ').join('-')]
  if(materialColor) return materialColor
  return color
}

/**
 * Create random color
 * @returns {string}
 * @private
 */
export function generateRandomCssColor(opacity = '50%') {
  return `hsl(${Math.round(Math.random() * 360)}, 100%, 50%, ${opacity})`
}


/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param hsva HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */
export function HSVAtoRGBA(hsva) {
  const {h, s, v, a} = hsva
  const f = (n) => {
    const k = (n + (h / 60)) % 6
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255))

  return {r: rgb[0], g: rgb[1], b: rgb[2], a}
}

/**
 * Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color RGBA color as an array [0-255, 0-255, 0-255, 0-1]
 */
export function RGBAtoHSVA(rgba) {
  if (!rgba) return {h: 0, s: 1, v: 1, a: 1}

  const r = rgba.r / 255
  const g = rgba.g / 255
  const b = rgba.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0

  if (max !== min) {
    if (max === r) {
      h = 60 * ((g - b) / (max - min))
    } else if (max === g) {
      h = 60 * (2 + ((b - r) / (max - min)))
    } else if (max === b) {
      h = 60 * (4 + ((r - g) / (max - min)))
    }
  }

  if (h < 0) h = h + 360

  const s = max === 0 ? 0 : (max - min) / max
  const hsv = [h, s, max]

  return {h: hsv[0], s: hsv[1], v: hsv[2], a: rgba.a}
}

export function HSVAtoHSLA(hsva) {
  const {h, s, v, a} = hsva

  const l = v - (v * s / 2)

  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l)

  return {h, s: sprime, l, a}
}

export function HSLAtoHSVA(hsl) {
  const {h, s, l, a} = hsl

  const v = l + s * Math.min(l, 1 - l)

  const sprime = v === 0 ? 0 : 2 - (2 * l / v)

  return {h, s: sprime, v, a}
}

export function RGBAtoCSS(rgba) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
}

export function RGBtoCSS(rgba) {
  return RGBAtoCSS({...rgba, a: 1})
}

export function RGBAtoHex(rgba) {
  const toHex = (v) => {
    const h = Math.round(v).toString(16)
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase()
  }

  return `#${[
    toHex(rgba.r),
    toHex(rgba.g),
    toHex(rgba.b),
    toHex(Math.round(rgba.a * 255)),
  ].join('')}`
}

export function HexToRGBA(hex) {
  const rgba = chunk(hex.slice(1), 2).map((c) => parseInt(c, 16))

  return {
    r: rgba[0],
    g: rgba[1],
    b: rgba[2],
    a: Math.round((rgba[3] / 255) * 100) / 100,
  }
}

export function HexToHSVA(hex) {
  const rgb = HexToRGBA(hex)
  return RGBAtoHSVA(rgb)
}

export function HSVAtoHex(hsva) {
  return RGBAtoHex(HSVAtoRGBA(hsva))
}

export function parseHex(hex) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1)
  }

  hex = hex.replace(/([^0-9a-f])/gi, 'F')

  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('')
  }

  if (hex.length === 6) {
    hex = padEnd(hex, 8, 'F')
  } else {
    hex = padEnd(padEnd(hex, 6), 8, 'F')
  }

  return `#${hex}`.toUpperCase().substr(0, 9)
}

export function getHslColor(color) {
  let fakeDiv = document.createElement("div");
  fakeDiv.style.color = color;
  document.body.appendChild(fakeDiv);

  let cs = window.getComputedStyle(fakeDiv),
      pv = cs.getPropertyValue("color");

  document.body.removeChild(fakeDiv);
  let rgb = [], a = 1
  if(_.startsWith(pv, 'rgba')) {
    rgb = pv.substr(5).split(")")[0].split(",")
    a = rgb[3]
  } else
    rgb = pv.substr(4).split(")")[0].split(",")

  let r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  else if (cmax === g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {h, s, l, a}
}
