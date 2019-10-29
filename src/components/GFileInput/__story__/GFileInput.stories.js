import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'
import Vue from 'vue/dist/vue.common.js'
import GFileInput from '../GFileInput';
import GIcon from '../../GIcon/GIcon';
import GChip from "../../GChip/GChip";

export default {
  title: 'GFileInput',
  decorators: [withKnobs],
}

export const FileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  template: `<g-file-input></g-file-input>`,
});


