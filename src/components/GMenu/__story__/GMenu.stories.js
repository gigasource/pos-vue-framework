import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import GMenu from '../GMenu';
import GBtn from '../../GBtn/GBtn';

export default {
  title: 'GMenu',
  decorators: [withKnobs]
}

export const gMenuLookAndFeel = () => ({
  components: { GMenu, GBtn },
  data: () => ({
    showMenu: false
  }),
  props: {
    top: {
      default: boolean('align top', false)
    },
    bottom: {
      default: boolean('align bottom', true)
    },
    offsetX: {
      default: boolean('offset X', false),
    },
    offsetY: {
      default: boolean('offset Y', true)
    },
    nudgeTop: {
      default: number('nudge top (px)', 0)
    },
    nudgeBottom: {
      default: number('nudge bottom (px)', 0)
    },
    nudgeLeft: {
      default: number('nudge left (px)', 0)
    },
    nudgeRight: {
      default: number('nudge right (px)', 0)
    },

  },
  template: `
    <div data-app class="row-flex">
      <g-menu v-model="showMenu" :top="top" :bottom="bottom" :offset-x="offsetX" :offset-y="offsetY" :nudge-top="nudgeTop" 
              :nudge-bottom="nudgeBottom" :nudge-left="nudgeLeft" :nudge-right="nudgeRight">
        <template v-slot:activator="{toggleContent}"><g-btn @click="toggleContent">Activator</g-btn></template>
        <div>Content</div>
      </g-menu>
    </div>
  `
})

export const gMenuBehavior = () => ({
  components: { GMenu, GBtn },
  data: () => ({
    showMenu: false
  }),
  props: {
    closeOnContentClick: {
      default: boolean('close on content click', true)
    },
    closeOnClick: {
      default: boolean('close on outside click', true)
    },
    openOnHover: {
      default: boolean('open on hover', true)
    },
    openDelay: {
      default: number('open delay (ms)', 500)
    },
    closeDelay: {
      default: number('close delay (ms)', 500)
    },
  },
  template: `
    <div data-app style="min-height: 80vh">
      <g-menu v-model="showMenu" :close-on-content-click="closeOnContentClick" :close-on-click="closeOnClick"
              :open-on-hover="openOnHover" :open-delay="openDelay" :close-delay="closeDelay">
        <template v-slot:activator="{toggleContent}"><g-btn @click="toggleContent">Activator</g-btn></template>
        <div>Content</div>
      </g-menu>
    </div>
  `
})