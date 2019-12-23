import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GIconChooser from '../GIconChooser'
import GIconChooserInputModel from '../GIconChooserInputModel';
//
export default {
  title: 'GIconChooser',
  decorators: [withKnobs],
}

export const gIconChooser = () => ({
  components: { GIconChooser },
  setup(props) {
    return () => (
        <g-icon-chooser label={'avatar'}/>
    )
  }
})


export const gIconChooserModel = () => ({
  components: { GIconChooserInputModel },
  data() {
    return {
      model: { icon: 'fab fa-adversal' },
      field: { key: 'icon' }
    }
  },
  template: `<g-icon-chooser-input-model label='avatar' :model="model" :field="field"/>`
})
