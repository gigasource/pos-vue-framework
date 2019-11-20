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
  template: `<div style="width: 600px" prepend-inner-icon="mdi-pen"><g-textarea></g-textarea></div>`,
})

export const mainFeatureTextarea = () => ({
  components: {GTextarea},
  props: {
    autoGrow: {default: boolean('auto grow', false)},
    noResize: {default: boolean('no resize', false)},
    rows: {type: Number, default: number('rows', 5)},
    rowHeight: {type: Number, default: number('rowHeight', 24)},
  },
  template: `<div style="width: 600px">
             <g-textarea :auto-grow="autoGrow" :no-resize="noResize" :rows="rows" :rowHeight="rowHeight" 
                         prepend-inner-icon="mdi-pen"></g-textarea>
             </div>`,
})

export const fullFeatureTextarea = () => ({
  components: {GTextarea, GIcon},
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
    autoGrow: {default: boolean('auto grow', false)},
    noResize: {default: boolean('no resize', false)},
    rows: {type: Number, default: number('rows', 5)},
    rowHeight: {type: Number, default: number('rowHeight', 24)},

    clearable: {default: boolean('clearable', false)},

    label: {default: text('label', 'label')},
    placeholder: {default: text('placeholder', '')},
    hint: {default: text('hint', 'hint')},
    prefix: {default: text('prefix', '')}, //bug
    suffix: {default: text('suffix', '')}, //bug
    counter: {type: [String, Number], default: Number('counter', 25)},

    persistent: {default: boolean('persistent', false)},
    filled: {default: boolean('filled', false)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
  },
  template: `<div style="width: 600px"><g-textarea   
                           :auto-grow="autoGrow"
                           :no-resize="noResize"
                           :rows="rows"
                           :row-height="rowHeight"
                           v-model="text1"                           
                           
                           :clearable="clearable"
                           prepend-icon="person"
                           prepend-inner-icon="mdi-pen"
                           append-icon="person"
                           append-outer-icon="home"          
                           
                           :label="label"
                           :hint="hint"
                           :placeholder="placeholder"
                           :prefix="prefix"
                           :suffix="suffix"
                           :counter="counter"
                           :persistent="persistent"
                           
                           :filled="filled"
                           :solo="solo"
                           :outlined="outlined"
                           :flat="flat"
                           :rounded="rounded"
                           :shaped="shaped"
                             
                           :rules="[rules.required, rules.counter]" /></div>`,
})

