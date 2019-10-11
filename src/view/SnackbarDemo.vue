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
			<g-snackbar v-model="snackbarTop" timeout="20000" top>
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
			<g-snackbar v-model="snackbarRight" timeout="20000" top right>
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarRight = false">
					Close
				</g-btn>
			</g-snackbar>
		</div>
		<div>
			<label for="colorInput">Color: </label>
			<input id="colorInput" type="text" v-model="color"/>
			<label for="timeoutInput">Timeout: </label>
			<input id="timeoutInput" type="text" v-model="timeout"/>
			<br/>
			<g-btn color="black" @click="snackbarColor = true">
				SNACKBAR
			</g-btn>
			<g-snackbar v-model="snackbarColor" :timeout="timeout" :color="color" absolute position-top="100px" position-bottom="auto" position-right="0">
				Hello I'm Snackbar
				<g-btn flat color="pink" @click="snackbarColor = false">
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
				color: "#0ab",
				timeout: 2000,
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