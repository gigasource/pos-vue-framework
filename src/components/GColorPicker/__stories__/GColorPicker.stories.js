import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GColorPicker from '../GColorPicker'
//
export default {
  title: 'GColorPicker',
  decorators: [withKnobs],
}

export const test2 = () => ({
  components: { GColorPicker },
  setup() {
    return () => (<div style={'padding-top: 200px; padding-left: 200px'}><g-color-picker show-swatches></g-color-picker></div>

    )
  }
})
