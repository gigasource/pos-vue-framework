import {number, boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GRangeSlider from "../GRangeSlider.vue";
import GIcon from "../../GIcon/GIcon";

export default {
  title: 'GRangeSlider',
  decorators: [withKnobs],
};

export const basicRange = () => ({
  components: {GRangeSlider},
  data() {
    return {
      value: [1]
    }
  },
  props: {
    disabled: {
      default: boolean('Disabled', false)

    }
  },
  template: `<div style="height: 500px;">
               <g-range-slider :disabled="disabled" :value="value"/>
             </div>`,
})

export const thumbLabel = () => ({
  components: {GRangeSlider, GIcon},
  data() {
    return {
      value: [0, 0],
    }
  },
  props: {
    trackFillColor: {default: text('track fill color', "#00b0ff")},
    trackBgrColor: {default: text('track background color', "light blue lighten 3")},
    thumbColor: {default: text('thumb color', '#00b0ff')},
    thumbLabel: {type: String, default: text('thumb label', '')},
    thumbSize: {type: Number, default: number('thumb size', 36)},
    icon: {default: text('icon', 'mdi-leaf')}
  },
  template: `<div style="height: 500px; padding-top: 100px">
               <g-range-slider v-model="value"
               :thumbColor="thumbColor"
               :trackFillColor="trackFillColor"
               :trackBgrColor="trackBgrColor"
               :thumb-size="thumbSize"
               :thumb-label="thumbLabel"/>
               <div style="padding-left: 335px"><input v-model="value[0]" style="border-style: none;" placeholder="0"></div>
               <g-range-slider
               inverseLabel
               :thumbColor="thumbColor"
               :trackFillColor="trackFillColor"
               :trackBgrColor="trackBgrColor"
               :thumb-size="thumbSize"
               :thumb-label="thumbLabel">
                 <template v-slot:thumb-label="props"> 
                   <g-icon>{{icon}}</g-icon>
                 </template>
               </g-range-slider>
             </div>`,
})

export const ticksLabel = () => ({
  components: {GRangeSlider, GIcon},
  data() {
    return {
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
      value: [0, 1]
    }
  },
  props: {
    vertical: {default: boolean('Vertical', false)}
  },
  template: `<div style="height: 500px; padding-top: 50px">
               <g-range-slider v-model="value"
               max="30"
               step="10" 
               ticks
               track-fill-color="orange"
               thumb-color="pink"
               :tick-labels="seasons" 
               thumb-label="always"
               :vertical="vertical">
                 <template v-slot:thumb-label="props">
                    <g-icon>
                      {{ icons[props.value/10] }}
                    </g-icon>
                 </template>
               </g-range-slider>
             </div>`,
})

export const mainFeature = () => ({
  components: {GRangeSlider, GIcon},
  data() {
    return {
      value: [0, 1],
    }
  },
  props: {
    min: {default: number('min', 0)},
    max: {default: number('max', 100)},
    vertical: {default: boolean('vertical', false)},
    step: {default: number('step', 25)},
    trackBgrColor: {default: text('track background color', 'light blue lighten 3')},
    trackFillColor: {default: text('track fill color', '#00b0ff')},
    thumbColor: {default: text('thumb color', '#00b0ff')},
    thumbLabel: {type: String, default: text('thumb label', '')},
    icon: {default: text('icon', 'mdi-snowflake')},
  },
  template: `<div style="height: 700px; padding-top: 100px">
               <g-range-slider v-model="value"                         
                         :min="min"
                         :max="max"
                         :step="step"
                         ticks
                         :thumb-label="thumbLabel"
                         :vertical="vertical"
                         :thumbColor="thumbColor"
                         :trackFillColor="trackFillColor"
                         :trackBgrColor="trackBgrColor" >
                         <template v-slot:thumb-label="props"> 
                           <g-icon>{{icon}}</g-icon>
                         </template>
               </g-range-slider>
               <div style="padding-left: 335px"><input v-model="value" style="border-style: none;"></div>
             </div>`,
})

export const testRange = () => ({
  components: {GRangeSlider, GIcon},
  data() {
    return {
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
    icon: {default: text('icon', 'mdi-snowflake')},
  },
  template: `<div style="height: 500px; padding-top: 100px">
               <g-range-slider 
               max="30"
               step="10" 
               ticks
               :tick-labels="seasons" 
               />
             </div>`,
})

