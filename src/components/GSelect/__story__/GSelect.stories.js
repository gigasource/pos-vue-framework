import {text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'

//
export default {
  title: 'GSelect',
  decorators: [withKnobs],
}

export const GSelectListDisplay = () => ({
  components: {GSelect},
  data() {
    return{
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  template: `
   <div data-app><g-select :items="items" item-text="title" item-value="title" label="Display list" return-object v-model="selected">
   </g-select></div>`,
})

export const GSelectListDisplaySearchable = () => ({
  components: {GSelect},
  data() {
    return{
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  template: `
   <div data-app><g-select :items="items" item-text="title" item-value="title" label="Display list" return-object v-model="selected" searchable filled>
   </g-select></div>`,
})

export const GSelectPrependItem = () => ({
  components: {GSelect},
  data() {
    return{
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  template: `
   <div data-app><g-select :items="items" item-text="title" item-value="title" label="Display list" return-object v-model="selected">
   <template v-slot:prependItems>
    <div style="font-size: 30px">Prepend Item</div>
   </template>
 
   </g-select></div>`
})
export const GSelectSelectionSlot = () => ({
  components: {GSelect},
  data() {
    return{
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  template: `
   <g-select :items="items" item-text="title" item-value="title" label="Display list" return-object v-model="selected">
   <template v-slot:selection>
    <div style="font-size: 30px">Prepend Item</div>
   </template>
 
   </g-select>`
})

export const test2 = () => ({
  components: {},
  setup() {
    return () => (
        <g></g>
    )
  }
})

// testing
import Vue from 'vue/dist/vue.common.js'
import GSelect from "../GSelect";
import GTextFieldFunctional from "../../GInput/GTextFieldFunctional";
import GListItem from "../../GList/GListItem";
import {GListItemText} from "../../GList/GListFunctionalComponent";

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
