// Created at 2019-11-11 09:35 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin, { ref, isRef } from '@vue/composition-api'
import _ from 'lodash'
import {
  _createSingleItem, _createSubGridItem, addSubGridArea, addSubItemArea, adjustRowColNumbers,
  createEmptyArea, deleteColumn, deleteGridItem, deleteRow,
  getFullCssModelName,
  getGridAreaCss, getGridList, insertColumnLeft, insertColumnRight, insertRowAbove, insertRowBelow, isAreaOverflowed,
  isGridAreaNameValid,
  joinRefArrayValue
} from '../GGridGeneratorUtil'
import { createRange } from '../../../../utils/helpers';

describe('/GGridGeneratorUtil', () => {
  createLocalVue().use(plugin)

  describe('joinRefArrayValue', () => {
    it('Should join the ref value array', () => {
      const refArray = [ref('1px'), ref('solid'), ref('black')]
      expect(joinRefArrayValue(refArray, ' ')).toEqual(' 1px solid black')
    })
  })

  describe('createEmptyArea', () => {
    it('Should create emtpy area as expected', () => {
      expect(createEmptyArea()).toEqual({
        name: 'div',
        rowStart: -1,
        columnStart: -1,
        rowEnd: -1,
        columnEnd: -1
      })
    })
  })

  describe('getGridAreaCss', () => {
    it('Should return grid area css value', () => {
      expect(getGridAreaCss({
        area: {
          rowStart: 5,
          columnStart: 3,
          rowEnd: 8,
          columnEnd: 9
        }
      })).toBe('5 / 3 / 8 / 9')
    })
  })

  describe('isGridAreaNameValid', () => {
    it('Should pass the test if input contain only word and - character', () => {
      expect(isGridAreaNameValid('abcd')).toBe(true)
      expect(isGridAreaNameValid('abcd_')).toBe(true)
      expect(isGridAreaNameValid('_abcd_')).toBe(true)
      expect(isGridAreaNameValid('_abcd-')).toBe(true)
      expect(isGridAreaNameValid('09-')).toBe(true)
      expect(isGridAreaNameValid('_09-')).toBe(true)

    })

    it('Should fail the test if input contain non (word and -) character', () => {
      expect(isGridAreaNameValid('')).toBe(false)
      expect(isGridAreaNameValid('~!#$%^&*()')).toBe(false)
    })
  })

  describe('getFullCssModelName', () => {
    it('Should return full Css mode name as expected', () => {
      const root = { name: 'root' }
      const header = { name: 'header' }
      root.subAreas = [header]
      header.parent = root

      expect(getFullCssModelName(root)).toBe('.root[undefined]')
      expect(getFullCssModelName(root, 'g-layout-0')).toBe('.root[g-layout-0]')
      expect(getFullCssModelName(header, 'g-layout-1')).toBe('.root[g-layout-1]>.header')
    })
  })

  describe('getGridList', () => {
    it('Should return all items which are grid/sub-grid', () => {
      const root = { name: 'root' }

      //
      const head = { name: 'head' }
      const headLogo = { name: 'headLogo' }
      const headTitle = { name: 'headTitle' }
      head.subAreas = [headLogo, headTitle]
      headLogo.parent = head
      headTitle.parent = head

      //
      const body = { name: 'body' }
      const bodySidbar = { name: 'bodySidbar' }
      const bodyContent = { name: 'bodyContent' }
      body.subAreas = [bodySidbar, bodyContent]
      bodySidbar.parent = body
      bodyContent.parent = body

      //
      const footer = { name: 'footer' }
      const footerAddress = { name: 'footerAddress' }
      const footerReferences = { name: 'footerRefers' }
      footer.subAreas = [footerAddress, footerReferences]
      footerAddress.parent = footer
      footerReferences.parent = footer

      //
      root.subAreas = [head, body, footer]
      head.parent = root
      body.parent = root
      footer.parent = root

      expect(getGridList(root)).toEqual([root, head, body, footer])
    })
  })

  describe('_creatSingleItem', () => {
    it('Should create an single item object', () => {
      const parent = { name: 'root' }
      // An area rowStart, rowEnd, columnStart, columnEnd: index of row (not index of line)
      // So this value
      const area = { name: 'head', rowStart: 1, rowEnd: 1, columnStart: 3, columnEnd: 2 }
      let orgRandom = Math.random
      Math.random = jest.fn(() => 1)

      expect(_createSingleItem(parent, area)).toEqual({
        name: 'head',
        parent: parent,
        hide: false,
        bgColor: 'hsl(360, 100%, 50%, 50%)',
        area: {
          rowStart: 2,
          columnStart: 3,
          rowEnd: 3,
          columnEnd: 5
        }
      })

      Math.random = orgRandom
    })
  })

  describe('_createSubGridItem', () => {
    it('Should create an sub grid item object', () => {
      const parent = { name: 'root' }
      // An area rowStart, rowEnd, columnStart, columnEnd: index of row (not index of line)
      // So this value
      const area = { name: 'head', rowStart: 1, rowEnd: 1, columnStart: 3, columnEnd: 2 }
      let orgRandom = Math.random
      Math.random = jest.fn(() => 0.5)

      expect(_createSubGridItem(parent, area)).toEqual({
        name: 'head',
        parent: parent,
        hide: false,
        bgColor: 'hsl(180, 100%, 50%, 50%)',
        area: {
          rowStart: 2,
          columnStart: 3,
          rowEnd: 3,
          columnEnd: 5
        },
        settings: {
          columns: createRange(5, () => ref('1fr')),
          rows: createRange(5, () => ref('1fr')),
          columnGap: 0,
          rowGap: 0,
        },
        subAreas: []
      })

      Math.random = orgRandom
    })
  })

  it('addSubGridArea', () => {
    // suppose parent contain 2 subAreas, now we'll check whether
    // new area will be added to the end or not
    const parent = { name: 'root', subAreas: [] }
    // An area rowStart, rowEnd, columnStart, columnEnd: index of row (not index of line)
    // So this value
    const area = { name: 'head', rowStart: 1, rowEnd: 1, columnStart: 3, columnEnd: 2 }
    let orgRandom = Math.random
    Math.random = jest.fn(() => 0.5)
    addSubGridArea(parent, area)

    expect(parent.subAreas[0]).toEqual({
      name: 'head',
      parent: parent,
      hide: false,
      bgColor: 'hsl(180, 100%, 50%, 50%)',
      area: {
        rowStart: 2,
        columnStart: 3,
        rowEnd: 3,
        columnEnd: 5
      },
      settings: {
        columns: createRange(5, () => ref('1fr')),
        rows: createRange(5, () => ref('1fr')),
        columnGap: 0,
        rowGap: 0,
      },
      subAreas: []
    })

    Math.random = orgRandom
  })

  it('addSubItemArea', () => {
    // suppose parent contain 2 subAreas, now we'll check whether
    // new area will be added to the end or not
    const parent = { name: 'root', subAreas: [] }
    // An area rowStart, rowEnd, columnStart, columnEnd: index of row (not index of line)
    // So this value
    const area = { name: 'head', rowStart: 1, rowEnd: 1, columnStart: 3, columnEnd: 2 }
    let orgRandom = Math.random
    Math.random = jest.fn(() => 0.5)
    addSubItemArea(parent, area)

    expect(parent.subAreas[0]).toEqual({
      name: 'head',
      parent: parent,
      hide: false,
      bgColor: 'hsl(180, 100%, 50%, 50%)',
      area: {
        rowStart: 2,
        columnStart: 3,
        rowEnd: 3,
        columnEnd: 5
      }
    })

    Math.random = orgRandom
  })

  it('deleteGridItem', () => {
    const child = {
      name: 'head',
      hide: false,
      bgColor: 'hsl(180, 100%, 50%, 50%)',
      area: {
        rowStart: 2,
        columnStart: 3,
        rowEnd: 3,
        columnEnd: 5
      }
    }
    const parent = { name: 'root', subAreas: [null, null, child] }
    child.parent = parent

    deleteGridItem(child)

    for (let i = 0; i < parent.subAreas.length; ++i) {
      expect(parent.subAreas[i] != child).toBe(true)
    }
  })

  it('isAreaOverflowed', () => {
    const child = {
      name: 'head',
      hide: false,
      bgColor: 'hsl(180, 100%, 50%, 50%)',
      area: {
        rowStart: 1,
        columnStart: 3,
        rowEnd: 3,
        columnEnd: 3
      }
    }
    const child1 = {
      area: {
        rowStart: 1,
        columnStart: 0,
        rowEnd: 3,
        columnEnd: 5
      }
    }
    const child2 = {
      area: {
        rowStart: 1,
        columnStart: 3,
        rowEnd: 5,
        columnEnd: 5
      }
    }
    const child3 = {
      area: {
        rowStart: 1,
        columnStart: 3,
        rowEnd: 3,
        columnEnd: 5
      }
    }
    const child4 = {
      area: {
        rowStart: 1,
        columnStart: 3,
        rowEnd: 3,
        columnEnd: 5
      }
    }
    const parent = {
      subAreas: [child, child1, child2, child3, child4], settings: {
        columns: ['50px', '50px', '50px'],
        rows: ['50px', '50px', '50px'],
        columnGap: 0,
        rowGap: 0
      }
    }
    child.parent = parent
    child1.parent = parent
    child2.parent = parent
    child3.parent = parent
    child4.parent = parent

    expect(isAreaOverflowed(child)).toBe(false)
    expect(isAreaOverflowed(child1)).toBe(true)
    expect(isAreaOverflowed(child2)).toBe(true)
    expect(isAreaOverflowed(child3)).toBe(true)
    expect(isAreaOverflowed(child4)).toBe(true)


  })

  describe('adjustRowColNumbers', () => {
    it('Add extra ref 1fr to an array', () => {
      const newLen = 3
      const output = [ref('1fr')]
      adjustRowColNumbers(output, newLen)
      for (let i = 0; i < newLen; ++i) {
        expect(isRef(output[i])).toBe(true)
        expect(output[i].value).toBe('1fr')
      }
    })

    it('Cut end part of array', () => {
      const newLen = 3
      const output = [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')]
      adjustRowColNumbers(output, newLen)
      expect(output.length).toBe(newLen)

      for (let i = 0; i < newLen; ++i) {
        expect(isRef(output[i])).toBe(true)
        expect(output[i].value).toBe('1fr')
      }
    })
  })

  it('insertRowAbove', () => {
    const model = {
      settings: {
        rows: [ref('10px'), ref('20px'), ref('1fr')]
      },
      subAreas: [
        { area: { rowStart: 1, rowEnd: 2 } }, // case 1
        { area: { rowStart: 2, rowEnd: 3 } }, // case 2
        { area: { rowStart: 3, rowEnd: 4 } }, // case 3
      ]
    }

    insertRowAbove(model, 1)

    // new row unit added to settings.rows
    expect(_.map(model.settings.rows, rowRef => rowRef.value)).toEqual(['10px', '1fr', '20px', '1fr'])
    // adjust area location for any area which have rowStart > index
    // case 1: doesn't affected
    expect(model.subAreas[0].area.rowStart).toBe(1)
    expect(model.subAreas[0].area.rowEnd).toBe(2)
    // case 2: equal with inserted line
    expect(model.subAreas[1].area.rowStart).toBe(3)
    expect(model.subAreas[1].area.rowEnd).toBe(4)
    // case 3: lie below inserted line
    expect(model.subAreas[2].area.rowStart).toBe(4)
    expect(model.subAreas[2].area.rowEnd).toBe(5)
  })

  it('insertRowBelow', () => {
    const model = {
      settings: {
        rows: [ref('10px'), ref('20px'), ref('1fr')]
      },
      subAreas: [
        { area: { rowStart: 1, rowEnd: 2 } }, // case 1
        { area: { rowStart: 2, rowEnd: 3 } }, // case 2
        { area: { rowStart: 3, rowEnd: 4 } }, // case 3
      ]
    }

    insertRowBelow(model, 1)

    // new row unit added to settings.rows
    expect(_.map(model.settings.rows, rowRef => rowRef.value)).toEqual(['10px', '20px', '1fr', '1fr'])
    // adjust area location for any area which have rowStart > index
    // case 1: doesn't affected
    expect(model.subAreas[0].area.rowStart).toBe(1)
    expect(model.subAreas[0].area.rowEnd).toBe(2)
    // case 2: equal with inserted line
    expect(model.subAreas[1].area.rowStart).toBe(2)
    expect(model.subAreas[1].area.rowEnd).toBe(3)
    // case 3: lie below inserted line
    expect(model.subAreas[2].area.rowStart).toBe(4)
    expect(model.subAreas[2].area.rowEnd).toBe(5)
  })

  it('insertColumnLeft', () => {
    const model = {
      settings: {
        columns: [ref('10px'), ref('20px'), ref('1fr')]
      },
      subAreas: [
        { area: { columnStart: 1, columnEnd: 2 } }, // case 1
        { area: { columnStart: 2, columnEnd: 3 } }, // case 2
        { area: { columnStart: 3, columnEnd: 4 } }, // case 3
      ]
    }

    insertColumnLeft(model, 1)

    // new row unit added to settings.rows
    expect(_.map(model.settings.columns, colRef => colRef.value)).toEqual(['10px', '1fr', '20px', '1fr'])
    // case 1: column before inserted column
    expect(model.subAreas[0].area.columnStart).toBe(1)
    expect(model.subAreas[0].area.columnEnd).toBe(2)
    // case 2: equal with inserted column
    expect(model.subAreas[1].area.columnStart).toBe(3)
    expect(model.subAreas[1].area.columnEnd).toBe(4)
    // case 3: column after inserted column
    expect(model.subAreas[2].area.columnStart).toBe(4)
    expect(model.subAreas[2].area.columnEnd).toBe(5)
  })

  it('insertColumnRight', () => {
    const model = {
      settings: {
        columns: [ref('10px'), ref('20px'), ref('1fr')]
      },
      subAreas: [
        { area: { columnStart: 1, columnEnd: 2 } }, // case 1
        { area: { columnStart: 2, columnEnd: 3 } }, // case 2
        { area: { columnStart: 3, columnEnd: 4 } }, // case 3
      ]
    }

    insertColumnRight(model, 1)

    // new row unit added to settings.rows
    expect(_.map(model.settings.columns, colRef => colRef.value)).toEqual(['10px', '20px', '1fr', '1fr'])
    expect(model.subAreas[0].area.columnStart).toBe(1)
    expect(model.subAreas[0].area.columnEnd).toBe(2)
    expect(model.subAreas[1].area.columnStart).toBe(2)
    expect(model.subAreas[1].area.columnEnd).toBe(3)
    expect(model.subAreas[2].area.columnStart).toBe(4)
    expect(model.subAreas[2].area.columnEnd).toBe(5)
  })

  it('deleteRow', () => {
    const model = {
      settings: {
        rows: [ref('10px'), ref('20px'), ref('1fr')]
      },
      subAreas: [
        { area: { rowStart: 1, rowEnd: 2 } }, // case 1
        { area: { rowStart: 2, rowEnd: 3 } }, // case 2
        { area: { rowStart: 3, rowEnd: 4 } }, // case 3
      ]
    }
    deleteRow(model, 1)
    expect(_.map(model.settings.rows, rowRef => rowRef.value)).toEqual(['10px', '1fr'])
    // adjust area location for any area which have rowStart > index
    // case 1: doesn't affected
    expect(model.subAreas[0].area.rowStart).toBe(1)
    expect(model.subAreas[0].area.rowEnd).toBe(2)
    // case 2: technically removed
    expect(model.subAreas[1].area.rowStart).toBe(2)
    expect(model.subAreas[1].area.rowEnd).toBe(2)
    // case 3: jump to above line
    expect(model.subAreas[2].area.rowStart).toBe(2)
    expect(model.subAreas[2].area.rowEnd).toBe(3)
  })

  it('deleteColumn', () => {
    const model = {
      settings: {
        columns: [ref('10px'), ref('20px'), ref('1fr')]
      },
      subAreas: [
        { area: { columnStart: 1, columnEnd: 2 } }, // case 1
        { area: { columnStart: 2, columnEnd: 3 } }, // case 2
        { area: { columnStart: 3, columnEnd: 4 } }, // case 3
      ]
    }
    deleteColumn(model, 1)
    expect(_.map(model.settings.columns, colRef => colRef.value)).toEqual(['10px', '1fr'])
    // adjust area location for any area which have rowStart > index
    // case 1: doesn't affected
    expect(model.subAreas[0].area.columnStart).toBe(1)
    expect(model.subAreas[0].area.columnEnd).toBe(2)
    // case 2: technically removed
    expect(model.subAreas[1].area.columnStart).toBe(2)
    expect(model.subAreas[1].area.columnEnd).toBe(2)
    // case 3: jump to above line
    expect(model.subAreas[2].area.columnStart).toBe(2)
    expect(model.subAreas[2].area.columnEnd).toBe(3)
  })
})
