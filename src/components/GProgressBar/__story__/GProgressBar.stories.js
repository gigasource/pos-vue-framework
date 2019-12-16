import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { ref, computed, onMounted } from '@vue/composition-api';
import GProgressBar from '../GProgressBar';

export default {
  title: 'GProgressBar',
  decorators: [withKnobs]
}

export const Basic = () => ({
  components: { GProgressBar },
  props: {
    value: {default: number('Value', 40, {range: true, min:0, max: 100})},
    buffer: {default: number('Buffer', 70, {range: true, min:0, max: 100})},
    height: {default: number('Height', 4)},
    backgroundColor: {default: text('Background Color', 'blue')},
    backgroundOpacity: {default: number('Background Opacity', 0.3, {range: true, min:0, max: 1, step: 0.01})},
    color: {default: text('Color', 'blue')},
    striped: {default: boolean('Stripped', false)},
    stream: {default: boolean('Stream', false)},
    indeterminate: {default: boolean('Indeterminate', false)},
    query: {default: boolean('Query', false)},
    absolute: {default: boolean('Absolute', false)},
    fixed: {default: boolean('Fixed', false)},
    top: {default: boolean('Top', false)},
    bottom: {default: boolean('Bottom', false)},
  },
  template: `
    <div data-app>
      <g-progress-bar v-model="value" 
                      :buffer-value="buffer" 
                      :height="height" 
                      :striped="striped" 
                      :background-color="backgroundColor" 
                      :background-opacity="backgroundOpacity" 
                      :color="color" 
                      :stream="stream" 
                      :indeterminate="indeterminate" 
                      :query="query" 
                      :absolute="absolute" 
                      :fixed="fixed" 
                      :top="top" 
                      :bottom="bottom">
        
      </g-progress-bar>
    </div>
  `
})