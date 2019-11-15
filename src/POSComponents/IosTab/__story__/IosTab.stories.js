import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import IosTab from '../IosTab';
import GList from "../../../components/GList/GList";
import GTabItem from "../../../components/GTabs/GTabItem";

export default {
  title: 'IosTab',
  decorators: [withKnobs]
}

export const tab = () => ({
  components: {IosTab, GList, GTabItem},
  data() {
    return {
      items: [
        {
          title: 'By Month',
          icon: 'month',
          list: [
            { subheader: '2019', type: 'subheader' },
            {
              title: 'September',
              subtitle: '25',
              append: '542.742,06'
            },
            {
              title: 'August',
              subtitle: '32',
              append: '542.742,06'
            },
            {
              title: 'July',
              subtitle: '52',
              append: '542.742,06'
            },
            {
              title: 'June',
              subtitle: '72',
              append: '542.742,06'
            },
            {
              title: 'May',
              subtitle: '35',
              append: '542.742,06'
            },
            {
              title: 'April',
              subtitle: '73',
              append: '542.742,06'
            },
            {
              title: 'March',
              subtitle: '43',
              append: '542.742,06'
            },
            {
              title: 'February',
              subtitle: '45',
              append: '542.742,06'
            },
            {
              title: 'January',
              subtitle: '15',
              append: '542.742,06'
            }
          ]
        },
        {
          title: 'By Day',
          icon: 'day',
          list: [
            {
              title: 'September',
              subtitle: '25',
              append: '542.742,06'
            },
            {
              title: 'August',
              subtitle: '32',
              append: '542.742,06'
            },
            {
              title: 'July',
              subtitle: '52',
              append: '542.742,06'
            },
            {
              title: 'June',
              subtitle: '72',
              append: '542.742,06'
            },
            {
              title: 'May',
              subtitle: '35',
              append: '542.742,06'
            },
            {
              title: 'April',
              subtitle: '73',
              append: '542.742,06'
            },
            {
              title: 'March',
              subtitle: '43',
              append: '542.742,06'
            },
            {
              title: 'February',
              subtitle: '45',
              append: '542.742,06'
            },
            {
              title: 'January',
              subtitle: '15',
              append: '542.742,06'
            }
          ]
        },
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
      <g-tab-item v-for="tabItem in items" :item="tabItem">
        <g-list :items="tabItem.list"/>
      </g-tab-item>
    </ios-tab>
  `
});