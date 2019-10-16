// CREATED AT 2019-10-16 14:11
import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import {
  _calculateTableDate,
  getMonthTableEvents,
  EVENT_NAMES,
  _getMonthFormatter,
  _getClickEventHandler,
  _getDbClickEventHandler,
  _attachMonthItemEventHandlers,
  _getMonthItemColor, getMonths,
} from '../GDatePickerMonthTableUtil'

describe('/GDatePickerMonthTableUtil', () => {
  createLocalVue().use(plugin)

  // emit count
  function getEventCount(ctx, eventName) {
    let counter = 0
    for(let i=0; i<ctx.emit.mock.calls.length; i++) {
      if (ctx.emit.mock.calls[i][0] === eventName)
        counter++
    }
    return counter
  }

  describe('_calculateTableDate', () => {

    // Example of using props property
    it('Should thrown an exception if props is null', () => {
      expect(() => _calculateTableDate(null, -3)).toThrowError('Cannot read property \'tableDate\' of null')
      expect(() => _calculateTableDate({}, -3)).not.toThrowError()
    })

    it('Should use 1 instead of props.tableDate if props.tableDate is not declared', () => {
      expect(_calculateTableDate({}, 1)).toBe('2')
    })

    it('Should use props.tableDate if this value exist', () => {
      expect(_calculateTableDate({ tableDate: '3' }, 1)).toBe('4')
    })

    it('Should use 1 instead of delta if delta is null or undefined or delta >= 0', () => {
      expect(_calculateTableDate({ tableDate: 10 }, null)).toBe('11')
      expect(_calculateTableDate({ tableDate: 10 }, undefined)).toBe('11')
      expect(_calculateTableDate({ tableDate: 10 }, 0)).toBe('11')
      expect(_calculateTableDate({ tableDate: 10 }, 1)).toBe('11')
      expect(_calculateTableDate({ tableDate: 10 }, 2)).toBe('11')
    })

    it('Should use -1 instead of delta if delta < 0', () => {
      expect(_calculateTableDate({ tableDate: 10 }, -1)).toBe('9')
      expect(_calculateTableDate({ tableDate: 10 }, -2)).toBe('9')
      expect(_calculateTableDate({ tableDate: 10 }, -3)).toBe('9')
    })

    // Example mocking static function
    it('Should use Math.sign for delta', () => {
      Math.sign = jest.fn(v => 5)
      expect(_calculateTableDate({ tableDate: 12 }, -2)).toBe('17')
      expect(_calculateTableDate({ tableDate: 12 }, -1)).toBe('17')
      expect(_calculateTableDate({ tableDate: 12 }, null)).toBe('17')
      expect(_calculateTableDate({ tableDate: 12 }, undefined)).toBe('17')
      expect(_calculateTableDate({ tableDate: 12 }, 0)).toBe('17')
      expect(_calculateTableDate({ tableDate: 12 }, 1)).toBe('17')
      expect(Math.sign.mock.calls.length).toBe(6)
    })
  })

  describe('getMonthTableEvents', () => {
    describe('onwheel', () => {
      it('Should have onWheel event handler', () => {
        const monthEvents = getMonthTableEvents()
        expect(monthEvents).hasOwnProperty('onWheel')
        expect(typeof monthEvents.onWheel).toBe('function')
      })

      it('Should thrown exception if props is missing', () => {
        expect(() => getMonthTableEvents().onWheel()).toThrowError()
      })

      it('Will not be called if props.disable is true or props.scrollable is false', () => {
        let mockWheelEvent = { preventDefault: jest.fn() }
        let mockContext = { emit: jest.fn((v1, v2) => {}) }
        getMonthTableEvents({ disabled: false, scrollable: false }, mockContext).onWheel(mockWheelEvent)
        getMonthTableEvents({ disabled: true, scrollable: false }, mockContext).onWheel(mockWheelEvent)
        getMonthTableEvents({ disabled: true, scrollable: true }, mockContext).onWheel(mockWheelEvent)
        expect(mockWheelEvent.preventDefault.mock.calls.length).toBe(0)
        expect(mockContext.emit.mock.calls.length).toBe(0)

        getMonthTableEvents({ disabled: false, scrollable: true }, mockContext).onWheel(mockWheelEvent)
        expect(mockWheelEvent.preventDefault.mock.calls.length).toBe(1)
        expect(mockContext.emit.mock.calls.length).toBe(1)
      })

      // It's stupid test
      // Solution: https://medium.com/@DavideRama/mock-spy-exported-functions-within-a-single-module-in-jest-cdf2b61af642
      it(`Should emit event ${EVENT_NAMES.UPDATE_TABLE_DATE} with value computed by calculateTableDate with wheelEvent.deltaY as delta`, () => {
        let props = { tableDate: 12, disabled: false, scrollable: true }
        let delta = 10
        let mockWheelEvent = { preventDefault: jest.fn(), deltaY: delta }
        let mockContext = { emit: jest.fn((v1, v2) => {}) }
        getMonthTableEvents(props, mockContext).onWheel(mockWheelEvent)
        expect(mockContext.emit.mock.calls[0][0]).toBe(EVENT_NAMES.UPDATE_TABLE_DATE)
        expect(mockContext.emit.mock.calls[0][1]).toBe(_calculateTableDate(props, delta))
      })
    })
  })

  describe('_getMonthFormatter', () => {
    it('Should thrown exception if props is null or undefined', () => {
      expect(() => _getMonthFormatter(null).value).toThrowError()
    })

    it('Should return props.format if prop.format is provided', () => {
      let props = { format: 5 }
      expect(_getMonthFormatter(props).value).toBe(props.format)

      props = { format: () => {} }
      expect(_getMonthFormatter(props).value).toBe(props.format)

      // TODO: See _getMonthFormatter TODO
    })
  })

  describe('_getClickEventHandler', () => {
    it('Should return an object with click props is a function', () => {
      expect(typeof _getClickEventHandler().click).toBe('function')
    })

    it('Should thrown exception if monthDatItem, props, context is null/undefined or context missing emit method', () => {
      expect(() => _getClickEventHandler().click()).toThrowError()
      expect(() => _getClickEventHandler({}).click()).toThrowError()
      expect(() => _getClickEventHandler({}, {}).click()).toThrowError()
      expect(() => _getClickEventHandler({}, {}, {}).click()).toThrowError()
      expect(() => _getClickEventHandler({}, {}, { emit: () => {} }).click()).not.toThrowError()
    })

    it(`Should emit "${EVENT_NAMES.INPUT}" if monthDataItem.isAllowed is true and props.readonly is false`, () => {
      const ctx = { emit: jest.fn() }
      _getClickEventHandler({ isAllowed: false }, { readonly: false }, ctx).click()
      _getClickEventHandler({ isAllowed: false }, { readonly: true }, ctx).click()
      _getClickEventHandler({ isAllowed: true }, { readonly: true }, ctx).click()
      expect(getEventCount(ctx, EVENT_NAMES.INPUT)).toBe(0)

      // the only case EVENT_NAMES.INPUT will be called
      _getClickEventHandler({ isAllowed: true }, { readonly: false }, ctx).click()
      expect(getEventCount(ctx, EVENT_NAMES.INPUT)).toBe(1)
    })

    it(`Should always call "${EVENT_NAMES.MONTH_CLICKED}" on click`, () => {
      const ctx = { emit: jest.fn() }
      _getClickEventHandler({ isAllowed: false }, { readonly: false }, ctx).click()
      _getClickEventHandler({ isAllowed: false }, { readonly: true }, ctx).click()
      _getClickEventHandler({ isAllowed: true }, { readonly: true }, ctx).click()
      _getClickEventHandler({ isAllowed: true }, { readonly: false }, ctx).click()
      expect(getEventCount(ctx, EVENT_NAMES.MONTH_CLICKED)).toBe(4)
    })
    it('Should emit input date', () => {
      const ctx = { emit: jest.fn(v => v) }
      const month ='2010-01'
      _getClickEventHandler({ isAllowed: true }, { readonly: false }, ctx, month).click()
      // emit input & month clicked
      expect(ctx.emit.mock.calls[0][1]).toBe(month)
      expect(ctx.emit.mock.calls[1][1]).toBe(month)
    })
  })

  describe('_getDbClickEventHandler', () => {
    it('Should return an object with dblclick prop is a function', () => {
      const dbclickEvent = _getDbClickEventHandler()
      expect(typeof dbclickEvent.dblclick).toBe('function')
    })
    it('Should throw exception if context is null or missing emit event', () => {
      expect(() => _getDbClickEventHandler().dblclick()).toThrowError()
      expect(() => _getDbClickEventHandler({}).dblclick()).toThrowError()
      expect(() => _getDbClickEventHandler({ emit: 5 }).dblclick()).toThrowError()
      expect(() => _getDbClickEventHandler({ emit: 'asdasd' }).dblclick()).toThrowError()
      expect(() => _getDbClickEventHandler({ emit: () => {} }).dblclick()).not.toThrowError()
    })

    // emit count
    it(`Should emit "${EVENT_NAMES.MONTH_DB_CLICKED}" with input value`, () => {
      const ctx = { emit: jest.fn() }
      const month = '2010-01'
      _getDbClickEventHandler(ctx, month).dblclick()
      expect(getEventCount(ctx, EVENT_NAMES.MONTH_DB_CLICKED)).toBe(1)
      expect(ctx.emit.mock.calls[0][0]).toBe(EVENT_NAMES.MONTH_DB_CLICKED)
      expect(ctx.emit.mock.calls[0][1]).toBe(month)
    })
  })

  describe('_attachMonthItemEventHandlers', () => {
    it('Should thrown exception if monthDataItem, props is null', () => {
      expect(() => _attachMonthItemEventHandlers()).toThrowError()
      expect(() => _attachMonthItemEventHandlers({})).toThrowError()
      expect(() => _attachMonthItemEventHandlers({}, {})).not.toThrowError()
    })

    it('Should attach property eventHandlers with value undefined into monthDataItem if props.disabled is true', () => {
      const monthDataItem = {}
      expect(monthDataItem).not.hasOwnProperty('eventHandlers')

      _attachMonthItemEventHandlers(monthDataItem, { disabled: true })
      expect(monthDataItem).hasOwnProperty('eventHandlers')
      expect(monthDataItem.eventHandlers).toBe(undefined)

      _attachMonthItemEventHandlers(monthDataItem, { disabled: false })
      expect(monthDataItem.eventHandlers).not.toBe(undefined)

      expect(monthDataItem.eventHandlers).hasOwnProperty('click')
      expect(monthDataItem.eventHandlers).hasOwnProperty('dblclick')
    })
  })

  describe('_getMonthItemColor', () => {
    it('Should thrown exception if monthDataItem or props is null', () => {
      // missing both
      expect(() => _getMonthItemColor()).toThrowError()
      // missing props
      expect(() => _getMonthItemColor({})).toThrowError()
      // no missing
      expect(() => _getMonthItemColor({}, {})).not.toThrowError()
    })

    it('Should return \'\' if props.color is missing', () => {
      expect(_getMonthItemColor({ isSelected: true }, {})).toBe('')
      expect(_getMonthItemColor({ isCurrent: true }, {})).toBe('')
    })

    it('Should return props.color if props.color is existed AND (monthDataItem.isSelected or monthDataItem.isCurrent is true)', () => {
      expect(_getMonthItemColor({ isSelected: true }, { color: 'abc' })).toBe('abc')
      expect(_getMonthItemColor({ isCurrent: true }, { color: 'xyz' })).toBe('xyz')
    })
  })

  describe('getMonths', () => {
    it('Should return month in a 2 dimension array [3x4]', () => {
      const year = '2010'
      const props = { tableDate: year }
      const rows = 4
      const columns = 3
      const monthData = getMonths(props).value;
      expect(monthData.length).toBe(rows)
      for(let i=0; i<monthData.length; ++i) {
        expect(monthData[i].length).toBe(columns)
      }
    })
    // ...
  })
})
