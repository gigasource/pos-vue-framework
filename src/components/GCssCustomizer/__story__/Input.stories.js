import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GCssCustomizerInputGroup from '../GCssCustomizerInputGroup';
import GCssCustomizerCombobox from '../GCssCustomizerCombobox';

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
export const inputGroup = () => ({
  components: { GCssCustomizerInputGroup },
  props: {},
  data() {
    return {
      value: [0, 0, 0, 0],
      prepend: 'check',

    }
  },
  methods: {
    input: function (event) {
      this.value[event.index] = event.value
    }
  },
  template: `
  <div>
  <g-css-customizer-input-group :value="value" :prepend="prepend" v-on:input="input"/>
</div>
`,
})

export const combobox = () => ({
  components: { GCssCustomizerCombobox },
  props: {},
  data() {
    return {
      list: ['Regular', 'Bold', 'Italic'],
      select: null

    }
  },
  template: `
  <div>
  <g-css-customizer-combobox :items="list" multiple v-model="select"/>
</div>
`,
})

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
