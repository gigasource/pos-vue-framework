import { boolean, number, object, text, withKnobs } from '@storybook/addon-knobs';
import GKeyboardAuto from '../GKeyboardAuto';
import GNumberKeyboard from '../GNumberKeyboard';
import GTextField from '../../GInput/GTextField';

export default {
  title: 'GKeyboard',
  decorators: [withKnobs]
}

export const basic = () => ({
  components: { GKeyboardAuto, GTextField },
  data() {
    return {
      internalValue: ''
    }
  },
  methods: {
    blur(e) {
      console.log('blur', e.target)
    },
    click(e) {
      e.preventDefault()
      console.log('click', e.target)
    }
  },
  template: `
    <div>
      <g-text-field read-only/>
      <g-text-field v-model="internalValue"/>
      <div @click="click">
        <input readonly @blur="blur"/>
      </div>
      <span>{{internalValue}}</span>
      <g-keyboard-auto/>
    </div>`
})

export const numberKeyboard = () => ({
  components: { GNumberKeyboard, GTextField },
  data() {
    return {
      value: 0
    }
  },
  template: `
    <div>
      <g-number-keyboard v-model="value"/>
    </div>`
})
