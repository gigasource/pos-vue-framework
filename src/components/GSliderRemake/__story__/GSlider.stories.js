import {number, boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GSlider from "../GSliderJSX";

export default {
  title: 'GSlider',
  decorators: [withKnobs],
};

export const basicSlider = () => ({
  components: {GSlider},
  template: `<div style="height: 500px;">
               <g-slider></g-slider>
             </div>`,
})

export const mainFeatureSlider = () => ({
  components: {GSlider},
  data() {
    return {
      value: 0
    }
  },
  props: {
    min: {default: number('min', 0)},
    max: {default: number('max', 100)},
    vertical: {default: boolean('vertical', false)},
    step: {default: number('step', 10)},
    trackBgrColor: {default: text('track background color', 'lightBlue')},
    trackFillColor: {default: text('track fill color', '#00b0ff')},
    thumbColor: {default: text('thumb color', 'pink')},
  },
  template: `<div style="height: 500px;">
               <g-slider v-model="value"                         
                         :min="min"
                         :max="max"
                         :step="step"
                         ticks
                         :vertical="vertical"
                         :thumbColor="thumbColor"
                         :trackFillColor="trackFillColor"
                         trackBgrColor="blue"
                         :trackBgrColor="trackBgrColor" />
               <div><input v-model="value" style="border-style: none"></div>
             </div>`,
})

