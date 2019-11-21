import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import IosTab from '../IosTab';
import GList from "../../../components/GList/GList";
import GTabItemWebAnimation from "../../../components/GTabs/GTabItemWebAnimation";
import GTabItemVueAnimation from "../../../components/GTabs/GTabItemVueAnimation";
import GTabItem from "../../../components/GTabs/GTabItem";
import GListCustom from '../GListCustom';

export default {
  title: 'IosTab',
  decorators: [withKnobs]
}

export const tab = () => ({
  components: {IosTab, GList, GListCustom, GTabItemWebAnimation, GTabItemVueAnimation, GTabItem},
  data() {
    return {
      items: [
        {
          title: 'By Month',
          icon: 'month',
          subheader: '2019',
          list: [
            {
              title: 'September',
              subtitle: '25 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'August',
              subtitle: '32 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'July',
              subtitle: '52 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'June',
              subtitle: '72 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'May',
              subtitle: '35 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'April',
              subtitle: '73 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'March',
              subtitle: '43 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'February',
              subtitle: '45 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'January',
              subtitle: '15 Sales',
              append: '€ 542.742,06'
            }
          ]
        },
        {
          title: 'By Day',
          icon: 'day',
          subheader: '2019',
          list: [
            {
              title: 'August',
              subtitle: '25 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'September',
              subtitle: '32 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'July',
              subtitle: '52 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'June',
              subtitle: '72 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'May',
              subtitle: '35 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'April',
              subtitle: '73 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'March',
              subtitle: '43 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'February',
              subtitle: '45 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'January',
              subtitle: '15 Sales',
              append: '€ 542.742,06'
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
    },
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
      :slider-color="sliderColor"
      >
      <g-tab-item v-for="tabItem in items" :item="tabItem">
        <g-list-custom :items="tabItem.list" :subheader="tabItem.subheader">
        </g-list-custom>
      </g-tab-item>
    </ios-tab>
  `,
});

export const tabVueAnimation = () => ({
  components: {IosTab, GList, GListCustom, GTabItemWebAnimation, GTabItemVueAnimation, GTabItem},
  data() {
    return {
      items: [
        {
          title: 'By Month',
          icon: 'month',
          subheader: '2019',
          list: [
            {
              title: 'September',
              subtitle: '25 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'August',
              subtitle: '32 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'July',
              subtitle: '52 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'June',
              subtitle: '72 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'May',
              subtitle: '35 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'April',
              subtitle: '73 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'March',
              subtitle: '43 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'February',
              subtitle: '45 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'January',
              subtitle: '15 Sales',
              append: '€ 542.742,06'
            }
          ]
        },
        {
          title: 'By day',
          icon: 'day',
          subheader: '2019',
          list: [
            {
              title: 'August',
              subtitle: '25 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'September',
              subtitle: '32 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'July',
              subtitle: '52 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'June',
              subtitle: '72 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'May',
              subtitle: '35 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'April',
              subtitle: '73 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'March',
              subtitle: '43 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'February',
              subtitle: '45 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'January',
              subtitle: '15 Sales',
              append: '€ 542.742,06'
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
    },
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
      :slider-color="sliderColor"
      >
      <g-tab-item-vue-animation v-for="tabItem in items" :item="tabItem">
        <g-list-custom :items="tabItem.list" :subheader="tabItem.subheader">
        </g-list-custom>
      </g-tab-item-vue-animation>
    </ios-tab>
  `,
});

export const tabWebAnimation = () => ({
  components: {IosTab, GList, GListCustom, GTabItemWebAnimation, GTabItemVueAnimation, GTabItem},
  data() {
    return {
      items: [
        {
          title: 'By Month',
          icon: 'month',
          subheader: '2019',
          list: [
            {
              title: 'September',
              subtitle: '25 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'August',
              subtitle: '32 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'July',
              subtitle: '52 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'June',
              subtitle: '72 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'May',
              subtitle: '35 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'April',
              subtitle: '73 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'March',
              subtitle: '43 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'February',
              subtitle: '45 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'January',
              subtitle: '15 Sales',
              append: '€ 542.742,06'
            }
          ]
        },
        {
          title: 'By Day',
          icon: 'day',
          subheader: '2019',
          list: [
            {
              title: 'August',
              subtitle: '25 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'September',
              subtitle: '32 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'July',
              subtitle: '52 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'June',
              subtitle: '72 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'May',
              subtitle: '35 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'April',
              subtitle: '73 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'March',
              subtitle: '43 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'February',
              subtitle: '45 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'January',
              subtitle: '15 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'February',
              subtitle: '45 Sales',
              append: '€ 542.742,06'
            },
            {
              title: 'January',
              subtitle: '15 Sales',
              append: '€ 542.742,06'
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
    },
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
      :slider-color="sliderColor"
      >
      <g-tab-item-web-animation v-for="tabItem in items" :item="tabItem">
        <g-list-custom :items="tabItem.list" :subheader="tabItem.subheader">
        </g-list-custom>
      </g-tab-item-web-animation>
    </ios-tab>
  `,
});