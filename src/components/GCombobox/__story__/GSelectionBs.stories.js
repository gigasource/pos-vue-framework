import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GSelect from "../../GSelect/GSelect";
import GCombobox from "../GCombobox";
import GAutoComplete from "../../GAutocomplete/GAutocomplete"

export default {
  title: "SelectionBootstrap",
  decorators: [withKnobs]
}

export const selectBsBasic = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)},
    clearable: { default: boolean('Clearable', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select label="Select" v-model="selected" :items="items" :chips="chip"
      text-field-component="GTextFieldBs" :clearable="clearable"/>
</div>`
})

export const selectBsSoloType = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)},
    clearable: { default: boolean('Clearable', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select label="Select" v-model="selected" :items="items" :chips="chip"
      text-field-component="GTextFieldBs" text-field-class="bs-tf__solo" :clearable="clearable"/>
</div>`
})

export const selectBsFilledType = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)},
    clearable: { default: boolean('Clearable', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select label="Select" v-model="selected" :items="items" :chips="chip"
      text-field-component="GTextFieldBs" text-field-class="bs-tf__filled" :clearable="clearable"/>
</div>`
})

export const selectBsPosType = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)},
    clearable: { default: boolean('Clearable', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select label="Select" v-model="selected" :items="items" :chips="chip"
      text-field-component="GTextFieldBs" text-field-class="bs-tf__pos" :clearable="clearable"/>
</div>`
})

export const selectMultipleBasic = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select multiple clearable :chips="chip" label="Select Multiple" 
        text-field-component="GTextFieldBs" :items="items" v-model="selected"
       />
</div>`
})

export const selectMultipleSoloType = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select multiple clearable :chips="chip" label="Select Multiple" 
        text-field-component="GTextFieldBs" :items="items" v-model="selected"
        text-field-class="bs-tf__solo"/>
</div>`
})

export const selectMultipleFilledType = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select multiple clearable :chips="chip" label="Select Multiple" 
        text-field-component="GTextFieldBs" :items="items" v-model="selected"
        text-field-class="bs-tf__filled"/>
</div>`
})

export const selectMultiplePosType = () => ({
  components: {GSelect},
  props: {
    chip: { default: boolean('Chips', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-select multiple clearable :chips="chip" label="Select Multiple" 
        text-field-component="GTextFieldBs" :items="items" v-model="selected"
        text-field-class="bs-tf__pos"/>
</div>`
})


export const combobox = () => ({
  components: {GCombobox},
  props: {
    filled: { default: boolean('Filled type', false)},
    solo: { default: boolean('Solo type', false)},
    pos: { default: boolean('POS type', false)},
    chip: { default: boolean('Deletable Chips', false)},
    clearable: { default: boolean('Clearable', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-combobox multiple allow-dupplicates :deletable-chips="chip" label="Combobox" 
        :items="items" v-model="selected" :clearable="clearable"
        text-field-component="GTextFieldBs"
        :text-field-class="[filled && 'bs-tf__filled', solo && 'bs-tf__solo', pos && 'bs-tf__pos']"/>
</div>`
})

export const autocomplete = () => ({
  components: {GAutoComplete},
  props: {
    filled: { default: boolean('Filled type', false)},
    solo: { default: boolean('Solo type', false)},
    pos: { default: boolean('POS type', false)},
    chip: { default: boolean('Chips', false)}
  },
  data() {
    return {
      items: [
        {text: 'Jason Oner', value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected:  null
    }
  },
  template: `<div data-app>
      <g-autocomplete multiple allow-dupplicates :deletable-chips="chip"
         label="Autocomplete" :items="items" v-model="selected" 
         text-field-component="GTextFieldBs"
         :text-field-class="[filled && 'bs-tf__filled', solo && 'bs-tf__solo', pos && 'bs-tf__pos']"/>
</div>`
})
