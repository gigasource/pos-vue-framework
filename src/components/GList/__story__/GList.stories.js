import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GList from '../GList';
import GListItem from '../GListItem';
import GDivider from '../../GLayout/GDivider.vue';
import {
  GListItemIcon,
  GListItemAvatar,
  GListItemAction,
  GListItemImage,
  GListItemImageBig,
  GListItemContent,
  GListItemText,
  GListItemSubText,
  GListHeader
} from '../GListFunctionalComponent'

export default {
  title: 'GList',
  decorators: [withKnobs],
};
export const gListPlayGround = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    disabled: { default: boolean('disabled', fasse) },
    rounded: { default: boolean('rounded', fasse) },
    shaped: { default: boolean('shaped', fasse) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', fasse) },
    nav: { default: boolean('nav', fasse) },
    multiSection: { default: boolean('multiSection', fasse) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', fasse) },
    prependType: { default: text('prependType', 'avatar') },
    subtitleWrap: { default: boolean('subtitleWrap', fasse) },
    selectable: { default: boolean('selectable', fasse) },
    multiple: { default: boolean('multiple', fasse) },
    mandatory: { default: boolean('mandatory', fasse) },
    allowDuplicates: { default: boolean('allowDuplicates', fasse) },
    itemValue: { default: text('itemValue', '') },
    itemTitle: { default: text('itemTitle', 'title') },
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
        :subtitleWrap="subtitleWrap"
      />
      `,
})
export const gListSingleSelectPlayGround = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: null
    }
  },
  props: {
    disabled: { default: boolean('disabled', fasse) },
    rounded: { default: boolean('rounded', fasse) },
    shaped: { default: boolean('shaped', fasse) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', fasse) },
    nav: { default: boolean('nav', fasse) },
    multiSection: { default: boolean('multiSection', fasse) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', fasse) },
    prependType: { default: text('prependType', 'avatar') },
    subtitleWrap: { default: boolean('subtitleWrap', fasse) },
    mandatory: { default: boolean('mandatory', fasse) },
    itemValue: { default: text('itemValue', '') },
    itemTitle: { default: text('itemTitle', 'title') },
    activeClass: { default: text('activeClass', '') },
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
        :subtitleWrap="subtitleWrap"
        selectable
        :mandatory="mandatory"
        :itemValue="itemValue"
        :itemTitle="itemTitle"
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
        { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: null
    }
  },
  props: {
    disabled: { default: boolean('disabled', fasse) },
    rounded: { default: boolean('rounded', fasse) },
    shaped: { default: boolean('shaped', fasse) },
    elevation: { type: [Number, String], default: number('elevation', 2) },
    dense: { default: boolean('dense', fasse) },
    nav: { default: boolean('nav', fasse) },
    multiSection: { default: boolean('multiSection', fasse) },
    subheader: { default: text('subheader', 'subheader') },
    divider: { type: [String, Boolean], default: boolean('divider', fasse) },
    prependType: { default: text('prependType', 'avatar') },
    subtitleWrap: { default: boolean('subtitleWrap', fasse) },
    multiple: { default: boolean('multiple', true) },
    mandatory: { default: boolean('mandatory', fasse) },
    allowDuplicates: { default: boolean('allowDuplicates', true) },
    itemValue: { default: text('itemValue', '') },
    itemTitle: { default: text('itemTitle', 'title') },
    activeClass: { default: text('activeClass', '') },
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
        :subtitleWrap="subtitleWrap"
        selectable
        :multiple="multiple"
        :mandatory="mandatory"
        :allowDuplicates="allowDuplicates"
        :itemValue="itemValue"
        :itemTitle="itemTitle"
        :activeClass="activeClass">
      </g-list>
      </div>
      `,
})
export const gListInset = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    divider: { default: text('divider', 'inset') },
    prependType: { default: text('prependType', 'avatar') }
  },
  template:
    `
      <g-list :items="items" subheader="subheader" :divider='divider' :prependType="prependType"  >
      </g-list>
      `,
})
export const gListDense = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader, GContainer, GRow, GCol },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  props: {
    dense: { default: boolean('dense', fasse) }
  },
  template:
    `<g-container>
        <g-row>Two-line</g-row>
        <g-row><g-list :items="items" :dense="dense" subheader="subheader" divider='inset' /> </g-row>
        <g-row>Two-line with wrapper</g-row>
         <g-row><g-list :items="items"  :dense="dense" subheader="subheader" divider='inset' subtitleWrap/></g-row>
    </g-container>`,
})
export const gListShapedInset = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items" shaped dense subheader="subheader" divider='inset' >
      </g-list>
      `,
})
export const gListNav = () => ({
  components: { GList },
  props: {
    dense: { default: boolean('dense', fasse) },
    nav: { default: boolean('nav', true) },
    prependType: { default: text('prependType', 'avatar') },
  },
  data() {
    return {
      items: [
        {title: 'Jason Oner', subtitle: "Jason the ant", prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ]
    }
  },
  template:
    `
      <g-list :items="items" dense="dense" nav="nav" prepend-type="prependType">
      </g-list>
      `,
})

export const gListTwoLine = () => ({
  components: { GList },
  props: {
    dense: { default: boolean('dense', fasse) },
  },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects.', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],

    }
  },
  template:
    `
      <g-list :items="items" rounded :dense="dense" subheader="subheader" divider='inset' >
      </g-list>
      `,
})
export const gListTwoLineWithWrapper = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant, ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', subtitle: 'Ranee the cockroach', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense subheader="subheader" divider='inset' subtitleWrap >
      </g-list>
      `,
})
export const gListThreeLine = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant', subtitle2: 'ants work together to gather food and care for the young, and their behavior is surprisingly coordinated and methodical for such seemingly simple insects. ', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded  subheader="subheader" divider='inset' subtitleWrap >
      </g-list>
      `,
})
export const gListPrependWithSlot = () => ({
  components: { GList, GIcon },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items"  subheader="subheader"  >
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
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items"  subheader="subheader"  >
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
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { subheader: 'Admin', type: 'subheader' },

      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="avatar">
      </g-list>
      `,
})

