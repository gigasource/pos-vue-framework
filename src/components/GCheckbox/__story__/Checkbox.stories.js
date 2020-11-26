import { boolean, color, text, withKnobs } from '@storybook/addon-knobs';
import GLayout from '../../GLayout/GLayout';
import GCheckbox from '../GCheckbox';

export default {
  title: 'Checkbox',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: { GCheckbox },
  data() {
    return {
      model: true
    }
  }
  ,
  props: {
    color: {
      default: text('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Check Box')
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    readonly: {
      default: boolean('Readonly', false)
    }
  },
  template: `
    <div> Value: {{ model }}
    <g-checkbox :color="color"
                :label="label"
                :disabled="disabled"
                :readonly="readonly"
                v-model="model"
    />
    </div>`
});

export const indeterminate = () => ({
  components: { GCheckbox },
  props: {
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Check Box' )
    }
  },
  template: `<g-checkbox indeterminate :color="color" :label="label"/>`
});

export const checkboxAll = () => ({
  components: { GLayout, GCheckbox },
  data() {
    return {
      model: [],
      val: ['1', '2'],
    }
  },
  props: {
    color1: {
      default: color('Color 1', '#1271ff')
    },
    label1: {
      default: text('Label 1', 'Check Box All')
    },
    color2: {
      default: color('Color 2', '#ff4452')
    },
    label2: {
      default: text('Label 2', 'Check Box 1')
    },
    color3: {
      default: color('Color 3', '#118833')
    },
    label3: {
      default: text('Label 3', 'Check Box 2')
    }
  },
  template: `<g-layout vertical>
    <g-checkbox :color="color1" :label="label1" v-model="model" :value="val" multiple/>
    <g-checkbox :color="color2" :label="label2" v-model="model" value="1"/>
    <g-checkbox :color="color3" :label="label3" v-model="model" value="2"/>
  </g-layout>`
});

export const multipleCheckbox = () => ({
  components: { GLayout, GCheckbox },
  data() {
    return {
      model: [],
    }
  },
  props: {
    color1: {
      default: color('Color 1', '#1271ff')
    },
    label1: {
      default: text('Label 1', 'Check Box 1')
    },
    color2: {
      default: color('Color 2', '#ff4452')
    },
    label2: {
      default: text('Label 2', 'Check Box 2')
    },
    color3: {
      default: color('Color 3', '#118833')
    },
    label3: {
      default: text('Label 3', 'Check Box 3')
    }
  },
  template: `<g-layout vertical>{{model}}
    <g-checkbox :color="color1" :label="label1" v-model="model" value="CB1"/>
    <g-checkbox :color="color2" :label="label2" v-model="model" value="CB2"/>
    <g-checkbox :color="color3" :label="label3" v-model="model" value="CB3"/>
  </g-layout>`
});
