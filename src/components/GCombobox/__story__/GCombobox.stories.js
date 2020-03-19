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
        {text: 'Jason', subtitle: "Jason the ant", value: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
        {text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
        {text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
        {text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
      ],
      selected: null
    }
  },
  created() {
    this.selected = this.items[1]
  },
  template: `
  <div data-app>
  {{selected}}
  <g-combobox :items="items" 
   prefix="check"
  returnObject
  itemText="text"
  itemValue="value"        
             v-model="selected" :outlined="outlined">  
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
      selected: 'll'
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
      selected: [2,2,2,2,3,4]
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
             clearable>    <template #append-outer><div>append-outer</div></template>
   </g-combobox>
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
      <g-list-item :in-list="false">
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
export const GComboboxNormalizeProps = () => ({
  components: {GCombobox, GListItem, GListItemContent, GListItemText},
  props: {},
  data() {
    return {
      items: [{ a: 1, b: () => 1 }, { a: 2, b: () => 2 }, { a: 3, b: () => 3 }],
      selected: [() => 4],
      normalize: (value, items, isFromInput) => {
        if (isFromInput) return { a: value, b: eval(`() => ${value}`) };
        const found = items.find(i => value && i.b.toString() === value.toString());
        if (found) return found;
        return { a: value(), b: value };
      },
    }
  },
  computed:{
    selectionString () {return this.selected.map(item => item.toString())}
  },
  template: `
  <div data-app>
  {{selectionString}}
  <g-combobox multiple :normalize="normalize" itemText="a" itemValue="b" :items="items" label="Label" v-model="selected"  clearable>
   
  </g-combobox>
</div>`,
})


export const manyItems = () => ({
  components: {GCombobox},
  props: {
    clearable: {default: boolean('clearable', false)},
    smallChips: {default: boolean('smallChips', false)},
    deletableChips: {default: boolean('deletable-chips', false)},
    multiple: {default: boolean('multiple', false)},
  },
  data() {
    return {
      items: ["AddItemButtons","AdminFilterQuery","AppContent","AppDataHolder","AppDrawer","AppFormDialog","AppLayout","AppPagination","SettingButton","ComponentSelect","DatePicker","InlineImage","ProcessData","RatingSelect","RefMultiSelectStatic","RefSelectStatic","SlideSelect","TimePicker","computedField","PosArticleFunctionButton","PosArticleLayoutOverlay","PosArticleNumpad","PosArticleProductCategoryMenu","PosArticleProductInfo","PosArticleScrollWindow","PosColorSelector","PosFunctionSortComponent","PosFunctionToolbar","PosDashboardSidebar","PosDashboardToolbar","PosEndOfDayDatePicker","PosEndOfDayDetails","PosEndOfDayMain","PosEndOfDayPrintDialog","PosEndOfDayPrintPendingZReport","PosEndOfDayPrintZReport","PosEndOfDayReprintZReport","PosEndOfDayToolbar","PosFnButtonView","PosPaymentLayoutConfig","GButtonMerger","GGridItemSelector","dialogFnButtonProductLookup","PosLoginTextfield","dialogLoginSupport","PosMonthReport","PosMonthReportSetting","PosMonthSelect","PosOrderScreenAction","PosOrderScreenButtonGroup","PosOrderScreenInfoLeft","PosOrderScreenInfoRight","PosOrderScreenNumberKeyboard","PosOrderScreenProductCategoryMenu","PosOrderScreenReport","PosOrderScreenScrollWindow","PosOrderScreenTable","PosOrderScreenToolbar","TableExpansionRow","dialogProductLookup","dialogProductSearchResult","dialogSavedList","OrderHistoryDetail","OrderHistoryTable","dialogDateTimePicker","PosPaymentScreenBalance","PosPaymentScreenInfo","PosPaymentScreenKeyboard","PosPaymentScreenPaymentMethods","PosPaymentScreenReport","PosPaymentScreenTable","PosPaymentScreenToolbar","PosStore","MonthReport","OrderReport","StaffReport","XReport","ZReport","PosSettingsScreenContent","PosSettingsScreenSidebar","dialogNewCategory","dialogNewPayment","dialogNewProduct","dialogNewTaxCategory","dialogNewUser","dialogSelectAvatar","dialogUserDetail","PosSettingsScreenToolbar","viewArticle","viewArticleToolbar","viewCategory","viewCategoryToolbar","viewCompany","viewGeneral","viewHardware","viewPayment","viewPaymentToolbar","viewTax","viewTaxToolbar","viewUser","viewUserToolbar","PosStaffReportDialog","PosFileInputImage","PosRangeSlider","PosSelect","PosTextField","PosTimePicker","PosDatetimePicker","PosKeyboardFull","PosNumpad","PosSwitch","PosTablePagination","PivotTable2","FormBuilderRender","ComponentTreeRender","ComponentTreeRenderIframe","ComponentRenderSwitch","OrderStaffReport","OrderSalesByStaff","VBtn","VIcon","VDialog","VCard","VCardTitle","VCardText","VCardActions","VSpacer","VLayout","VDataTable","VTag","VDataIterator","VFlex","VDivider","VList","VListTile","VListTileContent","VContainer","VCalendar","VSheet","GFor","apexchart","VMenu","VListTileTitle","GSwitch","GComp","VSubheader","VTextField","DatetimePicker","GLayout","GCard","VueJsonPretty","VSelect","GridSelect","ReportMaker","GBtn2","GIcon","GImg","GAvatar","GBadge","GDialog","GToolbar","GSpacer","GDivider","GGridLayout","dialogNumberFilter","dialogTextFilter","dialogRangeFilter","PosLoginKeyboard","dialogConfirmDelete","dialogChangeValue","GSnackbar","GBtn","MyBtn","MyDialog","FileManager","MyProduct","TestInput","MyCard"],
      selected: []
    }
  },
  template: `
    <div>
      <div>value: {{selected}}</div>
      <g-combobox clearable :items="items" v-model="selected" :clearable="clearable"
                  :smallChips="smallChips" :deletableChips="deletableChips">
      </g-combobox>
    </div>
  `
})

export const GComboboxBorderHover = () => ({
  components: {GCombobox},
  props: {
    dense: { default: boolean('Dense', true)}
  },
  data() {
    return {
      items: ['Normal','Bold', 'Light','100','200','300','400','500','600','700','800','900'],
      cbb1: null,
      cbb2: 'Normal'
    }
  },
  template: `<div data-app><p>Hover the combobox to show its border.</p>
    With label
    <g-combobox :items="items" v-model="cbb1" :arrow="false" label="Font weight" :dense="dense" text-field-class="g-tf__border-hover"/>
    Without label
    <g-combobox :items="items" v-model="cbb2" :arrow="false" :dense="dense" text-field-class="g-tf__border-hover"/>
  </div>`
})

describe('test', function () {
  it('should', function () {
    const vm = new Vue(test1()).$mount();
    // your expect here
  })
})
