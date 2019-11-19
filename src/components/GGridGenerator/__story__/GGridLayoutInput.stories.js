import { text, withKnobs } from '@storybook/addon-knobs'
import GGridLayoutInput from '../GGridLayoutInput'
import { reactive } from '@vue/composition-api'

export default {
  title: 'GGridLayoutInput',
  decorators: [withKnobs],
}

export const index = () => ({
  components: { GGridLayoutInput },
  setup() {
    const state = reactive({
      model: {},
      field: { key: 'layout' }
    })
    const render = () => <g-grid-layout-input propsModel={state.model} field={state.field}></g-grid-layout-input>
    return { state, render }
  },
  render() {
    return this.render()
  }
})
