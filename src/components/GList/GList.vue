<template>
  <div :class="classes"
       :style="styles"
       @click="onClick"
       class="g-list"
       ref="list"
  >
    <slot>
      <template v-if="!multiSection">
        <slot name="subheader">
          <div tabindex="0" v-if="subheader" class="g-list-header">{{subheader}}</div>
        </slot>
        <template v-for="(item, index) in renderList">
          <slot name="list-item" :isSelected="isActiveItem(item)" :item="item" :on="getListEvents(item, index)">
            <div
                :class="{'g-list-item__active': isActiveItem(item), [activeClass]: isActiveItem(item), 'waves-effect': true, 'waves-auto': true}"
                class="g-list-item"
                tabindex="0"
                v-on="getListEvents(item, index)"
                ref="listItemRef"
            >
              <slot :isSelected="isActiveItem(item, index)" :item="item" name="prepend">
                <div :class="prependClasses" v-if="item.prepend &&  prependType && itemText">
                  <g-icon v-if="prependType==='icon'">{{item.prepend}}</g-icon>
                  <g-avatar v-else-if="prependType==='avatar'">
                    <g-img :src="item.prepend"/>
                  </g-avatar>
                  <g-img v-else-if="prependType==='image'" :src="item.prepend"/>
                </div>
              </slot>
              <slot name="content">
                <div class="g-list-item-content">
                  <div class="g-list-item-text">{{item[itemText]||item}}</div>
                  <div class="g-list-item-text__sub"
                       v-if="lineNumber > 1">
                    {{item.subtext|| '&nbsp;'}}
                  </div>
                  <div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtext2||'&nbsp;'}}</div>
                </div>
              </slot>
              <slot :isSelected="isActiveItem(item, index)" :item="item" name="append">
                <div v-if="appendIcon && item.append " class="g-list-item-action">
                  <g-icon>{{item.append}}</g-icon>
                </div>
                <template v-else-if="item.append && itemText">{{item.append}}</template>
              </slot>
            </div>
            <g-divider v-if="(divider && (index < renderList.length -1) )"
                       :inset="divider === 'inset'"/>
          </slot>
        </template>
      </template>

      <template v-else>
        <template v-for="(item, index) in items">
          <template v-if="item.type === 'subheader'">
            <slot name="subheader">
              <div class="g-list-header">{{item.subheader}}</div>
            </slot>
          </template>

          <g-divider v-else-if="item.type === 'divider'"></g-divider>

          <slot name="list-item" :item="item" v-else>
            <div class="g-list-item"
                 :class="{'g-list-item__active': isActiveItem(item, index) , activeClass: isActiveItem(item, index), 'waves-effect': true, 'waves-auto': true}"
                 tabindex="0"
                 v-on="getListEvents(item, index)">
              <slot :isSelected="isActiveItem(item, index)" :item="item" name="prepend">
                <div :class="prependClasses" v-if="item.prepend &&  prependType">
                  <g-icon :svg="svg" v-if="prependType==='icon'">{{item.prepend}}</g-icon>
                  <g-avatar v-else-if="prependType==='avatar'">
                    <g-img :src="item.prepend"/>
                  </g-avatar>
                  <g-img v-else-if="prependType==='image'" :src="item.prepend"/>
                </div>
                <div v-else>{{item.prepend}}</div>
              </slot>
              <slot name="content">
                <div class="g-list-item-content">
                  <div class="g-list-item-text">{{item[itemText]}}</div>
                  <div class="g-list-item-text__sub"
                       v-if="lineNumber > 1">
                    {{item.subtext || '&nbsp;'}}
                  </div>
                  <div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtext2||'&nbsp;'}}</div>
                </div>
              </slot>

              <slot :isSelected="isActiveItem(item, index)" :item="item" name="append">
                <div v-if="appendIcon && item.append " class="g-list-item-action">
                  <g-icon :svg="svg">{{item.append}}</g-icon>
                </div>
                <template v-else-if="item.append && itemText">{{item.append}}</template>
              </slot>
            </div>
          </slot>
        </template>
      </template>
    </slot>

  </div>
</template>

