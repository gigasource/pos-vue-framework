import { createNativeLocaleFormatter, monthChange, pad, sanitizeDateString } from '../utils'

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

describe('GDatePicker/util/monthChange.ts', () => {
  it('should change month', () => {
    expect(monthChange('2000-01', -1)).toBe('1999-12')
    expect(monthChange('2000-01', +1)).toBe('2000-02')
    expect(monthChange('2000-12', -1)).toBe('2000-11')
    expect(monthChange('2000-12', +1)).toBe('2001-01')
  })
})

describe('GDatePicker/util/createNativeLocaleFormatter', () => {
  it('should format dates', () => {
    const formatter = createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' })
    expect(formatter('2013-2-07')).toBe('7')
  })

  it('should format date with year < 1000', () => {
    const formatter = createNativeLocaleFormatter(undefined, { year: 'numeric', timeZone: 'UTC' })
    expect(formatter('13-2-07')).toBe('13')
  })

  it('should format dates if Intl is not defined', () => {
    const oldIntl = global.Intl

    global.Intl = null
    const formatter = createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' }, { start: 0, length: 10 })
    expect(formatter('2013-2-7')).toBe('2013-02-07')
    expect(formatter('2013-2')).toBe('2013-02-01')
    expect(formatter('2013')).toBe('2013-01-01')

    const nullFormatter = createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' })
    expect(nullFormatter).toBeUndefined()
    global.Intl = oldIntl
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


