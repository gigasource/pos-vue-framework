import _ from 'lodash'
import { ref } from '@vue/composition-api'
import { joinRefArrayValue } from './utils'
import { createRange } from '../../../utils/helpers'
import AreaModel from './AreaModel'

export default class GridModel extends AreaModel {
  constructor({area, parent}) {
    super({area, parent})
    this.columns = createRange(5, () => ref('1fr'))
    this.rows = createRange(5, () => ref('1fr'))
    this.columnGap = 0
    this.rowGap = 0
    this.subAreas = []
  }

  // columns
  get columns() { return this._columns }
  set columns(val) { this._columns = val }
  insertColumnLeft(index) {
    this.columns.splice(index, 0, ref('1fr'))
    _.each(this.subAreas, area => {
      if (area.left > index)
        area.left += 1
    })
  }
  insertColumnRight(index) {
    this.insertColumnLeft(index + 1)
  }
  deleteColumn(index) {
    if (index >= this.columns.length)
      return
    this.columns.splice(index, 1)
    _.each(this.subAreas, area => {
      if (area.right <= index + 1) {
        // ignore
      } else if (area.left > index + 1) {
        area.left -= 1
      } else {
        area.width -= 1
      }
    })
  }
  setColumnUnit(index, val) { this.columns[index].value = val}
  setColumnNumbers(length) {
    this._adjustRowColNumbers(this.columns, length)
  }

  // rows
  get rows() { return this._rows }
  set rows(val) { this._rows = val }
  insertRowAbove(index) {
    // add one new row from index
    this.rows.splice(index, 0, ref('1fr'))
    // adjust position of affected sub area
    _.each(this.subAreas, area => {
      if (area.top > index) {
        area.top += 1
      }
    })
  }
  insertRowBelow(index) {
    this.insertRowAbove(index + 1)
  }
  deleteRow(index) {
    this.rows.splice(index, 1)
    _.each(this.subAreas, area => {
      if (area.bottom <= index + 1) {
        // case 1: area above deleted row -> ignore
      } else if (area.top > index + 1) {
        // case 2: area below deleted row -> move above by reduce both rowStart, rowEnd 1 unit
        area.top -= 1
      } else {
        // case 3, 4, 5:
        // area part lie on deleted row
        // with these case, rowStart will be keep as it is, but the area height is reduced by 1
        // -> reduce rowEnd
        area.height -= 1
      }
    })
  }
  setRowUnit(index, val) { this.rows[index].value = val }
  setRowNumbers(length) {
    this._adjustRowColNumbers(this.rows, length)
  }

  _adjustRowColNumbers(targetArr, newLen) {
    const oldLen = targetArr.length
    if (oldLen < newLen) {
      const newCols = createRange(newLen - oldLen, () => ref('1fr'))
      targetArr.push.apply(targetArr, newCols)
    } else if (oldLen > newLen) {
      targetArr.splice(newLen, oldLen - newLen)
    }
  }

  get columnGap() { return this._columnGap }
  set columnGap(val) { this._columnGap = val }

  get rowGap() { return this._rowGap }
  set rowGap(val) { this._rowGap = val }

  // align-justify
  get alignItems() { return this._alignItems }
  set alignItems(v) { this._alignItems = v }
  get alignContent() { return this._alignContent }
  set alignContent(v) { this._alignContent = v }
  get justifyItems() { return this._justifyItems }
  set justifyItems(v) { this._justifyItems = v }
  get justifyContent() { return this._justifyContent }
  set justifyContent(v) { this._justifyContent = v }


  // sub area
  get subAreas() { return this._subAreas }
  set subAreas(v) { this._subAreas = v}

  /**
   * Validate area name
   * @param areaName
   * @returns {boolean} true if area name contain only a-z, A-Z, 0-9, -, _. Otherwise, false.
   */
  _isAreaNameValid(areaName) {
    return /^(\w|-)+$/i.test(areaName)
  }

  _getUniqueAreaName(name) {
    const subItemNames = _.map(this.subAreas, subArea => subArea.name)
    let counter = 0
    let uniqueAreaName = name
    while(subItemNames.indexOf(uniqueAreaName) > -1) {
      counter++
      uniqueAreaName = `${name}${counter}`
    }
    return uniqueAreaName
  }

  addSubGrid(area) {
    if (!this._isAreaNameValid(area.name))
      return false
    area.name = this._getUniqueAreaName(area.name)
    this.subAreas.push(new GridModel({parent: this, area}))
    return true
  }
  addSubItem(area) {
    if (!this._isAreaNameValid(area.name))
      return false
    area.name = this._getUniqueAreaName(area.name)
    this.subAreas.push(new AreaModel({area, parent: this}))
    return true
  }

  _genGridCss() {
    let gridCss = `display: grid; grid-template-columns: ${joinRefArrayValue(this.columns)}; grid-template-rows: ${joinRefArrayValue(this.rows)}; grid-gap: ${this.rowGap}px ${this.columnGap}px; `
    if (this.alignItems) gridCss += `align-items: ${this.alignItems}; `
    if (this.alignContent) gridCss += `align-content: ${this.alignContent}; `
    if (this.justifyItems) gridCss += `justify-items: ${this.justifyItems}; `
    if (this.justifyContent) gridCss += `justify-content: ${this.justifyContent}; `
    return gridCss
  }

  genCss(uid, genOptions) {
    let mySubAreaCss = ''
    _.each(this.subAreas, subArea => mySubAreaCss += subArea.genCss(uid, genOptions) + '\r\n')
    return `.${this.getFullCssModelName(uid)} { ${this.genAreaCss(genOptions)} ${this._genGridCss()} }` + '\r\n' + mySubAreaCss
  }
}
