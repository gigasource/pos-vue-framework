<template>
  <!--  fixme: menu props-->
  <g-menu v-model="showOptions"
          :closeOnClick="closeOnClick"
          :closeOnContentClick="closeOnContentClick"
          :maxHeight="maxHeight"
          :offsetY="offsetY"
          :offsetOverflow="offsetOverflow">
    <template v-slot:activator="{toggleContent}">
      <slot name="textfieldValue">
        <!--          fixme: text field slot to customise text field display : slot prepend-->
        <g-text-field-functional :label="label"
                                 read-only
                                 clearable
                                 :filled="filled"
                                 :placeholder="placeholder"
                                 @click="toggleContent"
                                 @click:clearIcon="clearSelection"
                                 :value="textfieldValue"
        >
          <!--          fixme: Wait Chips  add chip to prepend of text field-->
          <template v-slot:append-inner>
            <!--          fixme: Wait Icon for arrow dropdown-->
          </template>
        </g-text-field-functional>
      </slot>
    </template>
    <template v-slot:default="{toggleContent}">
      <slot name="prependItems">
      </slot>
      <g-text-field-functional v-if="searchable"
                               placeholder="Search"
                               v-model="searchText"
                               clearable
      ></g-text-field-functional>
      <g-list v-if="searchable" :items="options" selectable :mandatory="mandatory" v-model="selectedItem"
              @click:item="showOptions = false">
        <template v-slot:listItem="{item, isSelected}">
          <slot name="item" :item="item" :isSelected="isSelected"></slot>
        </template>
      </g-list>
      <g-list v-else-if="multiple" :item-title="itemText" :item-value="itemValue" :items="options" :mandatory="mandatory" selectable mandatory
              multiple v-model="selectedItem" >
        <template v-slot:prepend="{isSelected}">
          <g-checkbox v-model="isSelected">
          </g-checkbox>
        </template>
        <template v-slot:listItem="{item, isSelected}">
          <slot name="item"></slot>
        </template>
      </g-list>
      <g-list v-else :items="items" selectable mandatory v-model="selectedItem" @click:item="showOptions = false" >
        <template v-slot:listItem="{item, isSelected}">
          <slot name="item" :item="item" :isSelected="isSelected"></slot>
        </template>
      </g-list>
    </template>
  </g-menu>
</template>
<script>
  import {reactive, ref, computed, watch, toRefs} from '@vue/composition-api';
  import GList from "../GList/GList";
  import GMenu from "../GMenu/GMenu";
  import _ from "lodash";
  import GDivider from "../GLayout/GDivider";
  import GListItem from "../GList/GListItem";
  import {
    GListHeader, GListItemAction,
    GListItemAvatar, GListItemContent,
    GListItemIcon, GListItemImage,
    GListItemImageBig,
    GListItemSubText, GListItemText
  } from "../GList/GListFunctionalComponent";
  import groupable, {makeSelectable} from "../../mixins/groupable";
  import GCheckbox from "../GCheckbox/GCheckbox";
  import GTextField from "../GInput/GTextField01";
  import GTextFieldFunctional from "../GInput/GTextFieldFunctional";

  export default {
    name: "GSelect",
    components: {
      GTextField,
      GCheckbox,
      GMenu,
      GTextFieldFunctional,
      GList,
    },
    props: {
      //text field's props
      chips: Boolean,
      filled: Boolean,
      outlined: Boolean,
      solo: Boolean,
      flat: Boolean,
      hint: String,
      placeholder: String,
      label: String,

      //list props

      searchable: Boolean,
      multiple: Boolean,
      mandatory: Boolean,
      allowDuplicates: Boolean,
      //menu props
      menuProps: {
        type: Object,
        default: () => ({
          closeOnClick: true,
          closeOnContentClick: false,
          maxHeight: 300,
          offsetY: true,
          offsetOverflow: true,
        })
      },
      //item textfieldValue props
      items: Array,
      itemText: {
        type: String,
        default: 'text'
      },
      itemValue: {
        type: String,
        default: 'value'
      },
      value: null,
    },
    setup: function (props, context) {
      const state = reactive({
        searchText: '',
        fieldItem: null
      })
      const showOptions = ref(false)
      const {internalValue: selectedItem} = makeSelectable(props, context)

      //list rendered computed
      const options = computed(() => {
        if (!props.multiple) {
          let items = _.cloneDeep(props.items);
          if (!state.searchText) {
            return items;
          }
          const searchText = state.searchText.trim().toLowerCase();
          if (!searchText) {
            return items;
          }
          //Search text match
          let _options = items.filter(item => {
            const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
            return text.startsWith(searchText);
          });
          _options = _options.concat(items.filter(item => {
            const text = item[props.itemText] ? (item[props.itemText] + "").toLowerCase() : (item + "").toLowerCase();
            return !text.startsWith(searchText) && text.includes(searchText);
          }));
          return _options;
        } else {
          if (props.allowDuplicates) {
            return props.items;
          }
          if (!props.itemValue) {
            return props.items.filter(item => !selectedItem.value.includes(item));
          }
          return props.items.filter(item => {
            if (item[props.itemText]) {
              return !selectedItem.value.find(value => value === item[props.itemValue]);
            }
            return selectedItem.value.find(value => value === item);
          });
        }

      })
      const {searchText} = toRefs(state)

      //textfield selection computed
      const fieldItem = computed(() => {
        if (!props.multiple) {
          let item = selectedItem.value;
          if (!item) {
            return '';
          }
          if (typeof item === 'string' || typeof item === 'number') {
            return item;
          }
          if (props.itemValue) {
            item = props.items.find(_item => _item[props.itemValue] === item[props.itemValue]);
          }
          return {text: item[props.itemText], value: item[props.itemValue]};
        } else {
          let list = selectedItem.value
          if (props.itemText && props.itemValue) {
            if (props.itemValue) {
              list = list.map(value => {
                return props.items.find(item => {
                  if (item[props.itemText]) {
                    return item[props.itemValue] === value;
                  }
                  return item === value;
                });
              });
            }
            return list.map(item => {
              if (item[props.itemText]) {
                return {text: item[props.itemText], value: item[props.itemValue]};
              }
              return item;
            });
          }
          return props.chips ? list : list.join(', ');
        }
      })
      //textfield value computed
      const textfieldValue = computed(() => {
        if (props.multiple) {
          return fieldItem.value.map(item => {
            return item ? (item['text'] || item['value'] || item) : ''
          }).join(', ')
        } else if (props.chips) {
          return ''
        } else {
          return fieldItem.value ? fieldItem.value['text'] || fieldItem.value['value'] || fieldItem.value : ''
        }

      })

      function clearSelection() {
        selectedItem.value = props.multiple ? [] : ''
        state.searchText = ''
      }

      const {
        closeOnClick,
        closeOnContentClick,
        maxHeight,
        offsetY,
        offsetOverflow,
        transition
      } = props.menuProps

      return {
        selectedItem,
        textfieldValue,
        options,
        fieldItem,
        searchText,
        clearSelection,
        showOptions,
        //menu props
        ...{
          closeOnClick,
          closeOnContentClick,
          maxHeight,
          offsetY,
          offsetOverflow,
        }
      }
    }
  }
</script>
<style scoped>
  /*todo: select css*/
</style>
