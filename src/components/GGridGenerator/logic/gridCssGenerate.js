import { joinRefArrayValue } from './utils';

/**
 * return grid area css style value
 * @param gridItem
 * @returns {string}
 */
export function generateGridAreaCss(gridItem) {
  return `${gridItem.area.rowStart} / ${gridItem.area.columnStart} / ${gridItem.area.rowEnd} / ${gridItem.area.columnEnd}`
}
/**
 * Generate css grid from grid data model
 * @param layout
 * @param uid
 * @param genOptions
 */
export function generateGridCSS(layout, uid, genOptions) {
  let output = ''

  let css = ''
  if (layout.area) css += `grid-area: ${generateGridAreaCss(layout)}; `
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
