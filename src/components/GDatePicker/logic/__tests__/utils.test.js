import { pad, sanitizeDateString } from '../utils'

describe('GDatePicker/util/pad', () => {
  it('should pad 1-digit numbers', () => {
    expect(pad(0)).toBe('00')
    expect(pad('3', 3)).toBe('003')
  })

  it('should pad 2-digit numbers', () => {
    expect(pad(40)).toBe('40')
    expect(pad('98')).toBe('98')
  })

  it('should not pad 3-digit numbers', () => {
    expect(pad(400)).toBe('400')
    expect(pad('998')).toBe('998')
  })
})

describe('GDatePicker/util/sanitizeDateString', () => {
  it('Should return correct year', () => {
    expect(sanitizeDateString('2010-10-01', 'year')).toEqual('2010')
    expect(sanitizeDateString('2013-1qwebacweq132', 'year')).toEqual('2013')
    expect(sanitizeDateString('2015-10-01ABCEFSDEA', 'year')).toEqual('2015')
    expect(sanitizeDateString('2015xxxxx-10-01ABCEFSDEA', 'year')).toEqual('2015')
  })

  it('Should return correct month', () => {
    expect(sanitizeDateString('2010-05-10', 'month')).toEqual('2010-05')
    expect(sanitizeDateString('2010-05-10abasdcasdqw', 'month')).toEqual('2010-05')
    expect(sanitizeDateString('2010abcd-05-10abasdcasdqw', 'month')).not.toEqual('2010-05')
  })

  it('Should return correct date format', () => {
    expect(sanitizeDateString('2010-05-10', 'date')).toEqual('2010-05-10')
    expect(sanitizeDateString('2010xxx-05-10', 'date')).not.toEqual('2010-05-10')
    expect(sanitizeDateString('2010-05xxx-10', 'date')).not.toEqual('2010-05-10')
    expect(sanitizeDateString('2010-05-10xxx', 'date')).toEqual('2010-05-10')
  })
})


