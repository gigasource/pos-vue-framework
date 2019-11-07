import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GEditViewInput from '../GEditViewInput'
import { reactive } from '@vue/composition-api';
//
export default {
  title: 'GEditViewInput',
  decorators: [withKnobs],
}

export const gEditViewInput = () => ({
  components: { GEditViewInput },
  setup() {
    const data = reactive({
      value: 'hello there'
    })

    return () => (
        <g-edit-view-input
            vModel={data.value}
        />
    )
  }
})
