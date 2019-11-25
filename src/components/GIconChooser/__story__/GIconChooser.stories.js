import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GIconChooser from '../GIconChooser'
import GIconSearch from '../GIconSearch'
//
export default {
  title: 'GIconChooser',
  decorators: [withKnobs],
}

export const test2 = () => ({
  components: { GIconChooser },
  setup() {
    return () => (
        <g-icon-chooser/>
    )
  }
})
