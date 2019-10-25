import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import GTabs from '../GTabs';
import GTab from '../GTab';

export default {
  title: 'Tab',
  decorators: [withKnobs]
}

export const tab = () => ({
  components: { GTabs, GTab },
  data() {
    return {
      items: [
        {title: 'Tab 1', icon: 'home'},
        {title: 'Tab 2', icon: 'group'},
        {title: 'Tab 3', icon: 'notifications'},
        {title: 'Tab 4', icon: 'block', disabled: true},
        {title: 'Tab 5', icon: 'phone'},
      ],
      model: null,
    }
  },
  props: {
    color: {
      type: String,
      default: text('Color', 'indigo darken 2')
    },
    textColor: {
      type: String,
      default: text('Text Color', 'white')
    },
    vertical: {
      type: Boolean,
      default: boolean('Vertical', false)
    },
    right: {
      type: Boolean,
      default: boolean('Right', false)
    },
    center: {
      type: Boolean,
      default: boolean('Center', false)
    },
    grow: {
      type: Boolean,
      default: boolean('Grow', false)
    },
    icon: {
      type: Boolean,
      default: boolean('Show icon', false)
    }
  },
  template: `
    <g-tabs v-model="model" 
          :items="items" 
          :color="color" 
          :text-color="textColor" 
          :vertical="vertical"
          :right="right" 
          :center="center"
          :grow="grow"
          :icon="icon">
    </g-tabs>
  `
});