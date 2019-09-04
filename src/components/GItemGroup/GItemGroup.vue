<template>
	
</template>

<script>
  export default {
    name: 'GItemGroup',
    props: {
      activeClass: {
        type: String,
				default: 'item--active'
			},
			mandatory: Boolean,
			value: [String, Number, Boolean, Object, Array]
		},
		computed: {
      computedValue: {
        get() {
          return this.value;
				},
				set(value) {
          this.$emit('input', value);
				}
			}
		}
  }
</script>

<style scoped>

</style>