import { text, withKnobs } from '@storybook/addon-knobs'
import GGridGeneratorInput from '../GGridGeneratorInput'
import { reactive } from '@vue/composition-api'

export default {
  title: 'GGridLayoutInput',
  decorators: [withKnobs],
}

export const index = () => ({
  components: { GGridGeneratorInput },
  setup() {
    const state = reactive({
      model: {},
      field: { key: 'layout' }
    })
    const render = () => <g-grid-generator-input {...{ props: { model: state.model } }} field={state.field}></g-grid-generator-input>
    return { state, render }
  },
  render() {
    return this.render()
  }
})