<script>
  import { computed, provide } from '@vue/composition-api';
  import GDivider from '../GLayout/GDivider';
  import GIcon from '../GIcon/GIcon';
  import GAvatar from '../GAvatar/GAvatar';
  import GImg from '../GImg/GImg';
  import { keyCodes } from '../../utils/helpers';
  import { makeListSelectable } from './groupableForList';

  export default {
    name: 'GList',
    components: {GImg, GAvatar, GIcon, GDivider},
    props: {
      height: String,
      width: String,
      disabled: Boolean,
      rounded: Boolean,
      shaped: Boolean,
      elevation: {
        type: [Number, String],
        default: 2,
      },
      dense: Boolean,
      nav: Boolean,
      items: {
        type: Array,
        default: () => []
      },
      multiSection: Boolean,
      subheader: String,
      divider: {
        type: [Boolean, String],
        default: false,
      },
      prependType: {
        type: String,
        default: 'avatar',
      },
      subtextWrap: Boolean,
      value: [String, Object, Number, Array],
      selectable: Boolean,
      multiple: Boolean,
      mandatory: Boolean,
      allowDuplicates: Boolean,
      itemValue: String,
      itemText: {
        type: String,
        default: ''
      },
      activeClass: String,
      inMenu: Boolean,
      returnObject: Boolean,
      svg: Boolean,
      appendIcon: String,
    },
    setup: function (props, context) {
      //G list computed class
      //Computed subtext
      const lineNumber = computed(() => {
        if (!props.items) {
          return
        }
        if (!props.items.find(i => i.subtext)) {
          return 1;
        }
        if (props.items.find(i => i.subtext2)) {
          return 3;
        }
        return 2;
      })

      const classes = computed(() => ({
        'g-list__disabled': props.disabled,
        'g-list__two-line': (lineNumber.value === 2 && !props.subtextWrap),
        'g-list__three-line': (lineNumber.value === 2 && props.subtextWrap) || lineNumber.value === 3,
        'g-list__rounded': props.rounded,
        'g-list__shaped': props.shaped,
        ['elevation-' + props.elevation]: true,
        'g-list__dense': props.dense,
        'g-list__inMenu': props.inMenu,
        'g-list__nav': props.nav,
        'g-list__empty': !!props.items || props.items === null

      }));

      const styles = computed(() => ({
        ...props.height && {'height': props.height},
        ...props.width && {'width': props.width}
      }));
      const prependClasses = computed(() => {
        if (!['icon', 'avatar', 'image'].includes(props.prependType)) {
          return `g-list-item-icon`
        }
        return `g-list-item-${props.prependType}`;
      })

      //list events
      function onClick(event) {
        context.emit('click', event)
      }

      function onArrowDown(index) {
        index < ((renderList.value && renderList.value.length) - 1) ? index += 1 : index = 0
        context.refs.list.getElementsByClassName('g-list-item')[index].focus()
        context.emit('keydown:down')
      }

      function onArrowUp(index) {
        index > 0 ? index -= 1 : index = (renderList.value && renderList.value.length)
        context.refs.list.getElementsByClassName('g-list-item')[index].focus()
        context.emit('keydown:up')
      }

      function onSelect(item) {
        if (!props.selectable) {
          return;
        }
        toggleItem(item)
        context.emit('click:item')
      }

      const getListEvents = (item, index) => {
        return {
          click: () => onSelect(item, index),
          keydown: (e) => {
            switch (e.keyCode) {
              case keyCodes.down:
                onArrowDown(index)
                break
              case keyCodes.up:
                onArrowUp(index)
                break
              case keyCodes.enter:
                onSelect(item, index)
                break
            }
          }
        }
      }
      provide('getListEvents', getListEvents)


      const {uniqueItems: renderList, internalValue, toggleItem, isActiveItem} = makeListSelectable(props, context);

      //handler case:  list items in list
      const add = (item) => {
        if (renderList.value.includes(item)) {
          return {
            isItemAdded: false,
            index: -1
          }
        } else {
          renderList.value.push(item)
          return {
            isItemAdded: true,
            index: renderList.value.findIndex(el => el === item)
          }
        }
      }
      provide('add', add)
      provide('listInternalValue', internalValue)
      provide('toggleItem', toggleItem)
      provide('isActiveItem', isActiveItem)
      provide('selectable', props.selectable)

      return {

        classes,
        styles,
        prependClasses,
        renderList,
        lineNumber,
        onClick,
        onArrowDown,
        onArrowUp,
        onSelect,
        internalValue,
        isActiveItem,
        getListEvents,
      }
    }
  }
</script>

<style scoped>
</style>
