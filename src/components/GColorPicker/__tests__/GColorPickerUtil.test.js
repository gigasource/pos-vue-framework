// Created at 2019-10-31 17:20 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin from 'vue'
import { fromHSVA } from '../GColorPickerUtil';
import { HSVAtoRGBA } from '../../../utils/colors';

describe('/GColorPickerUtil', () => {
  createLocalVue().use(plugin)
  const hsva = { h: 0, s: 1, v: 1, a: 0.26666666666666666 }

  it('Should work', () => {
    const rs = fromHSVA(hsva)
    expect(rs.rgba).toEqual({r: 255, g: 0, b: 0, a: 0.26666666666666666})
    expect(rs.hsla).toEqual({h: 0, s: 1, l: 0.5, a: 0.26666666666666666})
  })
})
