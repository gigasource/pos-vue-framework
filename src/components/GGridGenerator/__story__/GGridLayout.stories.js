import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import GGridLayout from '../GGridLayout'
import GGridGenerator from '../GGridGenerator';
import { ref } from '@vue/composition-api'

//
export default {
  title: 'GGridLayout',
  decorators: [withKnobs],
}

export const input = () => ({
  components: { GGridLayout, GGridGenerator },
  data() {
    return {
      gridModel: {
        name: 'app',
        isRoot: true,
        settings: {
          columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
          rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
          columnGap: 0,
          rowGap: 0,
        },
        bgColor: 'transparent',
        subAreas: []
      }
    }
  },
  methods: {
    updateModel(model) {
      console.log('update model')
      this.gridModel = model
    }
  },
  template: `
<div>
  <g-grid-generator :layout="gridModel" v-on:export="updateModel"/>      
  <g-grid-layout :layout="gridModel">
  <div area="logo">lorem ispum</div>
  <div area="footer">Footer: Lorem ispum</div>
  <div area="bodySidebar">Body sidebar</div>
  <div area="bodyContent">Body content</div>
  </g-grid-layout>
</div>
`
})
