import { withKnobs } from '@storybook/addon-knobs';
import TransformForm from '../TransformForm';
// testing
import Vue from 'vue/dist/vue.common.js'

//
export default {
  title: 'TransformForm',
  decorators: [withKnobs],
}

export const test1 = () => ({
  components: { TransformForm },
  data() {
    return {
      position: [{ prefix: 'X', placeholder: '41' }, { prefix: 'Y', placeholder: '711' }],
      size: [{ prefix: 'W', placeholder: '9' }, { prefix: 'H', placeholder: '11' }],
      detailPosition: [null, null],
      detailSize: [null, null],
    }

  },
  template: `<transform-form :position="position" :size="size" :detailPosition="detailPosition" :detailSize="detailSize">

</transform-form>`,
})

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
