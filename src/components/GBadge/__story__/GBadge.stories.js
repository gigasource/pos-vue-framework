import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GBadge from "../GBadge";
import GIcon from '../../GIcon/GIcon';


export default {
  title: 'GBadge',
  decorators: [withKnobs],
};

export const basicBadge = () => ({
  components: {GBadge, GIcon},
  props: {
    icon: {default: text('icon', 'mdi-close')},
    color: {default: text('color', 'pink')},
    bottom: {default: boolean('bottom', false)},
    left: {default: boolean('left', false)},
    overlap: {default: boolean('overlap', false)},
  },
  template: `<g-badge :bottom="bottom" :left="left" :overlap="overlap" :color="color">
              <g-icon large color="grey">mail</g-icon>
              <template v-slot:badge><span>!</span></template>
             </g-badge>`,
})
