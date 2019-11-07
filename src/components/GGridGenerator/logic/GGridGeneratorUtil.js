import _ from 'lodash'
import { ref } from '@vue/composition-api'

export function joinRefArrayValue(refArray, separator = ' ') {
  let output = ''
  refArray.forEach(refVar => output += separator + refVar.value)
  return output
}

export function createEmptyArea() {
  return {
    name: '',
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
    newName = `${areaName}(${ctr})`
  }
  return newName
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
 * @param models
 */
export function generateGridCSS(models) {
  let output = ''
  if (!Array.isArray(models))
    models = [models]

  _.each(models, model => {
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
  grid-row-gap: ${model.settings.rowGap}px;`
    }

    output += `.${model.name} {
${css}
}
`
  })

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
      columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
      rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
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
