import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import GList from '../GList';
import GListDisplay from '../GListDisplay';
import GListItem from '../GListItem';
import GDivider from '../../GLayout/GDivider.vue';
import {
  GListHeader,
  GListItemAction,
  GListItemAvatar,
  GListItemContent,
  GListItemIcon,
  GListItemImage,
  GListItemImageBig,
  GListItemSubText,
  GListItemText
} from '../GListFunctionalComponent'
import Vue from 'vue/dist/vue.common.js'
import GContainer from '../../GLayout/GContainer';
import GRow from '../../GLayout/GRow';
import GCol from '../../GLayout/GCol';
import GIcon from '../../GIcon/GIcon';
import GBtn from '../../GBtn/GBtn';
import { makeListSelectable } from '../listSelectFactory';

export default {
  title: 'GList',
  decorators: [withKnobs],
};

export const defaultSlot = () => ({
  components: { GListDisplay, GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template: `
    <g-list-display>
      <g-list-item v-for="item in items">
        <g-list-item-text>{{item.text}}</g-list-item-text>
      </g-list-item>
    </g-list-display>
  `
})

export const gListPlayGround = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    disabled: { default: boolean('disabled', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', false) },
    nav: { default: boolean('nav', false) },
    multiSection: { default: boolean('multiSection', false) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', true) },
    prependType: { default: text('prependType', 'avatar') },
    subtextWrap: { default: boolean('subtextWrap', false) },
    selectable: { default: boolean('selectable', false) },
    multiple: { default: boolean('multiple', false) },
    mandatory: { default: boolean('mandatory', false) },
    allowDuplicates: { default: boolean('allowDuplicates', false) },
    itemValue: { default: text('itemValue', 'prepend') },
    itemText: { default: text('itemText', 'text') },
    activeClass: { default: text('activeClass', '') },
  },
  template:
    `
      <g-list :items="items"
        :disabled="disabled"
        :rounded="rounded"
        :shaped="shaped"
        :elevation="elevation"
        :dense="dense"
        :nav="nav"
        :multiSection="multiSection"
        :subheader="subheader"
        :divider="divider"
        :prependType="prependType"
        :subtextWrap="subtextWrap"
        :itemText="itemText"
      />
      `,
})
export const gListSingleSelectPlayGround = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: 'Jason Oner'
    }
  },
  props: {
    disabled: { default: boolean('disabled', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', false) },
    nav: { default: boolean('nav', false) },
    multiSection: { default: boolean('multiSection', false) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', false) },
    prependType: { default: text('prependType', 'avatar') },
    subtextWrap: { default: boolean('subtextWrap', false) },
    mandatory: { default: boolean('mandatory', false) },
    itemValue: { default: text('itemValue', undefined) },
    itemText: { default: text('itemText', 'text') },
    activeClass: { default: text('activeClass', '') },
    returnObject: { default: boolean('returnObject', false) },
  },
  template:
    ` 
 <div>{{testValue}}
      <g-list v-model="testValue"
        :items="items"
        :disabled="disabled"
        :rounded="rounded"
        :shaped="shaped"
        :elevation="elevation"
        :dense="dense"
        :nav="nav"
        :multiSection="multiSection"
        :subheader="subheader"
        :divider="divider"
        :prependType="prependType"
        :subtextWrap="subtextWrap"
        selectable
        :mandatory="mandatory"
        :itemValue="itemValue"
        :itemText="itemText"
        :returnObject="returnObject"
        :activeClass="activeClass">
      </g-list>
      </div>
      `,
})
export const gListMultiSelectPlayGround = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Myanma', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: []
    }
  },
  props: {
    disabled: { default: boolean('disabled', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', false) },
    nav: { default: boolean('nav', false) },
    multiSection: { default: boolean('multiSection', false) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', false) },
    prependType: { default: text('prependType', 'avatar') },
    subtextWrap: { default: boolean('subtextWrap', false) },
    multiple: { default: boolean('multiple', true) },
    mandatory: { default: boolean('mandatory', false) },
    allowDuplicates: { default: boolean('allowDuplicates', true) },
    itemValue: { default: text('itemValue', 'prepend') },
    itemText: { default: text('itemText', 'text') },
    activeClass: { default: text('activeClass', '') },
    returnObject: { default: boolean('returnObject', false) },
  },
  template:
    ` 
 <div>{{testValue}}
      <g-list v-model="testValue"
        :items="items"
        :disabled="disabled"
        :rounded="rounded"
        :shaped="shaped"
        :elevation="elevation"
        :dense="dense"
        :nav="nav"
        :multiSection="multiSection"
        :subheader="subheader"
        :divider="divider"
        :prependType="prependType"
        :subtextWrap="subtextWrap"
        selectable
        multiple
        :mandatory="mandatory"
        :allowDuplicates="allowDuplicates"
        itemValue="prepend"
        itemText="text"
        :returnObject="returnObject"
        :activeClass="activeClass">
      </g-list>
      </div>`,
})
export const GListSelectProp = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    let self = this
    return {
      selected: [{ text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' }],
      items: [
        { text: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      self: self
    }
  },
  methods: {
    toggleItem: function (item) {
      let context = this.self.$refs.listComponent
      context.emit = context.$emit
      let props = this.self.$refs.listComponent._props
      const { toggleItem } = makeListSelectable(props, context)
      return toggleItem(item)

    }
  },
  props: {
    divider: { default: text('divider', 'inset') },
    prependType: { default: text('prependType', 'avatar') },
    itemText: { default: text('itemText', 'text') },

  },
  template:

    ` <div>
 {{selected}}
      <g-list ref="listComponent" selectable multiple returnObject v-model="selected" :onSelectFn="toggleItem"  :items="items" subheader="subheader" :divider='divider' :prependType="prependType" itemText="text" itemValue="prepend"  >
      </g-list>
</div>
 
      `,
})
export const gListDense = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader, GContainer, GRow, GCol },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    dense: { default: boolean('dense', false) },
    itemText: { default: text('itemText', 'text') },
  },
  template:
    `<g-container>
        <g-row>Two-line</g-row>
        <g-row><g-list :items="items" :dense="dense" subheader="subheader" divider='inset'  :itemText="itemText"/> </g-row>
        <g-row>Two-line with wrapper</g-row>
         <g-row><g-list :items="items"  :dense="dense" subheader="subheader" divider='inset' subtextWrap :itemText="itemText"/></g-row>
    </g-container>`,
})
export const gListShapedInset = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    itemText: { default: text('itemText', 'text') },
  },
  template:
    `
      <g-list :items="items" shaped dense subheader="subheader" divider='inset' :itemText="itemText" >
      </g-list>
      `,
})
export const gListNav = () => ({
  components: { GList },
  props: {
    dense: { default: boolean('dense', false) },
    nav: { default: boolean('nav', true) },
    prependType: { default: text('prependType', 'avatar') },
    itemText: { default: text('itemText', 'text') },
  },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items" dense="dense" nav="nav" prepend-type="prependType" :itemText="itemText">
      </g-list>
      `,
})

export const gListTwoLine = () => ({
  components: { GList },
  props: {
    dense: { default: boolean('dense', false) },
    itemText: { default: text('itemText', 'text') },
  },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects.', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],

    }
  },
  template:
    `
      <g-list :items="items" rounded :dense="dense" subheader="subheader" divider='inset' :itemText="itemText">
      </g-list>
      `,
})
export const gListTwoLineWithWrapper = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', subtext: 'Ranee the cockroach', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    itemText: { default: text('itemText', 'text') },
  },
  template:
    `
      <g-list :items="items" :itemText="itemText" rounded dense subheader="subheader" divider='inset' subtextWrap  >
      </g-list>
      `,
})
export const gListThreeLine = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', subtext2: 'ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    itemText: { default: text('itemText', 'text') },
  },
  template:
    `
      <g-list :items="items" :itemText="itemText" rounded  subheader="subheader" divider='inset' subtextWrap >
      </g-list>
      `,
})
export const gListPrependWithSlot = () => ({
  components: { GList, GIcon },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items"  subheader="subheader" itemText="text" >
        <template v-slot:prepend="{item}">
        <g-icon>mdi-ninja</g-icon>
        </template>
      </g-list>
      `,
})
export const gListAppendWithSlot = () => ({
  components: { GList, GIcon },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items"  subheader="subheader" :itemText="itemText"  >
        <template v-slot:append="{item}">
        <g-icon color="indigo">mdi-mail</g-icon>
        </template>
      </g-list>
      `,
})
export const gListNormalPrependAvatar = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { subheader: 'User', type: 'subheader' },
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { subheader: 'Admin', type: 'subheader' },

      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="avatar" itemText="text">
      </g-list>
      `,
})

