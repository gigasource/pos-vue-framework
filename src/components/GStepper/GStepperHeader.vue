<template>
  <g-layout horizontal>
    <slot></slot>
  </g-layout>
</template>

<script>
  import GLayout from '../GLayout/GLayout';
  export default {
    name: 'GStepperHeader',
    components: { GLayout }
  }
</script>

<style scoped>

</style>
