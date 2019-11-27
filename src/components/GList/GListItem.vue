<template>
	<div :class="classes" :style="styles" tabindex="0" v-on="listItemEvents(value)">
		<slot></slot>
	</div>
</template>

<script>
  import { computed, ref, inject } from '@vue/composition-api';
  import { getInternalValue } from '../../utils/helpers';
  import groupable, { makeSelectable } from '../../mixins/groupable';
  import { isSelected } from '../GDatePicker/logic/TableUtil';

  export default {
    name: 'GListItem',
    props: {
      height: String,
      disabled: Boolean,
			selectable: Boolean,
      twoLine: Boolean,
      threeLine: Boolean,
      value: [String, Number, Object]
    },
    setup(props, context) {
      const classes = computed(() => {
        const defaultClasses = {
          'g-list-item': true,
          'waves-effect': true
        };
        return {
          ...defaultClasses,
          'g-list-item__disabled': props.disabled,
          'g-list-item__selectable': props.selectable,
          'g-list-item__two-line': props.twoLine,
          'g-list-item__three-line': props.threeLine,
					'g-list-item__active': props.isSelected,
        }
      });
      const styles = computed(() => {
        if (props.height) {
          return {
            'height': props.height
          }
        }
      });

      //handle listItem in List case
      const itemsInList = inject('itemsInList').value.push(props.value)
      const selectedItems = inject('selectedItems')
      const multiple = inject('multiple')
      const mandatory = inject('mandatory')
      const allowDuplicates = inject('allowDuplicates')
      const {isActiveItem} = groupable({ multiple, mandatory, allowDuplicates }, selectedItems)
      const selectable = inject('selectable')
      const inListEvents = inject('getListEvents')
      const internalValue = ref(null)
      const { toggleItem } = groupable(props, internalValue)
      const singleItemEvents = () => {
        return {
          click: () => {
            toggleItem(props.value)
            context.emit('singleItemClick')
          },
          keydown: (e) => {
            context.emit('keydown', e)
          }
        }
      }
      const listItemEvents = selectable ? inListEvents : singleItemEvents()

      return {
        itemsInList,
        classes,
        styles,
        listItemEvents,
        selectedItems,
      }
    }
  }
</script>

<style scoped>

</style>
