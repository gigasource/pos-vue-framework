/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import GButton from '../src/components/GButton';

storiesOf('Button', module)
  .add('with text', () => ({
    components: { GButton },
    template: '<g-button @click="action">Hello Button</g-button>',
    methods: { action: action('clicked') },
  }))
  .add('with JSX', () => ({
    components: { GButton },
    render(h) {
      return <g-button onClick={this.action}>With JSX</g-button>;
    },
    methods: { action: linkTo('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { GButton },
    template: '<g-button @click="action">😀 😎 👍 💯</g-button>',
    methods: { action: action('clicked') },
  }));
