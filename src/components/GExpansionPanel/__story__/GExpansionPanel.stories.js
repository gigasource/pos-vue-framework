import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import GExpansionPanel4 from '../GExpansionPanel4';
import GIcon from '../../GIcon/GIcon';

export default {
  title: 'Expansion panel',
  decorators: [withKnobs]
}

export const Basic = () => ({
  components: { GExpansionPanel4 },
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
    <div style="background-color: #e6e9ec; height: 600px">
    <g-expansion-panel4 
    v-model="activeItem" 
    :items="items" 
    item-header="name" 
    item-content="message" :accordion="accordion" :popout="popout" :inset="inset">
    </g-expansion-panel4>
    </div>`
})

export const Mandatory = () => ({
  components: { GExpansionPanel4 },
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
    <div style="background-color: #e6e9ec; height: 600px">
    <g-expansion-panel4 
    v-model="activeItem" 
    :items="items" 
    item-header="name" 
    item-content="message" mandatory :accordion="accordion" :popout="popout" :inset="inset">
    </g-expansion-panel4>
    </div>`
})

export const Multiple = () => ({
  components: { GExpansionPanel4 },
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
    <div style="background-color: #e6e9ec; height: 600px">
    <g-expansion-panel4 
    v-model="activeItem" 
    :items="items" 
    item-header="name" 
    item-content="message" multiple :accordion="accordion" :popout="popout" :inset="inset">
    </g-expansion-panel4>
    </div>`
})