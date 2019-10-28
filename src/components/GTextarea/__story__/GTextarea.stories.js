import {withKnobs, text, number, boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GTextarea from '../GTextarea';
import GIcon from "../../GIcon/GIcon";

export default {
  title: 'Textarea',
  decorators: [withKnobs],
};

export const basicTextarea = () => ({
  components: {GTextarea},
  template: `<div style="width: 600px"><g-textarea></g-textarea></div>`,
})

export const Textarea = () => ({
  components: {GTextarea},
  props: {
    autoGrow: {default: boolean('auto grow', false)},
    noResize: {default: boolean('no resize', false)},
    rows: {type: Number, default: number('rows', 3)},
    rowHeight: {type: Number, default: number('rowHeight', 30)}
  },
  template: `<div style="width: 600px"><g-textarea :auto-grow="autoGrow" :no-resize="noResize" :rows="rows" :rowHeight="rowHeight"></g-textarea></div>`,
})

export const InheritFeature = () => ({
  components: {GTextarea,GIcon},
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
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    clearable: {default: boolean('clearable', false)},
    hint: {default: text('hint', 'Hint')},
    persistent: {default: boolean('persistent', false)},
    counter: {type: [String, Number], default: Number('counter', 25)},
    prefix: {default: text('prefix', '')},
    suffix: {default: text('suffix', '')},
  },
  template: `<g-textarea :label="label"
                           :clearable="clearable"
                           prepend-icon="person"
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
                           v-model="text1"
                           :rules="[rules.required, rules.counter]">

                          
                          <template v-slot:prepend-outer>
<!--                          <g-icon>mdi-glasses</g-icon>-->
                          </template>
                          <template v-slot:append-inner>
                          <g-icon>mdi-ninja</g-icon>
                          </template>
                          <template v-slot:append-outer>
<!--                          <g-icon>mdi-coffee</g-icon>-->
                          </template>
              </g-textarea>`,
})

import Vue from 'vue/dist/vue.common.js'

// describe('test', function () {
//   it('should test1', function () {
//     const vm = new Vue(test1()).$mount();
//     expect(vm.$el.outerHTML).toMatchSnapshot()
//   });
// })

