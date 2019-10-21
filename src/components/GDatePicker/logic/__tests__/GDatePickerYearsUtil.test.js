import plugin from '@vue/composition-api'
import { EVENT_NAMES, getYearOnClickEventHandler, computedYearRange } from '../GDatePickerYearsUtil';
import { createLocalVue } from '@vue/test-utils'

describe('GDatePicker/Years/GDatePickerYearUtil.js', () => {
  createLocalVue().use(plugin)

  describe('computedYearRange', () => {
    it('Should generate year range from props.min, props.max, ordered desc', () => {
      expect(computedYearRange({ min: 10, max: 15}).value).toEqual([15, 14, 13, 12, 11, 10])
    })

    it('Should generate year range from props.value and offset', () => {
      expect(computedYearRange({ value: 10 }, 3).value).toEqual([13, 12, 11, 10, 9, 8, 7])
    })

    it('props.min have higher priority than lower bound computed from value and offset', () => {
      expect(computedYearRange({ min: 9, value: 10 }, 3).value).toEqual([13, 12, 11, 10, 9])
    })

    it('props.max have higher priority than upper bound computed from value and offset', () => {
      expect(computedYearRange({ max: 11, value: 10 }, 3).value).toEqual([11, 10, 9, 8, 7])
    })

    it('Return only props.max if props.min >= props.max', () => {
      expect(computedYearRange({ min: 11, max: 10 }, 3).value).toEqual([10])
    })
  })

  describe('getYearOnClickEventHandler', () => {
    it('Should call context.emit with EVENT_NAMES.INPUT event and passed year', () => {
      const mockContext = {
        emit: jest.fn(y => y)
      }

      const clickHandler = getYearOnClickEventHandler(mockContext)

      const year = [1900, 1991]
      clickHandler(year[0])
      clickHandler(year[1])

      expect(mockContext.emit.mock.calls.length).toBe(year.length)

      for(let i=0; i<year.length; ++i) {
        expect(mockContext.emit.mock.calls[i][0]).toBe(EVENT_NAMES.INPUT)
        expect(mockContext.emit.mock.calls[i][1]).toBe(year[i])
      }
    })
  })
})
