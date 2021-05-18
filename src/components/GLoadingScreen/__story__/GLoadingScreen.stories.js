import { withKnobs, text, number } from '@storybook/addon-knobs';
import GLoadingScreen from "../GLoadingScreen";

export default {
  title: 'GLoadingScreen',
  decorators: [withKnobs],
}

export const basicLoadingScreen = () => ({
  components: GLoadingScreen,
  props: {
    backgroundColor: {
      type: String,
      default: text('Background Color', '#FFFFFF')
    },
    opacity: {
      type: Number,
      default: number('Opacity', 80)
    },
    blur: {
      type: String,
      default: text('Blur', '2px')
    },
    width: {
      type: Number,
      default: number('Width', 50)
    },
    height: {
      type: Number,
      default: number('Height', 50)
    }
  },
  template: `<g-loading-screen :backgroundColor="backgroundColor" :opacity="opacity" :blur="blur">
    <div>Loading</div>
  </g-loading-screen>`
})
