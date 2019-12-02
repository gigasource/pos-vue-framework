// For converting sRGB to XYZ
const srgbReverseMatrix = [
  [0.4124, 0.3576, 0.1805],
  [0.2126, 0.7152, 0.0722],
  [0.0193, 0.1192, 0.9505],
]

// Reverse gamma adjust
const srgbReverseTransform = (C) => (
    C <= 0.04045
        ? C / 12.92
        : ((C + 0.055) / 1.055) ** 2.4
)

export function toXYZ (rgb) {
  const xyz = [0, 0, 0]
  const transform = srgbReverseTransform
  const matrix = srgbReverseMatrix

  // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
  const r = transform((rgb >> 16 & 0xff) / 255)
  const g = transform((rgb >> 8 & 0xff) / 255)
  const b = transform((rgb >> 0 & 0xff) / 255)

  // Matrix color space transform
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b
  }

  return xyz
}
