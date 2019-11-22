import _ from 'lodash';
import { generateRandomCssColor } from '../../../utils/colors'
import { getCssArea, normalizeArea } from './utils';

export default class AreaModel {
  constructor({area, parent}) {
    this._visible = true
    // public fields
    this.name = ''
    this.top = -1
    this.left = -1
    this.width = 0
    this.height = 0
    this.margin = ''
    this.padding = ''
    this.bgColor = generateRandomCssColor()
    this.alignSelf = ''
    this.justifySelf = ''
    this.wrapInDiv = false

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

  toJSON() {
    return {
      name: this.name,
      top: this.top,
      left: this.left,
      width: this.width,
      height: this.height,
      margin: this.margin,
      padding: this.padding,
      bgColor: this.bgColor,
      alignSelf: this.alignSelf,
      justifySelf: this.justifySelf,
      wrapInDiv: this.wrapInDiv
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

  getFullCssModelName(uid, genOptions) {
    if (this._parent == null) {
      const uidAttr = (uid == null || uid == '') ? '' : `[${uid}]`
      return `${genOptions.prefix}${this.name}${uidAttr}`
    } else {
      return `${this._parent.getFullCssModelName(uid, genOptions)}>.${genOptions.prefix}${this.name}`
    }
  }

  genAreaCss(genOptions) {
    let css = ''
    if (this.top) css += `grid-area: ${this.gridAreaCss()}; `
    if (this.justifySelf) css += `justify-self: ${this.justifySelf}; `
    if (this.alignSelf) css += `align-self: ${this.alignSelf}; `
    if (this.padding) css += `padding: ${this.padding}; `
    if (this.margin) css += `margin: ${this.margin}; `
    if (genOptions && genOptions.showBackgroundColor) css += `background: ${this.bgColor}; `
    return css
  }

  genCss(uid, genOptions) {
    return `.${this.getFullCssModelName(uid, genOptions)} { ${this.genAreaCss(genOptions)} }`
  }
}
