import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import GRadio from '../src/components/GRadio/GRadio';
import GRadioGroup from '../src/components/GRadio/GRadioGroup';

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
    }
  },
  template: `<g-radio-group name="basic" v-model="rb"> Value: {{rb}}
  <g-radio :color="color1" :label="label1" :value="rb1"></g-radio>
  <g-radio :color="color2" :label="label2" :value="rb2"></g-radio>
</g-radio-group>`
});

export const horizontal = () => ({
  components: {GRadio, GRadioGroup},
  data () {
    return {
      rb: null,
      rb1: 'Radio 1',
      rb2: 'Radio 2',
    }
  },
  props: {
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
      default: text('Label 2', 'Radio 2' )
    }
  },
  template: `<div>Value: {{rb}}
      <g-radio-group name="basic" v-model="rb" row> 
        <g-radio :color="color1" :label="label1" :value="rb1"></g-radio>
        <g-radio :color="color2" :label="label2" :value="rb2"></g-radio>
      </g-radio-group>
    </div>`
});

export const disabled = () => ({
  components: { GRadio, GRadioGroup },
  data() {
    return {
      val: true
    }
  },
  props: {
    state: {
      default: boolean('State', true)
    },
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Radio' )
    }
  },
  template: `<g-radio disabled :color="color" :label="label" :inputValue="state" :value="val"></g-radio>`
});

export const readonly = () => ({
  components: { GRadio },
  data() {
    return {
      val: true
    }
  },
  props: {
    state: {
      default: boolean('State', true)
    },
    color: {
      default: color('Color', '#1271ff')
    },
    label: {
      default: text('Label', 'Radio' )
    }
  },
  template: `<g-radio readonly :color="color" :label="label" :inputValue="state" :value="val"></g-radio>`
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
      default: text('Label', 'Radio' )
    }
  },
  template: `<g-radio :color="color" :label="label" v-model="model" :value="val"></g-radio>`
});

