// Created at 2019-10-24 15:27 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin, { computed } from '@vue/composition-api'
import { getFormattedHours, getAdjustTimeMethods } from '../GTimePickerUtil';
import { HourConvention } from '../GTimePickerUtil';

describe('/GTimePickerUtil', () => {
  createLocalVue().use(plugin)

  describe('getFormattedHours', () => {
    it('Should return 12 instead of 0 in 12 hour convention', () => {
      expect(getFormattedHours(0, { hourConvention: HourConvention._12HRS })).toBe(12)

      for (let i = 1; i < 12; ++i) {
        expect(getFormattedHours(i, { hourConvention: HourConvention._12HRS })).toBe(i)
      }

      for (let i = 0; i < 24; ++i) {
        expect(getFormattedHours(i, { hourConvention: HourConvention._24HRS })).toBe(i)
      }
    })
  })

  // TODO: Refactor adjust methods to make it simpler
  describe('adjust time methods', () => {
    const state = { selectedTime: {} }
    const mockSetHours = jest.fn(v => {
      debugger
    })
    const mockSetMinutes = jest.fn(v => {
    })
    const mockSetSeconds = jest.fn(v => {
    })
    const cptIs12HourConvention = computed(() => true)

    const { adjustHours, adjustMinutes, adjustSeconds } = getAdjustTimeMethods({
      state,
      setHours: mockSetHours,
      setMinutes: mockSetMinutes,
      setSeconds: mockSetSeconds,
      cptIs12HoursConvention: cptIs12HourConvention
    })

    it('Should adjust hour as expected', () => {
      state.selectedTime = { hours: 0 }

      adjustHours(-1)
      expect(mockSetHours.mock.calls.length).toBe(1)
      expect(mockSetHours.mock.calls[0][0]).toBe(11)

      adjustHours(1)
      expect(mockSetHours.mock.calls.length).toBe(2)
      expect(mockSetHours.mock.calls[1][0]).toBe(1)

      state.selectedTime.hours = 11
      adjustHours(3)
      expect(mockSetHours.mock.calls[2][0]).toBe(2)
    })

    it('Should adjust minutes as expected', () => {
      state.selectedTime = { minutes: 0 }
      adjustMinutes(-1)
      expect(mockSetMinutes.mock.calls.length).toBe(1)
      expect(mockSetMinutes.mock.calls[0][0]).toBe(59)

      adjustMinutes(5)
      expect(mockSetMinutes.mock.calls.length).toBe(2)
      expect(mockSetMinutes.mock.calls[1][0]).toBe(5)

      state.selectedTime = { minutes: 59 }
      adjustMinutes(5)
      expect(mockSetMinutes.mock.calls[2][0]).toBe(4)
    })

    it('Should adjust seconds as expected', () => {
      state.selectedTime.seconds = 0
      adjustSeconds(-1)
      expect(mockSetSeconds.mock.calls[0][0]).toBe(59)

      state.selectedTime.seconds = 58
      adjustSeconds(3)
      expect(mockSetSeconds.mock.calls[1][0]).toBe(1)
    })
  })
})
