<template>
	
</template>

<script>
  export default {
    name: 'GSwitch',
    props: {
      id: String,
      disabled: Boolean,
			readonly: Boolean,
			label: String,
      value: [String, Boolean, Number, Array, Object],
		}
  }
</script>

<style scoped>

</style>