import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import GSections from '../GSections';
import GSectionsHeader from '../GSectionsHeader';
import GSectionsItem from '../GSectionsItem';
import GTextField from '../../GInput/GTextField';
import GSwitch from '../../GSwitch/GSwitch';
import GBtn from '../../GBtn/GBtn';
import GIcon from '../../GIcon/GIcon';
import { ref, computed, watch } from 'vue';
import GSection from "../GSection";

export default {
  title: 'GSection',
  decorators: [withKnobs]
}

export const DemoAPI1UsingHeaderPropOfGSectionsItem = () => ({
  components: { GSection, GSectionsHeader, GSectionsItem, GTextField, GSwitch, GBtn },
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
      <g-section header="Section 1">
        <g-text-field label="Key" dense/>
        <g-text-field label="Default" dense/>
        <g-text-field label="Ref" dense/>
        <g-switch flat label="Auto populate"/>
        <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
      </g-section>
      
      <g-section header="Section 2">
        <g-text-field label="Key" dense/>
        <g-text-field label="Default" dense/>
        <g-text-field label="Ref" dense/>
        <g-switch flat label="Auto populate"/>
        <g-btn small outlined textColor="#1080EC">ADD FILES</g-btn>
      </g-section>
  </div>
`
})
