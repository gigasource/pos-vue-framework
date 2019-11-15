import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import IosTab from '../IosTab';

export default {
  title: 'IosTab',
  decorators: [withKnobs]
}

export const tab = () => ({
  components: { IosTab },
  data() {
    return {
      items: [
        { title: 'By Month', icon: 'month' },
        { title: 'By Day', icon: 'day' },
      ],
      model: null,
    }
  },
  created() {
    this.model = this.items[0]
  },
  props: {
    color: {
      type: String,
      default: text('Color', '#D8D8D8')
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
    centerActive: {
      default: boolean('Center active tab', true)
    },
    grow: {
      type: Boolean,
      default: boolean('Grow', false)
    },
    icon: {
      type: Boolean,
      default: boolean('Show icon', false)
    },
    sliderSize: {
      type: Number,
      default: number('Slider Size', 2)
    },
    sliderColor: {
      type: String,
      default: text('Slider Color', 'currentColor')
    }
  },
  template: `
    <ios-tab 
      v-model="model" 
      :items="items" 
      :color="color" 
      :text-color="textColor" 
      :vertical="vertical"
      :right="right" 
      :center="center"
      :center-active="centerActive"
      :grow="grow"
      :icon="icon"
      :slider-size="sliderSize"
      :slider-color="sliderColor">
    </ios-tabs>
  `
});