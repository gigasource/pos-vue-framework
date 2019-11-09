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
    activatorHeight: 40,
    activatorWidth: 120,
    showMenu: true
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
  mounted() {
    setTimeout(() => {
      this.activatorHeight = 100;
      this.activatorWidth = 300
      setTimeout(() => {
        this.activatorHeight = 150;
        this.activatorWidth = 450
      }, 2000)
    }, 2000)
  },
  template: `
    <div data-app class="row-flex">
      <g-menu v-model="showMenu" :top="top" :bottom="bottom" :offset-x="offsetX" :offset-y="offsetY" :nudge-top="nudgeTop" 
              :nudge-bottom="nudgeBottom" :nudge-left="nudgeLeft" :nudge-right="nudgeRight">
        <template v-slot:activator="{toggleContent}">
          <g-btn @click="toggleContent" :width="activatorWidth" :height="activatorHeight">Activator</g-btn>
        </template>
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
      type: Boolean,
      default: boolean('close on content click', true)
    },
    closeOnClick: {
      type: Boolean,
      default: boolean('close on outside click', true)
    },
    openOnHover: {
      type: Boolean,
      default: boolean('open on hover', true)
    },
    openDelay: {
      type: Number,
      default: number('open delay (ms)', 500)
    },
    closeDelay: {
      type: Number,
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

export const gMenuHover = () => ({
  components: { GMenu, GBtn },
  data: () => ({
    showMenu: false
    }),
  props: {
    openOnHover: {
      type: Boolean,
      default: boolean('open on hover', true)
    },
    openDelay: {
      type: Number,
      default: number('open delay (ms)', 500)
    },
    closeDelay: {
      type: Number,
      default: number('close delay (ms)', 500)
    },
  },
  template: `
    <div data-app style="min-height: 80vh">
      <g-menu v-model="showMenu"
              :open-on-hover="openOnHover" :open-delay="openDelay" :close-delay="closeDelay" style="display: inline-flex" lazy>
        <template v-slot:activator="{toggleContent}"><g-btn @click="toggleContent">Activator</g-btn></template>
        <div>Content</div>
      </g-menu>
    </div>
  `
})