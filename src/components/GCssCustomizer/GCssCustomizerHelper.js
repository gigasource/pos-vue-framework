import _ from 'lodash'
import { set } from '@vue/composition-api'

const cssLengthUnitList = ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'lh', 'rlh', 'vmin', 'vmax', '%']
const cssAngleUnitList = ['deg', 'grad', 'rad', 'turn']
export const cssLineStyleList = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']

export class Length {
  constructor(value = 0, unit = 'px', active = false, mode = 'short') {
    this._value = value
    this._unit = unit
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
      set(this._unit, inputValue.index, cssLengthUnitList.includes(input.unit) ? input.unit : 'px')
    } else {
      const input = parseLengthString(inputValue)
      this._value = !isNaN(input.value) ? input.value : 0
      this._unit = cssLengthUnitList.includes(input.unit) ? input.unit : 'px'
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
  constructor(value) {
    this._value = value
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

