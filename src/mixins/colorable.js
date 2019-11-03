/**
 * Check if color value is CSS color or not
 * by checking startWith: # | rgb( | rgba( | hsl( | hsla(
 * @param color {String | any} color value
 * @returns {boolean} true if input color is CSS color. Otherwise, false
 */
export /*public for test only*/ function isCssColor(color) {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

/**
 * Return true if data should be changed
 * @param color {any} color value
 * @param data {Object | any}
 * @returns {boolean}
 */

export /*public for test only*/ function shouldApplyColor(color, data) {
  if (typeof color !== 'string') return false
  if (data == null) return false
  if (typeof data !== 'object') return false
  if (Array.isArray(data)) return false
  if (typeof data.bgStyle === 'string') return false
  if (typeof data.class === 'string') return false
  return true
}

/**
 * Adding color for data object
 * @param color {String | any} CSS color or color name
 * @param data {object | undefined} plain object
 * @returns {*|{}} data
 *  - If data.bgStyle is string or data.class is string, return data without any modification
 *  - If color is CSS color, add 'background-color' & 'border-color' with value is color
 *  - If color is not CSS color, add [color] as property in data.class
 */
export function setBackgroundColor(color, data) {
  data = data || {}

  if (!shouldApplyColor(color, data))
    return data

  if (isCssColor(color)) {
    data.style = {
      ...data.bgStyle,
      'background-color': `${color}`,
      'border-color': `${color}`,
    }
  } else if (color) {
    data.class = {
      ...data.class,
      [color]: true,
    }
  }
  return data
}

/**
 * Set color for text
 * @param color {String} CSS color or color name
 * @param data {Object | undefined} plain object
 * @returns {*|{}}
 *  - If data.bgStyle is string or data.class is string, return data without any modification
 *  - If color is CSS color, add 'color' & 'caret-color' prop to data.bgStyle object with value is color value
 *  - If color is not CSS color (accepted color format is: "<colorName>" or "<colorName> <colorModifier>"):
 *    + <colorName>: add [<colorName>--text] property in data.class
 *    + <colorName> <colorModifier>: add [<colorName>--text] and [text--<colorModifier>] in data.class
 */
export function setTextColor(color, data) {
  data = data || {}

  if (!shouldApplyColor(color, data))
    return data

  if (isCssColor(color)) {
    data.style = {
      ...data.bgStyle,
      color: `${color}`,
      'caret-color': `${color}`,
    }
  } else if (color) {
    const [colorName, colorModifier] = color.toString().trim().split(' ', 2)
    data.class = {
      ...data.class,
      [colorName + '--text']: true,
    }
    if (colorModifier) {
      data.class['text--' + colorModifier] = true
    }
  }
  return data
}

export default {
  setBackgroundColor,
  setTextColor
}
