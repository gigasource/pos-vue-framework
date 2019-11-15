import { createRange } from '../../../utils/helpers';
import { ref } from '@vue/composition-api';
import _ from 'lodash';

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
