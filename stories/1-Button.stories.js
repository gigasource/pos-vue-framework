import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import GBtn from '../src/components/GBtn/GBtn';

export default {
  title: 'Button',
  decorators: [withKnobs],
};

export const test1 = () => ({
  components: { GBtn },
  props: {
    text: {
      default: text('Button Text', 'XLARGE BUTTON')
    }
  },
  template: `<g-btn outlined raised elevation='0' x-large>{{text}}</g-btn>`,
})
