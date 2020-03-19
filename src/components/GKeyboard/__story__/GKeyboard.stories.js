import {boolean, number, object, text, withKnobs} from '@storybook/addon-knobs';
import GKeyboardAuto from "../GKeyboardAuto";
import GNumberKeyboard from "../GNumberKeyboard";
import GTextField from "../../GInput/GTextField";

export default {
  title: 'GKeyboard',
  decorators: [withKnobs]
}

export const basic = () => ({
  components: {GKeyboardAuto, GTextField},
  data() {
    return {
      internalValue: ''
    }
  },
  template: `
      <div>
          <g-text-field/>
          <g-text-field v-model="internalValue"/>
          <span>{{internalValue}}</span>
          <g-keyboard/>
      </div>`
})

export const numberKeyboard = () => ({
  components: {GNumberKeyboard, GTextField},
  template: `
      <div>
          <g-number-keyboard/>
      </div>`
})
