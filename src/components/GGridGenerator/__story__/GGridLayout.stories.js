import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions'
import { reactive, ref } from '@vue/composition-api'
import GGridLayout from '../GGridLayout'
import GGridGenerator from '../GGridGenerator';
import GEditViewInput from '../GEditViewInput'
import GIncDecNumberInput from '../GIncDecNumberInput'

//
export default {
  title: 'GGridLayout',
  decorators: [withKnobs],
}

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
            2) Click to Pen icon, now the caret will be shown on the right hand side of text<br/>
            3) Now you can edit the text, press Enter to apply new change <br/>
              <br/>or move mouse out of this control to cancel change
          </div>
          <g-edit-view-input
              vModel={data.value}
          />
        </div>

    )
  }
})


export const gridLayout = () => ({
  components: { GGridLayout, GGridGenerator },
  props: {
    displayPreviewColor: {
      default: boolean('displayPreviewColor', true)
    }
  },
  data() {
    // app
    const app = {
      name: 'app',
      hide: false,
      settings: {
        columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
        rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
        columnGap: 0,
        rowGap: 0,
      },
      bgColor: 'transparent',
      subAreas: []
    }
    // header
    const header = {
      name: 'header',
      hide: false,
      parent: app,
      settings: {
        columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
        rows: [ref('1fr'), ref('1fr'), ref('1fr')],
        columnGap: 0,
        rowGap: 0,
      },
      area: {
        columnStart: 1,
        columnEnd: 6,
        rowStart: 1,
        rowEnd: 2
      },
      bgColor: 'hsl(68, 100%, 50%, 50%)',
    }
    const headerLogo = {
      name: 'headerLogo',
      hide: false,
      area: {
        columnStart: 2,
        columnEnd: 3,
        rowStart: 2,
        rowEnd: 3
      },
      bgColor: 'hsl(280, 100%, 50%, 50%)',
      parent: header
    }
    const headerTitle = {
      name: 'headerTitle',
      hide: false,
      area: {
        columnStart: 4,
        columnEnd: 8,
        rowStart: 3,
        rowEnd: 2
      },
      bgColor: 'hsl(262, 100%, 50%, 50%)',
      parent: header
    }
    header.subAreas = [headerLogo, headerTitle]

    // body
    const body = {
      name: 'body',
      hide: false,
      settings: {
        columns: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
        rows: [ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr'), ref('1fr')],
        columnGap: 0,
        rowGap: 0,
      },
      area: {
        columnEnd: 6,
        columnStart: 1,
        rowEnd: 5,
        rowStart: 2
      },
      bgColor: 'hsl(275, 100%, 50%, 50%)',
      parent: app
    }
    const bodySidebar = {
      name: 'bodySidebar',
      hide: false,
      area: {
        columnEnd: 2,
        columnStart: 1,
        rowEnd: 6,
        rowStart: 1
      },
      bgColor: 'hsl(298, 100%, 50%, 50%)',
      parent: body
    }
    const bodyContent = {
      name: 'bodyContent',
      hide: false,
      area: {
        columnEnd: 6,
        columnStart: 2,
        rowEnd: 6,
        rowStart: 1
      },
      bgColor: 'hsl(8, 100%, 50%, 50%)',
      parent: body
    }

    body.subAreas = [bodySidebar, bodyContent]

    // footer
    const footer = {
      name: 'footer',
      hide: false,
      area: {
        columnEnd: 6,
        columnStart: 1,
        rowEnd: 6,
        rowStart: 5
      },
      bgColor: 'hsl(204, 100%, 50%, 50%)',
      parent: app
    }

    app.subAreas = [header, body, footer]


    return {
      app: app,
    }
  },
  template: `
<div>
  <g-grid-generator :layout="app"/>      
  <g-grid-layout :layout="app" style="height: 700px" :displayPreviewColor="displayPreviewColor">
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
</div>
`
})
