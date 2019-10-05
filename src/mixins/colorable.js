/**
 * Check if color value is CSS color or not
 * by checking startWith: # | rgb( | rgba( | hsl( | hsla(
 * @param color {String | any} color value
 * @returns {boolean} true if input color is CSS color. Otherwise, false
 */
function isCssColor(color) {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

/**
 * Adding color for data object
 * @param color {String} CSS color or color name
 * @param data {object | undefined} plain object
 * @returns {*|{}} data
 *  - If data is undefined, return {}
 *  - If data.style is string or data.class is string, return data without any modification
 *  - If color is CSS color, add 'background-color' & 'border-color' with value is color
 *  - If color is not CSS color, add [color] as property in data.class
 */
function setBackgroundColor(color, data) {
  data = data || {}
  if (typeof data.style === 'string') {
    // istanbul ignore next
    console.log('style must be an object', this)
    // istanbul ignore next
    return data
  }
  if (typeof data.class === 'string') {
    // istanbul ignore next
    console.log('class must be an object', this)
    // istanbul ignore next
    return data
  }
  if (isCssColor(color)) {
    data.style = {
      ...data.style,
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
 *  - If data is undefined, return {}
 *  - If data.style is string or data.class is string, return data without any modification
 *  - If color is CSS color, add 'color' & 'caret-color' prop to data.style object with value is color value
 *  - If color is not CSS color (accepted color format is: "<colorName>" or "<colorName> <colorModifier>"):
 *    + <colorName>: add [<colorName>--text] property in data.class
 *    + <colorName> <colorModifier>: add [<colorName>--text] and [text--<colorModifier>] in data.class
 */
function setTextColor(color, data) {
  data = data || {}
  if (typeof data.style === 'string') {
    // istanbul ignore next
    console.log('style must be an object', this)
    // istanbul ignore next
    return data
  }
  if (typeof data.class === 'string') {
    // istanbul ignore next
    console.log('class must be an object', this)
    // istanbul ignore next
    return data
  }
  if (isCssColor(color)) {
    data.style = {
      ...data.style,
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
