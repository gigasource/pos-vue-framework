import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GChip from '../GChip';
import GIcon from '../../GIcon/GIcon';
import GImg from '../../GImg/GImg';
import GAvatar from '../../GAvatar/GAvatar';

export default {
  title: 'GChip',
  decorators: [withKnobs],
};

export const DefaultChip = () => ({
  components: { GChip },
  props: {
    text: { default: text('Chip Text', 'NORMAL CHIP') },
    close: { default: boolean('close', true) },
    disabled: { default: boolean('disabled', false) },
    xSmall: { default: boolean('xSmall', false) },
    small: { default: boolean('small', false) },
    large: { default: boolean('large', false) },
    xLarge: { default: boolean('xLarge', false) },
    closeIcon: {type: String, default: text('closeIcon', 'mdi-close-circle') },
    filterIcon: {type: String, default: text('filterIcon', 'mdi-check') },
    backgroundColor: {type: String, default: text('backgroundColor', 'bg-red') },
    textColor: {type: String, default: text('textColor', 'white') },

  },
  template: `<g-chip x-large :disabled="disabled" :x-small="xSmall" :small="small" :text-color="textColor" :background-color="backgroundColor" :filter-icon="filterIcon" :large="large" :closeIcon="closeIcon" :x-large="xLarge" :close="close">{{text}}</g-chip>`,
});

export const OutlinedChip = () => ({
  components: { GChip },
  props: {
    text: { default: text('Chip Text', 'OUTLINED CHIP') },
    filter: { default: boolean('filter', true) },
    active: { default: boolean('active', true) },
    close: { default: boolean('close', true) },
    disabled: { default: boolean('disabled', false) },
    xSmall: { default: boolean('xSmall', false) },
    small: { default: boolean('small', false) },
    large: { default: boolean('large', false) },
    xLarge: { default: boolean('xLarge', false) },
    closeIcon: {type: String, default: text('closeIcon', 'mdi-close-circle') },
    filterIcon: {type: String, default: text('filterIcon', 'mdi-check') },
    textColor: {type: String, default: text('textColor', 'black') },

  },
  template: `<g-chip outlined :filter="filter" :active="active" :filter-icon="filterIcon" :text-color="textColor" :disabled="disabled" :closeIcon="closeIcon" :close="close" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">{{text}}</g-chip>`,
});

export const LabelChip = () => ({
  components: { GChip, GIcon, GAvatar, GImg },
  props: {
    showImg: { type: Boolean, default: boolean('showImg', true) },
    filter: { default: boolean('filter', false) },
    text: { default: text('Chip Text', 'LABEL CHIP') },
    label: { default: boolean('label', true) },
    close: { default: boolean('close', true) },
    disabled: { default: boolean('disabled', false) },
    xSmall: { default: boolean('xSmall', false) },
    small: { default: boolean('small', false) },
    large: { default: boolean('large', false) },
    xLarge: { default: boolean('xLarge', false) },
    closeIcon: {type: String, default: text('closeIcon', 'mdi-close-circle') },
    filterIcon: {type: String, default: text('filterIcon', 'mdi-check') },
    backgroundColor: {type: String, default: text('backgroundColor', 'bg-red') },
    textColor: {type: String, default: text('textColor', 'white') },
  },
  template: `<g-chip :label="label" :filter="filter" x-large :disabled="disabled" :text-color="textColor" :background-color="backgroundColor" :filter-icon="filterIcon" :closeIcon="closeIcon" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge" :close="close">
                <g-avatar class="g-avatar__left" v-if="showImg">
                 <g-img src="https://image.cnbcfm.com/api/v1/image/105778430-1551897565882microsoftfounderbillgatesspeaking.jpg?v=1571848897&w=1400&h=950"> </g-img>
                </g-avatar>   
                <g-icon v-else class="g-icon__left">
                cake
                </g-icon> 

      {{text}}</g-chip>`,
      });

export const PillChip = () => ({
  components: { GChip, GIcon, GImg, GAvatar },
  props: {
    text: { type: String, default: text('Chip Text', 'PILL CHIP') },
    showImg: { type: Boolean, default: boolean('showImg', true) },
    close: { type: Boolean, default: boolean('close', true) },
    pill: { type: Boolean, default: boolean('pill', true) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    filter: { type: Boolean, default: boolean('filter', true) },
    active: { type: Boolean, default: boolean('active', false) },
    ripple: { type: Boolean, default: boolean('ripple', true) },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    closeIcon: {type: String, default: text('closeIcon', 'mdi-close-circle') },
    filterIcon: {type: String, default: text('filterIcon', 'mdi-check') },
    backgroundColor: {type: String, default: text('backgroundColor', 'bg-red') },
    textColor: {type: String, default: text('textColor', 'white') },
  },
  template: `<g-chip x-large :ripple="ripple" :close="close" :pill="pill" :background-color="backgroundColor" :text-color="textColor" :closeIcon="closeIcon" :filter-icon="filterIcon" :filter="filter" :active="active" :disabled="disabled" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">
                <g-avatar class="g-avatar__left" v-if="showImg">
                 <g-img src="https://image.cnbcfm.com/api/v1/image/105778430-1551897565882microsoftfounderbillgatesspeaking.jpg?v=1571848897&w=1400&h=950"> </g-img>
                </g-avatar>       
                <g-avatar class="g-avatar__left" background-color="bg-red" v-else>
                P
                </g-avatar>
            {{text}}
            </g-chip>`,
});

export const AvatarChip = () => ({
  components: { GChip, GAvatar, GImg },
  props: {
    text: { default: text('Chip Text', 'AVATAR CHIP') },
    close: { default: boolean('close', true) },
    filter: { default: boolean('filter', false) },
    active: { default: boolean('active', false) },
    ripple: { default: boolean('ripple', true) },
    xSmall: { default: boolean('xSmall', false) },
    small: { default: boolean('small', false) },
    large: { default: boolean('large', false) },
    xLarge: { default: boolean('xLarge', false) },
    closeIcon: {type: String, default: text('closeIcon', 'mdi-close-circle') },
    filterIcon: {type: String, default: text('filterIcon', 'mdi-check') },
    backgroundColor: {type: String, default: text('backgroundColor', 'bg-red') },
    textColor: {type: String, default: text('textColor', 'white') },
  },
  template: `<g-chip x-large :ripple="ripple" :close="close" :filter="filter" :text-color="textColor" :background-color="backgroundColor" :filterIcon="filterIcon" :closeIcon="closeIcon" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">
               <g-avatar class="g-avatar__left">
                 <g-img src="https://image.cnbcfm.com/api/v1/image/105778430-1551897565882microsoftfounderbillgatesspeaking.jpg?v=1571848897&w=1400&h=950"> </g-img>
               </g-avatar>    
                {{text}}
            </g-chip>`,
});


import Vue from 'vue/dist/vue.common.js'

describe('Render test', function () {
  it('should render default x-large chip', function () {
    const vm = new Vue(DefaultChip()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('Render test', function () {
  it('should render outlined chip', function () {
    const vm = new Vue(OutlinedChip()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})


describe('Render test', function () {
  it('should test1', function () {
    const vm = new Vue(LabelChip()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})
