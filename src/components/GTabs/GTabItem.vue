<template>
	<g-layout><slot></slot></g-layout>
</template>

<script>
  import GLayout from '@/components/GLayout/GLayout';
  export default {
    name: 'GTabItem',
    components: { GLayout },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>