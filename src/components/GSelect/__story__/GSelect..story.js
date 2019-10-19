import {text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'

// 
export default {
  title: 'GSelect',
  decorators: [withKnobs],
}

export const test1 = () => ({
  components: {},
  props: {},
  template: `your template here`,
})

export const test2 = () => ({
  components: {},
  setup() {
    return () => (
        <g></g>
    )
  }
})

// testing
import Vue from 'vue/dist/vue.common.js'

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
