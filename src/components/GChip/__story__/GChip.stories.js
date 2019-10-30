import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GChip from '../GChip';

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
  },
  template: `<g-chip x-large :disabled="disabled" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge" :close="close">{{text}}</g-chip>`,
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
  },
  template: `<g-chip outlined :filter="filter" :active="active"  :disabled="disabled" :close="close" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">{{text}}</g-chip>`,
});

export const LabelChip = () => ({
  components: { GChip },
  props: {
    text: { default: text('Chip Text', 'LABEL CHIP') },
    label: { default: boolean('label', true) },
    close: { default: boolean('close', true) },
    disabled: { default: boolean('disabled', false) },
    xSmall: { default: boolean('xSmall', false) },
    small: { default: boolean('small', false) },
    large: { default: boolean('large', false) },
    xLarge: { default: boolean('xLarge', false) },
  },
  template: `<g-chip :label="label" x-large :disabled="disabled" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge" :close="close">{{text}}</g-chip>`,
});

export const PillChip = () => ({
  components: { GChip },
  props: {
    text: { default: text('Chip Text', 'PILL CHIP') },
    close: { default: boolean('close', true) },
    pill: { default: boolean('pill', true) },
    disabled: { default: boolean('disabled', false) },
    filter: { default: boolean('filter', true) },
    active: { default: boolean('active', true) },
    ripple: { default: boolean('ripple', true) },
    xSmall: { default: boolean('xSmall', false) },
    small: { default: boolean('small', false) },
    large: { default: boolean('large', false) },
    xLarge: { default: boolean('xLarge', false) },
  },
  template: `<g-chip x-large :ripple="ripple" :close="close" :pill="pill" :filter="filter" :active="active" :disabled="disabled" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">
  <template v-slot:prependItem>
    <img class="g-avatar g-avatar__left" style="border-radius: 50%;" src="https://loremflickr.com/320/240" alt="Avatar">
   </template>
  {{text}}
  </g-chip>`,
});

export const AvatarChip = () => ({
  components: { GChip },
  props: {
    text: { default: text('Chip Text', 'AVATAR CHIP') },
    close: { default: boolean('close', true) },
    filter: { default: boolean('filter', false) },
    active: { default: boolean('active', true) },
    ripple: { default: boolean('ripple', true) },
    xSmall: { default: boolean('xSmall', false) },
    small: { default: boolean('small', false) },
    large: { default: boolean('large', false) },
    xLarge: { default: boolean('xLarge', false) },
  },
  template: `<g-chip x-large :ripple="ripple" :close="close" :filter="filter" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">
  <template v-slot:prependItem>
    <img class="g-avatar g-avatar__left" style="border-radius: 50%;" src="https://loremflickr.com/320/240" alt="Avatar">
   </template>
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
