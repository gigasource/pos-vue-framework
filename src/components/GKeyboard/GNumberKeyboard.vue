<template>
	<div class="number-key">
		<div class="number-key-show ba-blue-9 ba-thin bg-lgray-5">
			<div class="number-key-screen col-6">
				<span class="number-key-text bg-lgray-3 ba-blue-9 ba-thin w-100 br-2 white fs-small-2 fw-400 pl-2">{{label}}</span>
			</div>
			<input class="number-key-text col-5 self-center ta-right bg-lgray-5 fs-large-2 fw-700" style="border: none; outline: none" v-model="number">
			<img v-if="isDirty" class="col-1 h-40 self-center" src="../../assets/order/cancel.svg">
		</div>
		<div class="number-key-numpad">
			<div v-for="(item) in items" class="key-number">{{item}}</div>
			<div class="key-number key-number__extra">&crarr;</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'GNumberKeyboard',
		props: {
      label: String,
		},
		data(){
      return {
        number: 700,
				items: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '00', 'x', 'C']
			}
		},
		computed: {
			isDirty() {
			  return (this.number && this.number > 0);
			}
		}
  }
</script>

<style scoped>

</style>