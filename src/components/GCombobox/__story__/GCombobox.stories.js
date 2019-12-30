import { boolean, number, object, text, withKnobs } from '@storybook/addon-knobs';
// testing
import Vue from 'vue/dist/vue.common.js'
import GCombobox from '../GCombobox';
import GListItem from '../../GList/GListItem';
import { GListItemContent, GListItemText } from '../../GList/GListFunctionalComponent';

//
export default {
  title: 'GCombobox',
  decorators: [withKnobs],
}

export const GComboboxSingleSelectNoChips = () => ({
  components: {GCombobox},
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    clearable: {default: boolean('clearable', true)},
    hint: {default: text('hint', 'Hint')},
    persistent: {default: boolean('persistent', false)},
    counter: {type: [String, Number], default: Number('counter', 25)},
    itemText: {default: text('itemText', 'text')},
    itemValue: {default: text('itemValue', 'value')},
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', subtitle: "Jason the ant", value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
    }
  },
  template: `
  <div data-app>
  <g-combobox :items="items" 
  itemText="text"
  itemValue="value"        
             v-model="selected" >  
</g-combobox>
</div>`,
})
export const GComboboxSingleSelectChips = () => ({
  components: {GCombobox},
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    clearable: {default: boolean('clearable', false)},
    hint: {default: text('hint', 'Hint')},
    persistent: {default: boolean('persistent', false)},
    counter: {type: [String, Number], default: Number('counter', 25)},
    smallChips: {default: boolean('smallChips', false)},
    deletableChips: {default: boolean('deletable-chips', false)},
    itemText: {default: text('itemText', 'text')},
    itemValue: {default: text('itemValue', 'value')},
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', subtitle: "Jason the ant", value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: 'kk'
    }
  },
  template: `
  <div data-app>
  {{selected}}
  <g-combobox chips
              :deletableChips="deletableChips"
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
             :smallChips="smallChips"
             v-model="selected" />
</div>`,
})
export const GComboboxMultiSelect = () => ({
  components: {GCombobox,},
  props: {
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},
    deletableChips: {default: boolean('deletable-chips', false)},
    itemText: {default: text('itemText', 'title')},
    itemValue: {default: text('itemValue', 'title')},
    clearable: {default: boolean('clearable', false)},
    menuProps:{default: object('menuProps', {closeOnContentClick : true})},
  },
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {title: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: ['hhh','hgh','Jason Oner']
    }
  },
  template: `
  <div data-app>
  {{selected}}
  <g-combobox :items="items" 
              :item-text="itemText" 
              :item-value="itemValue" 
             label="label"
             :clearable="clearable" 
             v-model="selected" 
             :chips="chips"
             :smallChips="smallChips"
             :deletableChips="deletableChips"
              :menuProps="menuProps"
             multiple 
             clearable/>
</div>`,
})
export const GComboboxMultiSelectAllowDuplicates = () => ({
  components: {GCombobox},
  props: {
    smallChips: {default: boolean('smallChips', false)},
    deletableChips: {default: boolean('deletable-chips', false)},
    itemText: {default: text('itemText', 'text')},
    itemValue: {default: text('itemValue', 'value')},
    clearable: {default: boolean('clearable', false)},
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', subtitle: "Jason the ant", value: 1},
        {text: 'Ranee Carlson', value: 2},
        {text: 'Cindy Baker', value: 3},
        {text: 'Ali Connors', value: 4},
      ],
      selected: []
    }
  },
  template: `
  <div data-app>
  <div>{{selected}}</div>
   <g-combobox :items="items" 
              :item-text="itemText" 
              :item-value="itemValue" 
             label="label"
             :clearable="clearable" 
             v-model="selected" 
             :smallChips="smallChips"
             :deletableChips="deletableChips"
             multiple 
             allowDuplicates
             clearable></g-combobox>
</div>`,
})
export const GComboboxNoDataSlot = () => ({
  components: {GCombobox, GListItem, GListItemContent, GListItemText},
  props: {},
  data() {
    return {
      items: [
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: []
    }
  },
  template: `
  <div data-app>
  <g-combobox itemText="text" returnObject :items="items" label="Label" v-model="selected" searchable multiple chips clearable>
    <template v-slot:no-data>
      <g-list-item>
        <g-list-item-content>
          <g-list-item-text>
              No data match, Enter to add value to selections
          </g-list-item-text>
        </g-list-item-content>
      </g-list-item>
    </template>
  </g-combobox>
</div>`,
})
export const GComboboxSingleWithValidate = () => ({
  components: {GCombobox},
  props: {
    label: {default: text('Input label', 'Label')},
    placeholder: {default: text('Input placeholder', '')},
    filled: {default: boolean('filled', false)},
    solo: {default: boolean('solo', false)},
    outlined: {default: boolean('outlined', false)},
    flat: {default: boolean('flat', false)},
    rounded: {default: boolean('rounded', false)},
    shaped: {default: boolean('shaped', false)},
    clearable: {default: boolean('clearable', false)},
    hint: {default: text('hint', 'Test hint')},
    persistent: {default: boolean('persistent', true)},
    counter: {type: [String, Number], default: number('counter', 25)},
    itemText: {default: text('itemText', 'text')},
    itemValue: {default: text('itemText', 'value')},
    chips: {default: boolean('chips', false)},
    mandatory: {default: boolean('mandatory', false)},
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', subtitle: "Jason the ant", value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null,
      rules: {
        required: value => !!value || 'Required',
        counter: value => value.length > 4 || 'Min 5 characters',
        max: value => value.length < 10 || 'Max 9 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      },
    }
  },
  template: `
<div data-app>
 <g-combobox
 :items="items" 
 :label="label"
 :clearable="clearable"
 :hint="hint"
 :persistent="persistent"
 :counter="counter"
 :placeholder="placeholder"
 :chips="chips"
 :rules="[rules.required, rules.counter, rules.max]"
 v-model="selected" 
  >
   </g-combobox>
</div>
  `,
})
export const GComboboxPrimitiveArray = () => ({
  components: {GCombobox, GListItem, GListItemContent, GListItemText},
  props: {},
  data() {
    return {
      items: [
        112,313,4234, 454353, 5345
      ],
      selected: 4234
    }
  },
  template: `
  <div data-app>
  {{selected}}
  <g-combobox itemText="text"  :items="items" label="Label" v-model="selected"  clearable>
   
  </g-combobox>
</div>`,
})

export const test2 = () => ({
  components: {},
  setup() {
    return () => (
        <g></g>
    )
  }
})

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
