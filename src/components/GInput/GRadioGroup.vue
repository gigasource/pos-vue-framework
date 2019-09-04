<template>
<!--	TODO: slot(label)-->
</template>

<script>
  export default {
    name: 'GRadioGroup',
    props: {
      name: String,
			id: String,
			activeClass: {
        type: String,
				default: 'radio--active'
			},
      column: {
        type: Boolean,
				default: true
			},
      disabled: Boolean,
      readonly: Boolean,
      label: String,
      mandatory: {
        type: Boolean,
				default: true
			},
      row: Boolean,
      value: [String, Boolean, Number, Array, Object]
    }
  }
</script>

<style scoped>

</style>