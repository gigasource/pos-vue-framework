import _ from 'lodash'
import { ref } from '@vue/composition-api'
import { joinRefArrayValue } from './utils'
import { createRange } from '../../../utils/helpers'
import AreaModel from './AreaModel'

export default class GridModel extends AreaModel {
  constructor({area, parent}) {
    super({area, parent})
    // public field
    this.alignItems = ''
    this.alignContent = ''
    this.justifyItems = ''
    this.justifyContent = ''
    this.columns = createRange(5, () => ref('1fr'))
    this.rows = createRange(5, () => ref('1fr'))
    this.columnGap = 0
    this.rowGap = 0
    this.subAreas = []
  }

  toJSON() {
    const output = super.toJSON()
    output.alignItems = this.alignItems
    output.alignContent = this.alignContent
    output.justifyItems = this.justifyItems
    output.justifyContent = this.justifyContent
    output.columns = _.map(this.columns, refVal => refVal.value)
    output.rows = _.map(this.rows, refVal => refVal.value)
    output.columnGap = this.columnGap
    output.rowGap = this.rowGap
    output.subAreas = _.map(this.subAreas, subArea => subArea.toJSON())
    return output
  }

  // columns
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

    this._removeEmptyAreas()
  }
  setColumnUnit(index, val) {
    this.columns[index].value = val
  }
  setColumnNumbers(length) {
    this._adjustRowColNumbers(this.columns, length)
  }

  // rows
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

    this._removeEmptyAreas()
  }
  setRowUnit(index, val) {
    this.rows[index].value = val
  }
  setRowNumbers(length) {
    this._adjustRowColNumbers(this.rows, length)
  }

  _removeEmptyAreas() {
    let subAreaId = 0
    while(subAreaId< this.subAreas.length) {
      let area = this.subAreas[subAreaId]
      if (area.width === 0 || area.height === 0)
        area.destroy()
      else
        subAreaId++
    }


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

  /**
   * Validate area name
   * @param areaName
   * @returns {boolean} true if area name contain only a-z, A-Z, 0-9, -, _. Otherwise, false.
   */
  _isAreaNameValid(areaName) {
    return /^(\w|-)+$/i.test(areaName)
  }

  isSubAreaNameExisted(name) {
    return _.find(this.subAreas, subArea => subArea.name === name)
  }

  /**
   * Add sub grid item from selected area
   * @param area
   * @returns {boolean} true if area name is not valid
   */
  addSubGrid(area) {
    if (!this._isAreaNameValid(area.name))
      return false
    this.subAreas.push(new GridModel({parent: this, area}))
    return true
  }

  /**
   * Add sub item from selected area
   * @param area
   * @returns {boolean} true if area name is not valid
   */
  addSubItem(area) {
    if (!this._isAreaNameValid(area.name))
      return false
    this.subAreas.push(new AreaModel({area, parent: this}))
    return true
  }

  _genGridCss() {
    let gridCss = `display: grid; grid-template-columns: ${joinRefArrayValue(this.columns)}; grid-template-rows: ${joinRefArrayValue(this.rows)}; grid-gap: ${this.rowGap}px ${this.columnGap}px; `
    if (this.alignItems && !this.flexAlignItems) gridCss += `align-items: ${this.alignItems}; `
    if (this.alignContent && !this.flexAlignContent) gridCss += `align-content: ${this.alignContent}; `
    if (this.justifyItems) gridCss += `justify-items: ${this.justifyItems}; `
    if (this.justifyContent && !this.flexJustifyContent) gridCss += `justify-content: ${this.justifyContent}; `
    return gridCss
  }

  /**
   * generate css style
   * @param uid unique grid layout identity
   * @param genOptions showBackgroundColor
   * @returns {string} css style
   */
  genCss(uid, genOptions) {
    let mySubAreaCss = ''
    _.each(this.subAreas, subArea => mySubAreaCss += subArea.genCss(uid, genOptions) + '\r\n')
    return `.${this.getFullCssModelName(uid, genOptions)} { ${this.genAreaCss(genOptions)} ${this._genGridCss()} }` + '\r\n' + mySubAreaCss
  }
}
