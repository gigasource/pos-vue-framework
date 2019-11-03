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
      marginLeft: '-37px',
      marginRight: '7px'
    }

    const activatorStyle = {
      border: '1px solid #0003',
      borderRadius: 0,
      background: 'transparent',
      width: '30px',
      height: '30px',
    }

    const slotScoped = {
      default: (scope) => (
          <div style='display: flex; align-items: center;'>
            <input type='text' value={state.currentColorName} style={inputStyle}/>
            <span style={{...previewStyle, background: state.currentColor}}></span>
            <button type='button' style={activatorStyle} vOn:click={() => scope.toggleColorPicker()}>...</button>
          </div>
      )
    }

    return () => (
        <div data-app style='position: absolute; left: 200px; top: 200px'>
          <g-color-picker
              scopedSlots={slotScoped}
              vOn:updatecolor={(color) => {
                console.log(color)
              }}
          ></g-color-picker>
        </div>)
  }
})
