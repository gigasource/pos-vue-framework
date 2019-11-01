// https://en.wikipedia.org/wiki/HSL_and_HSV
// http://learn.leighcotnoir.com/artspeak/elements-color/hue-value-saturation/
// https://psychology.wikia.org/wiki/HSL_and_HSV
// https://www.w3schools.com/colors/colors_hsl.asp
// Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.
// Saturation is a percentage value; 0% means a shade of gray and 100% is the full color.
// Lightness is also a percentage; 0% is black, 100% is white.
import { reactive } from '@vue/composition-api';
import getRenderColorEditorFn from './colorEditor';
import getRenderAdjustPreview from './colorAdjustPreview';
import { getRenderCanvasFn } from './colorCanvas';
import { fromHexa } from '../GColorPickerUtil';

export default function getColorPickerRenderFn(props, context, onColorSelected) {
  const state = reactive({
    color: fromHexa('#FF0000FF')
  })

  function updateColor(color) {
    state.color = color
    onColorSelected(state.color.hexa)
  }

  const renderCanvas = getRenderCanvasFn(props, context, state, updateColor)
  const renderAdjustPreview = getRenderAdjustPreview(state, updateColor)
  const renderColorEditor = getRenderColorEditorFn(state, updateColor)

  return function () {
    return [
      renderCanvas(),
      renderAdjustPreview(),
      renderColorEditor()
    ]
  }
}
