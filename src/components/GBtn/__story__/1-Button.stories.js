import { text, withKnobs, boolean } from '@storybook/addon-knobs';
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
    outlined: { default: boolean('outlined', true) }
  },
  template: `<g-btn :outlined="outlined" raised elevation='0' x-large>{{text}}</g-btn>`,
})

export const test2 = () => ({
  components: { GBtn },
  setup() {
    return () =>
      `<g-btn outlined raised elevation='0' x-large vOn:click={action('test')}>
        {text('Button Text', 'XLARGE BUTTON')}
      </g-btn>`
  },
})

import Vue from 'vue/dist/vue.common.js'

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(test1()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

