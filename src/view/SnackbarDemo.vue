<template>
 <g-snackbar v-model="snackbar">
	 Hello I'm Snackbar
   <g-btn flat color="red">
			Close
	 </g-btn>
 </g-snackbar>
</template>

<script>
  import GSnackbar from '../components/GSnackbar/GSnackbar';
  import GBtn from '../components/GBtn/GBtn';
  export default {
    name: 'SnackbarDemo',
    components: { GBtn, GSnackbar },
		data() {
      return {
        snackbar: true
			}
		}
  }
</script>

<style scoped>

</style>