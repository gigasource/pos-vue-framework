import _ from 'lodash'
import { ref } from '@vue/composition-api'
import { createRange } from '../../../utils/helpers';

// References: https://css-tricks.com/snippets/css/complete-guide-grid/
export const _gridItemOptions = ['', 'start', 'end', 'center', 'stretch']
export const _gridContentOptions = ['', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']

// update
export const changeAlignSelf = (grid, value) => { grid['align-self'] = value; console.log('set align self', value) }
export const changeAlignItems = (grid, value) => { grid['align-items'] = value; console.log('set align items', value) }
export const changeAlignContent = (grid, value) => { grid['align-content'] = value; console.log('set align content', value) }
export const changeJustifySelf = (grid, value) => { grid['justify-self'] = value; console.log('justify self', value) }
export const changeJustifyItems = (grid, value) => { grid['justify-items'] = value; console.log('justify-items', value) }
export const changeJustifyContent = (grid, value) => { grid['justify-content'] = value; }
// check
export const isActiveAlignSelf = (grid, value) => grid['align-self'] === value
export const isActiveAlignItems = (grid, value) => grid['align-items'] === value
export const isActiveAlignContent = (grid, value) => grid['align-content'] === value
export const isActiveJustifySelf = (grid, value)  => grid['justify-self'] === value
export const isActiveJustifyItems = (grid, value) => grid['justify-items'] === value
export const isActiveJustifyContent = (grid, value) => grid['justify-content'] === value

/**
 * Join ref string
 * @param refArray
 * @param separator
 * @returns {string}
 */
export function joinRefArrayValue(refArray, separator = ' ') {
  let output = ''
  refArray.forEach(refVar => output += separator + refVar.value)
  return output
}

/**
 * Return empty area object
 * @returns {{columnEnd: number, name: string, columnStart: number, rowStart: number, rowEnd: number}}
 */
export function createEmptyArea() {
  return {
    name: 'div',
    rowStart: -1,
    columnStart: -1,
    rowEnd: -1,
    columnEnd: -1
  }
}

/**
 * return grid area css style value
 * @param gridItem
 * @returns {string}
 */
export function getGridAreaCss(gridItem) {
  return `${gridItem.area.rowStart} / ${gridItem.area.columnStart} / ${gridItem.area.rowEnd} / ${gridItem.area.columnEnd}`
}

/**
 * Validate area name
 * @param areaName
 * @returns {boolean} true if area name contain only a-z, A-Z, 0-9, -, _. Otherwise, false.
 */
export function isGridAreaNameValid(areaName) {
  return /^(\w|-)+$/i.test(areaName)
}



/**
 * Return all grid/subgrid item
 * skip single item
 * @param gridItem
 * @returns {null}
 */
export function getGridList(gridItem) {
  let gridList = null
  if (gridItem.subAreas) {
    gridList = [gridItem]
    _.each(gridItem.subAreas, area => {
      gridList.push(...(getGridList(area) || []).filter(i => i != null))
    })
  }
  return gridList
}

/**
 * Convert undetermined points area to (top-left bottom-right) area
 *
 * @param undeterminedPointsArea
 * an area created by selecting 2 point which can be (top-left  bottom-right) pair or
 * (top-right bottom-left) pair
 * @returns {{columnEnd: number, columnStart: number, rowStart: number, rowEnd: number}}
 * an area which have determined points: (top-left bottom-right)
 * @private
 */
export function createGridArea(undeterminedPointsArea) {
  const rowStart = Math.min(undeterminedPointsArea.rowStart, undeterminedPointsArea.rowEnd) + 1
  const rowEnd = Math.max(undeterminedPointsArea.rowStart, undeterminedPointsArea.rowEnd) + 2
  const columnStart = Math.min(undeterminedPointsArea.columnStart, undeterminedPointsArea.columnEnd) + 1
  const columnEnd = Math.max(undeterminedPointsArea.columnStart, undeterminedPointsArea.columnEnd) + 2
  return {
    rowStart,
    columnStart,
    rowEnd,
    columnEnd
  }
}

/**
 * Create random color
 * @returns {string}
 * @private
 */
export function generateRandomColor() {
  return `hsl(${Math.round(Math.random() * 360)}, 100%, 50%, 50%)`
}

export function _getUniqueAreaName(parentGrid, name) {
  const subItemNames = _.map(parentGrid.subAreas, subArea => subArea.name)
  let counter = 0
  let uniqueAreaName = name
  while(subItemNames.indexOf(uniqueAreaName) > -1) {
    counter++
    uniqueAreaName = `${name}${counter}`
  }
  return uniqueAreaName
}

export function _createSingleItem(parentGrid, area) {
  return {
    name: _getUniqueAreaName(parentGrid, area.name),
    parent: parentGrid,
    hide: false,
    bgColor: generateRandomColor(),
    area: createGridArea(area),
    // hard code
    'justify-self': '',
    'align-self': ''
  }
}

export function _createSubGridItem(parentGrid, area) {
  const singleItem = _createSingleItem(parentGrid, area)
  return {
    ...singleItem,
    columns: createRange(5, () => ref('1fr')),
    rows: createRange(5, () => ref('1fr')),
    columnGap: 0,
    rowGap: 0,
    'align-items': '',
    'align-content': '',
    'justify-items': '',
    'justify-content': '',
    subAreas: []
  }
}

export function addSubGridArea(targetGrid, area) {
  const subGrid = _createSubGridItem(targetGrid, area)
  targetGrid.subAreas.push(subGrid)
}

export function addSubItemArea(targetGrid, area) {
  const subItem = _createSingleItem(targetGrid, area)
  targetGrid.subAreas.push(subItem)
}

export function deleteGridItem(gridItem) {
  // delete it from its parent
  let parent = gridItem.parent
  let id = _.findIndex(parent.subAreas, subArea => subArea === gridItem)
  parent.subAreas.splice(id, 1)
}

export function isAreaOverflowed(gridItem) {
  return (
    // value <= 0 is consider as overflowed even though grid index allow negative index
       gridItem.area.rowStart <= 0
    || gridItem.area.columnStart <= 0
    // positive index value start from 0
    || gridItem.area.rowEnd > gridItem.parent.rows.length + 1
    || gridItem.area.columnEnd > gridItem.parent.columns.length + 1
  )
}

export function adjustRowColNumbers(targetArr, newLen) {
  const oldLen = targetArr.length
  if (oldLen < newLen) {
    const newCols = createRange(newLen - oldLen, () => ref('1fr'))
    targetArr.push.apply(targetArr, newCols)
  } else if (oldLen > newLen) {
    targetArr.splice(newLen, oldLen - newLen)
  }
}

//// Insert & delete
/**
 *
 * @param grid
 * @param index start from 0
 */
export function insertRowAbove(grid, index) {
  // add one new row from index
  grid.rows.splice(index, 0, ref('1fr'))
  // adjust position of affected sub area
  _.each(grid.subAreas, subArea => {
    // affected sub area are an area which have:
    //    rowStart >= index start from 1
    // or rowStart >= index start from 0 + 1
    // or rowStart >  index start from 0
    // area.rowStart is starting from 1
    if (subArea.area.rowStart > index) {
      subArea.area = {
        ...subArea.area,
        rowStart: subArea.area.rowStart + 1,
        rowEnd: subArea.area.rowEnd + 1
      }
    }
  })
}

export function insertRowBelow(grid, index) {
  insertRowAbove(grid, index + 1)
}

export function insertColumnLeft(grid, index) {
  grid.columns.splice(index, 0, ref('1fr'))

  _.each(grid.subAreas, subArea => {
    if (subArea.area.columnStart > index) {
      subArea.area = {
        ...subArea.area,
        columnStart: subArea.area.columnStart + 1,
        columnEnd: subArea.area.columnEnd + 1
      }
    }
  })
}

export function insertColumnRight(grid, index) {
  insertColumnLeft(grid, index + 1)
}

/**
 * delete grid row, change area
 * +--------------------------------------+
 * |   +---+   +---+  +---+               |
 * |   | 1 |   | 4 |  | 5 |               |
 * |   +---+   |---|  |---|               |
 * |///////////|///|//|///|/+---+/////////|
 * |///////////|///|//|///|/| 3 |/////////|
 * |           +---+  |---| |---|  +---+  |
 * |                  |   | |   |  | 2 |  |
 * |                  +---+ +---+  +---+  |
 * +--------------------------------------+
 * @param grid
 * @param index
 */

export function deleteRow(grid, index) {
  grid.rows.splice(index, 1)
  _.each(grid.subAreas, subArea => {
    if (subArea.area.rowEnd <= index + 1) {
      // case 1: area above deleted row -> ignore
    } else if (subArea.area.rowStart > index + 1) {
      // case 2: area below deleted row -> move above by reduce both rowStart, rowEnd 1 unit
      subArea.area = {
        ...subArea.area,
        rowStart: subArea.area.rowStart - 1,
        rowEnd: subArea.area.rowEnd - 1
      }
    } else {
      // case 3, 4, 5:
      // area part lie on deleted row
      // with these case, rowStart will be keep as it is, but the area height is reduced by 1
      // -> reduce rowEnd
      subArea.area = {
        ...subArea.area,
        rowEnd: subArea.area.rowEnd - 1
      }
    }
  })
}

/**
 * Delete column, logic similar to delete row
 * @param grid
 * @param index
 */
export function deleteColumn(grid, index) {
  grid.columns.splice(index, 1)
  _.each(grid.subAreas, subArea => {
    if (subArea.area.columnEnd <= index + 1) {
      // ignore
    } else if (subArea.area.columnStart > index + 1) {
      subArea.area = {
        ...subArea.area,
        columnStart: subArea.area.columnStart - 1,
        columnEnd: subArea.area.columnEnd - 1
      }
    } else {
      subArea.area = {
        ...subArea.area,
        columnEnd: subArea.area.columnEnd - 1
      }
    }
  })
}


//// generate output/export json
/**
 * Generate css grid from grid data model
 * @param layout
 * @param uid
 * @param genOptions
 */
export function generateGridCSS(layout, uid, genOptions) {
  let output = ''

  let css = ''
  if (layout.area) css += `grid-area: ${getGridAreaCss(layout)}; `
  if (layout['justify-self']) css += `justify-self: ${layout['justify-self']}; `
  if (layout['align-self']) css += `align-self: ${layout['align-self']}; `
  if (genOptions && genOptions.showBackgroundColor) css += `background: ${layout.bgColor}; `

  if (layout.subAreas) {
    css += `display: grid; grid-template-columns: ${joinRefArrayValue(layout.columns)}; grid-template-rows: ${joinRefArrayValue(layout.rows)}; grid-gap: ${layout.rowGap}px ${layout.columnGap}px; `
    if (layout['align-items']) css += `align-items: ${layout['align-items']}; `
    if (layout['align-content']) css += `align-content: ${layout['align-content']}; `
    if (layout['justify-items']) css += `justify-items: ${layout['justify-items']}; `
    if (layout['justify-content']) css += `justify-content: ${layout['justify-content']}; `
  }

  output += `${_getFullCssModelName(layout, uid)} { ${css} }`
  _.each(layout.subAreas, subArea => output = output + '\r\n' + generateGridCSS(subArea, uid, genOptions))
  return output
}

export function _getFullCssModelName(layout, uid) {
  if (layout.parent == null) {
    return `.${layout.name}[${uid}]`
  } else {
    return `${_getFullCssModelName(layout.parent, uid)}>.${layout.name}`
  }
}

//// import/export layout as json
// add parent for layout
function _attachParent(layout, parentLayout) {
  if (parentLayout)
    layout.parent = parentLayout
  _.each(layout.subAreas, subArea => _attachParent(subArea, layout))
}

/**
 * Create Layout object from json
 * @param jsonLayout
 * @returns {any}
 */
export function parseLayoutJson(jsonLayout) {
  const jsonParseReviver = (k, v) => {
    // wrap ref
    if (k === 'rows' || k === 'columns')
      return _.map(v, vItem => ref(vItem))
    else
      return v
  }
  const layout = JSON.parse(jsonLayout, jsonParseReviver)
  _attachParent(layout, null)
  return layout
}

/**
 * Generate JSON from layout object
 * @param layout
 * @returns {string}
 */
export function generateLayoutJson(layout) {
  return JSON.stringify(layout, (k, v) => {
    // ignore circular references
    if (k === 'parent')
      return

    // unwrap ref
    if (k === 'rows' || k === 'columns')
      return _.map(v, vItem => vItem.value)

    // normal data, return directly
    return v
  })
}
