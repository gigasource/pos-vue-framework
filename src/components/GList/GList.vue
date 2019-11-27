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
					<div v-if="subheader" class="g-list-header">{{subheader}}</div>
				</slot>
				<template v-for="(item, index) in renderList">
					<slot :isSelected="isActiveItem(item)" :item="item" :on="getListEvents(item, index)" name="listItem"
								:onSelect="onSelect">
						<div
								:class="{'g-list-item__active': isActiveItem(item), [activeClass]: isActiveItem(item), 'waves-effect': true, 'waves-auto': true}"
								class="g-list-item"
								tabindex="0"
								v-on="getListEvents(item, index)"
						>
							<slot name="prepend" :item="item" :isSelected="isActiveItem(item)">
								<div :class="prependClasses" v-if="item.prepend &&  prependType && itemText">
									<g-icon svg="svg" v-if="prependType==='icon'">{{item.prepend}}</g-icon>
									<g-avatar v-else-if="prependType==='avatar'">
										<g-img :src="item.prepend"/>
									</g-avatar>
									<g-img v-else-if="prependType==='image'" :src="item.prepend"/>
								</div>
							</slot>
							<div class="g-list-item-content">
								<div class="g-list-item-text">{{item[itemText]||item}}</div>
								<div class="g-list-item-text__sub"
										 v-if="lineNumber > 1">
									{{item.subtext|| '&nbsp;'}}
								</div>
								<div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtext2||'&nbsp;'}}</div>
							</div>
							<slot :isSelected="isActiveItem(item)" :item="item" name="append">
								<g-icon v-if="appendIcon">{{item.append}}</g-icon>
								<template v-else>{{item.append}}</template>
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

					<slot :item="item" v-else>
						<div class="g-list-item"
								 :class="{'g-list-item__active': isActiveItem(item) , activeClass: isActiveItem(item), 'waves-effect': true, 'waves-auto': true}"
								 tabindex="0"
								 v-on="getListEvents(item, index)">
							<slot name="prepend" :item="item" :isSelected="isActiveItem(item)">
								<div :class="prependClasses" v-if="item.prepend &&  prependType">
									<g-icon svg="svg" v-if="prependType==='icon'">{{item.prepend}}</g-icon>
									<g-avatar v-else-if="prependType==='avatar'">
										<g-img :src="item.prepend"/>
									</g-avatar>
									<g-img v-else-if="prependType==='image'" :src="item.prepend"/>
								</div>
								<div v-else>{{item.prepend}}</div>
							</slot>

							<div class="g-list-item-content">
								<div class="g-list-item-text">{{item[itemText]}}</div>
								<div class="g-list-item-text__sub"
										 v-if="lineNumber > 1">
									{{item.subtext || '&nbsp;'}}
								</div>
								<div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtext2||'&nbsp;'}}</div>
							</div>
							<slot name="append" :item="item">
								<g-icon v-if="appendIcon">{{item.append}}</g-icon>
								<div class="g-list-item-icon" v-if="appendIcon">{{item.append}}</div>
							</slot>

						</div>
					</slot>
				</template>
			</template>
		</slot>

	</div>
</template>

<script>
  import { computed, provide, ref } from '@vue/composition-api';
  import GDivider from '../GLayout/GDivider';
  import { makeSelectable } from '../../mixins/groupable';
  import GIcon from '../GIcon/GIcon';
  import GAvatar from '../GAvatar/GAvatar';
  import GImg from '../GImg/GImg';
  import { keyCodes } from '../../utils/helpers';
  import _ from 'lodash'

  export default {
    name: 'GList',
    components: { GImg, GAvatar, GIcon, GDivider },
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
        default: 'title'
      },
      activeClass: String,
      inMenu: Boolean,
      returnObject: Boolean,
      appendIcon: Boolean,
      svg: Boolean,
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
        'g-list__empty': !props.items

      }));

      const styles = computed(() => ({
        ...props.height && { 'height': props.height },
        ...props.width && { 'width': props.width }
      }));
      const prependClasses = computed(() => {
        if (!['icon', 'avatar', 'image'].includes(props.prependType)) {
          return `g-list-item-icon`
        }
        return `g-list-item-${props.prependType}`;
      })


      const isObjectList = computed(() => props.items.some(item => _.isObject(item) === true))
      const renderList = computed(() => {
        return isObjectList.value ? props.items.filter(item => item[props.itemText]) : props.items
      })
      const isSelected = (item, index) => {
        return isObjectList.value ? isActiveItem(item) : isActiveItem(index)
      }

      //Events in list

      //when no props.items provided
      const itemsInList = ref([])
      provide('itemsInList', itemsInList)


      function onClick(event) {
        context.emit('click', event)
      }

      function onArrowDown(index) {
        index < ((renderList.value && renderList.value.length) - 1 || (itemsInList.value && itemsInList.value.length) - 1) ? index += 1 : index = 0
        context.refs.list.getElementsByClassName('g-list-item')[index].focus()
        context.emit('keydown:down')
      }

      function onArrowUp(index) {
        index > 0 ? index -= 1 : index = (renderList.value && renderList.value.length) || (itemsInList.value && itemsInList.value.length) - 1
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

      const { internalValue, toggleItem, isActiveItem } = makeSelectable(props, context);

      //handler list items in list

      provide('selectedItems', internalValue)
      provide('multiple', props.multiple)
      provide('mandatory', props.mandatory)
      provide('selectable', props.selectable)
      provide('allowDuplicates', props.allowDuplicates)
      const getListEvents = (item, index) => {
        return {
          click: () => onSelect(item),
          keydown: (e) => {
            switch (e.keyCode) {
              case keyCodes.down:
                onArrowDown(index)
                break
              case keyCodes.up:
                onArrowUp(index)
                break
              case keyCodes.enter:
                onSelect(item)
                break
            }
          }
        }
      }
      provide('getListEvents', getListEvents)


      return {
        itemsInList,
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
        isSelected,
        isActiveItem,
        getListEvents,
        isObjectList,
      }
    }
  }
</script>

<style scoped>
</style>
