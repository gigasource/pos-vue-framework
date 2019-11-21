import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import GSections from '../GSections';
import GSectionsItem from '../GSectionsItem';
import GTextField from '../../GInput/GTextField';
import GSwitch from '../../GSwitch/GSwitch';
import GBtn from '../../GBtn/GBtn';
import { ref, computed, watch } from '@vue/composition-api';

export default {
  title: 'GSections',
  decorators: [withKnobs]
}

export const Demo = () => ({
  components: { GSections, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {
    itemHeight: {default: number('Item height', 32)}
  },
  setup() {
    const key = ref(0)
    const activeItem = ref(null)
    const singleItem = ref({title: 'Section 1'})
    const items = ref([
      {
        title: 'Section 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 6',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 7',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ])

    const multiple = ref(false)


    return {
      items,
      singleItem,
      activeItem,
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem" item-header="title">
        <g-sections-item :item="singleItem" :height="itemHeight">
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

export const Madatory = () => ({
  components: { GSections, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {
    itemHeight: {default: number('Item height', 32)}
  },
  setup() {
    const activeItem = ref(null)
    const singleItem = ref({title: 'Section 1'})
    const items = ref([
      {
        title: 'Section 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 6',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 7',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ])

    const multiple = ref(false)

    return {
      items,
      singleItem,
      activeItem,
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem" item-header="title" mandatory>
        <g-sections-item :item="singleItem" :height="itemHeight">
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

export const Multiple = () => ({
  components: { GSections, GSectionsItem, GTextField, GSwitch, GBtn },
  props: {
    itemHeight: {default: number('Item height', 32)}
  },
  setup() {
    const activeItem = ref(null)
    const singleItem = ref({title: 'Section 1'})
    const items = ref([
      {
        title: 'Section 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 6',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Section 7',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ])

    const multiple = ref(false)

    return {
      items,
      singleItem,
      activeItem,
    }
  },
  template: `
  <div style="width: 300px; height: 600px; padding-top: 10px; border: 1px solid #E0E0E0; overflow: auto">
      <div style="width: 100%; height: 20%;">
      </div>
      <g-sections v-model="activeItem" item-header="title" multiple>
        <g-sections-item :item="singleItem" :height="itemHeight">
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