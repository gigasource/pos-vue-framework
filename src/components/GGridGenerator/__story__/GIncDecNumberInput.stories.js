import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GIncDecNumberInput from '../GIncDecNumberInput'
import { reactive } from '@vue/composition-api';

//
export default {
  title: 'GIncDecNumberInput',
  decorators: [withKnobs],
}

export const incDecNumberInput = () => ({
  components: {GIncDecNumberInput},
  setup() {
    const data = reactive({
      val: 20
    })

    return () => (
      <g-inc-dec-number-input vModel={data.val} min={0} max={100}></g-inc-dec-number-input>
    )
  }
})