export const gListNormalPrependIcon = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { subheader: 'User', type: 'subheader' },
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'mdi-pen' },
        { text: 'Ranee Carlson', prepend: 'mdi-ninja' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { text: 'Cindy Baker', prepend: 'mdi-glasses' },
        { text: 'Ali Connors', prepend: 'mdi-mail' },
        { subheader: 'Admin', type: 'subheader' },

      ]
    }
  },
  template:
    `
      <g-list :items="items" itemText="text" rounded dense prepend-type="icon">
      </g-list>
      `,
})

export const gListNormalPrependImg = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items"  itemText="text" prepend-type="image">
      </g-list>
      `,
})

export const gListMultiSection = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { subheader: 'User', type: 'subheader' },
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        /*{subheader: 'Admin', type: 'subheader'},*/
      ]
    }
  },
  template:
    `
      <g-list :items="items" itemText="text" rounded dense prepend-type="avatar" multi-section>
      </g-list>
      `,
})

export const gListSingleSectionSelect = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: 1
    }
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" subheader="subheader" divider=true selectable itemText="text" returnObject>
        </g-list>
      </div>
      `,
})

export const gListMultiSectionSelect = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { subheader: 'User', type: 'subheader' },
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        /*{subheader: 'Admin', type: 'subheader'},*/
      ],
      testValue: 1,
    }

  },
  template:
    `
      <div>
        selectedItemIndex: {{testValue}}
        <g-list v-model="testValue" :items="items" itemText="text" rounded dense subheader="subheader" divider=inset selectable multi-section returnObject>
        </g-list>
      </div>
      `,
})
export const gListItemSlotRenderArray = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: 1
    }
  },
  template:
    `
      <div>
      selectedItem: {{testValue}}
      <g-list :items="items" selectable v-model="testValue" itemText="text">
              <template v-slot:list-item="{item, isSelected, onSelect}">
                <g-list-item :item="item" :isSelected="isSelected" @singleItemClick="onSelect(item)" >
                  <g-list-item-content>
                      <g-list-item-text >{{item.text}}</g-list-item-text>
                  </g-list-item-content>
                </g-list-item>
              </template>
            </g-list>
      </div>
      
`,
})
export const gListMultiSelect = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: null
    }
  },
  props: {
    rounded: { default: boolean('rounded', false) },
    dense: { default: boolean('dense', false) },
    divider: { default: text('divider', '') },
    allowDuplicates: { default: boolean('allowDuplicates', false) },
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" :rounded="rounded" :dense="dense"  :divider="divider" itemText="text" selectable multiple :allowDuplicates="allowDuplicates">
        </g-list>
      </div>
      `,
})
export const gListSelectMandatory = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: null
    }
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" itemText="text" rounded dense subheader="subheader" divider=inset selectable mandatory returnObject>
        </g-list>
      </div>
      `,
})

