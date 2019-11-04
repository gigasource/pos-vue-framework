import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';

import GSwitch from '../GSwitch';
import GLayout from '../../GLayout/GLayout';

export default {
  title: 'Switch',
  decorators: [withKnobs],
}

export const basic = () => ({
  components: { GSwitch },
  data() {
    return {
      model: null
    }
  },
  props: {
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Switch')
    },
    flat: {
      default: boolean('Flat', false)
    },
    inset: {
      default: boolean('Inset', false)
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    readonly: {
      default: boolean('Readonly', false)
    }
  },
  template: `<g-switch v-model="model" 
                    :color="color" 
                    :label="label" 
                    :flat="flat" 
                    :inset="inset"
                    :disabled="disabled"
                    :readonly="readonly"/>`
});

export const multiple = () => ({
  components: { GSwitch },
  data() {
    return {
      val: [],
    }
  },
  props: {
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Switch')
    }
  },
  template: `<div> Value: {{val}}
    <g-switch v-model="val" :color="color" :label="label+1" value="switch1"/>
    <g-switch v-model="val" :color="color" :label="label+2" value="switch2"/>
    <g-switch v-model="val" :color="color" :label="label+3" value="switch3"/>
  </div>`
});