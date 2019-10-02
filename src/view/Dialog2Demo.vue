<template>
	<div>
		<g-dialog2 v-model="dialog">
			<template v-slot:activator="{toggleOverlay}">
				<g-button @click="toggleOverlay">Open Dialog</g-button>
			</template>
			<div style="border: 1px solid grey; padding: 20px; background-color: white; width: 500px; height: 300px; overflow: scroll">
				<h3>Privacy Policy</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

				</p>
				<br>
				<g-button color="green" @click="dialog = false">Close</g-button>
			</div>
		</g-dialog2>
	</div>
</template>

<script>
  import GDialog2 from '../components/GDialog/GDialog2';
  import GButton from '../components/GButton/GButton';
  export default {
    name: 'Dialog2Demo',
    components: { GButton, GDialog2 },
		data() {
      return {
        dialog: false
			}
		}
  }
</script>

<style scoped>

</style>