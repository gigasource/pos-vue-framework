import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import GBadge from '../GBadge';
import GBtn from '../../GBtn/GBtn';
import GIcon from '../../GIcon/GIcon';

export default {
  title: 'GBadge',
  decorators: [withKnobs]
}

export const basic = () => ({
  components: { GBadge, GBtn, GIcon },
  data () {
    return {
      show : true
    }
  },
  props: {
    overlay: {
      type: Boolean,
      default: boolean('Overlay Badge', false)
    },
    left: {
      type: Boolean,
      default: boolean('Left', false)
    },
    bottom: {
      type: Boolean,
      default: boolean('Bottom', false)
    },
    color: {
      type: String,
      default: text('Color', 'blue')
    },
    showOnHover: {
      type: Boolean,
      default: boolean('Show on hover', false)
    }
  },
  template: `
  <g-badge :overlay="overlay" :left="left" :bottom="bottom" :color="color" :show-on-hover="showOnHover" v-model="show" style="margin: 12px">
    <template v-slot:badge>
      <g-icon x-small>notifications</g-icon>
    </template>
    <g-btn @click="show = !show">Toggle</g-btn>
  </g-badge>
  `
})