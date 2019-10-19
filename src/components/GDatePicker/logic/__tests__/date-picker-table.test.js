import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import { reactive } from '@vue/composition-api'

import {getBtnOutlinedClass, getBtnDisabledClass, getBtnRoundedClass,
  getBtnActiveClass, getDisplayed, isCurrent, isSelected } from '../date-picker-table'

describe('GDatePicker/Table/date-picker-table', () => {
  createLocalVue().use(plugin)

  describe('displayedMonths', () => {
    const props = reactive({ tableDate: '2010-01-01' })
    const { displayedMonth } = getDisplayed(props)
    it('Should be updated if props.tableDate changed', () => {
      expect(displayedMonth.value).toBe(0)
      props.tableDate = '2011-12-xx'
      expect(displayedMonth.value).toBe(11)
    })
  })

  describe('displayedYear', () => {
    const props = reactive({ tableDate: '2010-01-01' })
    const { displayedYear } = getDisplayed(props)
    it('Should be updated if props.tableDate changed', () => {
      expect(displayedYear.value).toBe(2010)
      props.tableDate = '2011-xx-xx'
      expect(displayedYear.value).toBe(2011)
    })
  })

  describe('genButtonClasses', () => {
    it('g-btn-active', () => {
      expect(getBtnActiveClass(true)).toEqual({ 'g-btn--active': true })
      expect(getBtnActiveClass(false)).toEqual({ 'g-btn--active': false })
    })

    it('g-btn--rounded', () => {
      expect(getBtnRoundedClass()).toEqual({ 'g-btn--rounded': true })
    })

    it('g-btn--outlined', () => {
      expect(getBtnOutlinedClass(true)).toEqual({ 'g-btn--outlined': true })
      expect(getBtnOutlinedClass(false)).toEqual({ 'g-btn--outlined': false })
    })

    it('g-btn--disabled', () => {
      expect(getBtnDisabledClass(false, false)).toEqual({'g-btn--disabled': true})
      expect(getBtnDisabledClass(false, true)).toEqual({'g-btn--disabled': true})
      expect(getBtnDisabledClass(true, false)).toEqual({'g-btn--disabled': false})
      expect(getBtnDisabledClass(true, true)).toEqual({'g-btn--disabled': true})
    })
  })

  describe('isSelected', () => {
    it('Should thrown exception if props is missing', () => {
      expect(() => isSelected(null, '2010-10')).toThrowError()
    })

    it('Should return true if value equal props.value', () => {
      // it's not the actual case in we use, but it's still valid case
      expect(isSelected({value: 2}, 2)).toBe(true)
      expect(isSelected({value: '2010-10'}, '2010-10')).toBe(true)
    })

    it('Should return true if props.value is Array and contain value', () => {
      // it's not the actual case in we use, but it's still valid case
      expect(isSelected({value: [1, 2, 3]}, 2)).toBe(true)
      expect(isSelected({value: ['2010-09', '2010-10', '2010-11']}, '2010-10')).toBe(true)
    })

    it('Should return false if props.value is not equal to value AND props.value array is not contain value', () => {
      expect(isSelected({value: 2}, 3)).toBe(false)
      expect(isSelected({value: '2010-10'}, '2010-11')).toBe(false)
      // it's not the actual case in we use, but it's still valid case
      expect(isSelected({value: [1, 2, 3]}, 4)).toBe(false)
      expect(isSelected({value: ['2010-09', '2010-10', '2010-11']}, '2010-12')).toBe(false)
    })
  })

  describe('isCurrent', () => {
    it('Should thrown if props is null or undefined', () => {
      expect(() => isCurrent()).toThrowError()
    })

    it('Should return true if value is equal to props.current', () => {
      expect(isCurrent({ current: 1 }, 1)).toBe(true)
      expect(isCurrent({ current: '2010-01' }, '2010-01')).toBe(true)
    })

    it('Should return false if value is not equal to props.current', () => {
      expect(isCurrent({ current: 1 }, 2)).toBe(false)
      expect(isCurrent({ current: '2010-01' }, '2010-02')).toBe(false)
    })
  })

})
