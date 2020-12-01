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
              :nudge-bottom="nudgeBottom" :nudge-left="nudgeLeft" :nudge-right="nudgeRight" eager>
        <template v-slot:activator="{on}">
          <g-btn v-on="on" :width="activatorWidth" :height="activatorHeight">Activator</g-btn>
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
        <template v-slot:activator="{on}"><g-btn v-on="on">Activator</g-btn></template>
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
        <template v-slot:activator="{on}"><g-btn v-on="on">Activator</g-btn></template>
        <div>Content</div>
      </g-menu>
    </div>
  `
})

export const gMenuAbsolute = () => ({
  components: { GMenu, GBtn },
  data: () => ({
    showMenu: false
    }),
  props: {
    openDelay: {
      type: Number,
      default: number('open delay (ms)', 500)
    },
    closeDelay: {
      type: Number,
      default: number('close delay (ms)', 500)
    },
    absolute: {
      type: Boolean,
      default: boolean('absolute', true)
    }
  },
  template: `
    <div data-app style="min-height: 80vh">
      <g-menu v-model="showMenu"
              :absolute="absolute" :open-delay="openDelay" :close-delay="closeDelay" style="display: inline-flex" lazy>
        <template v-slot:activator="{on}"><g-btn v-on="on">Activator</g-btn></template>
        <div style="background: white">Content</div>
      </g-menu>
    </div>
  `
})

export const nestedMenus = () => ({
  components: { GMenu, GBtn },
  data: () => ({
    showDialog: false,
    showMenu1: false,
    showMenu2: false,
    menuKey: 1
  }),
  template: `
    <div data-app style="min-height: 80vh">
    <g-btn @click.stop="showDialog = true" class="mr-5">Toggle dialog</g-btn>
    <g-btn @click.stop="menuKey += 1">Reset menu</g-btn>
    <g-dialog v-model="showDialog">
      <g-card>
        <g-card-title>Dialog</g-card-title>

        <g-card-actions>
          <g-menu v-model="showMenu1" style="display: inline-flex" lazy :key="menuKey">
            <template v-slot:activator="{on}">
              <g-btn v-on="on">Outer menu</g-btn>
            </template>
            <div style="background: white">
              Outer menu content
              <g-menu v-model="showMenu2">
                <template #activator="{on}">
                  <g-btn v-on="on">Inner menu</g-btn>
                </template>
                <div style="background: #fff">
                  <div>Inner menu content</div>
                  <g-btn @click.stop="showDialog = false">Close dialog</g-btn>
                </div>
              </g-menu>
            </div>
          </g-menu>

          <g-spacer/>

          <g-btn @click.stop="showDialog = false">Close dialog</g-btn>
        </g-card-actions>
      </g-card>
    </g-dialog>
    </div>
  `
})
