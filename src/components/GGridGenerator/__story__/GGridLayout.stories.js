import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { reactive, ref } from '@vue/composition-api'
import GGridLayout from '../GGridLayout'
import GGridGenerator from '../GGridGenerator';
import GEditViewInput from '../GEditViewInput'
import GIncDecNumberInput from '../GIncDecNumberInput'
import { createLayoutObject, createLayoutStr } from './storyHelper';
import loginLayout from './layout'

//
export default {
  title: 'GGridLayout',
  decorators: [withKnobs],
}

// inc/dec number input
export const incDecNumberInput = () => ({
  components: {GIncDecNumberInput},
  setup() {
    const data = reactive({
      val: 20
    })

    return () => (
        <g-inc-dec-number-input vModel={data.val} min={0} max={100}></g-inc-dec-number-input>
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
          <g-edit-view-input
              vModel={data.value}
          />
        </div>

    )
  }
})

// grid-layout example
function createTemplate(){
  return `<div class="storybook-gridlayout"> 
  <g-grid-layout :layout="layout" style="height: 700px" :displayPreviewColor="displayPreviewColor">
    <div area="headerLogo">Gigaorder logo</div>
    <div area="headerTitle">Gigaorder GmbH</div>
    <div area="bodySidebar">
      <ul style="list-style-type: none;">
        <li>Home</li>
        <li>Products</li>
        <li>Contact</li>
        <li>About us</li>
      </ul>
    </div>
    <div area="bodyContent">
      <div style="display: flex">
        <div style="border: 1px solid black; margin: 5px; padding: 5px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div style="border: 1px solid black; margin: 5px; padding: 5px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div style="border: 1px solid black; margin: 5px; padding: 5px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
    <div area="footer">
      <div style="width: 100%; text-align: center">
        Addr: 3 Duy Tan street, Dich Vong Hau, Cau Giay district, Ha Noi, Viet Nam<br/>
        Phone: (+84) xxx xxx xxx
      </div>
    </div>
  </g-grid-layout>
</div>`
}

export const layoutDefaultIdentity = () => ({
  components: { GGridLayout, GGridGenerator },
  props: {
    displayPreviewColor: {
      default: boolean('displayPreviewColor', true)
    }
  },
  data() {
    return {
      layout: createLayoutObject()
    }
  },
  template: createTemplate()
})

export const layoutStr = () => ({
  components: { GGridLayout, GGridGenerator },
  props: {
    displayPreviewColor: {
      default: boolean('displayPreviewColor', true)
    },
    // for some reason, unexpred error thrown with JSON parse when using storybook property
    // layout: {
    //   type: [String, Object],
    //   default: text('layout', '{"name":"app","hide":false,"columns":["1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr","1fr","1fr"],"columnGap":0,"rowGap":0,"bgColor":"transparent","subAreas":[{"name":"header","hide":false,"columns":["1fr","1fr","1fr","1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr"],"columnGap":0,"rowGap":0,"area":{"columnStart":1,"columnEnd":6,"rowStart":1,"rowEnd":2},"bgColor":"hsl(68, 100%, 50%, 50%)","align-items":"","align-content":"","justify-items":"","justify-content":"","justify-self":"","align-self":"","subAreas":[{"name":"headerLogo","hide":false,"area":{"columnStart":2,"columnEnd":3,"rowStart":2,"rowEnd":3},"bgColor":"hsl(280, 100%, 50%, 50%)","justify-self":"","align-self":""},{"name":"headerTitle","hide":false,"area":{"columnStart":4,"columnEnd":8,"rowStart":3,"rowEnd":2},"bgColor":"hsl(262, 100%, 50%, 50%)","justify-self":"","align-self":""}]},{"name":"body","hide":false,"columns":["1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr","1fr","1fr"],"columnGap":0,"rowGap":0,"area":{"columnEnd":6,"columnStart":1,"rowEnd":5,"rowStart":2},"bgColor":"hsl(275, 100%, 50%, 50%)","align-items":"","align-content":"","justify-items":"","justify-content":"","justify-self":"","align-self":"","subAreas":[{"name":"bodySidebar","hide":false,"area":{"columnEnd":2,"columnStart":1,"rowEnd":6,"rowStart":1},"bgColor":"hsl(298, 100%, 50%, 50%)","justify-self":"","align-self":""},{"name":"bodyContent","hide":false,"area":{"columnEnd":6,"columnStart":2,"rowEnd":6,"rowStart":1},"bgColor":"hsl(8, 100%, 50%, 50%)","justify-self":"","align-self":""}]},{"name":"footer","hide":false,"area":{"columnEnd":6,"columnStart":1,"rowEnd":6,"rowStart":5},"bgColor":"hsl(204, 100%, 50%, 50%)","justify-self":"","align-self":""}],"align-items":"start","align-content":"end","justify-items":"center","justify-content":"space-around"}')
    // }
    layout: {
      default: '{"name":"app","hide":false,"columns":["1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr","1fr","1fr"],"columnGap":0,"rowGap":0,"bgColor":"transparent","subAreas":[{"name":"header","hide":false,"columns":["1fr","1fr","1fr","1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr"],"columnGap":0,"rowGap":0,"area":{"columnStart":1,"columnEnd":6,"rowStart":1,"rowEnd":2},"bgColor":"hsl(68, 100%, 50%, 50%)","align-items":"","align-content":"","justify-items":"","justify-content":"","justify-self":"","align-self":"","subAreas":[{"name":"headerLogo","hide":false,"area":{"columnStart":2,"columnEnd":3,"rowStart":2,"rowEnd":3},"bgColor":"hsl(280, 100%, 50%, 50%)","justify-self":"","align-self":""},{"name":"headerTitle","hide":false,"area":{"columnStart":4,"columnEnd":8,"rowStart":3,"rowEnd":2},"bgColor":"hsl(262, 100%, 50%, 50%)","justify-self":"","align-self":""}]},{"name":"body","hide":false,"columns":["1fr","1fr","1fr","1fr","1fr"],"rows":["1fr","1fr","1fr","1fr","1fr"],"columnGap":0,"rowGap":0,"area":{"columnEnd":6,"columnStart":1,"rowEnd":5,"rowStart":2},"bgColor":"hsl(275, 100%, 50%, 50%)","align-items":"","align-content":"","justify-items":"","justify-content":"","justify-self":"","align-self":"","subAreas":[{"name":"bodySidebar","hide":false,"area":{"columnEnd":2,"columnStart":1,"rowEnd":6,"rowStart":1},"bgColor":"hsl(298, 100%, 50%, 50%)","justify-self":"","align-self":""},{"name":"bodyContent","hide":false,"area":{"columnEnd":6,"columnStart":2,"rowEnd":6,"rowStart":1},"bgColor":"hsl(8, 100%, 50%, 50%)","justify-self":"","align-self":""}]},{"name":"footer","hide":false,"area":{"columnEnd":6,"columnStart":1,"rowEnd":6,"rowStart":5},"bgColor":"hsl(204, 100%, 50%, 50%)","justify-self":"","align-self":""}],"align-items":"start","align-content":"end","justify-items":"center","justify-content":"space-around"}'
    }
  },
  template: createTemplate()
})


export const login = () => ({
  components: { GGridLayout},
  props: {
    layout: {
      default: loginLayout
    }
  },
  template: `
    <div>
      <g-grid-layout :layout="layout" style="height: 700px" :displayPreviewColor="true">
        <div area="num7">7</div>
        <div area="num8">8</div>
        <div area="login">Login</div>
      </g-grid-layout>
    </div>
  `
})
