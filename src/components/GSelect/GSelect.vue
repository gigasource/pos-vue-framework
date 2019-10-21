<template>
  <!--          fixme: set menu full width-->
<!--  fixme: menu positioning-->
  <g-menu v-model="showOptions" min-width="100%">
    <template v-slot:activator="{toggleContent}">
      <slot name="selection">
        <g-text-field-functional :label="label"
                                 read-only
                                 :filled="filled"
                                 @click="toggleContent"
                                 :value="fieldItem ? fieldItem.text || fieldItem.value || fieldItem : ''"
        >
<!--          fixme: Wait Chips-->
<!--          fixme: text field slot to customise text field display-->
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
      <!-- fixme: item click toggle menu-->
      <template v-if="searchable">
        <g-text-field-functional placeholder="Search"
                                 v-model="searchText"
                                 clearable
        ></g-text-field-functional>
        <g-list  :items="options" selectable v-model="selectedItem" >
        </g-list>
      </template>
      <g-list v-else :items="items" selectable v-model="selectedItem">
        <template v-slot:default="{item, isSelected}">
          <g-list-item :isSelected="isSelected" >
            <g-list-item-content>
              <g-list-item-text >{{item.title}}</g-list-item-text>
            </g-list-item-content>
          </g-list-item>
        </template>
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
//Todo: Set menu position like vuetify
  export default {
    name: "GSelect",
    components: {GMenu, GTextFieldFunctional, GList, GDivider, GListItem, GListItemIcon, GListItemAvatar, GListItemAction, GListItemImage, GListItemImageBig, GListItemContent, GListItemText, GListItemSubText, GListHeader},
    props: {
      filled: Boolean,
      label: String,
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
      searchable: Boolean,
      value: null
    },
    setup: function (props, context) {
      //Todo: Display list when textfield clicked
      const state = reactive({
        searchText: '',
        fieldItem: null
      })
      const showOptions = ref(false)
      const {model: selectedItem} = getVModel(props, context)
      const options = computed(() => {
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
      })
      const {searchText} = toRefs(state)
      //select item value when !returnObject or the whole item when returnObject
      const fieldItem = computed(() => {
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
      })

      function select(item) {
        if (props.returnObject) {
          selectedItem.value = item;
        } else if (item[props.itemText] && item[props.itemValue]) {
          selectedItem.value = item[props.itemValue];
        } else {
          selectedItem.value = item;
        }
        state.searchText = '';
        showOptions.value = false
      }

      function unselect() {
        selectedItem.value = null;
        state.searchText = '';
      }

      return {
        selectedItem,
        options,
        select,
        fieldItem,
        searchText,
        unselect,
        showOptions,
      }
    }
  }
</script>
<style scoped>
  @import "_GSelect.scss";
</style>
