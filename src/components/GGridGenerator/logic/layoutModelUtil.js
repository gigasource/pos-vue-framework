import _ from 'lodash'
import { ref, isRef } from '@vue/composition-api'
import { createRange } from '../../../utils/helpers'
import { generateRandomCssColor } from '../../../utils/colors';



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
 * Validate area name
 * @param areaName
 * @returns {boolean} true if area name contain only a-z, A-Z, 0-9, -, _. Otherwise, false.
 */
export function isAreaNameValid(areaName) {
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
export function createArea(undeterminedPointsArea) {
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
    bgColor: generateRandomCssColor(),
    area: createArea(area),
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

export function deleteArea(gridItem) {
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

