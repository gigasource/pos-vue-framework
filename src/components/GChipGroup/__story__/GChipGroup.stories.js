import { text, withKnobs, boolean, array, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GChipGroup from '../GChipGroup';

export default {
  title: 'GChipGroup',
  decorators: [withKnobs],
};

export const ChipGroup = () => ({
  components: { GChipGroup },
  props: {
    items: {
      default: array('items', [
        { id: 1, text: 'BMW', prependIcon: '', appendIcon: '',  active: false, close: true, },
        { id: 2, text: 'Toyota', prependIcon: '', appendIcon: '',  active: false, close: true, },
        { id: 3, text: 'Mercedes', prependIcon: '', appendIcon: '',  active: false, close: true,  },
        { id: 4, text: 'Ford', prependIcon: '', appendIcon: '',  active: false, close: true,  },
        { id: 5, text: 'Lexus', prependIcon: '', appendIcon: '',  active: false, close: true,  },
        { id: 6, text: 'Audi', prependIcon: '', appendIcon: '',  active: false, close: true,  },
        { id: 7, text: 'Maserati', prependIcon: '', appendIcon: '',  active: false, close: true,  },
        { id: 8, text: 'Mazda', prependIcon: '', appendIcon: '',  active: false, close: true,  }])
    }
  },
  data() {
    return {
      activeItem: null
    }
  },
  template: `<g-chip-group :items="items" v-model="activeItem">
                <template v-slot:item="{value, click, active, close}">{{value.text}}</template>
            </g-chip-group>`
});

export const MultipleSelectGroup = () => ({
  components: { GChipGroup },
  props: {
    items: {
      default: array('items', [
        { id: 1, text: 'Silver', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' },
        { id: 2, text: 'Elite', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' },
        { id: 3, text: 'Gold', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' },
        { id: 4, text: 'Guardian', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' },
        { id: 5, text: 'Nova', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' },
        { id: 6, text: 'Legendary', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' },
        { id: 7, text: 'Supreme', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' },
        { id: 8, text: 'Global', prependIcon: '', appendIcon: '',  active: false, close: true, color: 'bg-blue', textColor: 'white' }])
    },
    multiple: { default: boolean('multiple', true) },
    maxSelection: {type: Number, default: number('maxSelection', 4, {min: 1, max: 99}) },
  },
  data() {
    return {
      activeItems: null
    }
  },
  template: `<g-chip-group :items="items" v-model="activeItems" :multiple="multiple" :max-selection="maxSelection">
<template v-slot:item="{value, click, active, close}">{{value.text}}</template>
</g-chip-group>`
});

import Vue from 'vue'

describe('Render test', function () {
  it('should render default chip group', function () {
    const vm = Vue.createApp(ChipGroup()).mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('Render test', function () {
  it('should render multiple chip group', function () {
    const vm = Vue.createApp(MultipleSelectGroup()).mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})
