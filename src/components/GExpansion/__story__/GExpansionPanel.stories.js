import { withKnobs, boolean } from '@storybook/addon-knobs';
import GExpansion from '../GExpansion';
import GIcon from '../../GIcon/GIcon';

export default {
  title: 'GExpansion',
  decorators: [withKnobs]
}

export const Basic = () => ({
  components: { GExpansion },
  props: {
    accordion: {default: boolean('Accordion', false)},
    popout: {default: boolean('Popout', false)},
    inset: {default: boolean('Inset', false)}
  },
  data() {
    return {
      activeItem: null,
      items : [
        {
          name: 'Item1',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item2',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item3',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item4',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item5',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    }
  },
  template: `
    <div style="background-color: #e6e9ec; height: 600px; padding-top: 10px;">
    <g-expansion
    v-model="activeItem" 
    :items="items" 
    item-header="name" 
    item-content="message" :accordion="accordion" :popout="popout" :inset="inset">
    </g-expansion>
    </div>`
})

export const Mandatory = () => ({
  components: { GExpansion },
  props: {
    accordion: {default: boolean('Accordion', false)},
    popout: {default: boolean('Popout', false)},
    inset: {default: boolean('Inset', false)}
  },
  data() {
    return {
      activeItem: null,
      items : [
        {
          name: 'Item1',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item2',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item3',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item4',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item5',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    }
  },
  template: `
    <div style="background-color: #e6e9ec; height: 600px; padding-top: 10px;">
    <g-expansion
    v-model="activeItem" 
    :items="items" 
    item-header="name" 
    item-content="message" mandatory :accordion="accordion" :popout="popout" :inset="inset">
    </g-expansion>
    </div>`
})

export const Multiple = () => ({
  components: { GExpansion },
  props: {
    accordion: {default: boolean('Accordion', false)},
    popout: {default: boolean('Popout', false)},
    inset: {default: boolean('Inset', false)}
  },
  data() {
    return {
      activeItem: null,
      items : [
        {
          name: 'Item1',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item2',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item3',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item4',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Item5',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    }
  },
  template: `
    <div style="background-color: #e6e9ec; height: 600px; padding-top: 10px;">
      <g-expansion
      v-model="activeItem" 
      :items="items"
      item-header="name" 
      item-content="message" multiple :accordion="accordion" :popout="popout" :inset="inset"/>
    </div>`
})


import TableExpansionRow from '../../../POSComponents/TableExpansionRow';
import GSimpleTable from '../../GSimpleTable/GSimpleTable';

export const ter = () => ({
  components: { TableExpansionRow, GSimpleTable },
  data () {
    return {
      activeItem: null,
      items: [
        {
          name: 'Product item 1',
          unit: 'piece',
          quantity: 1,
          price: '5.52',
        },
        {
          name: 'Product item 2',
          unit: 'piece',
          quantity: 1,
          price: '5.52',
        },
        {
          name: 'Product item 3',
          unit: 'piece',
          quantity: 1,
          price: '5.52',
        },
        {
          name: 'Product item 4',
          unit: 'piece',
          quantity: 1,
          price: '5.52',
          oldPrice: '7.52',
          promotion: 'Promotion A',
        },
      ]
    }
  },
  template: `<g-simple-table striped style="width: 500px; border: 1px solid black; font-size: 13px">
    <thead>
      <tr>
        <th style="color: inherit; padding: 0">
          <div class="row-flex" style="line-height: 1.75">
            <span class="flex-grow-1 pa-2 ta-left">Name</span>
            <span class="w-10 pa-2 ta-center">Unit</span>
            <span class="w-10 pa-2 ta-right">Qty</span>
            <span class="w-12 pa-2 ta-right">Each(€)</span>
            <span class="W-12 pa-2 ta-right">Total(€)</span>
          </div>
        </th>
      </tr>
    </thead>
    <table-expansion-row v-model="activeItem" :items="items"/>
  </g-simple-table>`
})