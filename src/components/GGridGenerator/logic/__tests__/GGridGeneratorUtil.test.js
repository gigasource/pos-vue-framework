// Created at 2019-11-11 09:35 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin, { ref } from '@vue/composition-api'
import {
  _createSingleItem, _createSubGridItem, addSubGridArea, addSubItemArea,
  createEmptyArea, deleteGridItem,
  getFullCssModelName,
  getGridAreaCss, getGridList,
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
    const parent = { name: 'root', subAreas: [null, null] }
    // An area rowStart, rowEnd, columnStart, columnEnd: index of row (not index of line)
    // So this value
    const area = { name: 'head', rowStart: 1, rowEnd: 1, columnStart: 3, columnEnd: 2 }
    let orgRandom = Math.random
    Math.random = jest.fn(() => 0.5)
    addSubGridArea(parent, area)

    expect(parent.subAreas[2]).toEqual({
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
    const parent = { name: 'root', subAreas: [null, null] }
    // An area rowStart, rowEnd, columnStart, columnEnd: index of row (not index of line)
    // So this value
    const area = { name: 'head', rowStart: 1, rowEnd: 1, columnStart: 3, columnEnd: 2 }
    let orgRandom = Math.random
    Math.random = jest.fn(() => 0.5)
    addSubItemArea(parent, area)

    expect(parent.subAreas[2]).toEqual({
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

    for(let i =0; i<parent.subAreas.length; ++i) {
      expect(parent.subAreas[i] != child).toBe(true)
    }
  })
})
