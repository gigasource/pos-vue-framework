import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GSlider from "../GSliderJSX";
import GSld from "../../GInput/GSlider";

export default {
  title: 'GSlider',
  decorators: [withKnobs],
};

export const basicSlider = () => ({
  components: {GSlider, GSld},
  template: `<div style="height: 500px;">
               <g-slider min="20" readonly></g-slider>
             </div>`,
})
