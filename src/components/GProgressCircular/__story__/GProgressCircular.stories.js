import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import GProgressCircular from '../GProgressCircular';

export default {
  title: 'GProgressCircular',
  decorators: [withKnobs]
}

export const basic = () => ({
  components: {GProgressCircular},
  props: {
    indeterminate: {default: boolean('Indeterminate', false)},
    rotate: {default: number('Rotate', -90)},
    size: {default: number('Size', 32)},
    width: {default: number('Width', 4)},
    color: {default: text('Color', 'blue darken 3')},
    value: {default: number('Value', 50, {min: 0, max: 100})}
  },
  template: `
    <g-progress-circular :indeterminate="indeterminate"
                         :rotate="rotate"
                         :size="size"
                         :width="width"
                         :color="color"
                         :value="value">
                         {{value}}
    </g-progress-circular>
  `
})