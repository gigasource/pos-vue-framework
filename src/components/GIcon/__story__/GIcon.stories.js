import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GIcon from '../GIcon';

export default {
  title: 'GIcon',
  decorators: [withKnobs],
};

export const iconBasic = () => ({
  components: { GIcon },
  template: `<g-icon>fas fa-cat</g-icon>`,
})

import Vue from 'vue/dist/vue.common.js'

