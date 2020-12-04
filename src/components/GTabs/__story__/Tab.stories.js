import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import GTabs from '../GTabs';
import GTab from '../GTab';
import GTabItems from '../GTabItems';
import GTabItem from '../GTabItem';
import GToolbar from '../../GToolbar/GToolbar';
import GBtn from '../../GBtn/GBtn';
import GSpacer from '../../GLayout/GSpacer';
import GIcon from '../../GIcon/GIcon';

export default {
  title: 'Tab',
  decorators: [withKnobs]
}

export const tab = () => ({
  components: { GTabs, GTab, GTabItems, GTabItem },
  data() {
    return {
      items: [
        { title: 'Tab 1', icon: 'home' },
        { title: 'Tab 2', icon: 'group' },
        { title: 'Tab 3', icon: 'notifications' },
        { title: 'Tab 4', icon: 'block', disabled: true },
        { title: 'Tab 5', icon: 'phone' },
        { title: 'Tab 6', icon: 'phone' },
        { title: 'Tab 7', icon: 'phone' },
        { title: 'Tab 8', icon: 'phone' },
        { title: 'Tab 9', icon: 'phone' },
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
      default: text('Color', 'purple darken 2')
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
    activeTextColor: {
      type: String,
      default: text('Active Text Color', 'success')
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
          :center-active="centerActive"
          :grow="grow"
          :icon="icon"
          :slider-size="sliderSize"
          :slider-color="sliderColor"
          :active-text-color="activeTextColor">
      <g-tab-item v-for="(item, i) in items" :key="i" :item="item">
        {{item.title}}
      </g-tab-item>
    </g-tabs>`
});

export const tabWithSlot = () => ({
  components: { GTabs, GTab, GTabItems, GTabItem },
  data() {
    return {
      items: [
        { title: 'Tab 1', icon: 'home' },
        { title: 'Tab 2', icon: 'group' },
        { title: 'Tab 3', icon: 'notifications' },
        { title: 'Tab 4', icon: 'block', disabled: true },
        { title: 'Tab 5', icon: 'phone' },
        { title: 'Tab 6', icon: 'phone' },
        { title: 'Tab 7', icon: 'phone' },
        { title: 'Tab 8', icon: 'phone' },
        { title: 'Tab 9', icon: 'phone' },
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
      default: text('Color', 'purple darken 2')
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
    activeTextColor: {
      type: String,
      default: text('Active Text Color', '')
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
          :center-active="centerActive"
          :grow="grow"
          :icon="icon"
          :slider-size="sliderSize"
          :slider-color="sliderColor">
      <g-tab-item v-for="(item, i) in items" :key="i" :item="item">
        {{item.title}}
      </g-tab-item>
      <template #tab="{item, index}">
        <g-tab :item="item" :key="index" :active-text-color="activeTextColor">Slotted {{item.title}}</g-tab>
      </template>
    </g-tabs>`
});

export const insideToolbar = () => ({
  components: { GTabs, GTab, GToolbar, GBtn, GSpacer, GTabItems, GTabItem, GIcon },
  data() {
    return {
      items: [
        { title: 'Tab 1', icon: 'home', disabled: false, color: '#ff4455' },
        { title: 'Tab 2', icon: 'group', color: '#1271ff' },
        { title: 'Tab 3', icon: 'notifications', color: '#1271ff' },
        { title: 'Tab 4', icon: 'block', color: '#ff4455' },
        { title: 'Tab 5', icon: 'phone', color: '#1271ff' },
        { title: 'Tab 6', icon: 'phone', color: '#ff4455' },
        { title: 'Tab 7', icon: 'phone', color: '#1271ff' },
        { title: 'Tab 8', icon: 'phone', color: '#ff4455' },
      ],
      model: null,
    }
  },
  props: {
    color: {
      type: String,
      default: text('Color', 'purple darken 2')
    },
    textColor: {
      type: String,
      default: text('Text Color', 'white')
    },
    align: {
      type: Boolean,
      default: boolean('Align with Title', false)
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
    },
    sliderSize: {
      type: Number,
      default: number('Slider Size', 2)
    },
    sliderColor: {
      type: String,
      default: text('Slider Color', 'currentColor')
    },
    activeTextColor: {
      type: String,
      default: text('Active Text Color', 'success')
    }
  },
  template: `<div>
    <g-toolbar extended :color="color" :text-color="textColor">
      <g-btn icon flat><i class="material-icons">menu</i></g-btn>
      <span>Title</span>
      <g-spacer/>
      <g-btn icon><g-icon>search</g-icon></g-btn>
      <g-btn icon><g-icon>favorite</g-icon></g-btn>
      <g-btn icon><g-icon>more_vert</g-icon></g-btn>
      <template v-slot:extension>
        <g-tabs v-model="model" 
          :items="items" 
          :color="color" 
          :text-color="textColor"
          :align-with-title="align"
          :right="right" 
          :center="center"
          :grow="grow"
          :icon="icon"
          :slider-size="sliderSize"
          :slider-color="sliderColor"
          :active-text-color="activeTextColor">
        </g-tabs>
      </template>
    </g-toolbar>
    <g-tab-items :items="items" v-model="model">
      <g-tab-item v-for="(item, i) in items" :key="i" :item="item">
        {{item.title}}
        <p :style="[{'height': '100px', 'background-color': item.color}]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </g-tab-item>
    </g-tab-items>
  </div>`
});

export const verticalTabs = () => ({
  components: { GTabs, GTab, GTabItems, GTabItem },
  data() {
    return {
      items: [
        { title: 'Tab 1', icon: 'home' },
        { title: 'Tab 2', icon: 'group' },
        { title: 'Tab 3', icon: 'notifications' },
        { title: 'Tab 4', icon: 'block', disabled: true }
      ],
      model: null,
    }
  },
  created() {
    this.model = this.items[0]
  },
  props: {
    vertical: {
      type: Boolean,
      default: boolean('Vertical', true)
    }
  },
  template: `
    <g-tabs v-model="model" 
          :items="items"
          color="blue darken 2"
          text-color="white"
          :vertical="vertical">
      <g-tab-items :items="items" v-model="model">
        <g-tab-item v-for="(item, i) in items" :key="i" :item="item">
          {{item.title}}
        </g-tab-item>
      </g-tab-items>
    </g-tabs>`
});

export const configTabItem  = () => ({
  components: { GTabs, GTab, GTabItems, GTabItem },
  props: {
    addable: { default: boolean('Addable', true)},
    deletable: { default: boolean('Deletable', true)},
  },
  data() {
    return {
      items: [
        { title: 'Tab 1', icon: 'home' },
        { title: 'Tab 2', icon: 'group' },
        { title: 'Tab 3', icon: 'notifications' },
        { title: 'Tab 4', icon: 'block', disabled: true }
      ],
      model: null,
    }
  },
  created() {
    this.model = this.items[0]
  },
  methods: {
    addItem() {
      const titles = this.items.map(item => item.title)
      let title = 'New Tab', i = 0
      while (titles.includes(title)) {
        i++
        title = `New Tab (${i})`
      }
      this.items.push({title})
    },
    deleteItem() {
      let index = this.items.findIndex(i => i.title === this.model.title)
      this.items.splice(index, 1)
      if(index > 0 && index === this.items.length) {
        index--
      }
      if(this.items[index].disabled === true) {
        index === 0 ? index++ : index--
      }
      this.model = this.items[index]
    }
  },
  template: `
      {{model}}
    <g-tabs v-model="model" 
          :items="items"
          color="blue darken 2"
          text-color="white"
          :addable="addable"
          @add="addItem"
          :deletable="deletable"
          @delete="deleteItem">
      <g-tab-items :items="items" v-model="model">
        <g-tab-item v-for="(item, i) in items" :key="i" :item="item">
          {{item.title}}
        </g-tab-item>
      </g-tab-items>
    </g-tabs>`
})

