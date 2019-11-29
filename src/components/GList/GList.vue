<template>
  <div :class="classes"
       class="g-list"
       :style="styles"
       @click="onClick"
       ref="list"
  >
    <template v-if="!multiSection">
      <slot name="subheader">
        <div v-if="subheader" class="g-list-header">{{subheader}}</div>
      </slot>
      <template v-for="(item, index) in renderList" :key="index">
        <slot name="listItem" :item="item" :isSelected="isActiveItem(item)" :on="getListEvents(item)"
              :onSelect="onSelect">
          <div v-if="item[itemTitle]"
               class="g-list-item"
               :class="{'g-list-item__active': isActiveItem(item), [activeClass]: isActiveItem(item), 'waves-effect': true, 'waves-auto': true}"
               tabindex="0"
               v-on="getListEvents(item)"
          >
            <slot name="prepend" :item="item" :isSelected="isActiveItem(item)">
              <div :class="prependClasses" v-if="item.prepend &&  prependType">
                <g-icon v-if="prependType==='icon'">{{item.prepend}}</g-icon>
                <g-avatar v-else-if="prependType==='avatar'">
                  <g-img :src="item.prepend"/>
                </g-avatar>
                <g-img v-else-if="prependType==='image'" :src="item.prepend"/>
              </div>
            </slot>
            <div class="g-list-item-content">
              <div class="g-list-item-text">{{item[itemTitle]}}</div>
              <div class="g-list-item-text__sub"
                   v-if="lineNumber > 1">
                {{item.subtitle|| '&nbsp;'}}
              </div>
              <div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtitle2||'&nbsp;'}}</div>
            </div>
              <slot name="append" :item="item">
                <template v-if="item.append">{{item.append}}</template>
              </slot>
					</div>
					<g-divider v-if="(divider && (index < renderList.length -1) )"
										 :inset="divider === 'inset'"/>
				</slot>
			</template>
		</template>

		<template v-else>
			<template v-for="(item, index) in items" :key="index">
				<template v-if="item.type === 'subheader'">
					<slot name="subheader">
						<div class="g-list-header">{{item.subheader}}</div>
					</slot>
				</template>

				<g-divider v-else-if="item.type === 'divider'"></g-divider>

				<slot :item="item" v-else>
					<div class="g-list-item"
							 :class="{'g-list-item__active': isActiveItem(item) , activeClass: isActiveItem(item), 'waves-effect': true, 'waves-auto': true}"
							 tabindex="0"
							 @click="onSelect(item)"
							 @keydown.enter="onSelect(item)"
							 @keydown.down="onArrowDown(item)"
							 @keydown.up="onArrowUp(item)">
						<slot name="prepend" :item="item" :isSelected="isActiveItem(item)">
							<div :class="prependClasses" v-if="item.prepend &&  prependType">
								<g-icon v-if="prependType==='icon'">{{item.prepend}}</g-icon>
								<g-avatar v-else-if="prependType==='avatar'">
									<g-img :src="item.prepend"/>
								</g-avatar>
								<g-img v-else-if="prependType==='image'" :src="item.prepend"/>
							</div>
							<div v-else>{{item.prepend}}</div>
						</slot>

            <div class="g-list-item-content">
              <div class="g-list-item-text">{{item[itemTitle]}}</div>
              <div class="g-list-item-text__sub"
                   v-if="lineNumber > 1">
                {{item.subtitle || '&nbsp;'}}
              </div>
              <div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtitle2||'&nbsp;'}}</div>
            </div>
            <slot name="append" :item="item">
              <template v-if="item.append">{{item.append}}</template>
            </slot>

          </div>
        </slot>
      </template>
    </template>
  </div>
</template>

<script>
  import { computed } from '@vue/composition-api';
  import GDivider from "../GLayout/GDivider";
  import {makeSelectable} from "../../mixins/groupable";
  import GIcon from '../GIcon/GIcon';
  import GAvatar from '../GAvatar/GAvatar';
  import GImg from '../GImg/GImg';
  import { keyCodes } from '../../utils/helpers';
  import _ from 'lodash';

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
      subtitleWrap: Boolean,
      value: [String, Object, Number, Array],
      selectable: Boolean,
      multiple: Boolean,
      mandatory: Boolean,
      allowDuplicates: Boolean,
      itemValue: String,
      itemTitle: {
        type: String,
        default: 'title'
      },
      activeClass: String,
       inMenu: Boolean,
    },
    setup: function (props, context) {
      //G list computed class
      //Computed subtitle
      const lineNumber = computed(() => {
        if (!props.items.find(i => i.subtitle)) return 1;
        if (props.items.find(i => i.subtitle2)) return 3;
        return 2;
      })

      const classes = computed(() => ({
        'g-list__disabled': props.disabled,
        'g-list__two-line': (lineNumber.value === 2 && !props.subtitleWrap),
        'g-list__three-line': (lineNumber.value === 2 && props.subtitleWrap) || lineNumber.value === 3,
        'g-list__rounded': props.rounded,
        'g-list__shaped': props.shaped,
        ['elevation-' + props.elevation]: true,
        'g-list__dense': props.dense,
        'g-list__inMenu': props.inMenu,
        'g-list__nav': props.nav,
        'g-list__empty': !props.items.length

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


      const renderList = computed(() => _.map(props.items, (value) => {
          if (_.isObject(value)) return value
          else return {[props.itemTitle]: value} // when props.items is an array of primitives
        }))

      //Select
      function onClick(event) {
        context.emit('click', event)
      }

      function onArrowDown(item) {
        let index = renderList.value.findIndex(i => i[props.itemTitle] === item[props.itemTitle] && i.subtitle === item.subtitle && i.prepend === item.prepend)
        let i = index
        if (index < (renderList.value.length - 1)) {
          i += 1
        } else {
          i = 0
        }
        context.refs.list.getElementsByClassName('g-list-item')[i].focus()
        context.emit('keydown:down')
      }
      function onArrowUp(item) {
        let index = renderList.value.findIndex(i => i[props.itemTitle] === item[props.itemTitle] && i.subtitle === item.subtitle && i.prepend === item.prepend)
        let i = index
        index > 0 ? i -= 1 : i = props.items.length -1
        context.refs.list.getElementsByClassName('g-list-item')[i].focus()
        context.emit('keydown:up')
      }

      function onSelect(item) {
        if (!props.selectable) return;
        toggleItem(item)
        context.emit('click:item')
      }

      const { internalValue, toggleItem, isActiveItem } = makeSelectable(props, context);

      const getListEvents = (item) => {
       let listListeners ={}
        return listListeners = {
         click: () => onSelect(item),
         keydown: (e) => {
           switch (e.keyCode) {
             case keyCodes.down:
               onArrowDown(item)
               break
             case keyCodes.up:
               onArrowUp(item)
               break
             case keyCodes.enter:
               onSelect(item)
               break
           }
         }
        }
      }


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
