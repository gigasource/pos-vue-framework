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
  data() {
    return {
      color: '#000000'
    }
  },
  methods: {
    updateColor(val) {
      console.log('update color to ', val)
      this.color = val
    }
  },
  template:
  `<g-color-picker-input 
      :model-value="color" 
      label='background color'
      @update:modelValue="updateColor"
  />`,
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
