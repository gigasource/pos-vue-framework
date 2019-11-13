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

export const useLayoutStr = () => ({
  components: {GGridGenerator},
  setup() {
    const layoutStr = '{"name":"app","hide":false,"settings":{"columns":["1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr","1fr","1fr"],"columnGap":0,"rowGap":0},"bgColor":"transparent","subAreas":[{"name":"header","hide":false,"settings":{"columns":["1fr","1fr","1fr","1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr"],"columnGap":0,"rowGap":0},"area":{"columnStart":1,"columnEnd":6,"rowStart":1,"rowEnd":2},"bgColor":"hsl(68, 100%, 50%, 50%)","subAreas":[{"name":"headerLogo","hide":false,"area":{"columnStart":2,"columnEnd":3,"rowStart":2,"rowEnd":3},"bgColor":"hsl(280, 100%, 50%, 50%)"},{"name":"headerTitle","hide":false,"area":{"columnStart":4,"columnEnd":8,"rowStart":3,"rowEnd":2},"bgColor":"hsl(262, 100%, 50%, 50%)"}]},{"name":"body","hide":false,"settings":{"columns":["1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr","1fr","1fr"],"columnGap":0,"rowGap":0},"area":{"columnEnd":6,"columnStart":1,"rowEnd":5,"rowStart":2},"bgColor":"hsl(275, 100%, 50%, 50%)","subAreas":[{"name":"bodySidebar","hide":false,"area":{"columnEnd":2,"columnStart":1,"rowEnd":6,"rowStart":1},"bgColor":"hsl(298, 100%, 50%, 50%)"},{"name":"bodyContent","hide":false,"area":{"columnEnd":6,"columnStart":2,"rowEnd":6,"rowStart":1},"bgColor":"hsl(8, 100%, 50%, 50%)"}]},{"name":"footer","hide":false,"area":{"columnEnd":6,"columnStart":1,"rowEnd":6,"rowStart":5},"bgColor":"hsl(204, 100%, 50%, 50%)"}]}'
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
