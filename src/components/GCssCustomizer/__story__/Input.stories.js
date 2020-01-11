import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'

//
export default {
  title: 'Input',
  decorators: [withKnobs],
}

export const test1 = () => ({
  components: { GCssCustomizerInput },
  props: {},
  template: `
  <div>
  <g-css-customizer-input prependInnerIcon="check"/>
</div>
  `,
})
export const test2 = () => ({
  components: { GCssCustomizerSelect },
  props: {},
  data() {
    return {
      list: ['Regular', 'Bold', 'Italic'],
      value: 'Bold'
    }
  },
  template: `
  <div>
  <g-css-customizer-select :items="list" v-model="value"/>
</div>
`,
})
//
//
// export const test2 = () => ({
//   components: {},
//   setup() {
//     return () => (
//       <g></g>
//     )
//   }
// })

// testing
import Vue from 'vue/dist/vue.common.js'
import GCssCustomizerInput from '../GCssCustomizerInput';
import GCssCustomizerSelect from '../GCssCustomizerSelect';

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
