<template>
	<div class="col-flex">
		<span>{{label}}</span>
		<div :class="radioGroupClass">
			<slot></slot>
		</div>
	</div>
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
    },
		computed: {
      radioGroupClass() {
        return {
          'col-flex': !this.row,
					'row-flex': this.row,
					'disabled': this.disabled,
					'readonly': this.readonly
				}
			}
		}
  }
</script>

<style scoped>

</style>