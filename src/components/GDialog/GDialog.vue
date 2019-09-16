<template>
	<div v-if="computedValue" class="dialog-wrapper" :class="classes">
		<div class="dialog-content" @click.self="outsideClick">
			<slot></slot>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'GDialog',
		props: {
      value: Boolean,
			dark: Boolean,
			persistent: Boolean,
		},
		computed: {
      computedValue: {
        get() {
          return this.value;
				},
				set(value) {
          this.$emit('input', value);
				}
			},
			classes () {
        return {
          'dialog-wrapper__light': !this.dark,
          'dialog-wrapper__dark': this.dark,
				}
			}
		},
		methods: {
      outsideClick() {
				if(!this.persistent){
				  this.computedValue = false;
				}
			}
		}
  }
</script>

<style scoped>

</style>