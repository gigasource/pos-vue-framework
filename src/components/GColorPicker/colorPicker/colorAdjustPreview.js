import { fromHSVA } from '../GColorPickerUtil';
import { RGBAtoCSS, RGBtoCSS } from '../../../utils/colors';
import { computed } from 'vue'

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
    // TODO:
    //  Show transparent background image for alpha slider
    return (
        <div class='g-color-picker__preview-slider-wrapper'>
          <div class='g-color-picker__adjust'>
            <div class='g-color-picker__adjust__hue'>
              <g-slider
                  height="5px"
                  trackColor='linear-gradient(to right, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%, #00F 66.66%, #F0F 83.33%, #F00 100%)'
                  modelValue={state.color ? state.color.hue : 0}
                  step={1} min={0} max={360}
                  onUpdate:modelValue={val => state.color.hue !== val && updateColor(fromHSVA({ ...state.color.hsva, h: val }))}
              ></g-slider>
            </div>

            <div class='g-color-picker__adjust__alpha'>
              <g-slider
                  height="5px"
                  trackColor={ `linear-gradient(to right, transparent, ${RGBtoCSS(state.color.rgba)})`}
                  modelValue={state.color ? state.color.alpha : 0}
                  step={0.01} min={0} max={1}
                  onUpdate:modelValue={val => (state.color.alpha !== val) && updateColor(fromHSVA({ ...state.color.hsva, a: val }))}
              ></g-slider>
            </div>
          </div>
          <div class={cptPreviewClass.value} style={cptPreviewStyle.value}/>
        </div>)
  }
}
