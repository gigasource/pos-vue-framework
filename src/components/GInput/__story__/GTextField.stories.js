import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'

//
export default {
  title: 'GTextField',
  decorators: [withKnobs],
}

export const TextField = () => ({
  components: {GTextField, GIcon},
  data() {
    return {
      text1: '',
      rules: {
        required: value => !!value || 'Required',
        counter: value => value.length > 4 || 'Min 5 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },
      mask: 'XXXX-XXXX',
    }
  },
  props: {
    label:{ default: text('Input label', 'Label') },
    placeholder:{ default: text('Input placeholder', '') },
    filled: { default: boolean('filled', false) },
    solo: { default: boolean('solo', false) },
    outlined: { default: boolean('outlined', false) },
    flat: { default: boolean('flat', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    clearable: { default: boolean('clearable', false) },
    hint: { default: text('hint', 'Hint') },
    persistent: { default: boolean('persistent', false) },
    counter: {type:[String, Number], default: Number('counter', 25) },
    prefix: { default: text('prefix', '')},
    suffix: {default: text('suffix', '')},
    type: {default: text('type', 'text')},
    prependIcon: {default: text('prepend Icon', 'person')},
    appendIcon: {default: text('append Icon', 'mdi-bike')},
    prependInnerIcon: {default: text('prepend Inner Icon', 'mdi-owl')},
    appendInnerIcon: {default: text('append Inner Icon', 'mdi-ninja')},
  },
  template: `<g-text-field :label="label"
                           :clearable="clearable"
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :rounded="rounded"
                           :shaped="shaped"
                           :hint="hint"
                           :persistent="persistent"
                           :counter="counter"
                           :placeholder="placeholder"
                           :prefix="prefix"
                           :suffix="suffix"
                           :type="type"
                           :prepend-icon="prependIcon"
                           :append-icon="appendIcon"
                           :prepend-inner-icon="prependInnerIcon"
                           :append-inner-icon="appendInnerIcon"
                           v-model="text1"
                           :rules="[rules.required, rules.counter]">
                          <template v-slot:prepend-outer>
                          </template>
                          <template v-slot:append-inner>
                          <g-icon>mdi-ninja</g-icon>
                          </template>
                          <template v-slot:append-outer>
                          </template>
              </g-text-field>`,
});

// testing
import Vue from 'vue/dist/vue.common.js'
import GTextField from '../GTextField';
import GIcon from '../../GIcon/GIcon';

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
