<script>
  import getVModel from '../../mixins/getVModel';
  import { provide, ref, watch, inject, computed } from '@vue/composition-api'

  export default {
    name: 'GTabItems',
    props: {
      items: Array,
      value: null
    },
    setup(props, context) {
      const model = inject('model', getVModel(props, context))
      const computedItems = computed(() => props.items)
      const items = inject('items', computedItems)
      provide('model', model);

      const transition = ref('g-tab-transition');
      provide('transition', transition);

      watch(() => model.value, (newVal, oldVal) => {
        const newIndex = items.value.findIndex(item => item === newVal);
        const oldIndex = items.value.findIndex(item => item === oldVal);
        if (newIndex < oldIndex) {
          transition.value = 'g-tab-transition-reverse';
        } else {
          transition.value = 'g-tab-transition';
        }
      }, { flush: 'pre' })

      return () =>
        <div class="g-tab-items">
          {context.slots.default && context.slots.default()}
        </div>
    }
  }
</script>

<style scoped>
	.g-tab-items {
		contain: layout;
		flex: 1 1 auto;
		overflow: hidden;
	}
</style>
