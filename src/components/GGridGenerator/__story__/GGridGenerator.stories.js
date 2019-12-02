import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { reactive } from '@vue/composition-api'
import GGridLayout from '../GGridLayout'
import GGridGenerator from '../components/GGridGenerator'
import GGridGeneratorInput from '../GGridGeneratorInput'
import loginLayout from './layout'

//
export default {
  title: 'GGridGenerator',
  decorators: [withKnobs],
}

// grid layout presenter
export const GridLayout = () => ({
  components: { GGridLayout },
  props: {
    lazy: {
      default: boolean('lazy', true)
    },
    layout: {
      default: loginLayout
    },
    passThrough: {
      default: boolean('passThrough', true)
    },
    displayPreviewColor: {
      type: Boolean,
      default: boolean('displayPreviewColor', true)
    }
  },
  template: `
    <div>
      <g-grid-layout :lazy="lazy" :layout="layout" :passThrough="passThrough" style="height: 700px" :displayPreviewColor="displayPreviewColor">
        <span slot="s1" class="slot">singleItemSlot</span>
        <span slot="s1" class="slot">singleItemSlot</span>
        <template slot="s2" class="slot">singleItemSlot</template>
        <span slot="s3" class="slot">Multiple template slot<div>Hello slot</div></span>
        <template slot="s4" class="slot">Multiple template slot<div>Hello slot</div></template>
        <template v-slot:s6 class="vslot">s7</template>
        <template v-slot:s8 class="vslot">s8<div>Hello vslot</div></template>
        <div area="num7">7</div>
        <div area="num7">7</div>
        <div area="num8">8</div>
        <div>PT1</div>
        <div>PT2</div>
        <div>PT3</div>
        <div>PT3</div>
        <div area="login">Login</div>
        <div>PT5</div>
        <div>PT6</div>
        <div>PT7</div>
        <div>PT8</div>
      </g-grid-layout>
    </div>
  `
})

// grid layout generator input
export const GridGeneratorInput = () => ({
  components: { GGridLayout, GGridGeneratorInput },
  props: {
    displayPreviewColor: {
      type: Boolean,
      default: boolean('displayPreviewColor', true)
    },
    passThrough: {
      default: boolean('passThrough', true)
    },
    lazy: {
      default: boolean('lazy', false)
    },
  },
  data() {
    return {
      model: { layout: loginLayout },
      field: { key: 'layout' },
    }
  },
  template: `
    <div>
      <g-grid-generator-input :model="model" :field="field"></g-grid-generator-input>
      <hr/>
      <g-grid-layout :lazy="lazy" :layout="model[field.key]" style="height: 700px" :passThrough="passThrough" :displayPreviewColor="displayPreviewColor">
        <span slot="s1" class="slot" >s1</span>
        <span slot="s1" class="slot">s1</span>
        <span slot="s2" class="slot">s2</span>
        <div area="num7">7</div>
        <div area="num7">7</div>
        <div area="num8">8</div>
        <div area="login">Login</div>
      </g-grid-layout>
    </div>`
})


