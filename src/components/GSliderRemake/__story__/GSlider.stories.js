import {number, boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GSlider from "../GSliderJSX";
import GIcon from "../../GIcon/GIcon";

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
  components: {GSlider, GIcon},
  data() {
    return {
      value: 0,
      seasons: [
        'Winter',
        'Spring',
        'Summer',
        'Fall',
      ],
      icons: [
        'mdi-snowflake',
        'mdi-leaf',
        'mdi-fire',
        'mdi-water',
      ],
    }
  },
  props: {
    min: {default: number('min', 0)},
    max: {default: number('max', 100)},
    vertical: {default: boolean('vertical', false)},
    step: {default: number('step', 25)},
    trackBgrColor: {default: text('track background color', 'lightBlue')},
    trackFillColor: {default: text('track fill color', '#00b0ff')},
    thumbColor: {default: text('thumb color', '#00b0ff')},
    thumbLabel: {type: String, default: text('thumb label', '')},
    icon: {default: text('icon', 'mdi-snowflake')},
  },
  template: `<div style="height: 500px; padding-top: 100px">
               <g-slider v-model="value"                         
                         :min="min"
                         :max="max"
                         :step="step"
                         ticks
                         :thumb-label="thumbLabel"
                         :vertical="vertical"
                         :thumbColor="thumbColor"
                         :trackFillColor="trackFillColor"
                         trackBgrColor="blue"
                         :trackBgrColor="trackBgrColor" >
                         <template v-slot:thumb-label="props"> 
                           <g-icon>{{icon}}</g-icon>
                         </template>
               </g-slider>
               <div><input v-model="value" style="border-style: none"></div>
             </div>`,
})

export const testSlider = () => ({
  components: {GSlider, GIcon},
  data() {
    return {
      slider: 45
    }
  },
  props: {
    icon: {default: text('icon', 'mdi-snowflake')},
  },
  template: `<div style="height: 500px; padding-top: 100px">
               <g-slider thumb-label>
                 <template v-slot:thumb-label="props" thumb-label="always"> 
                   <g-icon>{{icon}}</g-icon>
                 </template>
               </g-slider>
             </div>`,
})

