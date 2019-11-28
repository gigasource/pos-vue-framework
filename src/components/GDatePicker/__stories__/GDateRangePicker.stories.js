import { text, withKnobs } from '@storybook/addon-knobs';
import GDateRangePicker from '../GDateRangePicker'
//
export default {
  title: 'GDateRangePicker',
  decorators: [withKnobs],
}

export const playground = () => ({
  components: {GDateRangePicker},
  setup() {
    return () => (
        <g-date-range-picker/>
    )
  }
})
