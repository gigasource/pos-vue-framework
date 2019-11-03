import { shouldApplyColor, isCssColor, setBackgroundColor, setTextColor } from '../colorable'

describe('shouldApplyColor', () => {
  it('should not apply color if color is not string', () => {
    expect(shouldApplyColor(0, {})).toBe(false)
    expect(shouldApplyColor(false, {})).toBe(false)
    expect(shouldApplyColor(true, {})).toBe(false)
    expect(shouldApplyColor({}, {})).toBe(false)
    expect(shouldApplyColor(/regex/g, {})).toBe(false)
    expect(shouldApplyColor([], {})).toBe(false)
    expect(shouldApplyColor(() => {}, {})).toBe(false)
  })

  it('should not apply color if data is not undefined, null or object', () => {
    expect(shouldApplyColor('foo', 0)).toBe(false)
    expect(shouldApplyColor('foo', '')).toBe(false)
    expect(shouldApplyColor('foo', true)).toBe(false)
    expect(shouldApplyColor('foo', false)).toBe(false)
    expect(shouldApplyColor('foo', () => {})).toBe(false)
    expect(shouldApplyColor('foo', [])).toBe(false)
  })

  it('should not apply color if data contain bgStyle or class prop is string', () => {
    expect(shouldApplyColor('foo', { bgStyle: '' })).toBe(false)
    expect(shouldApplyColor('foo', { class: '' })).toBe(false)
  })

  it('should not apply color if data is null or undefined', ()=> {
    expect(shouldApplyColor('foo', null)).toBe(false)
    expect(shouldApplyColor('foo', undefined)).toBe(false)
  })

  it('should apply color', () => {
    expect(shouldApplyColor('foo', {})).toBe(true)
  })
})

describe('isCssColor', () => {
  it('should return false if css is not start with # | rgb( | rgba( | hsl( | hsla(', () => {
    expect(isCssColor('CssColor')).toBe(false)
    expect(isCssColor('red')).toBe(false)
    expect(isCssColor('rgb')).toBe(false)
    expect(isCssColor('rgba')).toBe(false)
    expect(isCssColor('hsl')).toBe(false)
    expect(isCssColor('hsla')).toBe(false)
  })

  it('should return true if css start with # | rgb( | rgba( | hsl( | hsla(', () => {
    expect(isCssColor('#')).toBe(true)
    expect(isCssColor('rgb(')).toBe(true)
    expect(isCssColor('rgba(')).toBe(true)
    expect(isCssColor('hsl(')).toBe(true)
    expect(isCssColor('hsla(')).toBe(true)

    // Note that: Vuetify isCssColor test run still passed with invalid colors
    expect(isCssColor('#_after_that_every_thing_is_okay')).toBe(true)
    expect(isCssColor('rgb(_after_that_every_thing_is_okay')).toBe(true)
    expect(isCssColor('rgba(_after_that_every_thing_is_okay')).toBe(true)
    expect(isCssColor('hsl(_after_that_every_thing_is_okay')).toBe(true)
    expect(isCssColor('hsla(_after_that_every_thing_is_okay')).toBe(true)
  })
})

