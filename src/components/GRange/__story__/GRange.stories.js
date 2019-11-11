import {number, boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GRange from "../GRange.vue";
import GIcon from "../../GIcon/GIcon";

export default {
  title: 'GRange',
  decorators: [withKnobs],
};

export const basicRange = () => ({
  components: {GRange},
  template: `<div style="height: 500px; padding-top: 100px">
               <g-range step="25" ticks="always" thumb-label track-fill-color="#00b0ff" track-bgr-color="lightBlue" thumb-color="#00b0ff"/>
             </div>`,
})