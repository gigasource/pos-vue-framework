import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GBadge from '../GBadge';
import GBtn from '../../GBtn/GBtn';
import GIcon from '../../GIcon/GIcon';

export default {
  title: 'GBadge',
  decorators: [withKnobs]
}

export const basic = () => ({
  components: { GBadge, GBtn, GIcon },
  data() {
    return {
      show: true
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
    nudgeTop: {
      type: Number,
      default: number('nudgeTop', 0, { min: 0, max: 50 })
    },
    nudgeBottom: {
      type: Number,
      default: number('nudgeBottom', 0, { min: 0, max: 50 })
    },
    nudgeLeft: {
      type: Number,
      default: number('nudgeLeft', 0, { min: 0, max: 50 })
    },
    nudgeRight: {
      type: Number,
      default: number('nudgeRight', 0, { min: 0, max: 50 })
    },
    showOnHover: {
      type: Boolean,
      default: boolean('Show on hover', false)
    },
    inline: {
      type: Boolean,
      default: boolean('Inline', false)
    },
    badgeSize: {
      type: Number,
      default: number('badgeSize', 22, {
        min: 12,
        max: 38
      })
    }
  },
  template: `
  <g-badge :overlay="overlay" :badge-size="badgeSize" :nudge-top="nudgeTop" :nudge-bottom="nudgeBottom" :nudge-left="nudgeLeft" :nudge-right="nudgeRight" :left="left" :bottom="bottom" :color="color" :show-on-hover="showOnHover" :inline="inline" v-model="show" style="margin: 12px">
    <template v-slot:badge>
      <g-icon size="12px">notifications</g-icon>
    </template>
    <g-btn @click="show = !show">Toggle</g-btn>
  </g-badge>
  `
})

export const soloInline = () => ({
  components: { GBadge, GIcon },
  props: {
    color: {
      type: String,
      default: text('Color', 'blue')
    },
    inline: {
      type: Boolean,
      default: boolean('Inline', true)
    }
  },
  template: `
  <g-badge :color="color" :inline="inline">
    <template v-slot:badge>
      <g-icon x-small>notifications</g-icon>
    </template>
  </g-badge>
  `
})
