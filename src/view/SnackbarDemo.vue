<template>
	<div>
		<div>
			<g-btn color="black" @click="snackbarBottom = true">
				SNACKBAR BOTTOM
			</g-btn>
			<g-snackbar v-model="snackbarBottom" timeout="2000">
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarBottom = false">
					Close
				</g-btn>
			</g-snackbar>

			<g-btn color="black" @click="snackbarTop = true">
				SNACKBAR TOP
			</g-btn>
			<g-snackbar v-model="snackbarTop" timeout="2000" top>
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarTop = false">
					Close
				</g-btn>
			</g-snackbar>

			<g-btn color="black" @click="snackbarLeft = true">
				SNACKBAR LEFT
			</g-btn>
			<g-snackbar v-model="snackbarLeft" timeout="2000" left>
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarLeft = false">
					Close
				</g-btn>
			</g-snackbar>

			<g-btn color="black" @click="snackbarRight = true">
				SNACKBAR RIGHT
			</g-btn>
			<g-snackbar v-model="snackbarRight" timeout="2000" top right>
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarRight = false">
					Close
				</g-btn>
			</g-snackbar>

			<g-btn color="black" @click="snackbarColor = true">
				SNACKBAR COLOR
			</g-btn>
			<g-snackbar v-model="snackbarColor" timeout="2000" color="rgb(235, 52, 52)">
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarColor = false">
					Close
				</g-btn>
			</g-snackbar>
		</div>
		<div>
			<label for="timeoutInput">Timeout: </label>
			<input id="timeoutInput" type="text" v-model="timeout"/>
			<br/>
			<g-btn color="black" @click="snackbarTimeout = true">
				SNACKBAR TIMEOUT
			</g-btn>
			<g-snackbar v-model="snackbarTimeout" :timeout="timeout" color="rgb(17, 194, 156)">
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarTimeout = false">
					Close
				</g-btn>
			</g-snackbar>
		</div>
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
        snackbarBottom: false,
        snackbarTop: false,
        snackbarLeft: false,
        snackbarRight: false,
				snackbarColor: false,
				snackbarTimeout: false,
				timeout: 2000
			}
		}
  }
</script>

<style scoped>
	div {
		margin: 10px
	}
	button {
		margin: 5px
	}
</style>