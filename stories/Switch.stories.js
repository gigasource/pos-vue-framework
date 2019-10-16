import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';

import GSwitch from '../src/components/GSwitch/GSwitch';
import GLayout from '../src/components/GLayout/GLayout';

export default {
  title: 'Switch',
  decorators: [withKnobs],
}

export const basic = () => ({
  components: {GSwitch},
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
      default: text('Label', 'Switch' )
    }
  },
  template: `<g-switch v-model="model" :color="color" :label="label"></g-switch>`
});

export const flat = () => ({
  components: {GSwitch},
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
      default: text('Label', 'Flat Switch' )
    }
  },
  template: `<g-switch v-model="model" :color="color" :label="label" flat></g-switch>`
});

export const inset = () => ({
  components: {GSwitch},
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
      default: text('Label', 'Inset Switch' )
    }
  },
  template: `<g-switch v-model="model" :color="color" :label="label" inset></g-switch>`
});

export const disabled = () => ({
  components: {GSwitch},
  props: {
    state: {
      default: boolean('State', false)
    },
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Disabled Switch')
    }
  },
  template: `<div>
    <g-switch v-model="state" :color="color" :label="label" disabled></g-switch>
    <g-switch v-model="state" :color="color" :label="label" inset disabled></g-switch>
  </div>`
});

export const readonly = () => ({
  components: {GSwitch},
  props: {
    state: {
      default: boolean('State', false)
    },
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Disabled Switch')
    }
  },
  template: `<div>
    <g-switch v-model="state" :color="color" :label="label" readonly></g-switch>
    <g-switch v-model="state" :color="color" :label="label" inset readonly></g-switch>
  </div>`
});

export const multiple = () => ({
  components: {GSwitch},
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
    <g-switch v-model="val" :color="color" :label="label+1" value="switch1"></g-switch>
    <g-switch v-model="val" :color="color" :label="label+2" value="switch2"></g-switch>
    <g-switch v-model="val" :color="color" :label="label+3" value="switch3"></g-switch>
  </div>`
});