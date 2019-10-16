import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import GLayout from '../src/components/GLayout/GLayout';
import GCheckbox from '../src/components/GCheckbox/GCheckbox';

export default {
  title: 'Checkbox',
  decorators: [withKnobs],
};

export const basic = () => ({
  components: { GCheckbox },
  props: {
    color: {
      default: text('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Check Box')
    }
  },
  template: `<g-checkbox :color="color" :label="label"></g-checkbox>`
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
  template: `<g-checkbox indeterminate :color="color" :label="label"></g-checkbox>`
});

export const disabled = () => ({
  components: { GCheckbox },
  props: {
    state: {
      default: boolean('State', true)
    },
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Check Box' )
    }
  },
  template: `<g-checkbox disabled :color="color" :label="label" v-model="state"></g-checkbox>`
});

export const readonly = () => ({
  components: { GCheckbox },
  props: {
    state: {
      default: boolean('State', true)
    },
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Check Box' )
    }
  },
  template: `<g-checkbox readonly :color="color" :label="label" v-model="state"></g-checkbox>`
});

export const checkboxAll = () => ({
  components: { GLayout, GCheckbox },
  data() {
    return {
      model: null,
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
  template: `<g-layout column>
  <g-checkbox :color="color1" :label="label1" v-model="model" :value="val"></g-checkbox>
  <g-checkbox :color="color2" :label="label2" v-model="model" value="1"></g-checkbox>
  <g-checkbox :color="color3" :label="label3" v-model="model" value="2"></g-checkbox>
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
  template: `<g-layout column>{{model}}
  <g-checkbox :color="color1" :label="label1" v-model="model" value="CB1"></g-checkbox>
  <g-checkbox :color="color2" :label="label2" v-model="model" value="CB2"></g-checkbox>
  <g-checkbox :color="color3" :label="label3" v-model="model" value="CB3"></g-checkbox>
  </g-layout>`
});