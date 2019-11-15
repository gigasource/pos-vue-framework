import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GBtn from '../../GBtn/GBtn';
import GCard from '../../GCard/GCard';
import GCardTitle from '../../GCard/GCardTitle';
import {GCardText, GCardActions} from '../../GCard/GCardFunctionalComponent'
import GDialog from '../GDialog';

export default {
  title: 'GDialog',
  decorators: [withKnobs],
};

export const Basic = () => ({
  components: { GDialog, GCardText, GCardActions, GCardTitle, GCard, GBtn },
  props: {
    width: {default: number('Width', 500)},
    overlayColor: {default: text('Overlay Color', '#212121')},
    overlayOpacity: {default: number('Overlay Opacity', 0.46)},
    persistent: {default: boolean('Persistent', false)},
    hideOverlay: {default: boolean('Hide Overlay', false)},
    fullscreen: {default: boolean('Fullscreen', false)},
  },
  data() {
    return {
      dialog: false,
    }
  },
  template: `
  <div data-app>
    <g-dialog v-model="dialog" :width="width" :overlay-color="overlayColor" :overlay-opacity="overlayOpacity" :hideOverlay="hideOverlay" :persistent="persistent" :fullscreen="fullscreen">
      <template v-slot:activator="{ toggleDialog }">
        <g-btn width="150" height="50" @click="toggleDialog">Open Dialog</g-btn>
      </template>
      <g-card flat elevation="16">
        <g-card-title class="bg-grey-lighten-2 fs-large fw-700">
          Privacy Policy
        </g-card-title>
        <g-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          pidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </g-card-text>
        <div>
          <hr/>
        </div>
        <g-card-actions>
          <g-btn flat right @click="dialog = false">I accept</g-btn>
        </g-card-actions>
      </g-card>
    </g-dialog>
  </div>
  `
})

export const OverflowContent = () => ({
  components: { GDialog, GCardText, GCardActions, GCardTitle, GCard, GBtn },
  props: {
    width: {default: number('Width', 500)},
    overlayColor: {default: text('Overlay Color', '#212121')},
    overlayOpacity: {default: number('Overlay Opacity', 0.46)},
    persistent: {default: boolean('Persistent', false)},
    hideOverlay: {default: boolean('Hide Overlay', false)},
    fullscreen: {default: boolean('Fullscreen', false)},
    scrollable: {default: boolean('Scrollable', false)},
  },
  data() {
    return {
      dialog: false,
    }
  },
  template: `
  <div data-app>
    <g-dialog v-model="dialog" :width="width" :overlay-color="overlayColor" :overlay-opacity="overlayOpacity" :persistent="persistent"  :hideOverlay="hideOverlay" :scrollable="scrollable" :fullscreen="fullscreen">
      <template v-slot:activator="{ toggleDialog }">
        <g-btn width="150" height="50" @click="toggleDialog">Open Dialog</g-btn>
      </template>
      <g-card flat elevation="16">
        <g-card-title class="bg-grey-lighten-2 fs-large fw-700">
          Privacy Policy
        </g-card-title>
        <g-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </g-card-text>
        <div>
          <hr/>
        </div>
        <g-card-actions>
          <g-btn flat right @click="dialog = false">I accept</g-btn>
        </g-card-actions>
      </g-card>
    </g-dialog>
  </div>
  `
})

export const Nested = () => ({
  components: { GDialog, GCardText, GCardActions, GCardTitle, GCard, GBtn },
  data() {
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false
    }
  },
  template:
    `
  <div data-app>
    <g-dialog v-model="dialog1" :width="500" scrollable fullscreen>
      <template v-slot:activator="{ toggleDialog }">
        <g-btn width="150" height="50" @click="toggleDialog">Open Dialog 1</g-btn>
      </template>
      <g-card flat elevation="16">
        <g-card-title class="bg-grey-lighten-2 fs-large fw-700">
          Privacy Policy
        </g-card-title>
        <g-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </g-card-text>
        <div>
          <hr/>
        </div>
        <g-card-actions>
          <g-btn flat right @click="dialog1 = false">I accept</g-btn>
          <g-btn flat right @click="dialog2 = true">Open Dialog 2</g-btn>
        </g-card-actions>
      </g-card>
    </g-dialog>
    
    <g-dialog v-model="dialog2" :width="500" scrollable>
      <template v-slot:activator="{ toggleDialog }">
        <g-btn width="150" height="50" @click="toggleDialog">Open Dialog 2</g-btn>
      </template>
      <g-card flat elevation="16">
        <g-card-title class="bg-grey-lighten-2 fs-large fw-700">
          Privacy Policy
        </g-card-title>
        <g-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </g-card-text>
        <div>
          <hr/>
        </div>
        <g-card-actions>
          <g-btn flat right @click="dialog2 = false">I accept</g-btn>
          <g-btn flat right @click="dialog3 = true">Open Dialog 2</g-btn>
        </g-card-actions>
      </g-card>
    </g-dialog>
    
    <g-dialog v-model="dialog3" :width="500">
      <template v-slot:activator="{ toggleDialog }">
        <g-btn width="150" height="50" @click="toggleDialog">Open Dialog 3</g-btn>
      </template>
      <g-card flat elevation="16">
        <g-card-title class="bg-grey-lighten-2 fs-large fw-700">
          Privacy Policy
        </g-card-title>
        <g-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. 
        </g-card-text>
        <div>
          <hr/>
        </div>
        <g-card-actions>
          <g-btn flat right @click="dialog3 = false">I accept</g-btn>
        </g-card-actions>
      </g-card>
    </g-dialog>
  </div>
  `
})