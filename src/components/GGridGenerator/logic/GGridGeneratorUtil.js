import _ from 'lodash'
import { ref } from '@vue/composition-api'
import { createRange } from '../../../utils/helpers';

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
 * Return an unique, valid area name
 * - Check if area name already existed in grids. If yes, add counter number
 * @param grids
 * @param areaName
 * @returns {string}
 */
export function getUniqueNewAreaName(grids, areaName) {
  let newName = areaName
  let ctr = 0
  while(isGridNameExisted(grids, newName)) {
    ctr++
    newName = `${areaName}${ctr}`
  }
  return newName
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
 * Return true if input name existed in grids
 * @param grids
 * @param name
 * @returns {boolean}
 */
export function isGridNameExisted(grids, name) {
  return _.findIndex(grids, grid =>  grid.name === name) >= 0
}

/**
 * Generate css grid from grid data model
 * @param model
 * @param uid
 */
export function generateGridCSS(model, uid) {
  let output = ''

  let css = ''
  if (model.area)
    css += `  grid-area: ${getGridAreaCss(model)};`

  if (model.settings) {
    css += model.area ? `
` : ''
    css +=
        `  display: grid;
  grid-template-columns: ${joinRefArrayValue(model.settings.columns)};
  grid-template-rows: ${joinRefArrayValue(model.settings.rows)};
  grid-column-gap: ${model.settings.columnGap}px;
  grid-row-gap: ${model.settings.rowGap}px;
  background: ${model.bgColor};
  `
  }

  output += `.${model.name}${uid !== ''? `[${uid}]`: ''} {
${css}
}
`
  _.each(model.subAreas, subArea => output += generateGridCSS(subArea, uid))

  return output
}

/**
 * return all area of selected grid
 * @param grids
 * @param selectedGridName
 * @returns {Array}
 */
export function getSelectedAreas(grids, selectedGridName) {
  let selectedGrid = _.find(grids, grid => grid.name === selectedGridName)
  if (selectedGrid)
    return selectedGrid.subAreas
  else
    return []
}

function createSingleItem(grids, parentGrid, area) {
  const rowStart = Math.min(area.rowStart, area.rowEnd) + 1
  const rowEnd = Math.max(area.rowStart, area.rowEnd) + 2
  const columnStart = Math.min(area.columnStart, area.columnEnd) + 1
  const columnEnd = Math.max(area.columnStart, area.columnEnd) + 2

  return {
    name: getUniqueNewAreaName(grids, area.name),
    parent: parentGrid,
    hide: false,
    bgColor: `hsl(${Math.round(Math.random() * 360)}, 100%, 50%, 50%)`,
    area: {
      rowStart,
      columnStart,
      rowEnd,
      columnEnd
    }
  }
}

function createSubGridItem(grids, parentGrid, area) {
  const singleItem = createSingleItem(grids, parentGrid, area)
  return {
    ...singleItem,
    settings: {
      columns: createRange(5, () => ref('1fr')),
      rows: createRange(5, () => ref('1fr')),
      columnGap: 0,
      rowGap: 0,
    },
    subAreas: []
  }
}

export function addSubGridArea(grids, targetGrid, area) {
  const subGrid = createSubGridItem(grids, targetGrid, area)
  grids.push(subGrid)
  targetGrid.subAreas.push(subGrid)
}

export function addSubItemArea(grids, targetGrid, area) {
  const subItem = createSingleItem(grids, targetGrid, area)
  grids.push(subItem)
  targetGrid.subAreas.push(subItem)
}

export function deleteGridItem(grids, gridItem) {
  // delete its children
  _.each(gridItem.subAreas || [], item => deleteGridItem(grids, item))

  // delete it from grids
  let id = _.findIndex(grids, item => item === gridItem)
  grids.splice(id, 1)

  // delete it from its parent
  let parent = gridItem.parent
  id = _.findIndex(parent.subAreas, subArea => subArea === gridItem)
  parent.subAreas.splice(id, 1)
}
