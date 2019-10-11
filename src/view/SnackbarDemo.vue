<template>
	<div>
		<g-btn color="black" @click="snackbar = true">
			OPEN SNACKBAR
		</g-btn>
		<g-snackbar v-model="snackbar" timeout="200000" color="bg-red">
			Hello I'm Snackbar
			<g-btn flat color="pink" @click="snackbar = false">
				Close
			</g-btn>
		</g-snackbar>
	</div>
</template>

<script>
  import GSnackbar from '../components/GSnackbar/GSnackbar';
  import GBtn from '../components/GBtn/GBtn';
  export default {
    name: 'SnackbarDemo',
    components: { GBtn, GSnackbar },
		data() {
      return {
        snackbar: false
			}
		}
  }
</script>

<style scoped>

</style>