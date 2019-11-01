import { fromHSVA } from '../GColorPickerUtil';
import { RGBAtoCSS, RGBtoCSS } from '../../../utils/colors';

export default function getRenderAdjustPreview(state, updateColor) {
function renderHueAdjustSlider() {
    return (
        <div>
          <g-slider
              class='g-color-picker__adjust__hue'
              value={state.color ? state.color.hue : 0}
              step={1} min={0} max={360}
              vOn:input={val => state.color.hue !== val && updateColor(fromHSVA({ ...state.color.hsva, h: val }))}
          ></g-slider>
        </div>
    )
  }

  function renderAlphaAdjustSlider() {
    return <div class='g-color-picker__adjust__alpha'>
      <g-slider
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${RGBtoCSS(state.color.rgba)})` }}
          value={state.color ? state.color.alpha : 0}
          step={0.01} min={0} max={1}
          vOn:input={val => (state.color.alpha !== val) && updateColor(fromHSVA({ ...state.color.hsva, a: val }))}
      ></g-slider>
    </div>
  }

  // preview
  function renderPreview() {
    return <div class={['g-color-picker__preview', { 'g-color-picker__preview--transparent': state.color.alpha < 1 }]} style={{
      backgroundColor: RGBAtoCSS(state.color.rgba)
    }}></div>
  }

  return function() {
    return <div class='g-color-picker__preview-slider-wrapper'>
      <div class='g-color-picker__adjust'>
        {renderHueAdjustSlider()}
        {renderAlphaAdjustSlider()}
      </div>
      {renderPreview()}
    </div>
  }
}
