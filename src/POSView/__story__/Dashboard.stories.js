import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';
import Dashboard from '../Dashboard'
import GSidebar from '../../components/GSidebar/GSidebar';
import GSideBarTreeView from '../../components/GSidebar/GSideBarTreeView';
import GList from '../../components/GList/GList';
import {reactive, ref} from '@vue/composition-api';

export default {
  title: 'Dashboard',
  decorators: [withKnobs]
}

export const dashboard = () => ({
  components: {Dashboard},
  template: `<dashboard/>`
});

export const testSidebar = () => ({
  components: {GList, GSidebar, GSideBarTreeView},
  data() {
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
  template: `<div id="container">
  <g-sidebar>
    <g-list :items="items" multi-section v-model="value" nav selectable shaped />
  </g-sidebar>
</div>`
});
