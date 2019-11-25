<template>
	<div tabindex="0" :class="classes" :style="styles" v-on="listEvents(value)">
		<slot></slot>
	</div>
</template>

<script>
  import { computed, ref, inject } from '@vue/composition-api';
  import groupable from '../../mixins/groupable';

  export default {
    name: 'GListItem',
    props: {
      height: String,
      disabled: Boolean,
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

      //handle listItem in List case
      const itemsInList = inject('itemsInList').value.push(props.value)
      const selectedItems = inject('selectedItems')
      const multiple = inject('multiple')
      const mandatory = inject('mandatory')
      const allowDuplicates = inject('allowDuplicates')
      const {isActiveItem} = groupable({ multiple, mandatory, allowDuplicates }, selectedItems)
      const listEvents = inject('getListEvents')

      return {
        itemsInList,
        classes,
        styles,
				listEvents,
        selectedItems,
      }
    }
  }
</script>

<style scoped>

</style>
