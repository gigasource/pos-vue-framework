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

    const state = reactive({
      currentColor: '',
      currentColorName: ''
    })


    const inputStyle = {
      border: '1px solid #0003',
      borderRadius: '2px',
      width: '300px',
      height: '30px',
      padding: '5px'
    }

    const previewStyle = {
      display: 'inline-flex',
      width: '30px',
      height: '15px',
      marginLeft: '-35px',
      marginRight: '7px',
      border: '1px solid #0003'

    }

    const activatorStyle = {
      border: '1px solid #0003',
      borderRadius: 0,
      background: 'transparent',
      width: '30px',
      height: '30px',
    }

    const handleInput = color => {
      if (color.angle) {
        state.currentColorName = color.name
        state.currentColor = `linear-gradient(${color.angle}, ${color.colorStop1}, ${color.colorStop2})`
      } else if (color.value) {
        state.currentColorName = `${color.name} (${color.value})`
        state.currentColor = color.value
      } else {
        state.currentColorName = color
        state.currentColor = color
      }
    }

    return () => (
        <div data-app style='left: 200px; top: 200px'>
          <g-color-picker
              scopedSlots={{
                default: (gMenuScope) =>
                    <div style='display: flex; align-items: center;'>
                      <input type='text' value={state.currentColorName} style={inputStyle}/>
                      <span style={{...previewStyle, background: state.currentColor}}></span>
                      <button type='button' style={activatorStyle} vOn:click={gMenuScope.toggleContent}>...</button>
                    </div>
                }}
              vOn:input={handleInput}
          ></g-color-picker>
        </div>)
  }
})
