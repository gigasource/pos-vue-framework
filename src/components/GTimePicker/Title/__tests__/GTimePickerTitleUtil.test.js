// CREATED AT 2019-10-17 13:39
import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import {
  _getHour, _getMinute,
  HourConvention,
  HourConventionValidator,
  Period,
  PeriodValidator,
  SelectingTime, SelectingTimeValidator
} from '../GTimePickerTitleUtil';

describe('/GTimePickerTitleUtil', () => {
  createLocalVue().use(plugin)

  describe('HourConventionValidator', () => {
    it('Should pass the test with HourConvention member', () => {
      expect(HourConventionValidator(HourConvention._12HRS)).toBe(true)
      expect(HourConventionValidator(HourConvention._24HRS)).toBe(true)
    })

    it('Should fail the test with invalid input', () => {
      expect(HourConventionValidator('abc_xyz')).toBe(false)
    })
  })
  describe('PeriodValidator', () => {
    it('Should pass test with Period member', () => {
      expect(PeriodValidator(Period.AM)).toBe(true)
      expect(PeriodValidator(Period.PM)).toBe(true)
      expect(PeriodValidator('AM')).toBe(true)
      expect(PeriodValidator('PM')).toBe(true)
      expect(PeriodValidator('am')).toBe(true)
      expect(PeriodValidator('pm')).toBe(true)
    })

    it('Should fail the test with invalid value', () => {
      expect(PeriodValidator(1)).toBe(false)
      expect(PeriodValidator('2')).toBe(false)
    })
  })
  describe('Selecting time validator', () => {
    it('Should pass test with SelectingTime member', () => {
      expect(SelectingTimeValidator(SelectingTime.Hour)).toBe(true)
      expect(SelectingTimeValidator(SelectingTime.Minute)).toBe(true)
      expect(SelectingTimeValidator('HOUR')).toBe(true)
      expect(SelectingTimeValidator('MINUTE')).toBe(true)
      expect(SelectingTimeValidator('hOur')).toBe(true)
      expect(SelectingTimeValidator('mInUtE')).toBe(true)
    })
  })

  describe('_getHour', () => {
    it('Should thrown exception if props is null', () => {
      expect(() => _getHour().value).toThrowError()
    })

    it('Should return "--" if props.hour is null', () => {
      expect(_getHour({}).value).toBe('--')
    })

    it('Should thrown if props.hour < 0', () => {
      expect(() => _getHour({ hour: 0 }).value).not.toThrowError()
      expect(() => _getHour({ hour: -1 }).value).toThrowError()
    })

    it('Should thrown exception if props.hour > 23', () => {
      expect(() => _getHour({ hour: 23 }).value).not.toThrowError()
      expect(() => _getHour({ hour: 23.0000000001 }).value).toThrowError()
      expect(() => _getHour({ hour: 24 }).value).toThrowError()
    })

    it('Should pass the test with valid value', () => {
      const testCases = [
        { input: { hour: 5 }, expect: '05' },
        { input: { hour: 12 }, expect: '12' },
        { input: { hour: 20 }, expect: '20' }, // hourConvention undefined -> keep the same
        { input: { hour: 20, hourConvention: HourConvention._12HRS }, expect: '08' },
        { input: { hour: 20, hourConvention: HourConvention._24HRS }, expect: '20' },
      ]

      for(let i =0; i<testCases.length; ++i)
        expect(_getHour(testCases[i].input).value).toBe(testCases[i].expect)
    })
  })

  describe('_getMinute', () => {
    it('Should thrown if props is null', () => {
      expect(() => _getMinute().value).toThrowError()
    })

    it('Should return "--" if props.minute is null', () => {
      expect(_getMinute({}).value).toBe('--')
    })

    it('Should thrown if props.minute < 0', () => {
      expect(() => _getMinute({ minute: 0 }).value).not.toThrowError()
      expect(() => _getMinute({ minute: -1 }).value).toThrowError()
    })

    it('Should thrown if props.minute > 59', () => {
      expect(() => _getMinute({minute: 59}).value).not.toThrowError()
      expect(() => _getMinute({minute: 59.0000001}).value).toThrowError()
      expect(() => _getMinute({minute: 60}).value).toThrowError()
    })

    it('Should pass the test with valid value', () => {
      const testCases = [
        { input: { minute: 5 }, expect: '05' },
        { input: { minute: 20 }, expect: '20' }
      ]

      for(let i=0; i<testCases.length; ++i)
        expect(_getMinute(testCases[i].input).value).toBe(testCases[i].expect)
    })
  })
})
