import { dateFilter, _isDateAllowed, _isValueInRange } from '../dateFilter';

describe('GDatePicker/dateFilter', () => {
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

  it('Should depend on props.min', () => {
    const isValueInRange = dateFilter({ min: "2010-01-02" })
    expect(isValueInRange('2010-01-01')).toBe(false)
    expect(isValueInRange('2010-01-02')).toBe(true)
    expect(isValueInRange('2010-01-03')).toBe(true)
  })

  it('Should depend on props.max', () => {
    const isValueInRange = dateFilter({max: "2010-01-02"})
    expect(isValueInRange('2010-01-01')).toBe(true)
    expect(isValueInRange('2010-01-02')).toBe(true)
    expect(isValueInRange('2010-01-03')).toBe(false)
  })

  it('Should depend on props.allowedDates', () => {
    const isValueInRange1 = dateFilter({ allowedDates: (v) => true })
    expect(isValueInRange1('2010-01-15')).toBe(true)
    expect(isValueInRange1('2010-01-12')).toBe(true)

    const isValueInRange2 = dateFilter({ allowedDates: (v) => false })
    expect(isValueInRange2('2010-01-15')).toBe(false)
    expect(isValueInRange2('2010-01-12')).toBe(false)
  })

  it('Should depend on both props.min, props.max, props.allowedDates', () => {
    // allowedDates depend on min
    let isValueInRange = dateFilter({
      min: "2010-01-02",
      allowedDates: (v) => true
    })
    expect(isValueInRange('2010-01-01')).toBe(false)
    expect(isValueInRange('2010-01-02')).toBe(true)
    expect(isValueInRange('2010-01-03')).toBe(true)

    // allowedDates depend on max
    isValueInRange = dateFilter({
      max: "2010-01-02",
      allowedDates: (v) => true
    })
    expect(isValueInRange('2010-01-01')).toBe(true)
    expect(isValueInRange('2010-01-02')).toBe(true)
    expect(isValueInRange('2010-01-03')).toBe(false)

    // allowedDates depend on both min, max
    isValueInRange = dateFilter({
      min: "2010-01-02",
      max: "2010-01-02",
      allowedDates: (v) => true
    })
    expect(isValueInRange('2010-01-01')).toBe(false)
    expect(isValueInRange('2010-01-02')).toBe(true)
    expect(isValueInRange('2010-01-03')).toBe(false)

    // min, max depend on allowedDates
    isValueInRange = dateFilter({
      min: "2010-01-02",
      max: "2010-01-02",
      allowedDates: (v) => false
    })
    expect(isValueInRange('2010-01-02')).toBe(false)
  })
})
