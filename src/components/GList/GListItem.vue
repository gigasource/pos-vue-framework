<script>
  import { computed, inject } from 'vue';
  import { getScopeIdRender } from '../../utils/helpers';

  export default {
    name: 'GListItem',
    emits: ['click', 'singleItemClick'],
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

      const renderFn = () => {
        if (isItemAdded) {
          return <div class={classes} style={styles} tabIndex={0} {...listItemEvents(props.item, index)}>
            {context.slots.default && context.slots.default()}
          </div>
        }
      }

      return {
        index,
        classes,
        styles,
        listItemEvents,
        isItemAdded,
        singleItemEvents,
        renderFn: getScopeIdRender()(renderFn)
      }
    },
    render() {
      return this.renderFn()
    }
  }
</script>

<style scoped>

</style>
