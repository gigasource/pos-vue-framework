import {text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import GList from '../GList';

export default {
  title: 'GList',
  decorators: [withKnobs],
};

export const gListInset = () => ({
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
      <g-list :items="items" rounded dense subheader="subheader" divider='inset' >
      </g-list>
      `,
})

export const gListTwoLine = () => ({
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
      <g-list :items="items" rounded dense subheader="subheader" divider='inset' >
      </g-list>
      `,
})
export const gListTwoLineWithWrapper = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant ,ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ",prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
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
      <g-list :items="items" rounded dense nav prepend-type="icon">
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

export const gListSingleSelect = () => ({
  components: {GList},
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      value:{}
    }
  },
  template:
      `
      <g-list :items="items" rounded dense subheader="subheader" divider=inset>
      </g-list>
      `,
})

import Vue from 'vue/dist/vue.common.js'

describe('GList', function () {
  it('should render rounded dense', function () {
    const vm = new Vue(gListInset()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})


