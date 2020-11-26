import { boolean, color, text, withKnobs } from '@storybook/addon-knobs';
import GRadio from '../GRadio';
import GRadioGroup from '../GRadioGroup';

export default {
  title: 'Radio',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: {GRadio, GRadioGroup},
  data () {
    return {
      rb: null,
      rb1: 'Radio 1',
      rb2: 'Radio 2',
    }
  },
  props: {
    row: {
      default: boolean('Horizontal', false)
    },
    color1: {
      default: color('Color 1', '#1271ff')
    },
    label1: {
      default: text('Label 1', 'Radio 1' )
    },
    color2: {
      default: color('Color 2', '#ff4452')
    },
    label2: {
      default: text('Label 2', 'Radio 2')
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    readonly: {
      default: boolean('Readonly', false)
    },
    small: {
      default: boolean('Small', false)
    }
  },
  template: `<div style="font-weight: 600">
  Value: {{rb}}
  <g-radio-group name="basic" v-model="rb" :row="row">
    <g-radio :color="color1" :label="label1" :value="rb1" :disabled="disabled" :readonly="readonly" :small="small"/>
    <g-radio :color="color2" :label="label2" :value="rb2" :disabled="disabled" :readonly="readonly" :small="small"/>
  </g-radio-group>
</div>`
});


export const solo = () => ({
  components: { GRadio },
  data() {
    return {
      val: true,
      model: null
    }
  },
  props: {
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Radio')
    }
  },
  template: `
    <div> Value: {{ model }}
    <g-radio :color="color" :label="label" v-model="model" :value="val"/>
    </div>`
});

