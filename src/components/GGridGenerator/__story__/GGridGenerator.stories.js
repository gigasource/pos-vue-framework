import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GGridGenerator from '../GGridGenerator'
//
export default {
  title: 'GGridGenerator',
  decorators: [withKnobs],
}

export const test2 = () => ({
  components: {GGridGenerator},
  setup() {
    return () => (
        <g-grid-generator></g-grid-generator>
    )
  }
})
