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