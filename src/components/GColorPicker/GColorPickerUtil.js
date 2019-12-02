import {
  HexToHSVA,
  HSVAtoHex,
  HSVAtoHSLA,
  HSVAtoRGBA,
  parseHex,
  RGBAtoHex,
  RGBAtoHSVA
} from '../../utils/colors';

export function fromHSVA (hsva) {
  hsva = { ...hsva }
  const hexa = HSVAtoHex(hsva)
  const hsla = HSVAtoHSLA(hsva)
  const rgba = HSVAtoRGBA(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 7),
    hexa,
    hsla,
    hsva,
    hue: hsva.h,
    rgba,
  }
}

export function fromRGBA (rgba) {
  const hsva = RGBAtoHSVA(rgba)
  const hexa = RGBAtoHex(rgba)
  const hsla = HSVAtoHSLA(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 7),
    hexa,
    hsla,
    hsva,
    hue: hsva.h,
    rgba,
  }
}

export function fromHexa (hexa) {
  const hsva = HexToHSVA(hexa)
  const hsla = HSVAtoHSLA(hsva)
  const rgba = HSVAtoRGBA(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 7),
    hexa,
    hsla,
    hsva,
    hue: hsva.h,
    rgba,
  }
}

export function fromHex (hex) {
  return fromHexa(parseHex(hex))
}
