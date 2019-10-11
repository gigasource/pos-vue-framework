import { isDateAllowed } from '../utils'

describe('GDatePicker/util/isDateAllowed', () => {
  it('Should allowed date', () => {
    expect(isDateAllowed(30)).toBe(true)
    expect(isDateAllowed(40)).toBe(true)
    expect(isDateAllowed(40, 0)).toBe(true)
    expect(isDateAllowed(40, 30, 50)).toBe(true)
    expect(isDateAllowed(40, 30, 50, (x) => true)).toBe(true)
  })

  it('Should not allowed date', () => {
    expect(isDateAllowed(10, 20)).toBe(false)
    expect(isDateAllowed(25, 20, 22)).toBe(false)
    expect(isDateAllowed(40, 30, 50, (x) => false)).toBe(false)
  })
})
