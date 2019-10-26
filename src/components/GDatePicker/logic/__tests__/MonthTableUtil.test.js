// CREATED AT 2019-10-16 14:11
import { createLocalVue } from '@vue/test-utils'
import plugin from '@vue/composition-api'
import { _computedMonthRows, } from '../MonthTableUtil'

describe('GDatePicker/logic/MonthTableUtil.js', () => {
  createLocalVue().use(plugin)

  describe('_computedMonthRows', () => {
    it('Should return month in a 2 dimension array [3x4]', () => {
      const year = '2010'
      const props = { tableDate: year }
      const rows = 4
      const columns = 3
      const monthData = _computedMonthRows(props,  { viewportDate: '2019-01-01' }).value;
      expect(monthData.length).toBe(rows)
      for(let i=0; i<monthData.length; ++i) {
        expect(monthData[i].length).toBe(columns)
      }
    })

    // TODO: Test case to validate month data
  })
})
