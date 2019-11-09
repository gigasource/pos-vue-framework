import {number, boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GRange from "../GSliderJSX";
import GIcon from "../../GIcon/GIcon";

export default {
  title: 'GRange',
  decorators: [withKnobs],
};

export const basicRange = () => ({
  components: {GRange},
  template: `<div style="height: 500px;">
               <g-range></g-range>
             </div>`,
})