export const gListNormalPrependIcon = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { subheader: 'User', type: 'subheader' },
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'mdi-pen' },
        { title: 'Ranee Carlson', prepend: 'mdi-ninja' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { title: 'Cindy Baker', prepend: 'mdi-glasses' },
        { title: 'Ali Connors', prepend: 'mdi-mail' },
        { subheader: 'Admin', type: 'subheader' },

      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="icon">
      </g-list>
      `,
})

export const gListNormalPrependImg = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ]
    }
  },
  template:
    `
      <g-list :items="items"  prepend-type="image">
      </g-list>
      `,
})

export const gListMultiSection = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { subheader: 'User', type: 'subheader' },
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        /*{subheader: 'Admin', type: 'subheader'},*/
      ]
    }
  },
  template:
    `
      <g-list :items="items" rounded dense prepend-type="avatar" multi-section>
      </g-list>
      `,
})

export const gListSingleSectionSelect = () => ({
  components: {GList},
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: 1
    }
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-list :items="items" subheader="subheader" divider=true selectable>
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
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { type: 'divider' },
        { subheader: 'Admin', type: 'subheader' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        /*{subheader: 'Admin', type: 'subheader'},*/
      ],
      testValue: 1,
    }

  },
  template:
    `
      <div>
        selectedItemIndex: {{testValue}}
        <g-list v-model="testValue" :items="items" rounded dense subheader="subheader" divider=inset selectable multi-section>
        </g-list>
      </div>
      `,
})
export const gListItemSlotRenderArray = () => ({
  components: { GDivider, GListItem, GList, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: 1
    }
  },
  template:
    `
      <div>
      selectedItem: {{testValue}}
      <g-list :items="items" selectable v-model="testValue">
              <template v-slot:listItem="{item, isSelected, onSelect}">
                <g-list-item :item="item" :isSelected="isSelected" @singleItemClick="onSelect(item)" >
                  <g-list-item-content>
                      <g-list-item-text >{{item.title}}</g-list-item-text>
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
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: null
    }
  },
  props: {
    rounded: { default: boolean('rounded', fasse) },
    dense: { default: boolean('dense', fasse) },
    divider: { default: text('divider', '') },
    allowDuplicates: { default: boolean('allowDuplicates', fasse) },
  },
  template:
      `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" :rounded="rounded" :dense="dense" :subheader="subheader" :divider="divider" selectable multiple :allowDuplicates="allowDuplicates">
        </g-list>
      </div>
      `,
})
export const gListSelectMandatory = () => ({
  components: {GList},
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      testValue: null
    }
  },
  template:
    `
      <div>
        selectedItem: {{testValue}}
        <g-list v-model="testValue" :items="items" rounded dense subheader="subheader" divider=inset selectable mandatory>
        </g-list>
      </div>
      `,
})

export const gListCustomActiveClass = () => ({
  components: { GList },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'Jason the ant', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
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
        <g-list v-model="testValue" :items="items" divider=inset selectable :active-class="activeClass">
        </g-list>
      </div>
      `,
})
export const gListAsMenuContent = () => ({
  components: { GList, GIcon, GListItemIcon },
  data() {
    return {
      items: [
        { title: 'Jason Oner', subtitle: 'This won\'t be displayed in inMenu mode', prepend: 'flag-icon flag-icon-gb' },
        { title: 'Ranee Carlson', prepend: 'flag-icon flag-icon-fr' },
        { title: 'Cindy Baker', prepend: 'flag-icon flag-icon-cn' },
        { title: 'Ali Connors', prepend: 'flag-icon flag-icon-de' },
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
        <g-list v-model="testValue" :items="items" prependType="icon"  selectable :inMenu="inMenu">
          <template v-slot:prepend="{item, isSelected}">
          <g-list-item-icon>
            <span :class="item.prepend"></span>
          </g-list-item-icon>
          </template>
        </g-list>
      </div>
      `,
})
import Vue from 'vue/dist/vue.common.js'
import GContainer from '../../GLayout/GContainer';
import GRow from '../../GLayout/GRow';
import GCol from '../../GLayout/GCol';
import GIcon from '../../GIcon/GIcon';

describe('GList', function () {
  it('should render rounded dense', function () {
    const vm = new Vue(gListInset()).$mount();
    expect(vm.$el.outerHTML).toMatchSnapshot()
  });
})


