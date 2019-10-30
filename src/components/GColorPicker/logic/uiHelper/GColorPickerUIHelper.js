// https://en.wikipedia.org/wiki/HSL_and_HSV
// http://learn.leighcotnoir.com/artspeak/elements-color/hue-value-saturation/
// https://psychology.wikia.org/wiki/HSL_and_HSV
// https://www.w3schools.com/colors/colors_hsl.asp
// Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.
// Saturation is a percentage value; 0% means a shade of gray and 100% is the full color.
// Lightness is also a percentage; 0% is black, 100% is white.
export function updateCanvas(canvas, hue) {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
  saturationGradient.addColorStop(0, 'hsl(0, 0%, 100%)') // white
  saturationGradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`)
  ctx.fillStyle = saturationGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  valueGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0') // transparent
  valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)') // black
  ctx.fillStyle = valueGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}
