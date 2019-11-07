<script>
  import { computed, inject } from '@vue/composition-api'
  import { isEqual } from 'lodash'

  export default {
    name: 'GTab',
    props: {
      disabled: Boolean,
      value: {
        required: false
      },
      item: null,
      activeClass: {
        type: String,
        default: 'g-tab__active'
      },
      ripple: {
        type: Boolean,
        default: true
      }
    },
    setup(props, context) {
      const model = inject('model', null);
      const isActive = computed(() => (model && isEqual(model.value, props.item)));

      const classes = computed(() => ({
        'g-tab': true,
        'waves-effect': props.ripple,
        [props.activeClass]: isActive.value,
        'g-tab__disabled': props.disabled || (props.item && props.item.disabled)
      }));

      function toggle() {
        if (props.disabled) return;
        model.value = props.item;
      }

      return () =>
        <div class={classes.value} vOn:click={toggle}>
          {context.slots.default()}
        </div>
    },
  }
</script>

<style scoped>

</style>