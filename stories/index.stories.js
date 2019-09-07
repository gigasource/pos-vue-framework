/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import GButton from '../src/components/GButton';

import Welcome from './Welcome';
import GTextField from '../src/components/GInput/GTextField';

storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Button') },
}));

storiesOf('Button', module)
  .add('with text', () => ({
    components: { GButton },
    template: '<g-button @click="action">Hello Button</g-button>',
    methods: { action: action('clicked') },
  }))
  .add('with icon', () => ({
    components: { GButton },
    template: '<g-button @click="action"><img src="/config/setting.svg" /></g-button>',
    methods: { action: action('clicked') },
  }));

storiesOf('Text field', module)
  .add('standard', () => ({
    components: { GTextField },
    data: () => ({
      text: 'test'
    }),
    template: '<g-text-field clearable v-model="text" @input="action" @blur="blurAction"></g-text-field>',
    methods: { action: action('input'), blurAction: action('blur') }
  }))
  .add('without model', () => ({
    components: { GTextField },
    template: '<g-text-field clearable @input="action" @blur="blurAction"></g-text-field>',
    methods: { action: action('input'), blurAction: action('blur') }
  }));