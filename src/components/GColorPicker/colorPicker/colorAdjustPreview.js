import { fromHSVA } from '../GColorPickerUtil';
import { RGBAtoCSS, RGBtoCSS } from '../../../utils/colors';
import { computed } from '@vue/composition-api'

export default function getRenderAdjustPreview(state, updateColor) {
  const cptAlphaAdjustSlider = computed(() => ({
    backgroundImage: `linear-gradient(to right, transparent, ${RGBtoCSS(state.color.rgba)})`
  }))
  const cptPreviewClass = computed(() => ({
    'g-color-picker__preview': true,
    'g-color-picker__preview--transparent': state.color.alpha < 1
  }))
  const cptPreviewStyle = computed(() => ({
    backgroundColor: RGBAtoCSS(state.color.rgba)
  }))

  return function () {
    return (
        <div class='g-color-picker__preview-slider-wrapper'>
          <div class='g-color-picker__adjust'>
            <div class='g-color-picker__adjust__hue'>
              <g-slider
                  value={state.color ? state.color.hue : 0}
                  step={1} min={0} max={360}
                  vOn:input={val => state.color.hue !== val && updateColor(fromHSVA({ ...state.color.hsva, h: val }))}
              ></g-slider>
            </div>

            <div class='g-color-picker__adjust__alpha'>
              <g-slider
                  style={cptAlphaAdjustSlider.value}
                  value={state.color ? state.color.alpha : 0}
                  step={0.01} min={0} max={1}
                  vOn:input={val => (state.color.alpha !== val) && updateColor(fromHSVA({ ...state.color.hsva, a: val }))}
              ></g-slider>
            </div>
          </div>
          <div class={cptPreviewClass.value} style={cptPreviewStyle.value}/>
        </div>)
  }
}
