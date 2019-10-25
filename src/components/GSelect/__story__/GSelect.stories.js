import {boolean, text, withKnobs} from '@storybook/addon-knobs';
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
   <div data-app><g-select :items="items" item-text="title" item-value="prepend" label="Display list" v-model="selected" >
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
export const GSelectMultiple = () => ({
  components: {GSelect},
  data() {
    return{
      items: [
        {title: 'Jason Oner',  prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: []
    }
  },
  template: `
   <div data-app>
      <g-select :items="items" item-text="title" item-value="prepend" label="Display list" 
                multiple allow-duplicates v-model="selected">
      </g-select>
    </div>`
})
export const GSelectItemSlot = () => ({
  components: {GSelect},
  data() {
    return{
      items: [
        {name: 'Jason Oner',  prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {name: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {name: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {name: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: []
    }
  },
  template: `
   <div data-app>
      <g-select :items="items" item-text="name" item-value="prepend" label="Display list" 
               multiple allow-duplicates v-model="selected">
          <template v-slot:listItem="{item}">
          {{item.name}}
          </template>
      </g-select>
    </div>`
})

export const GSelectMultipleKnob = () => ({
  components: {GSelect},
  props:{
    label:{ default: text('Input label', 'Label') },
    placeholder:{ default: text('Input placeholder', '') },
    filled: { default: boolean('filled', false) },
  //   multiple: { default: boolean('multiple', false) },
  //   allowDuplicates: { default: boolean('allow duplicates', false) },
  //   returnObject: { default: boolean('return object', false) },
   },
  data() {
    return{
      items: [
        {title: 'Jason Oner',  prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: []
    }
  },
  template: `
   <div data-app>
      <g-select :items="items" item-text="title" item-value="title" :label="label" :placeholder="placeholder" :filled="filled" multiple allowDuplicates
                 v-model="selected">
      </g-select>
    </div>`
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
import GTextField from "../../GInput/GTextField";
import GListItem from "../../GList/GListItem";
import {GListItemText, GListItemContent, GListItemSubText} from "../../GList/GListFunctionalComponent";
import GDivider from "../../GLayout/GDivider";

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
