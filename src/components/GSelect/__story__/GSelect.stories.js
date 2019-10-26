import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'

//
export default {
  title: 'GSelect',
  decorators: [withKnobs],
}

export const GSelectSingle = () => ({
  components: {GSelect},
  props:{
    label:{ default: text('Input label', 'Label') },
    placeholder:{ default: text('Input placeholder', '') },
    filled: { default: boolean('filled', false) },
    solo: { default: boolean('solo', false) },
    outlined: { default: boolean('outlined', false) },
    flat: { default: boolean('flat', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    clearable: { default: boolean('clearable', false) },
    hint: { default: text('hint', 'Hint') },
    persistent: { default: boolean('persistent', false) },
    counter: {type:[String, Number], default: Number('counter', 25) },
    itemText:{ default: text('itemText', 'text') },
    itemValue:{ default: text('itemText', 'value') },
    mandatory:{ default: boolean('mandatory', false) },
  },
  data() {
    return{
      items: [
        {text: 'Jason Oner', subtitle: "Jason the ant", value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  template: `
<div data-app>
 <g-select
 width="100%" 
 :items="items" 
 :item-text="itemText" 
 :item-value="itemValue"  
 :label="label"
 :clearable="clearable"
 :filled="filled"
 :solo="solo"
 :outlined="outlined"
 :flat="flat"
 :rounded="rounded"
 :shaped="shaped"
 :hint="hint"
 :persistent="persistent"
 :counter="counter"
 :placeholder="placeholder"
 
 v-model="selected" 
  >
   </g-select>
</div>
  `,
})
export const GSelectMultiple = () => ({
  components: {GSelect},
  props:{
    label:{ default: text('Input label', 'Label') },
    placeholder:{ default: text('Input placeholder', '') },
    allowDuplicates:{type: Boolean,default: boolean('allow duplicates', true) } ,
    itemText:{ default: text('itemText', 'text') },
    itemValue:{ default: text('itemText', 'value') },
    mandatory:{ default: boolean('mandatory', false) },
  },
  data() {
    return{
      items: [
        {text: 'Jason Oner',  value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: []
    }
  },
  template: `
   <div data-app>
      <g-select 
      :items="items" 
      :item-text="itemText" 
      :item-value="itemValue" 
      :label="label" 
      :placeholder="placeholder" 
       multiple 
      :allow-duplicates="allowDuplicates"
      :mandatory="mandatory"
      v-model="selected">
      </g-select>
    </div>`
})
export const GSelectListDisplaySearchable = () => ({
  components: {GSelect},
  props:{
    label:{ default: text('Input label', 'Label') },
    placeholder:{ default: text('Input placeholder', '') },
    itemText:{ default: text('itemText', 'text') },
    itemValue:{ default: text('itemText', 'value') },
    mandatory:{ default: boolean('mandatory', false) },
  },
  data() {
    return{
      items: [
        {text: 'Jason Oner', subtitle: "Jason the ant", value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  template: `
   <div data-app><g-select 
   :items="items" 
   :item-text="itemText" 
   :item-value="itemValue" 
   :label="label" 
   :mandatory="mandatory"
   v-model="selected" 
   searchable>
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
export const GSelectItemSlot = () => ({
  components: {GSelect},
  data() {
    return{
      items: [
        {name: 'Jason Oner',  prepend: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {name: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {name: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {name: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  template: `
   <div data-app>
      <g-select :items="items" item-text="name" item-value="prepend" label="Display list" multiple clearable
               v-model="selected">
          <template v-slot:item="{item, isSelected}">
        <p>slot item</p>
          </template>
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
import GCheckbox from "../../GCheckbox/GCheckbox";
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
