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
      activeItem: [],
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
    {{activeItem}}<div style="background-color: #e6e9ec; height: 600px; padding-top: 10px;">
      <g-expansion
      v-model="activeItem" 
      :items="items"
      item-header="name" 
      item-content="message" multiple :accordion="accordion" :popout="popout" :inset="inset"/>
    </div>`
})
