import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GImg from '../GImg';

export default {
  title: 'GImg',
  decorators: [withKnobs],
};

export const imgBasic = () => ({
  components: { GImg },
  template: `<g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"></g-img>`,
})

export const imgWithWidthHeight = () => ({
  components: { GImg },
  template: `<g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg" width="500" height="500" contain></g-img>`,
})

import Vue from 'vue/dist/vue.common.js'

describe('GImg', function () {
  it('with width height', function () {
    const vm = new Vue(imgWithWidthHeight()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})


