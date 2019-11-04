import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GBtn from '../GBtn';

export default {
  title: 'Button',
  decorators: [withKnobs],
};

export const test1 = () => ({
  components: { GBtn },
  props: {
    text: { default: text('Button Text', 'XLARGE BUTTON') },
    outlined: { type: Boolean, default: boolean('outlined', true) }
  },
  template: `<g-btn :outlined="outlined" raised elevation='0' x-large>{{text}}</g-btn>`,
})

export const GBtnDefault = () => ({
  components: { GBtn },
  props: {
    text: { default: text('Button Text', 'NORMAL BUTTON') },
    flat: { type: Boolean, default: boolean('flat', false) },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    elevation: { type: Number, default: number('elevation', 0) },
    block: { type: Boolean, default: boolean('block', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', false) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', false) },
    tile: { type: Boolean, default: boolean('tile', false) },
  },
  template: `<g-btn :tile="tile" :flat="flat" :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right" :disabled="disabled" :block="block" :elevation="elevation" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">{{text}}</g-btn>`,
})

export const GBtnOutlined = () => ({
  components: { GBtn },
  props: {
    text: { default: text('Button Text', 'OUTLINED BUTTON') },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    outlined: { type: Boolean, default: boolean('outlined', true) },
    textColor: { default: text('textColor', 'blue') },
    block: { type: Boolean, default: boolean('block', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', false) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', false) },
    tile: { type: Boolean, default: boolean('tile', false) },

  },
  template: `<g-btn :tile="tile" :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right" :disabled="disabled"  :block="block" :text-color="textColor" :outlined="outlined" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">{{text}}</g-btn>`,
})

export const GBtnDepressed = () => ({
  components: { GBtn },
  props: {
    text: { default: text('Button Text', 'DEPRESSED BUTTON') },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    depressed: { type: Boolean, default: boolean('depressed', true) },
    textColor: { default: text('textColor', 'orange') },
    block: { type: Boolean, default: boolean('block', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', false) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', false) },
    tile: { type: Boolean, default: boolean('tile', false) },

  },
  template: `<g-btn :tile="tile" :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right" :disabled="disabled"  :block="block" :text-color="textColor" :depressed="depressed" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">{{text}}</g-btn>`,
})

export const GBtnText = () => ({
  components: { GBtn },
  props: {
    textValue: { default: text('Button Text', 'TEXT BUTTON') },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    text: { type: Boolean, default: boolean('text', true) },
    textColor: { default: text('textColor', 'green') },
    block: { type: Boolean, default: boolean('block', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', false) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', false) },
    tile: { type: Boolean, default: boolean('tile', false) },

  },
  template: `<g-btn :tile="tile" :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right" :disabled="disabled" :block="block" :text="text" :text-color="textColor" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">{{textValue}}</g-btn>`,
})


export const GBtnRounded = () => ({
  components: { GBtn },
  props: {
    textValue: { default: text('Button Text', 'ROUNDED BUTTON') },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    rounded: { type: Boolean, default: boolean('rounded', true) },
    textColor: { default: text('textColor', 'white') },
    backgroundColor: { default: text('backgroundColor', 'brown') },
    block: { type: Boolean, default: boolean('block', false) },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', false) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', false) },
    tile: { type: Boolean, default: boolean('tile', false) },

  },
  template: `<g-btn :tile="tile" :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right" :disabled="disabled"  :block="block" :background-color="backgroundColor" :rounded="rounded" :text-color="textColor" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">{{textValue}}</g-btn>`,
})


export const GBtnFab = () => ({
  components: { GBtn },
  props: {
    textValue: { default: text('Button Text', 'ROUNDED BUTTON') },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    fab: { type: Boolean, default: boolean('fab', true) },
    textColor: { default: text('textColor', 'white') },
    backgroundColor: { default: text('backgroundColor', 'blue') },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', true) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', true) },
    tile: { type: Boolean, default: boolean('tile', false) },

  },
  template: `<g-btn :tile="tile" :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right" :disabled="disabled" :fab="fab" :background-color="backgroundColor" :text-color="textColor" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">
              <i class="material-icons g-icon">android</i>
            </g-btn>`,
})

export const GBtnIcon = () => ({
  components: { GBtn },
  props: {
    textValue: { default: text('Button Text', 'ROUNDED BUTTON') },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    icon: { type: Boolean, default: boolean('icon', true) },
    textColor: { default: text('textColor', 'red') },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', false) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', false) },

  },
  template: `<g-btn :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right" :icon="icon" :disabled="disabled" :text-color="textColor" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">
              <i class="material-icons g-icon">star</i>
            </g-btn>`,
})

export const GBtnGradient = () => ({
  components: { GBtn },
  props: {
    textValue: { default: text('Button Text', 'GRADIENT BUTTON') },
    xSmall: { type: Boolean, default: boolean('xSmall', false) },
    small: { type: Boolean, default: boolean('small', false) },
    large: { type: Boolean, default: boolean('large', false) },
    xLarge: { type: Boolean, default: boolean('xLarge', false) },
    textColor: { default: text('textColor', 'white') },
    disabled: { type: Boolean, default: boolean('disabled', false) },
    fixed: { type: Boolean, default: boolean('fixed', false) },
    absolute: { type: Boolean, default: boolean('absolute', false) },
    top: { type: Boolean, default: boolean('top', false) },
    bottom: { type: Boolean, default: boolean('bottom', false) },
    left: { type: Boolean, default: boolean('left', false) },
    right: { type: Boolean, default: boolean('right', false) },
    gradient: { type: String, default: text('gradient', 'yellow, green, blue') },
    gradientAngle: { type: String, default: text('gradientAngle', '120deg') },
    tile: { type: Boolean, default: boolean('tile', false) },
  },
  template: `<g-btn :tile="tile" :gradient-angle="gradientAngle" :gradient="gradient" :absolute="absolute" :fixed="fixed" :top="top" :bottom="bottom" :left="left" :right="right"  :disabled="disabled" :text-color="textColor" :x-small="xSmall" :small="small" :large="large" :x-large="xLarge">
            {{textValue}}
            </g-btn>`,
})

export const test2 = () => ({
  components: { GBtn },
  setup() {
    return () =>
      <g-btn outlined raised elevation='0' x-large vOn:click={action('test123')}>
        {text('Button Text', 'XLARGE BUTTON')}
      </g-btn>
  },
})

import Vue from 'vue/dist/vue.common.js'

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnDefault()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnDepressed()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnFab()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnGradient()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnIcon()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnOutlined()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnRounded()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})


describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(GBtnText()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

