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
    show: {default: boolean('show', true)},
  },
  template: `<g-badge v-model="show" :bottom="bottom" :left="left" :overlap="overlap" :color="color">
              <g-icon large color="grey">mail</g-icon>
              <template v-slot:badge><span>!</span></template>
             </g-badge>`,
})

export const eventListenBadge = () => ({
  components: {GBadge, GIcon},
  data() {
    return {
      show: false
    }
  },
  props: {
    icon: {default: text('icon', 'mdi-close')},
    color: {default: text('color', 'pink')},
    bottom: {default: boolean('bottom', false)},
    left: {default: boolean('left', false)},
    overlap: {default: boolean('overlap', false)},
    //show: {default: boolean('show', true)},
  },
  template: `<g-badge v-model="show" :bottom="bottom" :left="left" :overlap="overlap" :color="color">
              <span @mouseover="show = true"
                   @mouseout="show = false">
                   <g-icon large color="grey">mail</g-icon>
              </span>
              <template v-slot:badge><span>!</span></template>
             </g-badge>`,
})
