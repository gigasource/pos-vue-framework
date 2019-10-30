import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GSidebar from '../GSidebar';
import GList from '../../GList/GList';
import GSideBarTreeView from '../GSideBarTreeView'

export default {
  title: 'GSidebar',
  decorators: [withKnobs]
}


export const basic = () => ({
  components: { GList, GSidebar },
  data() {
    return {
      items: [
        { subheader: 'Family', type: 'subheader' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { type: 'divider' },
        { subheader: 'Friends', type: 'subheader' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
        { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
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
      default: number('Overlay Opacity', 0.46, { min: 0, max: 1 })
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


export const sidebarTreeView = () => ({
  components: { GSideBarTreeView, GSidebar },
  setup(props, context) {
    function getItemText(node) {
      return node.subheader || node.title
    }

    function getItemChildren(node) {
      return node.items
    }

    const data = [
      { subheader: 'Family', type: 'subheader' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      {
        title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240',
        items: [
          { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
          { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
          { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
          { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' }
        ]
      },
      { type: 'divider' },
      { subheader: 'Friends', type: 'subheader' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
      { title: 'Ranee Carlson', prepend: 'https://loremflickr.com/320/240' },
    ]

    return () =>
        <g-sidebar color={props.color}
                   src={props.src}
                   collapsed={props.collapsed}
                   overlay={props.overlay}
                   overlay-color={props.overlayColor}
                   overlay-opacity={props.overlayOpacity}>
          <template slot="header">
            <div class="elevation-2" style="padding: 16px">CONTACT</div>
          </template>
          <g-side-bar-tree-view
              data={data}
              expand-level={3}
              itemText={getItemText}
              itemChildren={getItemChildren}/>
        </g-sidebar>
  }
});
