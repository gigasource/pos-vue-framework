import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import GSections from '../GSections';
import GSectionsHeader from '../GSectionsHeader';
import GSectionsItem from '../GSectionsItem';
import GTextField from '../../GInput/GTextField';
import GSwitch from '../../GSwitch/GSwitch';
import GBtn from '../../GBtn/GBtn';
import GIcon from '../../GIcon/GIcon';
import { ref, computed, watch } from '@vue/composition-api';

export default {
  title: 'GSections',
  decorators: [withKnobs]
}

export const Demo = () => ({
  components: { GSections, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {
    itemHeight: {default: number('Item height', 32)}
  },
  setup() {
    const activeItem = ref(null)
    const items = ref([
      {
        title: 'Section 2',
        content: '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 3',
        content: '3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 4',
        content: '4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 5',
        content: '5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 6',
        content: '6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 7',
        content: '7 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ])

    const updateItems = function () {
      // items.value[4] = {
      //   title: 'Section 6 Updated',
      //   content: 'Updated'
      // }
      items.value[4].content = 'updated'
    }

    return {
      items,
      activeItem,
      updateItems
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem">       
        <g-sections-item :item="1" :height="itemHeight" header="Section 1">
          <g-text-field label="Key" dense/>
          <g-text-field label="Default" dense/>
          <g-text-field label="Ref" dense/>
          <g-switch flat label="Auto populate"/>
          <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
        </g-sections-item>
        <g-sections-item v-for="(item, index) in items" :item="item" :header="item.title" :height="itemHeight" :key="index">
          {{item.content}}
        </g-sections-item>
      </g-sections>
  </div>
`
})

// export const Mandatory = () => ({
//   components: { GSections, GSectionsItem, GTextField, GSwitch, GBtn },
//   props: {
//     itemHeight: {default: number('Item height', 32)}
//   },
//   setup() {
//     const activeItem = ref(null)
//     const items = ref([
//       {
//         title: 'Section 2',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 3',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 4',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 5',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 6',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 7',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       }
//     ])
//
//     const multiple = ref(false)
//
//     return {
//       items,
//       activeItem,
//     }
//   },
//   template: `
//   <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
//       <div style="width: 100%; height: 20%;">
//       </div>
//       <g-sections v-model="activeItem" mandatory>
//         <g-sections-item :item="1" :height="itemHeight" header="Section 1">
//           <g-text-field label="Key" dense/>
//           <g-text-field label="Default" dense/>
//           <g-text-field label="Ref" dense/>
//           <g-switch flat label="Auto populate"/>
//           <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
//         </g-sections-item>
//         <g-sections-item v-for="(item, index) in items" :item="item" :header="item.title" :height="itemHeight" :key="index">
//           {{item.content}}
//         </g-sections-item>
//       </g-sections>
//   </div>
// `
// })
//
// export const Multiple = () => ({
//   components: { GSections, GSectionsItem, GTextField, GSwitch, GBtn },
//   props: {
//     itemHeight: {default: number('Item height', 32)}
//   },
//   setup() {
//     const activeItem = ref(null)
//     const items = ref([
//       {
//         title: 'Section 2',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 3',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 4',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 5',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 6',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       },
//       {
//         title: 'Section 7',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//       }
//     ])
//
//     const multiple = ref(false)
//
//     return {
//       items,
//       activeItem,
//     }
//   },
//   template: `
//   <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
//       <div style="width: 100%; height: 20%;">
//       </div>
//       <g-sections v-model="activeItem" multiple>
//         <g-sections-item :item="1" :height="itemHeight" header="Section 1">
//           <g-text-field label="Key" dense/>
//           <g-text-field label="Default" dense/>
//           <g-text-field label="Ref" dense/>
//           <g-switch flat label="Auto populate"/>
//           <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
//         </g-sections-item>
//         <g-sections-item v-for="(item, index) in items" :item="item" :header="item.title" :height="itemHeight" :key="index">
//           {{item.content}}
//         </g-sections-item>
//       </g-sections>
//   </div>
// `
// })

export const DemoAPI2 = () => ({
  components: { GSections, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {
    itemHeight: { default: number('Item height', 32) }
  },
  setup() {
    const activeItem = ref(null)
    const items = ref([
      {
        title: 'Section 2',
        content: '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 3',
        content: '3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 4',
        content: '4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 5',
        content: '5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 6',
        content: '6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 7',
        content: '7 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ])

    const updateItems = function () {
      // items.value[4] = {
      //   title: 'Section 6 Updated',
      //   content: 'Updated'
      // }
      items.value[4].content = 'updated'
    }

    return {
      items,
      activeItem,
      updateItems
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem">       
        <g-sections-header v-for="i in 7">
          Section {{i}}   
        </g-sections-header>
        <g-sections-item :item="1" :height="itemHeight">
          <g-text-field label="Key" dense/>
          <g-text-field label="Default" dense/>
          <g-text-field label="Ref" dense/>
          <g-switch flat label="Auto populate"/>
          <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
        </g-sections-item>
        <g-sections-item v-for="(item, index) in items" :item="item" :height="itemHeight" :key="index">
          {{item.content}}
        </g-sections-item>
      </g-sections>
  </div>
`
})