export const gListCustomActiveClass = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { text: 'Jason Oner', subtext: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: null
    }
  },
  props: {
    activeClass: { default: text('activeClass', 'border') }
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" divider=inset selectable :active-class="activeClass" itemText="text">
        </g-list>
      </div>
      `,
})
export const gListAsMenuContent = () => ({
  components: { GList, GIcon, GListItemIcon, GContainer, GDivider, GRow, GBtn },
  data() {
    return {
      list1: [
        { text: 'Profile', prepend: 'person' },
        { text: 'Chat', prepend: 'chat' },
        { text: 'Help', prepend: 'help' },
        { type: 'divider' },
        { text: 'Lock', prepend: 'lock' },
        { text: 'Log out', prepend: 'keyboard_tab' },
      ],
      list2: [
        { text: ' A new order has been placed!', subtext: '2 hours ago', prepend: 'add_shopping_cart', color: 'cyan' },
        { text: '  Completed the task', subtext: '3 days ago', prepend: 'star', color: 'red' },
        { text: '  Settings updated', subtext: '4 days ago', prepend: 'settings', color: 'teal' },
        { text: ' Settings updated', subtext: '6 days ago', prepend: 'today', color: 'deep-orange' },
        { text: '  Generate monthly report', subtext: '1 week ago', prepend: 'trending_up', color: 'amber' },
      ],
      testValue: null
    }
  },
  props: {
    inMenu: { default: boolean('inMenu', true) }
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-container>
        <g-row>Multi-section</g-row>
        <g-row>
        <g-list v-model="testValue" itemText="text" :items="list1" prependType="icon"  selectable :inMenu="inMenu" multiSection/>
        </g-row>
        <g-row>Single section</g-row>
        <g-row>
        <g-list v-model="testValue" itemText="text" :items="list2" prependType="icon"  selectable :inMenu="inMenu">
        <template v-slot:subheader>
        <div class="g-list-header" style="background-color: #9fa8da">
        <h6>Notifications</h6>
        <g-btn  small style="background-color: #00AEFF; margin-left: 100px">5 new</g-btn>
        </div>
        <g-divider/>
       </template>
       <template v-slot:prepend="{item}">
       <g-list-item-icon>
       <g-icon small :color="item.color">{{item.prepend}}</g-icon>
       </g-list-item-icon>
       </template>
        </g-list>
        </g-row>
        </g-container>
      </div>`,
})
export const gListFreeRender = () => ({
  components: { GList, GListDisplay, GIcon, GListItemIcon, GContainer, GDivider, GRow, GBtn, GListItem, GListItemContent },
  data() {
    return {
      testValue: null,
      items: [
        { text: 'item1', value: 1 },
        { text: 'item2', value: 2 },
        { text: 'item3', value: 3 },
      ]
    }
  },
  props: {
    selectable: { default: boolean('selectable', true) },
    multiple: { default: boolean('multiple', true) },
    allowDuplicates: { default: boolean('allowDuplicates', true) },
  },

  template:
    `
      <div>
      {{testValue}}
        <template>
        <g-list-display selectable v-model="testValue" itemText="" itemValue="" 
        :multiple="multiple"
        :allowDuplicates="allowDuplicates"
        :selectable="selectable">
        <g-list-item :value="items[0].text">
        <g-list-item-content>Item 1</g-list-item-content>
        </g-list-item>
        <g-list-item :value="items[0].text">
        <g-list-item-content>Item 1 Duplicate</g-list-item-content>
        </g-list-item>
        <g-list-item :value="items[1].text">
        <g-list-item-content>Item 2</g-list-item-content>
        </g-list-item>
        <g-list-item :value="items[2].text">
        <g-list-item-content>Item 3</g-list-item-content>
        </g-list-item>
        </g-list-display>
        </template>
      </div>`,
})
export const gListPrimitiveItems = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: ['Jason Oner', 'Jason Oner', 'Ranee Carlson', 'Cindy Baker', 'Ali Connors'],
      selected: null
    }
  },
  props: {
    disabled: { default: boolean('disabled', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', false) },
    nav: { default: boolean('nav', false) },
    multiSection: { default: boolean('multiSection', false) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', false) },
    prependType: { default: text('prependType', 'avatar') },
    subtextWrap: { default: boolean('subtextWrap', false) },
    selectable: { default: boolean('selectable', false) },
    multiple: { default: boolean('multiple', true) },
    mandatory: { default: boolean('mandatory', true) },
    allowDuplicates: { default: boolean('allowDuplicates', false) },
    itemValue: { default: text('itemValue', '') },
    itemText: { default: text('itemText', '') },
    activeClass: { default: text('activeClass', '') },
  },
  template:
    `<div>
{{selected}}
      <g-list :items="items"
        :disabled="disabled"
        :rounded="rounded"
        :shaped="shaped"
        :elevation="elevation"
        :dense="dense"
        :nav="nav"
        :multiSection="multiSection"
        :subheader="subheader"
        :divider="divider"
        :prependType="prependType"
        :subtextWrap="subtextWrap"
        selectable
        v-model="selected"
        :multiple="multiple"
        :allowDuplicates="allowDuplicates"
      />
</div>

      `,
})

export const gListNumberItems = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [1, 7537, 35, 88, 0, 1],
      selected: [1, 0]
    }
  },
  props: {
    disabled: { default: boolean('disabled', false) },
    rounded: { default: boolean('rounded', false) },
    shaped: { default: boolean('shaped', false) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', false) },
    nav: { default: boolean('nav', false) },
    multiSection: { default: boolean('multiSection', false) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', false) },
    prependType: { default: text('prependType', 'avatar') },
    subtextWrap: { default: boolean('subtextWrap', false) },
    selectable: { default: boolean('selectable', false) },
    multiple: { default: boolean('multiple', true) },
    mandatory: { default: boolean('mandatory', true) },
    allowDuplicates: { default: boolean('allowDuplicates', false) },
    itemValue: { default: text('itemValue', '') },
    itemText: { default: text('itemText', '') },
    activeClass: { default: text('activeClass', '') },
  },
  template:
    `<div>
{{selected}}
      <g-list :items="items"
        :disabled="disabled"
        :rounded="rounded"
        :shaped="shaped"
        :elevation="elevation"
        :dense="dense"
        :nav="nav"
        :multiSection="multiSection"
        :subheader="subheader"
        :divider="divider"
        :prependType="prependType"
        :subtextWrap="subtextWrap"
        selectable
        v-model="selected"
        :multiple="multiple"
        :allowDuplicates="allowDuplicates"
      />
</div>

      `,
})


describe('GList', function () {
  it('should render rounded dense', function () {
    const vm = new Vue(gListInset()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})


