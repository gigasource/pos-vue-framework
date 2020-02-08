import _ from 'lodash'
import {ref, set} from '@vue/composition-api'

const cssLengthUnitList = ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'lh', 'rlh', 'vmin', 'vmax', '%']
const cssAngleUnitList = ['deg', 'grad', 'rad', 'turn']
export const cssDisplayList = ['none', 'block', 'inline', 'inline-block', 'flow', 'table', 'flex', 'grid', 'ruby']
export const cssPositionList = ['static', 'relative', 'absolute', 'fixed', 'sticky']
export const cssLineStyleList = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
export const cssFontFamilyList = [
    'Arial',
    'Roboto',
    'Times New Roman',
    'Times',
    'Courier New',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Comic Sans MS',
    'Candara',
    'Impact'
]
export const cssFontStyleList = ['Normal', 'Bold', 'Lighter', 'Bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900',]
export const effectList = [
  {
    value: 'dropShadow',
    text: 'Drop Shadow'
  },
  {
    value: 'innerShadow',
    text: 'Inner Shadow'
  },
  {
    value: 'layerBlur',
    text: 'Layer Blur'
  }
]
const reservedKeyList = ['width', 'height', 'top', 'left', 'bottom', 'right', 'display', 'position', 'borderRadius', 'backgroundColor', 'color', 'fontFamily', 'fontWeight', 'lineHeight', 'letterSpacing', 'borderColor', 'borderWidth', 'borderStyle', 'padding', 'margin', 'boxShadow', 'filter']

export class Length {
  constructor(value = 0, unit = 'px', defaultUnit = 'px', active = false, mode = 'short') {
    this._value = value
    this._unit = unit
    this._defaultUnit = defaultUnit
    this._active = active
    this._mode = mode
  }

  get value () {
    if (this._value instanceof Array) {
      return this._value.map((value, index) => `${value}${this._unit[index]}`)
    }
    else return `${this._value}${this._unit}`
  }

  set value (inputValue) {
    if (inputValue instanceof Object) {
      const input = parseLengthString(inputValue.string)
      set(this._value, inputValue.index, !isNaN(input.value) ? input.value : 0)
      set(this._unit, inputValue.index, cssLengthUnitList.includes(input.unit) ? input.unit : this._defaultUnit)
    } else {
      const input = parseLengthString(inputValue)
      this._value = !isNaN(input.value) ? input.value : 0
      this._unit = cssLengthUnitList.includes(input.unit) ? input.unit : this._defaultUnit
    }
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  get mode () {
    return this._mode
  }

  toggleMode () {
    if (this._mode === 'short') {
      this._mode = 'long'
      this._value = [this._value, this._value, this._value, this._value]
      this._unit = [this._unit, this._unit, this._unit, this._unit]
    } else {
      this._mode = 'short'
      this._value = this._value[0]
      this._unit = this._unit[0]
    }
  }

  toCSS () {
    return this._value instanceof Array ? this.value.join(' ') : this.value
  }
}

export class Angle {
  constructor(value, unit = 'deg', active = false, mode = 'short') {
    this._value = value
    this._unit = unit
    this._active = active
    this._mode = mode
  }

  get value () {
    return `${this._value}${this._unit}`
  }

  set value (string) {
    const input = parseLengthString(string)
    this._value = !isNaN(input.value) ? input.value : 0
    this._unit = cssAngleUnitList.includes(input.unit) ? input.unit : 'deg'
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  get mode () {
    return this._mode
  }

  toCSS () {
    return `rotate(${this.value})`
  }
}

export class Color {
  constructor(value, alpha = 1, active = false) {
    this._value = value
    this._alpha = alpha
    this._active = active
  }

  get value () {
    return this._value
  }

  set value (inputColor) {
    let color
    if (inputColor.angle) return
    else if (inputColor.value) {
      color = inputColor.value
    } else {
      color = inputColor
    }
    if (color.length === 7) {
      this._value = color
      this._alpha = 1
    } else if (color.length === 9) {
      this._value = color.substring(0, 7)
      const alpha = parseInt(`0x${color.substring(7, 9)}`) / 256
      this._alpha = alpha >= 1 ? 1 : alpha.toFixed(2)
    }
    this._active = true
  }

