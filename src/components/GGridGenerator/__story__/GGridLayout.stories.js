import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { reactive, ref } from '@vue/composition-api'
import GGridLayout from '../GGridLayout'
import GEditViewInput from '../GEditViewInput'
import GIncDecNumberInput from '../GIncDecNumberInput'
import GGridGeneratorInput from '../GGridGeneratorInput';
import loginLayout from './layout'

//
export default {
  title: 'GGridLayout',
  decorators: [withKnobs],
}

// inc/dec number input
export const incDecNumberInput = () => ({
  components: { GIncDecNumberInput },
  setup() {
    const data = reactive({
      val: 20
    })

    return () => (
        <g-inc-dec-number-input value={data.val} vOn:input={v => data.val = v} min={0} max={100}></g-inc-dec-number-input>
    )
  }
})

// edit view input
export const editViewInput = () => ({
  components: { GEditViewInput },
  setup() {
    const data = reactive({
      value: 'hello there'
    })

    return () => (
        <div>
          <div>
            1) Hover mouse over edit view input, pen icon will be shown on the left side of text<br/>
            2) Click Pen icon, now the caret will be shown on the right hand side of text<br/>
            3) Now you can edit the text, press Enter to apply new change or move mouse out of this control to cancel
          </div>
          <br/>
          <span>{data.value}</span>
          <div>
            <label>Lazy mode: changed input when enter pressed</label>
            <g-edit-view-input value={data.value} vOn:input={v => data.value = v}/>
          </div>
          <div>
            <label>Reactive mode: changed input immediately when input change</label>
            <g-edit-view-input value={data.value} vOn:input={v => data.value = v} reactive/>
          </div>
        </div>
    )
  }
})

export const layoutJsonObject = () => ({
  components: { GGridLayout },
  props: {
    layout: {
      default: loginLayout
    },
    passThrough: {
      default: boolean('passThrough', false)
    },
    editable: {
      default: boolean('editable', true)
    }
  },
  template: `
    <div>
      <g-grid-layout :layout="layout" :passThrough="passThrough" :editable="editable" style="height: 700px" :displayPreviewColor="true">
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


export const layoutGridGeneratorInput = () => ({
  components: { GGridLayout, GGridGeneratorInput },
  data() {
    return {
      model: { layout: undefined },
      field: { key: 'layout' }
    }
  },
  template: `
    <div>
      <g-grid-generator-input :model="model" :field="field"></g-grid-generator-input>
      <g-grid-layout :layout="model[field.key]" style="height: 700px" :displayPreviewColor="true">
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
