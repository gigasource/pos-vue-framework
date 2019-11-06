<script>
  import { computed, inject, createElement as h } from '@vue/composition-api'

  export default {
    name: 'GTabItem',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (model.value === props.item));
      const transition = inject('transition');

      return () => h(
        'transition',
        {
          props: {
            name: transition.value
          }
        },
        [
          <div vShow={show.value} className="g-tab-item">
            {context.slots.default()}
          </div>
        ]
      )
    }
  }
</script>

<style scoped>

</style>