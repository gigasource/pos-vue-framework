<template>
  <g-layout v-if="show">
    <g-layout vertical>
      <slot></slot>
    </g-layout>
  </g-layout>
</template>

<script>
  import GLayout from '../GLayout/GLayout';
  import { computed, inject } from '@vue/composition-api'

  export default {
    name: 'GStepperContent',
    components: { GLayout },
    props: {
      step: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => {
        return model.value === props.step
      });

      return {
        show
      }
    }
  }
</script>

<style scoped>

</style>
