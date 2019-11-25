<template>
	<div :class="classes" :style="styles" @click="onSelectItem" @keydown="onKeyDown">
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
          'g-list-item__active': isActiveItem(props.value),
        }
      });
      const styles = computed(() => {
        if (props.height) {
          return {
            'height': props.height
          }
        }
      });
      const selectedItems = inject('selectedItems')
			const multiple = inject('multiple')
			const mandatory = inject('mandatory')
			const selectable = inject('selectable')
			const allowDuplicates = inject('allowDuplicates')
      const { toggleItem, isActiveItem } = groupable({multiple, mandatory, allowDuplicates}, selectedItems)

      const onSelectItem = () => {
        selectable ? toggleItem(props.value) : null
        context.emit('singleItemClick')
      }
      const onKeyDown = (e) => {
        context.emit('keydown', e)
      }

      return {
        classes,
        styles,
        onSelectItem,
        onKeyDown,
				selectedItems
      }
    }
  }
</script>

<style scoped>

</style>
