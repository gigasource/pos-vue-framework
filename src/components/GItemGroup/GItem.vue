<template>
	<slot :active="isActive" :toggle="toggle"></slot>
</template>

<script>
  export default {
    name: 'GItem',
    props: {
      activeClass: String,
      disabled: Boolean,
      value: {
        required: false
      }
    },
    data: () => ({
      isActive: false,
    }),
    methods: {
      toggle() {
        this.isActive = !this.isActive;
      }
    }
  }
</script>

<style scoped>

</style>