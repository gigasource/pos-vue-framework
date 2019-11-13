import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import { reactive, ref } from '@vue/composition-api'
import GGridLayout from '../GGridLayout'
import GGridGenerator from '../GGridGenerator';
import GEditViewInput from '../GEditViewInput'
import GIncDecNumberInput from '../GIncDecNumberInput'
import { parseLayoutJson } from '../logic/GGridGeneratorUtil';
import { createLayoutObject } from './storyHelper';

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
function createTemplate(areaIdentity = 'area'){
  // add identity-attr if areaIdentity is not default 'area'
  let identityAttr = (areaIdentity !== 'area') ? `identity-attr="${areaIdentity}"` : ''

  return `<div class="storybook-gridlayout">
  <g-grid-generator :layout="app"/>      
  <g-grid-layout :layout="app" style="height: 700px" :displayPreviewColor="displayPreviewColor" ${identityAttr}>
    <div ${areaIdentity}="headerLogo">Gigaorder logo</div>
    <div ${areaIdentity}="headerTitle">Gigaorder GmbH</div>
    <div ${areaIdentity}="bodySidebar">
      <ul style="list-style-type: none;">
        <li>Home</li>
        <li>Products</li>
        <li>Contact</li>
        <li>About us</li>
      </ul>
    </div>
    <div ${areaIdentity}="bodyContent">
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
    <div ${areaIdentity}="footer">
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
    return { app: createLayoutObject() }
  },
  template: createTemplate()
})

export const layoutCustomIdentity = () => ({
  components: { GGridLayout, GGridGenerator },
  props: { displayPreviewColor: { default: boolean('displayPreviewColor', true) } },
  data () {
    return {
      app: createLayoutObject()
    }
  },
  template: createTemplate('x-zone')
})
