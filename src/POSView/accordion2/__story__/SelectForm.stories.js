import { withKnobs } from '@storybook/addon-knobs';
import SelectForm from '../SelectForm';
// testing
import Vue from 'vue/dist/vue.common.js'

//
export default {
  title: 'SelectForm',
  decorators: [withKnobs],
}

export const selectform = () => ({
  components: { SelectForm },
  props: {},
  data() {
    return {
      type: [
        { text: 'prop', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
        { text: 'emit', items: [{ text: 'click' }, { text: 'block' }, { text: 'inline' }], },
        { text: 'emit2', items: [{ text: 'input' }, { text: 'block' }, { text: 'inline' }] }],
      scopedSlot: [
        { text: 'ComputedFile', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
        { text: 'abc', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
        { text: 'remove', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
        { text: 'remove', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], }],
      local: [
        { text: 'file', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
        { text: 'folder', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
        { text: 'disk', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], }],
      value: {}
    }
  },
  template: `<select-form :type="type" :scopedSlot="scopedSlot" :local="local" v-model="value"  height="270px">

</select-form>
  `,
})

export const test2 = () => ({
  components: {},
  setup() {
    return () => (
      <g></g>
    )
  }
})

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
