<template>
  <!--  fixme: menu positioning-->
  <g-menu v-model="showOptions" min-width="100%" >
    <template v-slot:activator="{toggleContent}">
      <slot name="selection">
        <g-text-field-functional :label="label"
                                 read-only
                                 clearable
                                 :filled="filled"
                                 @click="toggleContent"
                                 @click:clearIcon="clearSelection"
                                 ref="selection"
        >
          <!--          fixme: Wait Chips  add chip to prepend of text field-->
          <!--          fixme: text field slot to customise text field display -->
          <template v-slot:append-inner>
            <!--          fixme: Wait Icon for arrow dropdown-->
            <img src="../../assets/delivery/arrow.svg"/>
          </template>
        </g-text-field-functional>
      </slot>
    </template>
    <template v-slot:default="{toggleContent}">
      <slot name="prependItems">
      </slot>
      <template v-if="searchable">
        <g-text-field-functional placeholder="Search"
                                 v-model="searchText"
                                 clearable
        ></g-text-field-functional>
        <g-list :items="options" selectable mandatory v-model="selectedItem">
        </g-list>
      </template>
      <g-list v-else-if="multiple" :items="options" mandatory selectable multiple v-model="selectedItem" >
      </g-list>
      <g-list v-else :items="items" selectable mandatory v-model="selectedItem" @click:item="showOptions = false">
      </g-list>
    </template>
  </g-menu>
</template>
<script>
  import {reactive, ref, computed, watch, toRefs} from '@vue/composition-api';
  import GList from "../GList/GList";
  import GTextFieldFunctional from "../GInput/GTextFieldFunctional";
  import getVModel from "../../mixins/getVModel";
  import _ from "lodash";
  import GMenu from "../GMenu/GMenu";
  import GDivider from "../GLayout/GDivider";
  import GListItem from "../GList/GListItem";
  import {
    GListHeader, GListItemAction,
    GListItemAvatar, GListItemContent,
    GListItemIcon, GListItemImage,
    GListItemImageBig,
    GListItemSubText, GListItemText
  } from "../GList/GListFunctionalComponent";
  import groupable from "../../mixins/groupable";

  export default {
    name: "GSelect",
    components: {
      GMenu,
      GTextFieldFunctional,
      GList,
    },
    props: {
      //text field's props
      chip: Boolean,
      filled: Boolean,
      placeholder: String,
      label: String,

      //list props

      searchable: Boolean,
      multiple: Boolean,
      mandatory: Boolean,
      allowDuplicates: Boolean,

      items: Array,
      itemText: {
        type: String,
        default: 'text'
      },
      itemValue: {
        type: String,
        default: 'value'
      },
      returnObject: Boolean,
      value: null,
    },
    setup: function (props, context) {
      const state = reactive({
        searchText: '',
        fieldItem: null
      })
      const showOptions = ref(false)
      const {model: selectedItem} = getVModel(props, context)

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
          if (props.returnObject) {
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
          if (!props.returnObject) {
            item = props.items.find(_item => _item[props.itemValue] === item);
          }
          return {text: item[props.itemText], value: item[props.itemValue]};
        } else {
          let list = selectedItem.value || []
          if (props.itemText && props.itemValue) {
            if (!props.returnObject) {
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
          return props.chip ? list : list.join(', ');
        }
      })
      watch(fieldItem, newVal => {
        const textFieldRef = context.refs.selection
        if (textFieldRef) {
          if (props.multiple) {
            textFieldRef.internalValue  = newVal.map(item => {
              return item ? (item['text'] || item['value'] || item) : ''
            }).join(', ')
          }else if(props.chips){
            textFieldRef.internalValue = ''
          } else {
            textFieldRef.internalValue = newVal ? newVal['text'] || newVal['value'] || newVal : ''
          }
        }

      })

      function clearSelection(e){
        selectedItem.value = props.multiple ? [] : null
        state.searchText = ''
      }

      return {
        selectedItem,
        options,
        fieldItem,
        searchText,
        clearSelection,
        showOptions,
      }
    }
  }
</script>
<style scoped>
  @import "_GSelect.scss";
</style>
