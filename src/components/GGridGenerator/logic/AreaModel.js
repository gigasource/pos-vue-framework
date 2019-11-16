import _ from 'lodash';
import { generateRandomCssColor } from '../../../utils/colors'
import { getCssArea, normalizeArea } from './utils';

export default class AreaModel {
  // public fields
  name = ''
  top = -1
  left = -1
  width = 0
  height = 0
  margin = ''
  padding = ''
  bgColor = generateRandomCssColor()
  alignSelf = ''
  justifySelf = ''

  constructor({area, parent}) {
    this._visible = true

    if (area) {
      this.name = area.name
      this.setArea(area)
    }

    if (parent) {
      this._parent = parent
    } else {
      this.name = 'app'
    }
  }

  get right() { return this.left + this.width }
  get bottom() { return this.top + this.height }
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

  changeBgColor() { this.bgColor = generateRandomCssColor() }

  destroy() {
    let id = _.findIndex(this._parent.subAreas, area => area === this)
    this._parent.subAreas.splice(id, 1)
  }

  gridAreaCss() {
    return getCssArea({
      rowStart: this.top,
      rowEnd: this.bottom,
      columnStart: this.left,
      columnEnd: this.right
    })
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
