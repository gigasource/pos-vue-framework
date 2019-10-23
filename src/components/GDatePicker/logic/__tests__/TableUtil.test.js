import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import {
  _isDateAllowed,
  _isValueInRange,
  computedDisplayMonth,
  computedDisplayYear,
  isAllowed,
  isSelected
} from '../TableUtil';


describe('GDatePicker/logic/TableUtil.js', () => {
  createLocalVue().use(plugin)

  describe('isSelected', () => {
    it('Should thrown exception if props or state is missing or invalid', () => {
      // single
      expect(() => isSelected(null, { selectedValues: 1 }, 1)).toThrowError()
      expect(() => isSelected({ }, null, 1)).toThrowError()

      // multiple
      expect(() => isSelected({ multiple: true }, {}, 1)).toThrowError()
      expect(() => isSelected({ multiple: true }, { selectedValues: 1 }, 1)).toThrowError()
      expect(() => isSelected({ multiple: true }, { selectedValues: [] }, 1)).not.toThrowError()

      // range
      expect(() => isSelected({ range: true }, {}, 1)).toThrowError()
      // this case doesn't thrown exception and does not modify selectedValues too
      expect(() => isSelected({ range: true }, { selectedValues: 1}, 1)).not.toThrowError()
      expect(() => isSelected({ range: true }, { selectedValues: []}, 1)).not.toThrowError()
    })

    it('Should pass the test case for single date selection', () => {
      expect(isSelected({}, {selectedValues: '2010-10'}, '2010-10')).toBe(true)
      expect(isSelected({}, {selectedValues: '2010-10'}, '2010-11')).toBe(false)
    })

    it('Should pass the test case for multiple date selection', () => {
      expect(isSelected({ multiple: true }, { selectedValues: ['2010-01'] }, '2010-01')).toBe(true)
      expect(isSelected({ multiple: true }, { selectedValues: ['2010-02'] }, '2010-01')).toBe(false)
      expect(isSelected({ multiple: true }, { selectedValues: ['2010-01', '2010-02'] }, '2010-01')).toBe(true)
      expect(isSelected({ multiple: true }, { selectedValues: ['2010-02', '2010-01'] }, '2010-01')).toBe(true)
    })

    it('Should pass the test case for range date selection', () => {
      // empty
      expect(isSelected({ range: true }, { selectedValues: []}, '2010')).toBe(false)
      // start range
      expect(isSelected({ range: true }, { selectedValues: ['2010']}, '2010')).toBe(true)
      expect(isSelected({ range: true }, { selectedValues: ['2011']}, '2010')).toBe(false)
      // start + end range
      expect(isSelected({ range: true }, { selectedValues: ['2010-01-02', '2015-01-02']}, '2010-08-20')).toBe(true)
      expect(isSelected({ range: true }, { selectedValues: ['2008-12-01', '2010-11-05']}, '2010-11-03')).toBe(true)
      expect(isSelected({ range: true }, { selectedValues: ['2008-12-01', '2010-11-05']}, '2010-11-12')).toBe(false)
      expect(isSelected({ range: true }, { selectedValues: ['2008', '2015']}, '2010')).toBe(true)
    })
  })

  describe('IsDateAllowed', () => {
    it('Output result will be true if filter function is missing', () => {
      expect(_isDateAllowed("abc")).toBe(true)
    })

    it('Output value should depend on filter function', () => {
      expect(_isDateAllowed("abc", (v)=> true)).toBe(true)
      expect(_isDateAllowed("abc", (v)=> false)).toBe(false)
    })
  })

  describe('IsValueInRange', () => {
    it("Should return true if value in range", () => {
      expect(_isValueInRange("2010-01-01", "2010-01-01")).toBe(true)
      expect(_isValueInRange("2010-01-30", "2010-01-01", "2010-02-01")).toBe(true)
      expect(_isValueInRange("2010-02-01", "2010-01-01", "2010-02-01")).toBe(true)
    })

    it('Should return false if value is not in range', () => {
      expect(_isValueInRange("2010-01-01", "2010-01-02")).toBe(false)
      expect(_isValueInRange("2010-02-01", "2010-01-01", "2010-01-31")).toBe(false)
    })
  })

  describe('isAllowed', () => {
    it('Should depend on props.min', () => {
      expect(isAllowed({ min: "2010-01-02" }, '2010-01-01')).toBe(false)
      expect(isAllowed({ min: "2010-01-02" }, '2010-01-02')).toBe(true)
      expect(isAllowed({ min: "2010-01-02" }, '2010-01-03')).toBe(true)
    })

    it('Should depend on props.max', () => {
      expect(isAllowed({max: "2010-01-02"}, '2010-01-01')).toBe(true)
      expect(isAllowed({max: "2010-01-02"}, '2010-01-02')).toBe(true)
      expect(isAllowed({max: "2010-01-02"}, '2010-01-03')).toBe(false)
    })

    it('Should depend on props.allowedDates', () => {
      expect(isAllowed({ allowedDates: (v) => true },'2010-01-15')).toBe(true)
      expect(isAllowed({ allowedDates: (v) => true },'2010-01-12')).toBe(true)

      expect(isAllowed({ allowedDates: (v) => false },'2010-01-15')).toBe(false)
      expect(isAllowed({ allowedDates: (v) => false },'2010-01-12')).toBe(false)
    })

    it('Should depend on both props.min, props.max, props.allowedDates', () => {
      // allowedDates depend on min
      expect(isAllowed({ min: "2010-01-02", allowedDates: (v) => true }, '2010-01-01')).toBe(false)
      expect(isAllowed({ min: "2010-01-02", allowedDates: (v) => true }, '2010-01-02')).toBe(true)
      expect(isAllowed({ min: "2010-01-02", allowedDates: (v) => true }, '2010-01-03')).toBe(true)

      // allowedDates depend on max
      expect(isAllowed({ max: "2010-01-02", allowedDates: (v) => true }, '2010-01-01')).toBe(true)
      expect(isAllowed({ max: "2010-01-02", allowedDates: (v) => true }, '2010-01-02')).toBe(true)
      expect(isAllowed({ max: "2010-01-02", allowedDates: (v) => true }, '2010-01-03')).toBe(false)

      // allowedDates depend on both min, max

      expect(isAllowed({ min: "2010-01-02", max: "2010-01-02", allowedDates: (v) => true },'2010-01-01')).toBe(false)
      expect(isAllowed({ min: "2010-01-02", max: "2010-01-02", allowedDates: (v) => true },'2010-01-02')).toBe(true)
      expect(isAllowed({ min: "2010-01-02", max: "2010-01-02", allowedDates: (v) => true },'2010-01-03')).toBe(false)

      // min, max depend on allowedDates
      expect(isAllowed({ min: "2010-01-02", max: "2010-01-02", allowedDates: (v) => false },'2010-01-02')).toBe(false)
    })
  })

  describe('computedDisplayMonth', () => {
    it('Should thrown if state is null or viewportDate is not date, month format string', () => {
      expect(() => computedDisplayMonth(null).value).toThrowError()
      expect(() => computedDisplayMonth({}).value).toThrowError()
      expect(() => computedDisplayMonth({ viewportDate: 5 }).value).toThrowError()
      expect(() => computedDisplayMonth({ viewportDate: '2012-05' }).value).not.toThrowError()
    })

    it('Should return the month', () => {
      // month in js start with 0 - January
      expect(computedDisplayMonth({ viewportDate: '2019-01' }).value).toBe(0)
      expect(computedDisplayMonth({ viewportDate: '2019-05' }).value).toBe(4)
      expect(computedDisplayMonth({ viewportDate: '2012-invalidMonth' }).value).toBe(Number.NaN)
    })
  })

  describe('computedDisplayYear', () => {
    it('Should thrown if state is null or viewportDate is not date, month format string', () => {
      expect(() => computedDisplayYear(null).value).toThrowError()
      expect(() => computedDisplayYear({}).value).toThrowError()
      expect(() => computedDisplayYear({ viewportDate: 5 }).value).toThrowError()
      expect(() => computedDisplayYear({ viewportDate: '2012-05' }).value).not.toThrowError()
    })

    it('Should return the year', () => {
      // month in js start with 0 - January
      expect(computedDisplayYear({ viewportDate: '2019-01' }).value).toBe(2019)
      expect(computedDisplayYear({ viewportDate: '2019-05' }).value).toBe(2019)
      expect(computedDisplayYear({ viewportDate: '2012-invalidMonth' }).value).toBe(2012)
      expect(computedDisplayYear({ viewportDate: 'invalidYear-invalidMonth' }).value).toBe(Number.NaN)
    })
  })
})
