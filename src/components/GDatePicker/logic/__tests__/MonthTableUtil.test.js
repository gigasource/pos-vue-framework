// CREATED AT 2019-10-16 14:11
import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import { _computedMonthFormatFunc, computedMonthRows, } from '../MonthTableUtil'

describe('/GDatePickerMonthTableUtil', () => {
  createLocalVue().use(plugin)

  describe('_computedMonthFormatFunc', () => {
    it('Should thrown exception if props or state is null or undefined', () => {
      expect(() => _computedMonthFormatFunc(null).value).toThrowError()
      expect(() => _computedMonthFormatFunc({}).value).not.toThrowError()
    })

    it('Should return props.format if prop.monthFormat is provided', () => {
      let props = { monthFormat: 5 }
      expect(_computedMonthFormatFunc(props).value).toBe(props.monthFormat)

      props = { monthFormat: () => {} }
      expect(_computedMonthFormatFunc(props).value).toBe(props.monthFormat)
    })

    it('Should return month short format if props.monthFormat is not provided', () => {
      expect(_computedMonthFormatFunc({}).value('2019-01-01')).toBe('Jan')
      expect(_computedMonthFormatFunc({}).value('2019-02-01')).toBe('Feb')
    })
  })

  describe('computedMonthRows', () => {
    it('Should return month in a 2 dimension array [3x4]', () => {
      const year = '2010'
      const props = { tableDate: year }
      const rows = 4
      const columns = 3
      const monthData = computedMonthRows(props,  { viewportDate: '2019-01-01' }).value;
      expect(monthData.length).toBe(rows)
      for(let i=0; i<monthData.length; ++i) {
        expect(monthData[i].length).toBe(columns)
      }
    })

    // TODO: Test case to validate month data
  })
})
