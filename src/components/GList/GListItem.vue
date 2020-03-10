<template>
  <div :class="classes" :style="styles" v-if="isItemAdded" tabindex="0" v-on="listItemEvents(item, index)">
    <slot></slot>
  </div>
</template>

<script>
  import { computed, inject } from '@vue/composition-api';

  export default {
    name: 'GListItem',
    props: {
      height: String,
      disabled: Boolean,
      twoLine: Boolean,
      threeLine: Boolean,
      item: [String, Number, Object, Function],
      inList: {
        type: Boolean,
        default: true
      },
    },
    setup(props, context) {
      const selectable = props.inList ? inject('selectable') : null
      //handle listItem in selectable list case
      const add = selectable && props.inList ? inject('add') : null
      const { isItemAdded, index } = selectable && props.inList ? add(props.item) : { isItemAdded: true, index: 0 }
      const isActiveItem = selectable && props.inList ? inject('isActiveItem') : null
      const inListEvents = selectable && props.inList ? inject('getListEvents') : null

      const singleItemEvents = () => ({
        click: () => {
          context.emit('click', props.item);
          context.emit('singleItemClick', props.item) // legacy, to be removed later
        },
      })

      const listItemEvents = selectable && props.inList ? inListEvents : singleItemEvents

      const classes = computed(() => {
        const defaultClasses = {
          'g-list-item': true,
          'waves-effect': true
        }

        return {
          ...defaultClasses,
          'g-list-item__disabled': props.disabled,
          'g-list-item__two-line': props.twoLine,
          'g-list-item__three-line': props.threeLine,
          'g-list-item__active': selectable && props.inList ? isActiveItem(props.item) : false,
        }
      })

      const styles = computed(() => {
        if (props.height) {
          return {
            'height': props.height
          }
        }
      })

      return {
        index,
        classes,
        styles,
        listItemEvents,
        isItemAdded,
        singleItemEvents
      }
    }
  }
</script>

<style scoped>

</style>
