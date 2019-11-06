<script>
  import getVModel from '../../mixins/getVModel';
  import { provide, ref, watch } from '@vue/composition-api'

  export default {
    name: 'GTabItems',
    props: {
      items: Array,
      value: null
    },
    setup(props, context) {
      const { model } = getVModel(props, context);
      provide('model', model);

      const transition = ref('g-tab-transition');
      provide('transition', transition);

      watch(() => model.value, (newVal, oldVal) => {
        const newIndex = props.items.findIndex(item => item === newVal);
        const oldIndex = props.items.findIndex(item => item === oldVal);
        if (newIndex < oldIndex) {
          transition.value = 'g-tab-transition-reverse';
        } else {
          transition.value = 'g-tab-transition';
        }
      }, { flush: 'pre' })

      return () =>
        <div class="g-tab-items">
          {context.slots.default()}
        </div>
    }
  }
</script>

<style scoped>

</style>