import dpt from '../date-picker-table'

describe('GDatePicker/date-picker-table', () => {
  describe('displayedMonths', () => {
    const { displayedMonth } = dpt({ tableDate: '2010-01-01' })
    it('Should be updated if props.tableDate changed', () => {
      expect(displayedMonth.value).toBe(0)
      props.tableDate = '2011-12-xx'
      expect(displayedMonth.value).toBe(11)
    })
    // TODO: tableDate null
    // TODO: tableDate contain invalid data
  })

  describe('displayedYear', () => {
    const { displayedYear } = dpt({ tableDate: '2010-01-01' })
    it('Should be updated if props.tableDate changed', () => {
      expect(displayedYear.value).toBe(2010)
      props.tableDate = '2011-xx-xx'
      expect(displayedYear.value).toBe(2011)
    })
    // TODO: tableDate null
    // TODO: tableDate contain invalid data
  })

  describe('genButtonClasses', () => {
    // TODO:
  })
})
