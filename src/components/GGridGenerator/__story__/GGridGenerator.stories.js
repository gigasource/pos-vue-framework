import { text, withKnobs } from '@storybook/addon-knobs'
import GGridGenerator from '../GGridGenerator'
import { createLayoutObject } from './storyHelper'
//
export default {
  title: 'GGridGenerator',
  decorators: [withKnobs],
}

export const useDefaultIfLayoutIsNull = () => ({
  components: {GGridGenerator},
  setup() {
    return () => <g-grid-generator/>
  }
})

export const useLayoutObject = () => ({
  components: {GGridGenerator},
  setup() {
    const app = createLayoutObject()
    return () => <g-grid-generator layout={app}/>
  }
})