describe('setBackgroundColor', () => {
  describe('data object which has bgStyle or class property is string', () => {
    it('should not modify data with bgStyle is string', () => {
      expect(setBackgroundColor(undefined, { bgStyle: 'hello there' })).toEqual({ bgStyle: 'hello there' })
      expect(setBackgroundColor('foo', { bgStyle: 'hello there' })).toEqual({ bgStyle: 'hello there' })
      expect(setBackgroundColor('#fafafa', { bgStyle: 'hello there' })).toEqual({ bgStyle: 'hello there' })
      expect(setBackgroundColor('rgb(1, 1, 1, 1)', { bgStyle: 'hello there' })).toEqual({ bgStyle: 'hello there' })
      expect(setBackgroundColor('rgba(1, 1, 1, 1)', { bgStyle: 'hello there' })).toEqual({ bgStyle: 'hello there' })
      expect(setBackgroundColor('hsl(100, 50%, 10%)', { bgStyle: 'hello there' })).toEqual({ bgStyle: 'hello there' })
      expect(setBackgroundColor('hsla(100, 50%, 10%, 1)', { bgStyle: 'hello there' })).toEqual({ bgStyle: 'hello there' })
    })

    it('should not modify data with class is string', () => {
      expect(setBackgroundColor(undefined, { class: '54321' })).toEqual({ class: '54321' })
      expect(setBackgroundColor('foo', { class: '54321' })).toEqual({ class: '54321' })
      expect(setBackgroundColor('#fafafa', { class: '54321' })).toEqual({ class: '54321' })
      expect(setBackgroundColor('rgb(9,0,0)', { class: '54321' })).toEqual({ class: '54321' })
      expect(setBackgroundColor('rgba(0,0,0,0)', { class: '54321' })).toEqual({ class: '54321' })
      expect(setBackgroundColor('hsl(1, 50%, 50%)', { class: '54321' })).toEqual({ class: '54321' })
      expect(setBackgroundColor('hsla(1, 50%, 50%)', { class: '54321' })).toEqual({ class: '54321' })
    })
  })

  describe('set undefined color', () => {
    const color = undefined
    it('should not modify data if color is undefined', () => {
      expect(setBackgroundColor(color, undefined)).toEqual({})
      expect(setBackgroundColor(color, {})).toEqual({})
      expect(setBackgroundColor(color, { staticClass: 'g-color' })).toEqual({ staticClass: 'g-color' })
    })
  })

  describe('set non-string color', () => {
    it('should not modify data with non-string color', () => {
      expect(setBackgroundColor(0, undefined)).toEqual({})
      expect(setBackgroundColor(true, {})).toEqual({})
      expect(setBackgroundColor(false, {})).toEqual({})
      expect(setBackgroundColor({}, {})).toEqual({})
    })
  })

  describe('set non-CSS color', () => {
    it('should add non-Css color as class\'s property with value is true', () => {
      expect(setBackgroundColor('foo', undefined)).toEqual({ class: { foo: true } })
      expect(setBackgroundColor('foo', {})).toEqual({ class: { foo: true } })
      expect(setBackgroundColor('foo', { staticClass: '0_0_0_0' })).toEqual({ staticClass: '0_0_0_0', class: { foo: true } })
      expect(setBackgroundColor('foo', { class: { 'g-': true } })).toEqual({ class: { 'g-': true, foo: true } })
      expect(setBackgroundColor('foo', { bgStyle: { 'g-': true } })).toEqual({ bgStyle: { 'g-': true }, class: { foo: true } })
    })
  })

  // CSS color
  describe('set CSS color', () => {
    let faColor = '#fafafa'

    it('should add background-color and border-color bgStyle for undefined, empty, non-empty object with background CSS color', () => {
      expect(setBackgroundColor(faColor, undefined)).toEqual({
        bgStyle: {
          'background-color': faColor,
          'border-color': faColor
        }
      })

      expect(setBackgroundColor(faColor, {})).toEqual({
        bgStyle: {
          'background-color': faColor,
          'border-color': faColor
        }
      })

      expect(setBackgroundColor(faColor, { staticClass: '0_0_0' })).toEqual({
        staticClass: '0_0_0',
        bgStyle: {
          'background-color': faColor,
          'border-color': faColor
        }
      })

      expect(setBackgroundColor(faColor, { staticClass: '0_0_0', bgStyle: { foo: 'bar' } })).toEqual({
        staticClass: '0_0_0',
        bgStyle: {
          foo: 'bar',
          'background-color': faColor,
          'border-color': faColor
        }
      })

      expect(setBackgroundColor(faColor, { staticClass: '0_0_0', bgStyle: { foo: 'bar' }, class: { baz: 'foo' } })).toEqual({
        staticClass: '0_0_0',
        bgStyle: {
          foo: 'bar',
          'background-color': faColor,
          'border-color': faColor
        },
        class: {
          baz: 'foo'
        }
      })
    })
  })
})

describe('setTextColor', () => {
  it('It should add \'color\' and \'caret-color\' bgStyle property if input color is CSS color', () => {
    const color = '#fa'
    expect(setTextColor(color, {})).toEqual({ bgStyle: { color: color, 'caret-color': color } })
    expect(setTextColor(color, { bgStyle: { isActive: true } })).toEqual({ bgStyle: { isActive: true, color: color, 'caret-color': color } })
  })

  it('It should add \'<colorName>--text\' and \'text--<colorModifier>\' class property if input color is CSS color', () => {
    const colorWithoutModifier = 'foo'  // foo: colorName
    const colorWithModifier = 'foo bar' // foo: colorName, bar: colorModifier
    expect(setTextColor('', { class: { isActive: true } })).toEqual({ class: { isActive: true }})
    expect(setTextColor(' ', { class: { isActive: true } })).toEqual({ class: { isActive: true, '--text': true }})
    expect(setTextColor(' bar', { class: { isActive: true } })).toEqual({ class: { isActive: true, 'bar--text': true }})
    expect(setTextColor(colorWithoutModifier, { class: { isActive: true } })).toEqual({ class: { isActive: true, 'foo--text': true }})
    expect(setTextColor(colorWithModifier, { class: { isActive: true } })).toEqual({ class: { isActive: true, 'foo--text': true, 'text--bar': true } })
  })
})
