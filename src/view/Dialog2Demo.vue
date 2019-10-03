<template>
	<div class="outerdiv">
		<g-dialog2 v-model="dialog" width="500px" scrollable>
			<template v-slot:activator="{toggleOverlay}">
				<g-button @click="toggleOverlay">Open Dialog 1</g-button>
				<g-button @click="toggleOverlay">Open Dialog 2</g-button>
				<g-button @click="toggleOverlay">Open Dialog 3</g-button>
			</template>
			<g-card flat elevation="16">
				<g-card-title class="bg-grey-lighten-2 fs-large fw-700">
					Privacy Policy
				</g-card-title>
				<g-card-text>

					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


				</g-card-text>
				<hr/>
				<g-card-actions>
					<g-button @click="dialog = false">I accept</g-button>
				</g-card-actions>
			</g-card>
		</g-dialog2>
	</div>
</template>

<script>
  import GDialog2 from '../components/GDialog/GDialog2';
  import GButton from '../components/GButton/GButton';
  import GCard from '../components/GCard/GCard';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GCardActions from '../components/GCard/GCardActions';
  import GCardText from '../components/GCard/GCardText';
  export default {
    name: 'Dialog2Demo',
    components: { GCardText, GCardActions, GCardTitle, GCard, GButton, GDialog2 },
		data() {
      return {
        dialog: false
			}
		}
  }
</script>

<style scoped>

</style>