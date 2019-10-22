import plugin from '@vue/composition-api'
import { computedYearRange } from '../YearsUtil';
import { createLocalVue } from '@vue/test-utils'

describe('GDatePicker/Years/GDatePickerYearUtil.js', () => {
  createLocalVue().use(plugin)

  describe('computedYearRange', () => {
    // TODO: Mocking date.getFullYear()
    it('Should generate year range from props.min, props.max, ordered desc', () => {
      expect(computedYearRange({ min: '2010', max: '2015'}).value).toEqual([2015, 2014, 2013, 2012, 2011, 2010])
    })

    it('Should generate year range from current year and offset', () => {
      expect(computedYearRange({ }, 3).value).toEqual([2022, 2021, 2020, 2019, 2018, 2017, 2016])
    })

    it('props.min have higher priority than lower bound computed from value and offset', () => {
      expect(computedYearRange({ min: '2018' }, 3).value).toEqual([2022, 2021, 2020, 2019, 2018])
    })

    it('props.max have higher priority than upper bound computed from value and offset', () => {
      expect(computedYearRange({ max: '2011' }, 3).value).toEqual([2011])
    })

    it('Return only props.max if props.min >= props.max', () => {
      expect(computedYearRange({ min: '2011', max: '2010' }, 3).value).toEqual([2010])
    })
  })
})
