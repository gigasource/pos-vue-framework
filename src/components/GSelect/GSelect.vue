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
                      :prefix="prefix"
                      :suffix="suffix"
                      :type="type"
                      :rules="rules"
                      @click="toggleContent"
                      read-only
                      @click:clearIcon="clearSelection"
                      :value="textfieldValue"

        >
          <template v-slot:inputSlot v-if="selections">
            <div class="tf-input" style="{color: #1d1d1d}">
              <template v-if="multiple">
                <template v-for="(value, index) in selections">
                  <!--          fixme: Wait Chips  add chip to prepend of text field-->
                  <template v-if="chips||allowDuplicates">
                    <g-chip close @click:close="onChipCloseClick(index)">{{value}}</g-chip>
                  </template>
                  <template v-else>
                    <div v-if="index ===0 ">{{value}}</div>
                    <div v-else>{{', ' + value}}</div>
                  </template>
                </template>
              </template>
              <template v-else-if="chips">
                <g-chip close @click:close="onChipCloseClick(index)">{{selections}}</g-chip>
              </template>
              <template v-else>
                <div>{{selections}}</div>
              </template>

            </div>
          </template>
          <template v-slot:label>
            <label class="tf-label" :class="labelClasses" :style="labelStyles">{{label}}</label>
          </template>
          <template v-slot:append-inner="{isFocused}">
            <div class="dropDown" :style="iconStyle">
              <g-icon :color="showOptions||isFocused ? 'blue' : null">arrow_drop_down</g-icon>
            </div>
          </template>
        </g-text-field>
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
        </g-list>
<!--              todo: prepend click unselect-->
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
  import {getLabel} from "../GInput/GInputField";
  import {getList, getSelections} from "./GSelect";
  import GChip from "../GChip/GChip";

  export default {
    name: "GSelect",
    components: {
      GChip,
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
      },
      prefix:{
          type: String,
            default:''},
        suffix:{
          type: String,
          default:''},
        rules: Array,
        type:{
          type: String,
          default: 'text'
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
      chips:{
        type: Boolean,
        default: false
      },
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
      const options =  getList(props, selectedItem, state)
      const {searchText} = toRefs(state)

      //textfield selection computed
      const fieldItem = getSelections(props, selectedItem)
      //textfield value computed
      const selections = computed(() => {
        if (props.multiple) {
          return fieldItem.value.map(item => {
            return item ? (item['text'] || item['value'] || item) : ''
          })
        }else {
          return fieldItem.value ? fieldItem.value['text'] || fieldItem.value['value'] || fieldItem.value : ''
        }

      })
      const textfieldValue = computed(() => {
        props.multiple ? selections.value.join(', ') : selections
      })
      function clearSelection() {
        selectedItem.value = props.multiple ? [] : ''
        state.searchText = ''
      }
      //label computed
      const isValidInput = ref(true)
      const {labelClasses, labelStyles, isDirty} = getLabel(props, textfieldValue, isValidInput, showOptions, 'tf-label__active',{ 'color': 'red' })
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
      //chips click
      function onChipCloseClick(index){
        props.multiple ? selectedItem.value.splice(index, 1) : selectedItem.value = ''
      }
      return {
        //
        selectedItem,
        selections,
        options,
        fieldItem,
        textfieldValue,
        searchText,
        clearSelection,
        showOptions,
        //label
        labelClasses,
        labelStyles,
        isDirty,
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
        onChipCloseClick,
      }
    }
  }
</script>
<style>
  .g-checkbox-wrapper {
    margin: 2px 4px;
  }
  .dropDown{
    transition: transform 0.4s;
  }
  .tf-input{
    color: #1d1d1d;
    display: flex;
    flex-wrap: wrap;
  }
  input:first-of-type{
    width: 0;
  }
</style>
