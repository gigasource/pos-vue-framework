import _ from 'lodash'
// References: https://css-tricks.com/snippets/css/complete-guide-grid/
export const _gridItemOptions = ['', 'start', 'end', 'center', 'stretch']
export const _gridContentOptions = ['', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
export const _flexJustifyContentOptions = ['', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'start', 'end', 'left', 'right']
export const _flexAlignItemOptions = ['', "stretch" , "flex-start" , "flex-end" , "center" , "baseline" , "first baseline" , "last baseline" , "start" , "end" , "self-start" , "self-end"]
export const _flexAlignContentOptions = ['', "flex-start" , "flex-end" , "center" , "space-between" , "space-around" , "space-evenly" , "stretch" , 'start' , 'end' , "baseline" , 'first baseline' , "last baseline"]
export const _flexBasis = ['', 'auto', 'fill', 'max-content', 'min-content', 'fit-content', 'content', ]
export const _flexWraps = ['', 'nowrap' , 'wrap' , 'wrap-reverse']
export const _flexDirection = ['', 'row', 'column']
export const _flexAlignSelf = ["auto" , "flex-start" , "flex-end" , "center" , "baseline" , "stretch"]


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
 * An area created by 2 point. The position of these point is undetermined (top-left, top-right, bottom-left, bottom-right)
 * This method will convert an undetermined area to determined area which contain information of  top-left and bottom-right points
 * @param area
 * @returns {{columnEnd: number, columnStart: number, rowStart: number, rowEnd: number}}
 */
export function normalizeArea(area) {
  const rowStart = Math.min(area.rowStart, area.rowEnd) + 1
  const rowEnd = Math.max(area.rowStart, area.rowEnd) + 2
  const columnStart = Math.min(area.columnStart, area.columnEnd) + 1
  const columnEnd = Math.max(area.columnStart, area.columnEnd) + 2
  return {
    rowStart, rowEnd, columnStart, columnEnd
  }
}

export function getCssArea({rowStart, rowEnd, columnStart, columnEnd}) {
  return `${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`
}

export function getUniqueAreaName(name, subAreas) {
  const subItemNames = _.map(subAreas, subArea => subArea.name)
  let counter = 0
  let uniqueAreaName = name
  while(subItemNames.indexOf(uniqueAreaName) > -1) {
    counter++
    uniqueAreaName = `${name}${counter}`
  }
  return uniqueAreaName
}
