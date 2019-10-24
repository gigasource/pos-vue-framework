import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GTextarea from '../GTextarea';

export default {
  title: 'Textarea',
  decorators: [withKnobs],
};

export const basicTextarea = () => ({
  components: { GTextarea },
  template: `<g-textarea noResize></g-textarea>`,
})

import Vue from 'vue/dist/vue.common.js'

describe('test', function () {
  it('should test1', function () {
    const vm = new Vue(test1()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})

