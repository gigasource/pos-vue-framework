// Created at 2019-10-22 09:58 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import {
  _computedHeaderContent,
  _computedHeaderFormatFn,
  _calculateChange,
  isMonthFormat
} from '../HeaderUtil';

describe('GDatePicker/logic/HeaderUtil', () => {
  createLocalVue().use(plugin)

  describe('isMonthFormat', () => {
    it('Should pass if input contain "-"', () => {
      expect(isMonthFormat('-')).toBe(true)
      expect(isMonthFormat(' - ')).toBe(true)
      expect(isMonthFormat('1990-01')).toBe(true)
      expect(isMonthFormat('1990/01')).toBe(false)
      expect(isMonthFormat('1990,01')).toBe(false)
    })
  })

  describe('_calculateChange', () => {
    it('Should change the month if its month format', () => {
      expect(_calculateChange('2019-01', -1)).toEqual('2018-12')
      expect(_calculateChange('2019-01', +1)).toEqual('2019-02')
    })

    it('Should change the year if it\'s not month format', () => {
      expect(_calculateChange('2019', -1)).toEqual('2018')
      expect(_calculateChange('2019', +1)).toEqual('2020')
    })
  })

  describe('_computedHeaderContent', () => {
    it('Should return month format if activePicker is "date"', () => {
      expect(_computedHeaderContent({ activePicker: 'date', viewportDate: '2019-01-01' }).value).toBe('2019-01')
      expect(_computedHeaderContent({ activePicker: 'month', viewportDate: '2019-01-01' }).value).not.toBe('2019-01')
      expect(_computedHeaderContent({ activePicker: 'year', viewportDate: '2019-01-01' }).value).not.toBe('2019-01')
    })

    it('Should return year format if active picker is not "date"', () => {
      expect(_computedHeaderContent({ activePicker: 'date', viewportDate: '2019-01-01' }).value).not.toBe('2019')
      expect(_computedHeaderContent({ activePicker: 'month', viewportDate: '2019-01-01' }).value).toBe('2019')
      expect(_computedHeaderContent({ activePicker: 'year', viewportDate: '2019-01-01' }).value).toBe('2019')
      expect(_computedHeaderContent({ activePicker: 'blabla', viewportDate: '2019-01-01' }).value).toBe('2019')
    })
  })

  describe('_computedHeaderFormatFn', () => {
    it('Should return props.headerDateFormat if it exist', () => {
      // as a value (not real use case)
      expect(_computedHeaderFormatFn({ headerDateFormat: 5 }, {}).value).toBe(5)
      // real usecase( return headerDateFormat function)
      expect(_computedHeaderFormatFn({ headerDateFormat: (v) => v + 5 }, {}).value(20)).toBe(25)
      //
    })

    it('Should return long month format if activePicker is "date"', () => {
      expect(_computedHeaderFormatFn({ }, { activePicker: 'date' }).value('2019-01-01')).toBe("January 2019")
      expect(_computedHeaderFormatFn({ }, { activePicker: 'date' }).value('2019-02-01')).toBe("February 2019")
    })

    it('Should return full year format if activePicker is not "date"', () => {
      expect(_computedHeaderFormatFn({ }, { activePicker: 'month' }).value('2019-01-01')).toBe("2019")
      expect(_computedHeaderFormatFn({ }, { activePicker: 'year' }).value('2019-01-01')).toBe("2019")
      expect(_computedHeaderFormatFn({ }, { activePicker: 'bla bla' }).value('2019-01-01')).toBe("2019")
    })
  })
})
