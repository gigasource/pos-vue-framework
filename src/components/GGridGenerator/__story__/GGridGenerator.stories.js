import { text, withKnobs } from '@storybook/addon-knobs'
import GGridGenerator from '../GGridGenerator'
import { createLayoutObject, createLayoutStr } from './storyHelper'
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

export const useLayoutStr = () => ({
  components: {GGridGenerator},
  setup() {
    const layoutStr = createLayoutStr()
    return () => <g-grid-generator layout={layoutStr}/>
  }
})

export const useLayoutObject = () => ({
  components: {GGridGenerator},
  setup() {
    const app = createLayoutObject()
    return () => <g-grid-generator layout={app}/>
  }
})
