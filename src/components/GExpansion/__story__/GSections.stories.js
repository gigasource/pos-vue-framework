import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import GSections from '../GSections';
import GSectionsHeader from '../GSectionsHeader';
import GSectionsItem from '../GSectionsItem';
import GTextField from '../../GInput/GTextField';
import GSwitch from '../../GSwitch/GSwitch';
import GBtn from '../../GBtn/GBtn';
import GIcon from '../../GIcon/GIcon';
import { ref, computed, watch } from 'vue';

export default {
  title: 'GSections',
  decorators: [withKnobs]
}

export const DemoAPI1UsingHeaderPropOfGSectionsItem = () => ({
  components: { GSections, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {

  },
  setup() {
    const activeItem = ref()
    const items = ref([
      { title: 'Section 1' },
      { title: 'Section 2' },
      { title: 'Section 3' },
      { title: 'Section 4' },
      { title: 'Section 5' },
      { title: 'Section 6' },
      { title: 'Section 7' },
    ])

    return {
      items,
      activeItem,
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem">       
        <g-sections-item v-for="(item, index) in items" :header="item.title" :key="index">
          <g-text-field label="Key" dense/>
          <g-text-field label="Default" dense/>
          <g-text-field label="Ref" dense/>
          <g-switch flat label="Auto populate"/>
          <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
        </g-sections-item>
      </g-sections>
  </div>
`
})

export const DemoAPI1Mandatory = () => ({
  components: { GSections, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {

  },
  setup() {
    const activeItem = ref(null)
    const items = ref([
      { title: 'Section 1' },
      { title: 'Section 2' },
      { title: 'Section 3' },
      { title: 'Section 4' },
      { title: 'Section 5' },
      { title: 'Section 6' },
      { title: 'Section 7' },
    ])

    return {
      items,
      activeItem,
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem" mandatory>       
        <g-sections-item v-for="(item, index) in items" :header="item.title" :key="index">
          <g-text-field label="Key" dense/>
          <g-text-field label="Default" dense/>
          <g-text-field label="Ref" dense/>
          <g-switch flat label="Auto populate"/>
          <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
        </g-sections-item>
      </g-sections>
  </div>
`
})

export const DemoAPI1Multiple = () => ({
  components: { GSections, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn },
  setup() {
    const activeItem = ref(null)
    const items = ref([
      { title: 'Section 1' },
      { title: 'Section 2' },
      { title: 'Section 3' },
      { title: 'Section 4' },
      { title: 'Section 5' },
      { title: 'Section 6' },
      { title: 'Section 7' },
    ])

    return {
      items,
      activeItem,
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem" multiple>       
        <g-sections-item v-for="(item, index) in items" :header="item.title" :key="index">
          <g-text-field label="Key" dense/>
          <g-text-field label="Default" dense/>
          <g-text-field label="Ref" dense/>
          <g-switch flat label="Auto populate"/>
          <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
        </g-sections-item>
      </g-sections>
  </div>
`
})

export const DemoAPI2UsingGSectionsHeaderComponent = () => ({
  components: { GSections, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn, GIcon },
  props: {
    headerHeight: { default: number('Header height', 32) }
  },
  setup() {
    const activeItem = ref(null)
    const items = ref([
      { title: 'Section 1' },
      { title: 'Section 2' },
      { title: 'Section 3' },
      { title: 'Section 4' },
      { title: 'Section 5' },
      { title: 'Section 6' },
      { title: 'Section 7' },
    ])

    return {
      items,
      activeItem,
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem">       
        <g-sections-header v-for="(item, index) in items" :height="headerHeight">
          <g-icon>fas fa-hand-point-right</g-icon>
          {{item.title}}
        </g-sections-header>
        <g-sections-item v-for="(item, index) in items" :key="index">
          <g-text-field label="Key" dense/>
          <g-text-field label="Default" dense/>
          <g-text-field label="Ref" dense/>
          <g-switch flat label="Auto populate"/>
          <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
        </g-sections-item>
      </g-sections>
  </div>
`
})

export const DemoAPI3UsingItemheaderPropsOfGSections = () => ({
  components: { GSections, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {
    itemHeight: {default: number('Item height', 32)}
  },
  setup() {
    const activeItem = ref(null)

    const itemHeaders = ['Section 1', 'Section 2','Section 3', 'Section 4', 'Section 5', 'Section 6', 'Section 7']

    return {
      activeItem,
      itemHeaders
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem" :item-headers="itemHeaders">       
        <template v-for="header in itemHeaders" v-slot:[header]>
          <g-text-field label="Key" dense/>
          <g-text-field label="Default" dense/>
          <g-text-field label="Ref" dense/>
          <g-switch flat label="Auto populate"/>
          <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
        </template>
      </g-sections>
  </div>
`
})
