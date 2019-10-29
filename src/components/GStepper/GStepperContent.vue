<template>
  <g-layout vertical>
    <slot :isActive="isActiveItem"></slot>
  </g-layout>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import GLayout from '../GLayout/GLayout';

  export default {
    name: 'GStepperContent',
    props: {
      steps: Array,
      value: null
    },
    components: { GLayout },
    setup(props, context) {
      const { model } = getVModel(props, context);
      const isActiveItem = (item) => model.value === item;
      return {
        isActiveItem,
      }
    }
  }
</script>

<style scoped>

</style>
