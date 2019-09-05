<template>
	<div>
		<label class="fw-400 dgray-3 fs-small-2 mb-2">
			<slot name="label">{{label}}</slot>
		</label>
		<div class="r">
			<input type="text"
						 class="textfield br-2 bg-lgray-5 pa-2 fs-small fw-700"
						 v-model="computedValue"
						 :placeholder="placeholder"
						 @change="$emit('change', $event)"
						 @input="$emit('input', $event)"
						 @click="$emit('click', $event)"
						 @focus="$emit('focus', $event)"
						 @blur="$emit('blur', $event)"
						 @keydown="$emit('keydown', $event)"
						 @mouseup="$emit('mouseup', $event)"
						 @mousedown="$emit('mousedown', $event)"
			/>
			<span class="textfield-icon">
				<slot name="append">
					<img v-if="clearable" src="../../assets/delivery/cancel.svg">
				</slot>
			</span>
		</div>
	</div>
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
		},
		methods: {
      //TODO event handler
		}
  }
</script>

<style scoped>
</style>