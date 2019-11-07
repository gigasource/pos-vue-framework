import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GList from '../GList';
import GListItem from '../GListItem';
import GDivider from '../../GLayout/GDivider.vue';
import { GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader} from '../GListFunctionalComponent'

export default {
  title: 'GList',
  decorators: [withKnobs],
};

export const gListInset = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        {title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items" dense subheader="subheader" divider='inset'  >
      </g-list>
      `,
})
export const gListShapedInset = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant",prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items" shaped dense subheader="subheader" divider='inset' >
      </g-list>
      `,
})
export const gListNav = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items"  dense nav prepend-type="icon">
      </g-list>
      `,
})

export const gListTwoLine = () => ({
  components: { GList },
  props: {
    dense: { default: boolean('dense', false) },
  },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects.', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded :dense="dense" subheader="subheader" divider='inset' >
      </g-list>
      `,
})
export const gListTwoLineWithWrapper = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ",prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson',subtitle: "Ranee the cockroach", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense subheader="subheader" divider='inset' subtitleWrap >
      </g-list>
      `,
})
export const gListThreeLine = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", subtitle2: "ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ",prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded  subheader="subheader" divider='inset' subtitleWrap >
      </g-list>
      `,
})
export const gListPrependWithSlot = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense subheader="subheader" divider='inset' >
        <template v-slot:prepend="{item}">
          <img :src="item.prepend" alt="">
        </template>
      </g-list>
      `,
})

export const gListNormalPrependAvatar = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {subheader: 'User', type: 'subheader'},
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {type: 'divider'},
        {subheader: 'Admin', type: 'subheader'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        {subheader: 'Admin', type: 'subheader'},

      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="avatar">
      </g-list>
      `,
})

export const gListNormalPrependIcon = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {subheader: 'User', type: 'subheader'},
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {type: 'divider'},
        {subheader: 'Admin', type: 'subheader'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        {subheader: 'Admin', type: 'subheader'},

      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="icon">
      </g-list>
      `,
})

export const gListNormalPrependImg = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="image">
      </g-list>
      `,
})

export const gListMultiSection = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {subheader: 'User', type: 'subheader'},
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {type: 'divider'},
        {subheader: 'Admin', type: 'subheader'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        /*{subheader: 'Admin', type: 'subheader'},*/
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="avatar" multi-section>
      </g-list>
      `,
})

export const gListSingleSectionSelect = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      testValue: 1
    }
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" rounded dense subheader="subheader" divider=inset selectable>
        </g-list>
      </div>
      `,
})
export const gListMultiSectionSelect = () => ({
  components: {GList},
  data() {
    return{
      items: [
        {subheader: 'User', type: 'subheader'},
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {type: 'divider'},
        {subheader: 'Admin', type: 'subheader'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        /*{subheader: 'Admin', type: 'subheader'},*/
      ],
      testValue: 1,
    }

  },
  template:
    `
      <div>
        selectedItemIndex: {{testValue}}
        <g-list v-model="testValue" :items="items" rounded dense subheader="subheader" divider=inset selectable multi-section>
        </g-list>
      </div>
      `,
})
export const gListItemSlotRenderArray = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return{
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      testValue: 1
    }
  },
  template:
    `
      <div>
      selectedItem: {{testValue}}
      <g-list :items="items" selectable v-model="testValue">
              <template v-slot:listItem="{item, isSelected}">
                <g-list-item :isSelected="isSelected">
                  <g-list-item-content>
                      <g-list-item-text >{{item.title}}</g-list-item-text>
                  </g-list-item-content>
                </g-list-item>
              </template>
            </g-list>
      </div>
      
`,
})
export const gListMultiSelect = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      testValue: null
    }
  },
  template:
      `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" rounded dense subheader="subheader" divider=inset selectable allow-duplicates multiple>
        </g-list>
      </div>
      `,
})
export const gListSelectMandatory = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      testValue: null
    }
  },
  template:
      `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" rounded dense subheader="subheader" divider=inset selectable mandatory>
        </g-list>
      </div>
      `,
})


import Vue from 'vue/dist/vue.common.js'
import GContainer from '../../GLayout/GContainer';
import GRow from '../../GLayout/GRow';
import GCol from '../../GLayout/GCol';

describe('GList', function () {
  it('should render rounded dense', function () {
    const vm = new Vue(gListInset()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})


