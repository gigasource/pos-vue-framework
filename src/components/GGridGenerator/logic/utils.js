import _ from 'lodash'
// References: https://css-tricks.com/snippets/css/complete-guide-grid/
export const _gridItemOptions = ['', 'start', 'end', 'center', 'stretch']
export const _gridContentOptions = ['', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']


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

