<template>
  <g-layout>
    <slot></slot>
  </g-layout>
</template>

<script>
  import GLayout from '../GLayout/GLayout';

  export default {
    name: 'GStepperContents',
    components: { GLayout },
  }
</script>

<style scoped>

</style>
