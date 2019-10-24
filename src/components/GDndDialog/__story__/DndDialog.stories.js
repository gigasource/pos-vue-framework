import {number , withKnobs} from '@storybook/addon-knobs';
import GDndDialog3 from '../GDndDialog3'
import GBtn from '../../GBtn/GBtn';

export default {
  title: 'Dnd Dialog',
  decorators: [withKnobs],
};

export const test = () => ({
  components: { GBtn, GDndDialog3 },
  props: {
    minWidth: {default: number('Min Width', 200)},
    minHeight: {default: number('Min Height', 100)},
    width: {type: Number, default: number('Start width', 300)},
    height: {type: Number, default: number('Start height', 250)}
  },
  data() {
    return {
      dnddialog: false
    }
  },
  template:
    `<div data-app>
    <g-btn color="red" width="100" height="50" @click="dnddialog = true">Open Dialog</g-btn>
    
    <g-dnd-dialog3 v-model="dnddialog" :width="width" :height="height" :min-width="200" :min-height="100" lazy>
      <template v-slot:title>
        Dialog header
      </template>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </g-dnd-dialog3>
    </div>`,
})