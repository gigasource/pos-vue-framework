import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GSidebar from '../GSidebar';
import GList from '../../GList/GList';
import GSideBarTreeView from '../GSideBarTreeView'
import { reactive, ref } from '@vue/composition-api'

export default {
  title: 'GSidebar',
  decorators: [withKnobs]
}


export const listView = () => ({
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


export const treeView = () => ({
  components: { GSideBarTreeView, GSidebar },
  setup(props, context) {
    const data = ref([
      {
        title: 'Dashboard', icon: 'settings_input_svideo', badge: '3', badgeColor: 'orange',
        items: [
          { title: 'Modern', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'eCommerce', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Analytics', icon: 'radio_button_unchecked', iconType: 'small' }
        ]
      },
      {
        title: 'Template', icon: 'dvr',
        items: [
          { title: 'Vertical', icon: 'radio_button_unchecked', iconType: 'small',
            items: [
              { title: 'Modern Menu', icon: 'radio_button_unchecked', iconType: 'small'},
              { title: 'Navbar Dark', icon: 'radio_button_unchecked', iconType: 'small'},
              { title: 'Gradient Menu', icon: 'radio_button_unchecked', iconType: 'small'},
              { title: 'Dark Menu', icon: 'radio_button_unchecked', iconType: 'small'},
            ]},
          { title: 'Horizontal', icon: 'radio_button_unchecked', iconType: 'small',
            items: [
              { title: 'Horizontal Menu', icon: 'radio_button_unchecked', iconType: 'small'},
            ]},
        ]
      },
      { type: 'divider' },
      { subheader: 'APPLICATIONS', type: 'subheader' },
      { title: 'Mail', icon: 'mail_outline', badge: '5 new', badgeColor: 'pink accent 2' },
      { title: 'Chat', icon: 'chat_bubble_outline' },
      { title: 'ToDo', icon: 'check' },
      { title: 'Contacts', icon: 'import_contacts' },
      { title: 'Calendar', icon: 'today' },
      {
        title: 'eCommerce', icon: 'add_shopping_cart',
        items: [
          { title: 'Products Page', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Pricing', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Invoice', icon: 'radio_button_unchecked', iconType: 'small' },
        ]
      },
      { type: 'divider' },
      { subheader: 'PAGES', type: 'subheader' },
      {
        title: 'Pages', icon: 'content_paste',
        items: [
          { title: 'Contact', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Blog', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Search', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Knowledge', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'FAQs', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Page Blank', icon: 'radio_button_unchecked', iconType: 'small' },
        ]
      },
      {
        title: 'Medias', icon: 'crop_original',
        items: [
          { title: 'Gallery Page', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Media Hover Effects', icon: 'radio_button_unchecked', iconType: 'small' },
        ]
      },
      {
        title: 'User', icon: 'face', badge: '10', badgeColor: 'purple',
        items: [
          { title: 'User Profile', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Login', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Register', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Forgot Password', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Lock Screen', icon: 'radio_button_unchecked', iconType: 'small' },
        ]
      },
      {
        title: 'Misc', icon: 'filter_tilt_shift',
        items: [
          { title: '404', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: 'Page Maintenance', icon: 'radio_button_unchecked', iconType: 'small' },
          { title: '500', icon: 'radio_button_unchecked', iconType: 'small' },
        ]
      },
    ])

    let state = reactive({
      value: null,
      data
    })

    return () =>
      <g-sidebar color={props.color}
                 src={props.src}
                 collapsed={props.collapsed}
                 overlay={props.overlay}
                 overlay-color={props.overlayColor}
                 overlay-opacity={props.overlayOpacity}>
        <template slot="header">
          <div class="elevation-2 bg-purple-darken-1 white" style="display: flex; align-items: center; padding: 16px">
            <img alt={''} src={'/materialize-logo.png'} style="width: 40px; margin-right: 16px"/>
            <span style="font-size: 24px">Materialize</span>
            <i class="material-icons" style="font-size: 12px; margin-left: 24px; margin-top: 4px">radio_button_unchecked</i>
          </div>
        </template>
        <g-side-bar-tree-view
          data={data.value}
          rounded
          vModel={state.value}/>
      </g-sidebar>
  }
});
