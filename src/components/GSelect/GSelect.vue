<template>
  <div class="g-select" :style="{'width': `${width}`}">
    <g-menu v-model="showOptions"
            :closeOnClick="closeOnClick"
            :closeOnContentClick="closeOnContentClick"
            :maxWidth="width"
            :maxHeight="maxHeight"
            :offsetY="offsetY"
            :offsetOverflow="offsetOverflow"
            :top="top"
            :nudgeBottom="nudgeBottom">
      <template v-slot:activator="{toggleContent}">
        <slot name="textfieldValue">
          <!--          fixme: text field slot to customise text field display : slot prepend-->
          <g-text-field :label="label"
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
                        @click="toggleContent"
                        read-only
                        @click:clearIcon="clearSelection"
                        :value="textfieldValue"
          >
            <!--          fixme: Wait Chips  add chip to prepend of text field-->
            <template v-slot:append-inner="{isFocused, isDirty}">
              <div class="dropDown" :style="iconStyle">
                <g-icon :color="showOptions||isFocused ? 'blue' : null">arrow_drop_down</g-icon>
              </div>
            </template>
          </g-text-field>
        </slot>
      </template>
      <template v-slot:default="{toggleContent}">
        <slot name="prependItems">
        </slot>
        <g-text-field v-if="searchable"
                      placeholder="Search"
                      v-model="searchText"
                      clearable
                      solo
                      flat
                      style="margin-bottom: 0; background-color: transparent"
        ></g-text-field>
        <g-list v-if="searchable" :items="options" :item-title="itemText" :item-value="itemValue" selectable :mandatory="mandatory" v-model="selectedItem"
                @click:item="showOptions = false" dense>
          <template v-slot:listItem="{item, isSelected}">
            <slot name="item" :item="item" :isSelected="isSelected"></slot>
          </template>
        </g-list>
        <g-list v-else-if="multiple" :item-title="itemText" :item-value="itemValue" :items="options" :mandatory="mandatory" :allow-duplicates="allowDuplicates" selectable
                multiple v-model="selectedItem" dense >
          <template v-slot:listItem="{item, isSelected}">
            <slot name="item" :item="item" :isSelected="isSelected"></slot>
          </template>
<!--          <template v-if="allowDuplicates" v-slot:prepend="{item, isSelected}">-->
<!--            <g-checkbox color="#1271ff" v-model="isSelected"></g-checkbox>-->
<!--          </template>-->
        </g-list>
<!--        <g-list v-else-if="multiple" :item-title="itemText" :item-value="itemValue" :items="options" :mandatory="mandatory" :allow-duplicates="allowDuplicates" selectable-->
<!--                multiple v-model="selectedItem" dense >-->
<!--          <template v-slot:listItem="{item, isSelected}">-->
<!--            <slot name="item" :item="item" :isSelected="isSelected">-->
<!--&lt;!&ndash;              todo: prepend click unselect &ndash;&gt;-->
<!--              <div class="g-list-item">-->
<!--                <g-icon>check</g-icon>-->
<!--                <div class="g-list-item-content">-->
<!--                  <div class="g-list-item-text">{{item[itemText]}}</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </slot>-->
<!--          </template>-->
<!--        </g-list>-->
        <g-list v-else :items="items" :item-title="itemText" :item-value="itemValue" selectable mandatory v-model="selectedItem" @click:item="showOptions = false" dense>
          <template v-slot:listItem="{item, isSelected}">
            <slot name="item" :item="item" :isSelected="isSelected"></slot>
          </template>
        </g-list>
      </template>
    </g-menu>
  </div>
</template>
<script>
  import {reactive, ref, computed, toRefs} from '@vue/composition-api';
  import GList from "../GList/GList";
  import GMenu from "../GMenu/GMenu";
  import _ from "lodash";
  import GListItem from "../GList/GListItem";
  import {makeSelectable} from "../../mixins/groupable";
  import GCheckbox from "../GCheckbox/GCheckbox";
  import GTextField from "../GInput/GTextField";
  import {GListItemContent, GListItemSubText, GListItemText} from "../GList/GListFunctionalComponent";
  import GIcon from "../GIcon/GIcon";

  export default {
    name: "GSelect",
    components: {
      GIcon,
      GListItem,
      GTextField,
      GCheckbox,
      GMenu,
      GList,
      GListItemContent,
      GListItemText,
      GListItemSubText,

    },
    props: {
      //select props
      width: [String, Number],
      //text field's props
      ...{
        clearable:{
        type: Boolean,
        default: false
      },
      filled:{
        type: Boolean,
        default: false
      },
      solo:{
        type: Boolean,
        default: false
      },
      outlined:{
        type: Boolean,
        default: false
      },
      flat:{
        type: Boolean,
        default: false
      },
      rounded:{
        type: Boolean,
        default: false
      },
      shaped:{
        type: Boolean,
        default: false
      },
      hint:{
        type: String,
        default: ''
      },
      persistent:{
        type: Boolean,
        default: false
      },
      counter:{
        type:  [Boolean, Number, String],
        default: false
      },
      placeholder:{
        type: String,
        default: ''
      },
      label:{
        type: String,
        default: 'Label'
      }
      },

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
          top: false,
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
            item = props.items.find(_item => _item[props.itemValue] === item[props.itemValue]);
          }
          return {text: item[props.itemText], value: item[props.itemValue]};
        } else {
          let list = selectedItem.value
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
        //menu props computed
      const {
        closeOnClick,
        closeOnContentClick,
        maxHeight,
        offsetY,
        offsetOverflow,
        top
      } = props.menuProps
      const nudgeBottom = computed(() => !!props.hint ? '10px' : '2px')
      //dropdown icon
      const iconStyle = computed(() => (showOptions.value) ? {'transform':'rotateZ(180deg)'} : {})
      const iconColor = computed(() => (showOptions.value) ? 'blue' : null)
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
          top,
        },
        nudgeBottom,
        iconStyle,
        iconColor,
      }
    }
  }
</script>
<style scoped >
  /*todo: select css*/
  .g-checkbox-wrapper {
    margin: 2px 4px;
  }
/*todo: dropdown icon transform*/
  .dropDown{
    transition: transform 0.4s;
  }

  /*fixme:text field filled css fix*/

</style>
