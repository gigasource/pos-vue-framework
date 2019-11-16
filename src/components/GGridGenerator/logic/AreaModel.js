import _ from 'lodash';
import { generateRandomCssColor } from '../../../utils/colors'
import { getCssArea, normalizeArea } from './utils';

export default class AreaModel {


  constructor({area, parent}) {
    this._parent = parent
    this._visible = true
    this._bgColor = generateRandomCssColor()
    if (area) {
      this.name = area.name
      this.setArea(area)
    } else {
      this.name = 'div'
      this.top = -1
      this.left = -1
      this.width = 0
      this.height = 0
    }
  }

  get name() { return this._name }
  set name(v) { this._name = v }

  get alignSelf() { return this._alignSelf }
  set alignSelf(value) { this._alignSelf = value }

  get justifySelf() { return this._justifySelf }
  set justifySelf(value) { this._justifySelf = value }

  get padding() { return this._padding }
  set padding(value) { this._padding = value }

  get margin() { return this._margin }
  set margin(val) { this._margin = val }

  get top() { return this._top }
  set top(val) { this._top = val }

  get left() { return this._left }
  set left(val) { this._left = val }

  get right() { return this._left + this._width }
  get bottom() { return this._top + this._height }

  get width() { return this._width }
  set width(val) { this._width = val }

  get height() { return this._height }
  set height(v) { this._height = v }

  get visible() { return this._visible }
  toggleVisible() { this._visible = !this._visible }

  isOverflowed() {
    return (
        // value <= 0 is consider as overflowed even though grid index allow negative index
           this.top <= 0
        || this.left <= 0
        // positive index value start from 0
        || this.bottom > this._parent.rows.length + 1
        || this.right > this._parent.columns.length + 1
    )
  }

  setArea(area) {
    const { rowStart, columnStart, rowEnd, columnEnd } =  normalizeArea(area)
    this.top = rowStart
    this.left = columnStart
    this.width = columnEnd - columnStart
    this.height = rowEnd - rowStart
  }

  get bgColor() { return this._bgColor }
  changeBgColor() { this._bgColor = generateRandomCssColor() }

  destroy() {
    let id = _.findIndex(this._parent.subAreas, area => area === this)
    this._parent.subAreas.splice(id, 1)
  }

  gridAreaCss() {
    return getCssArea({ rowStart: this.top, rowEnd: this.bottom, columnStart: this.left, columnEnd: this.right })
  }

  getFullCssModelName(uid) {
    if (this._parent == null) {
      return `.${this.name}[${uid}]`
    } else {
      return `${this.getFullCssModelName(this._parent, uid)}>.${this.name}`
    }
  }

  genAreaCss(genOptions) {
    let css = ''
    if (this.top) css += `grid-area: ${this.gridAreaCss()}; `
    if (this.justifySelf) css += `justify-self: ${this.justifySelf}; `
    if (this.alignSelf) css += `align-self: ${this.alignSelf}; `
    if (genOptions && genOptions.showBackgroundColor) css += `background: ${this.bgColor}; `
    return css
  }

  genCss(uid, genOptions) {
    return `.${this.getFullCssModelName(uid)} { ${this.genAreaCss(genOptions)} }`
  }
}
