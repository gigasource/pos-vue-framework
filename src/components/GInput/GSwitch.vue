<template>
	<div class="col-flex">
		<p class="fw-400 fs-small-2">{{label}}</p>
		<label :class="switchClass">
			<input :id="id" class="switch-input" type="checkbox" :value="value">
			<span class="switch-round"></span>
		</label>
	</div>
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
      switchClass() {
        let defaultClasses = {switch: true, 'switch__small': true, 'br-4': true, 'mt-2': true};
        return {
          ...defaultClasses,
					readonly: this.readonly,
					disabled: this.disabled
				};
			}
		}
  }
</script>

<style scoped>

</style>