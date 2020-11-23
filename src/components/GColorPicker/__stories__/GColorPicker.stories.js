import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GColorPicker from '../GColorPicker'
import GColorPickerInput from '../GColorPickerInput'
import GColorPickerInputModel from '../GColorPickerInputModel'
import { reactive } from 'vue';
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

export const colorPickerInputModel = () => ({
  components: { GColorPickerInputModel },
  data() {
    return {
      model: { color: '#FFFFFF' },
      field: { key: 'color' }
    }
  },
  template: `
    <g-color-picker-input-model label='background color' :model="model" :field="field"/>
  `
})
