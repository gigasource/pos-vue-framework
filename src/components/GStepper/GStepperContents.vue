<template>
  <g-layout vertical>
    <slot></slot>
  </g-layout>
</template>

<script>
  import getVModel from '../../mixins/getVModel';
  import GLayout from '../GLayout/GLayout';
  import { provide } from '@vue/composition-api'

  export default {
    name: 'GStepperContents',
    props: {
      steps: Array,
      value: null
    },
    components: { GLayout },
    setup(props, context) {
      const { model } = getVModel(props, context);
      provide('model', model);
    }
  }
</script>

<style scoped>

</style>
