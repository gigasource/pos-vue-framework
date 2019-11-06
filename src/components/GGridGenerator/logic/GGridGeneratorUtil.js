import _ from 'lodash'


export function joinRefArrayValue(refArray, separator = ' ') {
  let output = ''
  refArray.forEach(refVar => output += separator + refVar.value)
  return output
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
 * Get sub area of target grid
 * @param grids
 * @param targetGrid
 * @returns {Array}
 */
export function getSubItems(grids, targetGrid) {
  return _.filter(grids, grid => {
    // skip itself
    if (grid === targetGrid) return false
    // for example: targetGrid's name is 'main'
    // an item which have name main__header should be consider as grid's area
    // an item which have the name is main__header__logo should not be consider as grid's area
    const remainNameWithoutTargetName = grid.name.substr(targetGrid.name.length)
    const nameParts = remainNameWithoutTargetName.split('__')
    return nameParts[0] === '' && nameParts.length === 2
  })
}

/**
 * Return an unique, valid area name
 * - Check if area name already existed in grids. If yes, add counter number
 * @param grids
 * @param grid
 * @param areaName
 * @returns {string}
 */
export function getUniqueNewAreaFullName(grids, grid, areaName) {
  const fullAreaName = `${grid.name}__${areaName}`
  let newName = fullAreaName
  let ctr = 0
  while(isGridNameExisted(grids, newName)) {
    ctr++
    newName = `${fullAreaName}(${ctr})`
  }
  return newName
}

export function getAreaNameFromFullName(fullName) {
  const nameParts = fullName.split('__')
  return nameParts[nameParts.length - 1]
}

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
