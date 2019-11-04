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

export const basicFileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  template: `<g-file-input></g-file-input>`,
});

export const mainFeatureFileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  props: {
    multiple: {default: boolean('multiple', false)},
    accept: {default: text('accept', '')},
    showSize: {default: boolean('show size', false)},
    counter: {default: boolean('counter', false)},
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},
  },
  template: `<g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           ></g-file-input>`,
});

export const fullFeatureFileInput = () => ({
  components: {GFileInput, GIcon, GChip},
  props: {
    multiple: {default: boolean('multiple', false)},
    accept: {default: text('accept', '')},
    showSize: {default: boolean('show size', false)},
    counter: {default: boolean('counter', false)},
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},

    prependIcon: {default: text('prepend-outer', 'person')},
    prependInnerIcon: {default: text('prepend-inner', 'mdi-file')},
    appendIcon: {default: text('append-inner', 'check')},
    appendOuterIcon: {default: text('append-outer', 'home')},

    label: {default: text('label', '')},
    placeholder: {default: text('placeholder', '')},
    hint: {default: text('hint', '')},
  },
  template: `<g-file-input :multiple="multiple"
                           :accept="accept"
                           :show-size="showSize"
                           :counter="counter"
                           :chips="chips"
                           :smallChips="smallChips"
                           
                           :prependIcon="prependIcon"
                           :prependInnerIcon="prependInnerIcon"
                           :appendIcon="appendIcon"
                           :appendOuterIcon="appendOuterIcon"
                           :label="label"
                           :placeholder="placeholder"   
                           :hint="hint" 
                           ></g-file-input>`,
});


