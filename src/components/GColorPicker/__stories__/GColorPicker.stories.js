import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GColorPicker from '../GColorPicker'
import { reactive } from '@vue/composition-api';
//
export default {
  title: 'GColorPicker',
  decorators: [withKnobs],
}

export const test2 = () => ({
  components: { GColorPicker },
  setup() {
    return () => <g-color-picker label={'background color'}/>
  }
})
