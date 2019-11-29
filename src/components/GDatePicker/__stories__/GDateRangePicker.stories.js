import { text, withKnobs } from '@storybook/addon-knobs';
import GDateRangePicker from '../GDateRangePicker'
import { reactive } from '@vue/composition-api';
//
export default {
  title: 'GDateRangePicker',
  decorators: [withKnobs],
}

export const playground = () => ({
  components: {GDateRangePicker},
  setup() {
    const range = reactive({
      value: []
    })
    return () => (
        <g-date-range-picker vModel={range.value} />
    )
  }
})
