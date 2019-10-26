import {withKnobs, text, number, boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GTear from '../GTextarea2';

export default {
  title: 'Textarea',
  decorators: [withKnobs],
};

export const basicTextarea = () => ({
  components: {GTear},
  template: `<div style="width: 600px"><g-tear></g-tear></div>`,
})

export const Textarea = () => ({
  components: {GTear},
  props: {
    autoGrow: {default: boolean('auto grow', false)},
    noResize: {default: boolean('no resize', false)},
    rows: {type: Number, default: number('rows', 3)},
    rowHeight: {type: Number, default: number('rowHeight', 50)}
  },
  template: `<div style="width: 600px"><g-tear :auto-grow="autoGrow" :no-resize="noResize" :rows="rows" :rowHeight="rowHeight"></g-tear></div>`,
})

import Vue from 'vue/dist/vue.common.js'

// describe('test', function () {
//   it('should test1', function () {
//     const vm = new Vue(test1()).$mount();
//     expect(vm.$el.outerHTML).toMatchSnapshot()
//   });
// })

