<template>
	
</template>

<script>
  export default {
    name: 'GTextField',
		props: {
      label: String,
			required: Boolean,
			placeholder: String,
			disabled: Boolean,
			readonly: Boolean,
			clearable: Boolean,
			value: String
		},
		computed: {
      computedValue: {
        get() {
          return this.value;
				},
				set (value) {
          this.$emit('input', value);
				}
			}
		}
  }
</script>

<style scoped>

</style>