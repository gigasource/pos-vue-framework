import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GColorPicker from '../GColorPicker'
import GColorPickerInput from '../GColorPickerInput'
import { reactive } from '@vue/composition-api';
//
export default {
  title: 'GColorPicker',
  decorators: [withKnobs],
}

export const colorPicker = () => ({
  components: { GColorPicker },
  setup() {
    return () => <g-color-picker/>
  }
})

export const colorPickerInput = () => ({
  components: { GColorPickerInput },
  setup() {
    return () => <g-color-picker-input label={'background color'}/>
  }
})
