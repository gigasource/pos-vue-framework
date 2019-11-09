import { text, withKnobs, boolean, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GBreadcrumbs from '../GBreadcrumbs';
import GBreadcrumbsItem from '../GBreadcrumbsItem';
import GIcon from '../../GIcon/GIcon';

export default {
  title: 'GBreadcrumbs',
  decorators: [withKnobs],
};


export const Default = () => ({
  components: { GBreadcrumbs, GBreadcrumbsItem },
  data:()=>({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Selection Control',
          disabled: false,
          href: '/selection-control',
        },
        {
          text: 'Date Picker',
          disabled: true,
          href: '/date-picker-demo',
        },
        {
          text: 'Text Area',
          disabled: true,
          href: '/textarea',
        },
        {
          text: 'Pulse',
          disabled: false,
          href: '/pulse-demo',
        },
      ]
  }),
  props: {
      divider: {type: String, default: text('divider', '/')},
    large: { type: Boolean, default: boolean('large', false) }
  },
  template: `<g-breadcrumbs :large="large" :divider="divider" :items="items"> </g-breadcrumbs>`,
})

export const SlotDivider = () => ({
  components: { GBreadcrumbs, GBreadcrumbsItem, GIcon },
  data:()=>({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/',
      },
      {
        text: 'Selection Control',
        disabled: false,
        href: '/selection-control',
      },
      {
        text: 'Date Picker',
        disabled: true,
        href: '/date-picker-demo',
      },
      {
        text: 'Text Area',
        disabled: true,
        href: '/textarea',
      },
      {
        text: 'Pulse',
        disabled: false,
        href: '/pulse-demo',
      },
    ]
  }),
  props: {
    divider: {type: String, default: text('divider', '/')},
    icon: {type: String, default: text('icon', 'mdi-chevron-right')},
    large: { type: Boolean, default: boolean('large', false) }

  },
  template: `<g-breadcrumbs :large="large" :divider="divider" :items="items"> 
        <template v-slot:divider>
        <g-icon>{{icon}}</g-icon>
      </template>
  </g-breadcrumbs>`,
})

export const SlotDividerAndItem = () => ({
  components: { GBreadcrumbs, GBreadcrumbsItem, GIcon },
  data:()=>({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/',
      },
      {
        text: 'Selection Control',
        disabled: false,
        href: '/selection-control',
      },
      {
        text: 'Date Picker',
        disabled: true,
        href: '/date-picker-demo',
      },
      {
        text: 'Text Area',
        disabled: true,
        href: '/textarea',
      },
      {
        text: 'Pulse',
        disabled: false,
        href: '/pulse-demo',
      },
    ]
  }),
  props: {
    divider: {type: String, default: text('divider', '/')},
    icon: {type: String, default: text('icon', 'mdi-chevron-right')},
    large: { type: Boolean, default: boolean('large', false) }

  },
  template: `<g-breadcrumbs :large="large" :divider="divider" :items="items"> 
        <template v-slot:divider>
        <g-icon>{{icon}}</g-icon>
      </template>
      
            <template v-slot:item="props">
        <g-breadcrumbs-item
            :class="[props.item.disabled && 'disabled']"
            :href="props.item.href"
            :disabled="props.item.disabled"
        >
          {{ props.item.text.toUpperCase() }}
        </g-breadcrumbs-item>
      </template>
  </g-breadcrumbs>`,
})