  get hex () {
    return this._value.replace(/^#/, '')
  }

  set hex (string) {
    this._value = `#${string}`
    this._active = true
  }

  get alpha () {
    return `${this._alpha * 100}%`
  }

  set alpha (string) {
    const alpha = parseFloat(string)
    this._alpha = !isNaN(alpha) ? alpha / 100 : 0
    this._active = true
  }

  get rgba () {
    const r = parseInt(`0x${this._value.substring(1, 3)}`)
    const g = parseInt(`0x${this._value.substring(3, 5)}`)
    const b = parseInt(`0x${this._value.substring(5, 7)}`)
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return `rgba(${r}, ${g}, ${b}, ${this._alpha})`
    }
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  toCSS () {
    return this.rgba
  }
}

export class Display {
  constructor(value = 'block', active = false) {
    this._value = value;
    this._active = active;
  }

  get value () {
    return this._value
  }

  set value (string) {
    this._value = cssDisplayList.includes(string) ? string : 'block'
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  toCSS () {
    return this.value
  }
}

export class Position {
  constructor(value = 'static', active = false) {
    this._value = value;
    this._active = active;
  }

  get value () {
    return this._value
  }

  set value (string) {
    this._value = cssPositionList.includes(string) ? string : 'static'
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  toCSS () {
    return this.value
  }
}

export class LineStyle {
  constructor(value = 'solid', active = false) {
    this._value = value
    this._active = active
  }

  get value () {
    return this._value
  }

  set value (string) {
    this._value = cssLineStyleList.includes(string) ? string : 'solid'
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  toCSS () {
    return this.value
  }
}

export class FontFamily {
  constructor(value = 'Roboto', active = false) {
    this._value = value
    this._active = active
  }

  get value () {
    return this._value
  }

  set value (string) {
    this._value = cssFontFamilyList.includes(string) ? string : 'Roboto'
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  toCSS() {
    return this.value
  }
}

export class FontWeight {
  constructor(value = 'normal', active = false) {
    this._value = value
    this._active = active
  }

  get value () {
    return this._value
  }

  set value (string) {
    this._value = cssFontStyleList.includes(string) ? string : 'normal'
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }

  toCSS () {
    return this._value.toLowerCase()
  }
}

export class Effect {
  constructor(type = 'dropShadow', shadowBlur = {value: 4}, layerBlur = {value: 4}, x= {value: 4}, y = {value : 4}, color = {value: '#000000', alpha: 0.25}, active= true) {
    this._type = type
    this.shadowBlur = new Length(..._.values(shadowBlur))
    this.layerBlur = new Length(..._.values(layerBlur))
    this.x = new Length(..._.values(x))
    this.y = new Length(..._.values(y))
    this.color = new Color(..._.values(color))
    this._active = active
  }

  get type () {
    return this._type
  }

  set type (string) {
    this._type = string
    this._active = true
  }

  get active () {
    return this.shadowBlur.active || this.layerBlur.active || this.x.active || this.y.active || this.color.active || this._active
  }

  set active (bool) {
    this.shadowBlur.active = Boolean(bool)
    this.layerBlur.active = Boolean(bool)
    this.x.active = Boolean(bool)
    this.y.active = Boolean(bool)
    this.color.active = Boolean(bool)
    this._active = Boolean(bool)
  }

  toCSS () {
    if (this._type === 'layerBlur') return `blur(${this.layerBlur.toCSS()})`
    else if (this._type === 'dropShadow') return `${this.x.toCSS()} ${this.y.toCSS()} ${this.shadowBlur.toCSS()} ${this.color.toCSS()}`
    else return `inset ${this.x.toCSS()} ${this.y.toCSS()} ${this.shadowBlur.toCSS()} ${this.color.toCSS()}`
  }
}

export class CustomProperty {
  constructor(key = '', value = '', active = true) {
    this._key = key
    this._value = value
    this._active = active
  }

  get key () {
    return this._key
  }

  set key (string) {
    this._key = !reservedKeyList.includes(string) ? string : ''
    this._active = true
  }

  get value () {
    return this._value
  }

  set value (string) {
    this._value = string
    this._active = true
  }

  get active () {
    return this._active
  }

  set active (bool) {
    this._active = Boolean(bool)
  }
}

function parseLengthString (string) {
  const value = parseFloat(string)
  const unit = string.match(/[a-zA-Z%]+/) && string.match(/[a-zA-Z%]+/)[0].toLowerCase()
  return {
    value: value,
    unit: unit
  }
}

