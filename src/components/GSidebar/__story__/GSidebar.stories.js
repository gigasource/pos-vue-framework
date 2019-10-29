import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GSidebar from '../GSidebar';
import GList from '../../GList/GList';

export default {
  title: 'GSidebar',
  decorators: [withKnobs]
}


export const basic = () => ({
  components: { GList, GSidebar},
  data () {
    return {
      items: [
        {subheader: 'Family', type: 'subheader'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {type: 'divider'},
        {subheader: 'Friends', type: 'subheader'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
        {title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240'},
      ],
      value: null
    }
  },
  props: {
    color: {
      type: String,
      default: text('Color', 'white')
    },
    src: {
      type: String,
      default: text('Image src', '')
    },
    collapsed: {
      type: Boolean,
      default: boolean('Collapse', false)
    },
    overlay: {
      type: Boolean,
      default: boolean('Overlay', false)
    },
    overlayColor: {
      type: String,
      default: text('Overlay Color', '#212121')
    },
    overlayOpacity: {
      type: Number,
      default: number('Overlay Opacity', 0.46, {min: 0, max: 1})
    }
  },
  template: `
  <g-sidebar :color="color" 
      :src="src"
      :collapsed="collapsed"
      :overlay="overlay" 
      :overlay-color="overlayColor" 
      :overlay-opacity="overlayOpacity">
    <template v-slot:header>
      <div class="elevation-2" style="padding: 16px">CONTACT</div>
    </template>
    <g-list :items="items" multi-section v-model="value" nav selectable shaped />
  </g-sidebar>`
});
