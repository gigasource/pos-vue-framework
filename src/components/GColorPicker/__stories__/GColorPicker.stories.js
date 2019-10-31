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
    return () => (<div><
      g-color-picker></g-color-picker>
    </div>

    )
  }
})
