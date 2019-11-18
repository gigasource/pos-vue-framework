import {boolean, object, text, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions'

//
export default {
  title: 'GAutocomplete',
  decorators: [withKnobs],
}

export const GAutocompleteSingleSelect = () => ({
  components: {GAutocomplete, GSelect},
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
    itemText: {default: text('itemText', 'text')},
    itemValue: {default: text('itemValue', 'value')},
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},
    deletableChips: {default: boolean('deletable-chips', false)},
  },
  computed: {
    activeFilter() {
      if (this.selectedFilter === null) return null
      return this.filters[this.selectedFilter].fn
      console.log(this.filters[this.selectedFilter].fn)
    }
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', subtitle:"This won't be displayed anw", value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null,
      filters: [
        {
          value: 0,
          fn: (item, queryText) => item.indexOf(queryText) > -1,
          text: 'Exact Match',
        },
        {
          value: 1,
          fn: (item, queryText) => queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: 'Search Length > 2 & Loose Match',
        },
      ],
      selectedFilter: null,
    }
  },
  template: `
  <div data-app>
  {{selected}}
  <g-select :items="filters"
  filled
  itemText="text"
  itemValue="value"
  v-model="selectedFilter"
  placeholder="Select filter"
  >
  
</g-select>
  <g-autocomplete :items="items" 
             :filter="activeFilter"
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
             :chips="chips"
             :smallChips="smallChips"
             :deletableChips="deletableChips"
             v-model="selected" />
<div>{{'filter:  '+activeFilter}} </div>
</div>`,
})
export const GAutocompleteMultiSelect = () => ({
  components: {GAutocomplete, GSelect},
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
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},
    deletableChips: {default: boolean('deletable-chips', false)},
    itemText: {default: text('itemText', 'text')},
    itemValue: {default: text('itemValue', 'value')},
    menuProps:{default: object('menuProps', {closeOnContentClick : true})},
  },
  computed: {
    activeFilter() {
      if (this.selectedFilter === null) return null
      return this.filters[this.selectedFilter].fn
      console.log(this.filters[this.selectedFilter].fn)
    }
  },
  data() {
    return {
      items: [
        {text: 'Jason', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null,
      filters: [
        {
          value: 0,
          fn: (item, queryText) => item.toLowerCase().indexOf(queryText) > -1,
          text: 'Exact Match',
        },
        {
          value: 1,
          fn: (item, queryText) => queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: 'Search Length > 2 & Loose Match',
        },
      ],
      selectedFilter: null,
    }
  },
  template: `
  <div data-app>
  {{selected}}
  <g-select :items="filters"
  filled
  itemText="text"
  itemValue="value"
  v-model="selectedFilter"
  placeholder="Select filter"
  >
  
</g-select>
  <g-autocomplete :items="items" 
             :filter="activeFilter"
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
             :chips="chips"
             :smallChips="smallChips"
             :deletableChips="deletableChips"
             multiple
             v-model="selected" />
<div>{{'filter:  '+activeFilter}} </div>
</div>`,
})

export const GAutocompleteMultiSelectAllowDuplicate = () => ({
  components: {GAutocomplete, GSelect},
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
    chips: {default: boolean('chips', false)},
    smallChips: {default: boolean('smallChips', false)},
    deletableChips: {default: boolean('deletable-chips', false)},
    itemText: {default: text('itemText', 'text')},
    itemValue: {default: text('itemValue', 'value')},
    menuProps:{default: object('menuProps', {closeOnContentClick : true})},
  },
  computed: {
    activeFilter() {
      if (this.selectedFilter === null) return null
      return this.filters[this.selectedFilter].fn
      console.log(this.filters[this.selectedFilter].fn)
    }
  },
  data() {
    return {
      items: [
        {text: 'Jason', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null,
      filters: [
        {
          value: 0,
          fn: (item, queryText) => item.toLowerCase().indexOf(queryText) > -1,
          text: 'Exact Match',
        },
        {
          value: 1,
          fn: (item, queryText) => queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: 'Search Length > 2 & Loose Match',
        },
      ],
      selectedFilter: null,
    }
  },
  template: `
  <div data-app>
  {{selected}}
  <g-select :items="filters"
  filled
  itemText="text"
  itemValue="value"
  v-model="selectedFilter"
  placeholder="Select filter"
  >
  
</g-select>
  <g-autocomplete :items="items" 
             :filter="activeFilter"
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
             :chips="chips"
             :smallChips="smallChips"
             :deletableChips="deletableChips"
             multiple
             allowDuplicates
             v-model="selected" />
<div>{{'filter:  '+activeFilter}} </div>
</div>`,
})
// testing
import Vue from 'vue/dist/vue.common.js'
import GAutocomplete from "../GAutocomplete";
import GSelect from "../GSelect";

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
